#include <bits/stdc++.h>
#include "segment.h"

namespace SEGMENT_b5c42c9aaf4c4d4fb759a2e6b6f0a4a1 {
    const std::string secret_out = "52fb5d5dbbb61b92c9b2b2130f8a25a7";
    const std::string secret_wa = "4b3c99a7dd7e2f392c31c06157ce8f0d";

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
            int n, m, k;
            fin >> n >> m >> k;

            std::vector<int> l(n), r(n);
            for (int i = 0; i < n; i++) {
                fin >> l[i] >> r[i];
            }

            std::vector<int> a = segment(n, m, k, l, r);

            if (static_cast<int>(a.size()) != k + 1) wrong();

            for (int i = 1; i <= k; i++) {
                fout << a[i] << " \n"[i == k];
            }
        }

        fout << secret_out << '\n';
        return 0;
    }
}

signed main() {
    return SEGMENT_b5c42c9aaf4c4d4fb759a2e6b6f0a4a1::main();
}
