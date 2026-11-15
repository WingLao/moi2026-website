// Checker for NOI2024 richest: verifies the official grader's signed result lines.
// usage: checker <input> <answer> <output>; prints the score fraction to stdout, a message to stderr.
#include <bits/stdc++.h>
#include <fstream>
using namespace std;
static __uint128_t stringHash(const string& s) { __uint128_t h = 1; for (char c : s) h = h * (__uint128_t)313 + (__uint128_t)(unsigned char)c; return h; }
static __uint128_t pw(__uint128_t x, __uint128_t y) { __uint128_t r = 1; while (y) { if (y & 1) r *= x; x *= x; y >>= 1; } return r; }
static const __uint128_t signKey = (__uint128_t)0x286a4ebcf3e2fec5ll << 64 | (__uint128_t)0x1f293959e7ec4ac9ll;
static bool ok(const string& m, const string& sig) { return to_string(uint64_t(pw(stringHash(m) * 2 + 1, signKey))) == sig; }
int main(int argc, char** argv) {
    ifstream in(argv[1]); long long N; in >> N;
    ifstream out(argv[3]); vector<string> L; string s;
    while (getline(out, s)) { if (!s.empty() && s.back() == '\r') s.pop_back(); L.push_back(s); }
    if (L.size() < 4) { puts("0"); fprintf(stderr, "no result from grader\n"); return 0; }
    size_t k = L.size() - 4;
    if (!ok(L[k], L[k + 1]) || !ok(L[k + 2], L[k + 3])) { puts("0"); fprintf(stderr, "invalid grader signature (do not print to stdout)\n"); return 0; }
    double frac = atof(L[k + 2].c_str()) / 10;
    if (N == 1000000) frac = floor(85 * frac + 1e-9) / 85;
    if (frac < 0) frac = 0; if (frac > 1) frac = 1;
    printf("%.6f\n", frac); fprintf(stderr, "%s\n", L[k].c_str());
}
