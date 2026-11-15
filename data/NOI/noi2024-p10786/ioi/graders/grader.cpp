#define NOFILE
#include "richest.h"
#include <bits/stdc++.h>
using namespace std;

static __uint128_t stringHash(const string& s) {
    __uint128_t hash = 1;
    for (char c : s)
        hash = hash * (__uint128_t) 313 + (__uint128_t) (unsigned char) c;
    return hash;
}

static __uint128_t inv(__uint128_t x) {
    const __uint128_t mask = ((__uint128_t) 1 << 127) - 1;
    assert(x & 1);
    assert(x <= mask);
    __uint128_t r = x;
    for (int i = 0; i < 6; i++)
        r = r * (2 - r * x);
    return r & mask;
}

static __uint128_t pow(__uint128_t x, __uint128_t y) {
    __uint128_t r = 1;
    while (y) {
        if (y & 1)
            r *= x;
        x *= x;
        y >>= 1;
    }
    return r;
}

static const __uint128_t signKey = (__uint128_t) 0x286a4ebcf3e2fec5ll << 64 | (__uint128_t) 0x1f293959e7ec4ac9ll;

static void output_signed_message(const string& msg){
    cout << msg << endl;
    cout << uint64_t(pow(stringHash(msg) * 2 + 1, signKey)) << endl;
}

static void report_result(double score_portion, const string& msg){
    output_signed_message(msg);
    output_signed_message(to_string((score_portion * 10)));
    exit(0);
}

constexpr int MAX_N = 1000000;

namespace DSU {
    static int fa[MAX_N + 1], sz[MAX_N + 1], dw[MAX_N + 1];
    static void init(int n) {
        iota(fa, fa + n, 0);
        fill(sz, sz + n, 1);
        fill(dw, dw + n, 0);
    }
    // root, weight
    static pair<int, int> find(int x) {
        if (x == fa[x])
            return make_pair(x, dw[x]);
        auto r = find(fa[x]);
        auto f = r.first;
        auto w = r.second;
        fa[x] = f;
        dw[x] += w - dw[f];
        return make_pair(f, dw[x] + dw[f]);
    }
    // x larger than y
    static bool merge(int x, int y) {
        x = find(x).first;
        y = find(y).first;
        if (x == y)
            return false;
        if (sz[x] < sz[y]) {
            dw[x] += sz[y] - dw[y];
            fa[x] = y;
            sz[y] += sz[x];
        } else {
            dw[x] += sz[y];
            dw[y] -= dw[x];
            fa[y] = x;
            sz[x] += sz[y];
        }
        return true;
    }
    static int mergeq(int x, int y) {
        x = find(x).first;
        y = find(y).first;
        if (x == y)
            report_result(0, "Grader internal error 83");
        if (sz[x] < sz[y]) {
            dw[x] += sz[y] - dw[y];
            fa[x] = y;
            sz[y] += sz[x];
            return y;
        } else {
            dw[x] += sz[y];
            dw[y] -= dw[x];
            fa[y] = x;
            sz[x] += sz[y];
            return x;
        }
    }
}

static int N, T, S;
static int t = 0, s = 0;
static vector<tuple<vector<int>, vector<int>, vector<int>>> history;
static mt19937_64 rng;
static bool is_first_ask = false;

