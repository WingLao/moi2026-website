#include <bits/stdc++.h>
#include "teleport.h"

namespace TELEPORT_e4b1c92a7f0d68a5319c4e2f8b7d03aa {
    const std::string secret_out = "7c9f2e4a61b8d305a4e6f93c0d12b7aa";
    const std::string secret_wa = "d4a8b2f19e73c60a5b0f2cd86e941337";
    std::ifstream fin("/dev/stdin");
    std::ofstream fout("/dev/stdout");
    void wrong() {
        fout << secret_wa << '\n';
        exit(0);
    }
    int main() {
        fout << secret_out << '\n';

        int c, n, m;
        fin >> c >> n >> m;

        std::vector<int> u(n), v(n), x(m), y(m);
        for (int i = 0; i < n - 1; i++) fin >> u[i] >> v[i];
        for (int i = 0; i < m; i++) fin >> x[i] >> y[i];

        std::vector<std::pair<long long, int>> a = teleport(c, n, m, u, v, x, y);

        if (static_cast<int>(a.size()) != m) wrong();

        for (int i = 0; i < m; i++) fout << a[i].first << ' ' << a[i].second << '\n';

        fout << secret_out << '\n';
        return 0;
    }
}

signed main() {
    return TELEPORT_e4b1c92a7f0d68a5319c4e2f8b7d03aa::main();
}
