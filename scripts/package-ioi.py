#!/usr/bin/env python3
"""Package official IOI tasks (task-archive layout) for the OJ.

Usage: python3 scripts/package-ioi.py <IOI year dir, e.g. 20_比賽資料/IOI/IOI2026> <year>
For each task creates
  data/IOI/ioi<year>-<code>/ioi/            problem.json, graders/, checker/, subtasks/, tests/ (trimmed)
  data/IOI/ioi<year>-<code>/ioi<year>-<code>-<k>.in/.out   one placeholder per subtask (.out = subtask score)
  public/ioi/ioi<year>-<code>-en.pdf, -zh.pdf, -files.zip   official statements and attachments
Tests are trimmed to keep the repo small: every subtask keeps its smallest test, then tests are added
smallest-first while the task stays under MAX_TASK_BYTES."""
import glob, json, os, shutil, sys

MAX_TASK_BYTES = 12 * 1024 * 1024
APP = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def size(task, tc):
    return sum(os.path.getsize(p) for p in (f'{task}/tests/{tc}.in', f'{task}/tests/{tc}.out') if os.path.exists(p))


def main():
    src_year, year = sys.argv[1], sys.argv[2]
    for task in sorted(glob.glob(os.path.join(src_year, 'day*', '*'))):
        prob = json.load(open(f'{task}/problem.json'))
        slug = f'ioi{year}-{prob["code"]}'
        out = os.path.join(APP, 'data', 'IOI', slug)
        if os.path.exists(out):
            shutil.rmtree(out)
        os.makedirs(f'{out}/ioi/tests')
        for d in ('graders', 'checker', 'subtasks'):
            if os.path.isdir(f'{task}/{d}'):
                shutil.copytree(f'{task}/{d}', f'{out}/ioi/{d}')
        shutil.copy(f'{task}/problem.json', f'{out}/ioi/problem.json')
        subtasks = [json.load(open(f)) for f in sorted(glob.glob(f'{task}/subtasks/*.json'))]
        keep, total = set(), 0
        for st in subtasks:                       # every subtask keeps at least its smallest test
            tc = min(st['testcases'], key=lambda t: size(task, t))
            if tc not in keep:
                keep.add(tc); total += size(task, tc)
        for tc in sorted({t for st in subtasks for t in st['testcases']}, key=lambda t: size(task, t)):
            if tc not in keep and total + size(task, tc) <= MAX_TASK_BYTES:
                keep.add(tc); total += size(task, tc)
        for tc in keep:
            for ext in ('in', 'out'):
                if os.path.exists(f'{task}/tests/{tc}.{ext}'):
                    shutil.copy(f'{task}/tests/{tc}.{ext}', f'{out}/ioi/tests/{tc}.{ext}')
        all_tests = {t for st in subtasks for t in st['testcases']}
        for k, (f, st) in enumerate(zip(sorted(glob.glob(f'{task}/subtasks/*.json')), subtasks)):
            name = os.path.basename(f)[:-5]
            kept = sum(t in keep for t in st['testcases'])
            open(f'{out}/{slug}-{k}.in', 'w').write(f'{name}: {kept} of {len(st["testcases"])} official tests\n')
            open(f'{out}/{slug}-{k}.out', 'w').write(f'{st["score"]}\n')
        pub = os.path.join(APP, 'public', 'ioi'); os.makedirs(pub, exist_ok=True)
        shutil.copy(f'{task}/en.pdf', f'{pub}/{slug}-en.pdf')
        if os.path.exists(f'{task}/translations/zh_MO.pdf'):
            shutil.copy(f'{task}/translations/zh_MO.pdf', f'{pub}/{slug}-zh.pdf')
        zips = glob.glob(f'{task}/attachments/*.zip')
        if zips:
            shutil.copy(zips[0], f'{pub}/{slug}-files.zip')
            import zipfile
            with zipfile.ZipFile(zips[0]) as z:          # official C++ template -> pre-filled in the submit box
                name = next((n for n in z.namelist() if n.endswith(f'cpp/{prob["code"]}.cpp')), None)
                if name:
                    open(f'{out}/ioi/template.cpp', 'wb').write(z.read(name))
        print(f'{slug:22s} {prob["task_type"]:15s} subtasks {len(subtasks):2d}  tests kept {len(keep)}/{len(all_tests)}  {total // 1024} KB')


if __name__ == '__main__':
    main()
