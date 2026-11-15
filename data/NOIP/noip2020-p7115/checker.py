"""Checker for NOIP2020 移球游戏 (ball): python3 checker.py <input> <expected> <output>; exit 0 = accepted.
Any valid plan with at most 820000 moves is accepted."""
import sys

def main():
    data = open(sys.argv[1]).read().split()
    n, m = int(data[0]), int(data[1])
    cols = [[] for _ in range(n + 2)]
    p = 2
    for i in range(1, n + 1):
        cols[i] = [int(x) for x in data[p:p + m]]; p += m
    out = open(sys.argv[3]).read().split()
    if not out:
        print('empty output'); return 1
    try:
        k = int(out[0])
    except ValueError:
        print('bad k'); return 1
    if not 0 <= k <= 820000 or len(out) != 1 + 2 * k:
        print('k out of range or wrong number of moves'); return 1
    for t in range(k):
        try:
            x, y = int(out[1 + 2 * t]), int(out[2 + 2 * t])
        except ValueError:
            print(f'A {t + 1}'); return 1
        if not (1 <= x <= n + 1 and 1 <= y <= n + 1) or x == y or not cols[x] or len(cols[y]) >= m:
            print(f'A {t + 1}'); return 1
        cols[y].append(cols[x].pop())
    for i in range(1, n + 2):
        if cols[i] and (len(cols[i]) != m or len(set(cols[i])) != 1):
            print(f'B {i}'); return 1
    print('OK'); return 0

sys.exit(main())
