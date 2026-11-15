#include <bits/stdc++.h>
#include "median.h"

namespace MEDIAN_uyagIh4YQT7XLfWDNAYiXkHK89dfOmtD {
    const std::string secret_out = "DxLehljqbxozCcB3yyurOPorVFSxDwk4";
    const std::string secret_wa = "E3vtOrx3XyfvlCWujvigFmiLz5SAfKLM";
    std::ifstream fin("/dev/stdin");
    std::ofstream fout("/dev/stdout");
    void wrong() {
        fout << secret_wa << '\n';
        exit(0);
    }
    int main() {
        fout << secret_out << '\n';

        int c, t;
        fin >> c >> t;
        init(c, t);
        for (int _ = 0; _ < t; _++) {
            int n, k;
            fin >> n >> k;
            std::vector<int> a(n);
            for (int i = 0; i < n; i++) fin >> a[i];
            fout << median(n, k, a) << '\n';
        }

        fout << secret_out << '\n';
        return 0;
    }
}

signed main() {
    return MEDIAN_uyagIh4YQT7XLfWDNAYiXkHK89dfOmtD::main();
}
