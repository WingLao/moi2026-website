#!/usr/bin/env python3
"""Judge one C++ submission for an IOI (CMS-format) task.

Usage: ioi-judge.py <task_dir> <source.cpp> <work_dir>
  task_dir contains problem.json, graders/, (checker/), tests/, subtasks/*.json  (official IOI task-archive layout)
Prints one JSON object:
  {"compile_error": "..."}                       or
  {"subtasks": [{"index": 0, "name": "00-samples", "points": 0.0, "max": 0, "fraction": 1.0,
                 "status": "AC"|"WA"|"TLE"|"RE", "message": "...", "time_ms": 123}, ...]}
Supported task types: Batch / BatchAndOutput (grader + comparator checker) and Communication (manager + N stub processes, std_io).
A subtask's points = its score × the minimum fraction over its testcases (IOI rule).
Compiled graders/checkers/managers are cached next to the task (bin cache keyed by source mtime)."""
import glob, hashlib, json, os, resource, shutil, signal, subprocess, sys, tempfile, time

CXX = os.environ.get('IOI_CXX', 'g++')
CXXFLAGS = ['-std=gnu++17', '-O2', '-pipe', *os.environ.get('IOI_EXTRA_FLAGS', '').split()]


def compile_cached(task_dir, name, sources, include_dir, cache_root):
    """Compile helper programs (checker/manager) once and reuse them."""
    key = hashlib.sha1(''.join(f'{s}:{os.path.getmtime(s)}' for s in sources).encode()).hexdigest()[:16]
    out = os.path.join(cache_root, f'{name}-{key}')
    if not os.path.exists(out):
        tmp = out + f'.tmp{os.getpid()}'
        r = subprocess.run([CXX, *CXXFLAGS, '-I', include_dir, *sources, '-o', tmp], capture_output=True, text=True)
        if r.returncode:
            raise RuntimeError(f'cannot compile {name}: {r.stderr[-800:]}')
        os.replace(tmp, out)
    return out


def limit(seconds):
    def pre():
        cpu = int(seconds) + 1
        resource.setrlimit(resource.RLIMIT_CPU, (cpu, cpu + 1))
        os.setsid()
    return pre


def run_batch(sol, checker, inp, ans, work, tl):
    out_path = os.path.join(work, 'out.txt')
    t0 = time.time()
    with open(inp, 'rb') as fi, open(out_path, 'wb') as fo:
        try:
            p = subprocess.run([sol], stdin=fi, stdout=fo, stderr=subprocess.DEVNULL, timeout=tl * 2 + 1, preexec_fn=limit(tl), cwd=work)
            rc = p.returncode
        except subprocess.TimeoutExpired:
            return 0.0, 'TLE', 'time limit exceeded', int((time.time() - t0) * 1000)
    ms = int((time.time() - t0) * 1000)
    if rc in (-signal.SIGXCPU, -signal.SIGKILL) or ms > tl * 1000 * 1.5:
        return 0.0, 'TLE', 'time limit exceeded', ms
    if rc != 0:
        return 0.0, 'RE', f'runtime error (exit {rc})', ms
    c = subprocess.run([checker, inp, ans, out_path], capture_output=True, text=True, timeout=60, cwd=work)
    return parse_score(c.stdout, c.stderr, ms)


