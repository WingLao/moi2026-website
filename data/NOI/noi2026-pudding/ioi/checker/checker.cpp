// From the official evaluator e_pudding.cpp: score = floor(f(Q) * g(S) * points) / points.
#include <cmath>
#include <fstream>
#include <iostream>
#include <string>
#include <algorithm>
const std::string secret_1 = "7818c2fd7773bfd87b27569c887ab18d6145b30a0558ed4c8ec5f33a41612b8c";
const std::string secret_2 = "25114af18f839cdb49eee1dfa7ead831ba4d57bacd3f3fd00f7c1b6de6794d24";
const int mxs[4] = {0, 10, 20, 70};
double f(int x) { return pow(0.7, std::max(0, x - 4)); }
double g(int x) {
    if (x <= 35) return 1.0;
    if (x <= 75) return 1.35 - 0.01 * x;
    if (x <= 235) return 0.2 + pow((235 - x) / 1000.0, 0.5);
    if (x <= 3000) return 0.2 * pow(2, (235 - x) / 1500.0);
    return 0.0;
}
int main(int argc, char** argv) {
    std::ifstream fin(argv[1]), fout(argv[3]);
    int a, b, c; fin >> a >> b >> c;
    int score = mxs[c];
    std::string s1, s2, msg;
    if (!(fout >> s1) || s1 != secret_1) {
        std::getline(fout, msg); std::getline(fout, msg);
        std::cout << 0 << '\n'; std::cerr << (msg.empty() ? "wrong answer" : msg) << '\n'; return 0;
    }
    int q, s;
    if (!(fout >> q >> s >> s2) || s2 != secret_2 || q > 15 || q < 0 || s > 3000 || s < 0) { std::cout << 0 << '\n'; std::cerr << "invalid output\n"; return 0; }
    double sc = floor(f(q) * g(s) * score + 1e-9) / score;
    std::cout << sc << '\n';
    std::cerr << "max queries " << q << ", max total puddings " << s << '\n';
}