vector<int> ask(vector<int> is, vector<int> js) {
    clock_t start = clock();
    ++t;
    if (t > T)
        report_result(0, "Too many queries");
    if (is.size() != js.size())
        report_result(0, "Protocol violation: i and j have different sizes");
    if (is.size() > S)
        report_result(0, "Too many total elements in queries");
    int m = is.size();
    s += m;
    if (s > S)
        report_result(0, "Too many total elements in queries");
    bool is_chain = false;
    if (is_first_ask && m == N - 1) {
        for (int k = 0; k < m; k++) {
            if (is[k] < 0 || is[k] >= N || js[k] < 0 || js[k] >= N)
                report_result(0, "Index out of bounds");
        }
        vector<array<int, 2>> adj(N);
        for (int i = 0; i < N; i++) {
            adj[i][0] = -1;
            adj[i][1] = -1;
        }
        for (int i = 0; i < m; i++) {
            if (adj[is[i]][0] == -1)
                adj[is[i]][0] = js[i];
            else if (adj[is[i]][1] == -1)
                adj[is[i]][1] = js[i];
            else
                goto gg;
            if (adj[js[i]][0] == -1)
                adj[js[i]][0] = is[i];
            else if (adj[js[i]][1] == -1)
                adj[js[i]][1] = is[i];
            else
                goto gg;
        }
        vector<int> order;
        order.reserve(N);
        int c = -1;
        for (int i = 0; i < N; i++)
            if (adj[i][0] != -1 && adj[i][1] == -1) {
                c = i;
                break;
            }
        if (c != -1) {
            order.push_back(c);
            int prev = c;
            c = adj[c][0];
            while (adj[c][1] != -1) {
                order.push_back(c);
                int next = adj[c][0] == prev ? adj[c][1] : adj[c][0];
                prev = c;
                c = next;
            }
            order.push_back(c);
            if (order.size() == N) {
                vector<int> ws(N);
                vector<int> gv[4];
                for (int k = 0; k <= m; k++) {
                    int w = ((k == 0 || k == m) ? 0 : 1);
                    ws[k] = w;
                    gv[w].push_back(k);
                }
                vector<int> nvs;
                nvs.reserve(N);
                for (int w = 0; w < 4; w++) {
                    shuffle(gv[w].begin(), gv[w].end(), rng);
                    for (int k = 0; k < (int) gv[w].size(); k++) {
                        int v = gv[w][k];
                        if (ws[v] != w)
                            continue;
                        ws[v] = -1;
                        nvs.push_back(v);
                        if ((int) nvs.size() == m + 1)
                            goto out;
                        for (int u : {v - 1, v + 1}) {
                            if (u < 0 || u > m || ws[u] == -1)
                                continue;
                            int& wu = ws[u];
                            int nw = wu + 1;
                            wu = nw;
                            gv[nw].push_back(u);
                        }
                    }
                }
                out:;
                auto gao = [&](const auto& gao, int l, int r) {
                    if (l == r)
                        return order[nvs[l]];
                    int mid = (l + r) / 2;
                    return DSU::mergeq(gao(gao, l, mid), gao(gao, mid + 1, r));
                };
                gao(gao, 0, m);
                is_chain = true;
            }
        }
    }
    gg:;
    if (!is_chain) {
        vector<bool> vi(N);
        for (int i = 0; i < m; i++) {
            if (!vi[is[i]] && !vi[js[i]]) {
                if (rng() % 2)
                    DSU::merge(is[i], js[i]);
                else
                    DSU::merge(js[i], is[i]);
            }
            vi[is[i]] = true;
            vi[js[i]] = true;
        }

        vector<vector<int>> adj(N);
        for (int k = 0; k < m; k++) {
            if (is[k] < 0 || is[k] >= N || js[k] < 0 || js[k] >= N)
                report_result(0, "Index out of bounds");
            int ri = DSU::find(is[k]).first;
            int rj = DSU::find(js[k]).first;
            if (ri != rj) {
                adj[ri].push_back(rj);
                adj[rj].push_back(ri);
            }
        }
        // cerr << "Query " << t << " needs " << (clock() - start) * 1.0 / CLOCKS_PER_SEC << " seconds after DSU" << endl;
        for (int v = 0; v < N; v++) {
            sort(adj[v].begin(), adj[v].end());
            adj[v].erase(unique(adj[v].begin(), adj[v].end()), adj[v].end());
        }
        // cerr << "Query " << t << " needs " << (clock() - start) * 1.0 / CLOCKS_PER_SEC << " seconds after sorting" << endl;
        vector<bool> visited(N);
        vector<int64_t> ws(N, -1);
        for (int v = 0; v < N; v++) {
            if (visited[v])
                continue;
            if (adj[v].empty())
                continue;
            vector<int> vs;
            auto dfs = [&](const auto& dfs, int v) {
                if (visited[v])
                    return;
                vs.push_back(v);
                visited[v] = true;
                for (int u : adj[v])
                    dfs(dfs, u);
            };
            dfs(dfs, v);
            // weight, v
            priority_queue<pair<int64_t, int>, vector<pair<int64_t, int>>, greater<>> heap;
            for (int v : vs) {
                int64_t w = rng() % N + adj[v].size() * N;
                ws[v] = w;
                heap.push(make_pair(w, v));
            }
            vector<int> nvs;
            nvs.reserve(vs.size());
            int64_t N2 = (int64_t) N * N;
            while (nvs.size() < vs.size()) {
                auto p = heap.top();
                auto w = p.first;
                auto v = p.second;
                heap.pop();
                if (ws[v] != w)
                    continue;
                ws[v] = -1;
                nvs.push_back(v);
                for (int u : adj[v]) {
                    if (ws[u] == -1)
                        continue;
                    int64_t& wu = ws[u];
                    int64_t nw = wu + N2;
                    heap.push(make_pair(nw, u));
                    wu = nw;
                }
            }
            for (int i = 1; i < (int) nvs.size(); i++)
                if (!DSU::merge(nvs[0], nvs[i]))
                    report_result(0, "Grader internal error 4");
        }
    }
    // cerr << "Query " << t << " needs " << (clock() - start) * 1.0 / CLOCKS_PER_SEC << " seconds after processing" << endl;
    vector<int> res(m);
    for (int k = 0; k < m; k++) {
        auto zi = DSU::find(is[k]);
        auto ri = zi.first;
        auto wi = zi.second;
        auto zj = DSU::find(js[k]);
        auto rj = zj.first;
        auto wj = zj.second;
        if (ri != rj)
            report_result(0, "Grader internal error 3");
        res[k] = wi > wj ? is[k] : js[k];
    }
    history.emplace_back(move(is), move(js), res);
    // cerr << "Query " << t << " done in " << (clock() - start) * 1.0 / CLOCKS_PER_SEC << " seconds" << endl;
    is_first_ask = false;
    return res;
}