def run_communication(sol, manager, inp, nproc, work, tl):
    fifos = []
    for i in range(nproc):
        a, b = os.path.join(work, f's{i}2m'), os.path.join(work, f'm2s{i}')
        for f in (a, b):
            if os.path.exists(f): os.unlink(f)
            os.mkfifo(f)
        fifos.append((a, b))
    t0 = time.time()
    fin = open(inp, 'rb')
    mgr = subprocess.Popen([manager, *[x for pair in fifos for x in pair]], stdin=fin, stdout=subprocess.PIPE, stderr=subprocess.PIPE, cwd=work, preexec_fn=os.setsid)
    procs = []
    for i, (s2m, m2s) in enumerate(fifos):
        # open order must match the manager (it opens mgr->sol for append first, then sol->mgr for read)
        procs.append(subprocess.Popen(['/bin/sh', '-c', f'exec "$0" {i} < "$1" > "$2"', sol, m2s, s2m],
                                      stderr=subprocess.DEVNULL, cwd=work, preexec_fn=limit(tl)))
    deadline = time.time() + tl * 2 + 5 + nproc * 0.05
    status = None
    while time.time() < deadline:
        if mgr.poll() is not None and all(p.poll() is not None for p in procs):
            break
        time.sleep(0.01)
    else:
        status = 'TLE'
    for p in procs + [mgr]:
        if p.poll() is None:
            try: os.killpg(p.pid, signal.SIGKILL)
            except Exception: pass
            p.wait()
    fin.close()
    ms = int((time.time() - t0) * 1000)
    out, err = mgr.stdout.read().decode(), mgr.stderr.read().decode()
    if status == 'TLE' or any(p.returncode in (-signal.SIGXCPU,) for p in procs):
        return 0.0, 'TLE', 'time limit exceeded', ms
    frac, st, msg, _ = parse_score(out, err, ms)
    bad = [p.returncode for p in procs if p.returncode not in (0, None)]
    if st != 'AC' and bad:
        return frac, 'RE', f'runtime error (exit {bad[0]}); {msg}', ms
    return frac, st, msg, ms


def parse_score(out, err, ms):
    try:
        frac = float(out.strip().split()[0])
    except (ValueError, IndexError):
        return 0.0, 'RE', (err or out).strip()[:200] or 'judge error', ms
    if frac <= 1e-5 + 1e-9:
        frac = 0.0
    msg = err.strip().splitlines()[0][:200] if err.strip() else ''
    return frac, ('AC' if frac >= 1 - 1e-9 else 'WA'), msg, ms


def main():
    task_dir, source, work = sys.argv[1:4]
    prob = json.load(open(os.path.join(task_dir, 'problem.json')))
    ttype, params, tl = prob['task_type'], prob.get('task_type_params', []), float(prob['time_limit'])
    graders = os.path.join(task_dir, 'graders')
    cache = os.path.join(tempfile.gettempdir(), 'ioi-judge-cache'); os.makedirs(cache, exist_ok=True)
    os.makedirs(work, exist_ok=True)
    sol = os.path.join(work, 'sol')
    if ttype in ('Batch', 'BatchAndOutput'):
        srcs = [os.path.join(graders, 'grader.cpp'), source]
        checker = compile_cached(task_dir, prob['code'] + '-checker', [os.path.join(task_dir, 'checker', 'checker.cpp')], os.path.join(task_dir, 'checker'), cache)
    elif ttype == 'Communication':
        stub = os.path.join(graders, 'stub.cpp')
        srcs = [stub if os.path.exists(stub) else os.path.join(graders, 'grader.cpp'), source]
        manager = compile_cached(task_dir, prob['code'] + '-manager', [os.path.join(graders, 'manager.cpp')], graders, cache)
        nproc = int(params[0])
    else:
        print(json.dumps({'compile_error': f'unsupported task type {ttype}'})); return
    c = subprocess.run([CXX, *CXXFLAGS, '-I', graders, *srcs, '-o', sol], capture_output=True, text=True)
    if c.returncode:
        print(json.dumps({'compile_error': c.stderr[-4000:]})); return
    results = []
    for idx, sf in enumerate(sorted(glob.glob(os.path.join(task_dir, 'subtasks', '*.json')))):
        st = json.load(open(sf)); worst = (1.0, 'AC', '', 0); tmax = 0
        for tc in st['testcases']:
            inp = os.path.join(task_dir, 'tests', tc + '.in'); ans = os.path.join(task_dir, 'tests', tc + '.out')
            if not os.path.exists(inp):
                continue                      # trimmed test set
            if ttype == 'Communication':
                r = run_communication(sol, manager, inp, nproc, work, tl)
            else:
                r = run_batch(sol, checker, inp, ans, work, tl)
            tmax = max(tmax, r[3])
            if r[0] < worst[0]:
                worst = (r[0], r[1], f'{tc}: {r[2]}', r[3])
            if worst[0] == 0:
                break                         # subtask already lost
        score = float(st['score'])
        results.append({'index': idx, 'name': os.path.basename(sf)[:-5], 'max': score, 'fraction': worst[0],
                        'points': round(score * worst[0], 2), 'status': worst[1], 'message': worst[2], 'time_ms': tmax})
    print(json.dumps({'subtasks': results}))


if __name__ == '__main__':
    main()
