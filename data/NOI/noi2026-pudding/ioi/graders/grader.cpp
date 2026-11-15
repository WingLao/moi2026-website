#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
#include <cmath>
#include <fstream>
#include <random>

#include "pudding.h"

namespace pudding_08a462cd29a4e23faf497143ad51ae5c3e523fe34d1f177409b81839a174215b {

    const std::string secret_1 = "7818c2fd7773bfd87b27569c887ab18d6145b30a0558ed4c8ec5f33a41612b8c";
    const std::string secret_2 = "25114af18f839cdb49eee1dfa7ead831ba4d57bacd3f3fd00f7c1b6de6794d24";
    const std::string secret_wa = "bac4803203cafdcdc750662b6daa149133934529c2364aa0661fdb8418ce5cce";

    std::ifstream fin("/dev/stdin");
    std::ofstream fout("/dev/stdout");

    int cases[3005];
    int target_tastiness;
    int query_count = 0, total_puddings = 0;
    int gcd(int a, int b) {
        if (b == 0) return a;
        return gcd(b, a % b);
    }
    double f(int x) {
        return pow(0.7, std::max(0, x - 4));
    }
    double g(int x) {
        if (x <= 35) {
            return 1.0;
        }
        if (x <= 75) {
            return 1.35 - 0.01 * x;
        }
        if (x <= 235) {
            return 0.2 + pow((235 - x) / 1000.0, 0.5);
        }
        if (x <= 3000) {
            return 0.2 * pow(2, (235 - x) / 1500.0);
        }
        return 0.0;
    }

    void wa(std::string message) {
        fout << secret_wa << std::endl;
        fout << "Wrong Answer: " << message << std::endl;
        exit(0);
    }

    int query_tastiness(std::vector<int> puddings) {
        query_count++;
        if(query_count > 15) {
            wa("Too much queries");
        }
        if(puddings.empty()) {
            wa("Empty query");
        }
        total_puddings += puddings.size();
        if(total_puddings > 3000) {
            wa("Too much total puddings");
        }
        for(auto it: puddings) {
            if(it <= 0 or it > 4500) {
                wa("Invalid tastiness value: " + std::to_string(it));
            }
        }
        puddings.push_back(target_tastiness);
        std::sort(puddings.begin(), puddings.end());
        int result = 0;
        for (int i = 1; i < puddings.size(); i++) {
            result += gcd(puddings[i - 1], puddings[i]);
        }
        return result;
    }
    int main() {
        int t, W, id;
        fin >> W >> t >> id;
        init(id, t);
        bool correct = true;
        int max_query = 0, max_total_puddings = 0;
        for(int i = 1; i <= t; i++) {
            fin >> cases[i];
        }
        std::mt19937 mrand(20260722 + 20190720);
        for(int i = 1; i <= 15; i++) {
            std::shuffle(cases + 1, cases + t + 1, mrand);
        }
        for(int i = 1; i <= t; i++) {
            query_count = 0;
            total_puddings = 0;
            target_tastiness = cases[i];
            int returned_tastiness = find_tastiness(id, W);
            if (returned_tastiness != target_tastiness) {
                wa("Case #" + std::to_string(i) + ": Expected " + std::to_string(target_tastiness) + ", got " + std::to_string(returned_tastiness));
            }
            max_query = std::max(max_query, query_count);
            max_total_puddings = std::max(max_total_puddings, total_puddings);
        }
        fout << secret_1 << std::endl;
        fout << max_query << " " << max_total_puddings << std::endl;
        fout << secret_2 << std::endl;
        return 0;
    }
}

int main(int argc, char* argv[]) {
    return pudding_08a462cd29a4e23faf497143ad51ae5c3e523fe34d1f177409b81839a174215b::main();
}

int query_tastiness(std::vector<int> tastiness) {
    return pudding_08a462cd29a4e23faf497143ad51ae5c3e523fe34d1f177409b81839a174215b::query_tastiness(tastiness);
}

