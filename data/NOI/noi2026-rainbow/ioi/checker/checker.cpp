// Token-by-token comparison of the grader output with the official answer (which includes the grader's secret lines).
#include <fstream>
#include <iostream>
#include <string>
int main(int argc, char** argv) {
    std::ifstream ans(argv[2]), out(argv[3]);
    std::string a, b; long long k = 0;
    while (ans >> a) {
        if (!(out >> b)) { std::cout << 0 << '\n'; std::cerr << "output too short\n"; return 0; }
        if (a != b) { std::cout << 0 << '\n'; std::cerr << "wrong answer at token " << k + 1 << '\n'; return 0; }
        ++k;
    }
    if (out >> b) { std::cout << 0 << '\n'; std::cerr << "extra output\n"; return 0; }
    std::cout << 1 << '\n';
}
