#include <bits/stdc++.h>
#include "rainbow.h"

signed main() {
	std::ifstream fin("/dev/stdin");
	std::ofstream fout("/dev/stdout");
	int c, n;
	fin >> c >> n;
	std::vector<int> f(n);
	for (int i = 1; i < n; i++) fin >> f[i];
	fout << rainbow(c, n, f) << '\n';
	return 0;
}
