#include "kapok.h"
#include <bits/stdc++.h>

int main() {
  using namespace std;
  ifstream fin("/dev/stdin");
  ofstream fout("/dev/stdout");
  int c, n, m;
  fin >> c >> n >> m;
  vector<int> a(n);
  for (int &a : a) fin >> a;
  vector<int> l(m), r(m), x(m), y(m);
  for (int i = 0; i < m; ++i) fin >> l[i] >> r[i] >> x[i] >> y[i];
  for (bool const ans : kapok(c, n, m, a, l, r, x, y)) fout << ans << '\n';
}