constexpr int Sub2_score = 85;

int main(int argc, char** argv) {
#ifndef NOFILE
    freopen("richest.in","r",stdin);
    freopen("richest.out","w",stdout);
#endif

    uint64_t seed;
    cin >> N >> T >> S >> seed;

    rng.seed(seed);

    int maxt = 0, maxs = 0;
    for (int _ = 0; _ < 10; _++) {
        t = 0; s = 0;
        int r = -1;
        history.clear();
        DSU::init(N);

        is_first_ask = true;
        r = richest(N, T, S);

        for (int i = 0; i < N; i++)
            DSU::merge(0, i);

        vector<int> W(N);
        vector<int> cnt(N);
        for (int i = 0; i < N; i++) {
            W[i] = DSU::find(i).second;
            if (W[i] < 0 || W[i] >= N)
                report_result(0, "Grader internal error 1: " + to_string(W[i]));
            if (cnt[W[i]])
                report_result(0, "Grader internal error 2");
            cnt[W[i]]++;
        }

        if (r != max_element(W.begin(), W.end()) - W.begin())
            report_result(0, "Wrong answer");

        vector<vector<int>> adj(N);
        for (auto& h : history) {
            auto& is = get<0>(h);
            auto& js = get<1>(h);
            auto& res = get<2>(h);
            for (int k = 0; k < is.size(); k++) {
                int i = is[k], j = js[k], r = res[k];
                int expected = W[i] > W[j] ? i : j;
                if (r != expected)
                    report_result(0, "Grader internal error 5");
                if (W[i] > W[j])
                    adj[i].push_back(j);
                else
                    adj[j].push_back(i);
            }
        }
        vector<bool> vis(N);
        auto dfs = [&](const auto& dfs, int u) {
            if (vis[u])
                return;
            vis[u] = true;
            for (int v : adj[u])
                dfs(dfs, v);
        };
        dfs(dfs, r);
        if (count(vis.begin(), vis.end(), true) != N)
            report_result(0, "Wrong answer");
        maxt = max(maxt, t);
        maxs = max(maxs, s);
    };

    if (N == 1000000 && T == 20 && S == 2000000) {
        double ft = 1;
        if (maxt > 8)
            ft -= sqrt(maxt - 8) / 4;
        double gs = 1;
        if (maxs > 1099944) {
        	if (maxs < 1100044)
        		gs -= log10(maxs - 1099943) / 6;
        	else
        		gs -= 1.0 / 3 + pow(maxs - 1100043, 1.0 / 2) / 1500;
		}
        string verdict = ft * gs >= 1 ? "Correct" : "Partially correct";
        report_result(ft * gs, verdict + " Case 2, " + to_string(int(ft * gs * Sub2_score)) + " / " + std::to_string(Sub2_score) + ", maxt = " + to_string(maxt) + ", maxs = " + to_string(maxs));
    }
    report_result(1, "Correct");
}
