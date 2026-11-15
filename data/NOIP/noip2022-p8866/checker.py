"""Wraps the official testlib-style checker (checker_testlib.cpp): python3 checker.py <input> <expected> <output>."""
import hashlib, os, subprocess, sys, tempfile
here = os.path.dirname(os.path.abspath(__file__)); src = os.path.join(here, 'checker_testlib.cpp')
exe = os.path.join(tempfile.gettempdir(), 'chk-' + hashlib.sha1(open(src, 'rb').read()).hexdigest()[:12])
if not os.path.exists(exe):
    subprocess.run(['g++', '-O2', '-std=gnu++17', src, '-o', exe + '.tmp'], check=True); os.replace(exe + '.tmp', exe)
work = tempfile.mkdtemp()
subprocess.run([exe, os.path.abspath(sys.argv[1]), os.path.abspath(sys.argv[3]), os.path.abspath(sys.argv[2])], cwd=work, capture_output=True)
try:
    lines = open(os.path.join(work, '_eval.score')).read().split('\n')
    score = int(lines[1].strip()); print(lines[0].strip())
except Exception:
    print('checker error'); sys.exit(1)
sys.exit(0 if score > 0 else 1)
