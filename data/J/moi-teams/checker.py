"""Checker for teams: python3 checker.py <input> <expected_output> <contestant_output>; exit 0 = accepted.
Any valid largest team is accepted (the problem allows any one)."""
import sys

def main():
    inp = list(map(int, open(sys.argv[1]).read().split()))
    exp = open(sys.argv[2]).read().split()
    got = open(sys.argv[3]).read().split()
    i = ei = gi = 0
    try:
        while inp[i] != 0:
            n = inp[i]; e = inp[i + 1:i + 1 + n]; s = inp[i + 1 + n:i + 1 + 2 * n]; i += 1 + 2 * n
            m = int(exp[ei]); ei += 1 + m
            gm = int(got[gi]); gi += 1
            if gm != m:
                print(f'team size {gm}, expected {m}'); return 1
            ids = [int(x) for x in got[gi:gi + m]]; gi += m
            if len(ids) != m or ids != sorted(ids) or len(set(ids)) != m or not all(1 <= x <= n for x in ids):
                print('ids must be distinct, in range and in increasing order'); return 1
            members = sorted((e[x - 1], s[x - 1]) for x in ids)
            if any(a[1] > b[1] and a[0] < b[0] for a, b in zip(members, members[1:])) or \
               any(members[k][1] > members[k + 1][1] and members[k][0] != members[k + 1][0] for k in range(m - 1)):
                print('team breaks the salary rule'); return 1
            # full pairwise check (exp higher must not have lower salary)
            byexp = {}
            for a, b in members: byexp.setdefault(a, []).append(b)
            ks = sorted(byexp)
            for x, y in zip(ks, ks[1:]):
                if max(byexp[x]) > min(byexp[y]):
                    print('team breaks the salary rule'); return 1
        if gi != len(got):
            print('extra output'); return 1
    except (IndexError, ValueError):
        print('output format error'); return 1
    return 0

sys.exit(main())
