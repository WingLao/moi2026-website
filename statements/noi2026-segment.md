<!-- bilingual -->
## About this problem · 關於本題

:::en
NOI2026 Day 1 · **Segments**. A problem with a **function interface**, judged with the official NOI 2026 grader. Official statement: [NOI2026 Day 1 PDF](/noi/noi2026-day1.pdf) (Chinese; the data-range tables are there).

- Time limit 2500 ms · memory 512 MB. **C++ only.**
- Do **not** write `main`, and do not read standard input or write to standard output. Implement the function(s) below; the editor starts with a template.
- Tests: all 25 official tests (CCF, CC BY-NC), equally weighted.
- **Unverified:** our own reference solution has not been checked against these tests yet (the grader and checker were tested with brute-force solutions on small tests).
:::

:::zh
NOI2026 第一試「線段」，**函式介面**題目，本站用官方 NOI 2026 評測程式（grader）評測。官方題面：[NOI2026 第一試 PDF](/noi/noi2026-day1.pdf)（資料範圍表格請看 PDF）。

- 時限 2500 毫秒 · 記憶體 512 MB。**只接受 C++。**
- **不要**寫 `main`，也不要讀標準輸入或寫標準輸出。只需實作下面的函式；編輯器已預先放好範本。
- 測資：官方全部 25 個測試點（CCF，CC BY-NC），每點分數相同。
- **未驗證：**本站尚未用自己的標準解核對這些測資（評測程式和評分程式已用小數據暴力解測試過）。
:::

## Description · 題目說明

:::en
Little L has $n$ segments inside $[1, m]$; segment $i$ ($0 \le i < n$) is $[l_i, r_i]$ ($1 \le l_i \le r_i \le m$).

A set of segments $S \subseteq \{0, 1, \ldots, n-1\}$ is **beautiful** if the following graph is **exactly a tree**: its vertices are the segments in $S$, and segments $u$ and $v$ are joined by an edge if and only if they intersect (some $x \in [1, m]$ has $l_u \le x \le r_u$ and $l_v \le x \le r_v$).

Given a positive integer $k$ ($k \le n$), for every $s = 1, 2, \ldots, k$ count the beautiful sets of size $s$, modulo $998{,}244{,}353$.
:::

:::zh
小 L 有 $n$ 條包含於 $[1, m]$ 的線段，其中第 $i$ ($0 \le i < n$) 條為 $[l_i, r_i]$ ($1 \le l_i \le r_i \le m$)。

對於線段集合 $S \subseteq \{0, 1, \ldots, n-1\}$，構造一個頂點對應 $S$ 中線段的圖：線段 $u$ 與 $v$ 之間有邊，當且僅當兩條線段相交（存在 $x \in [1, m]$ 使 $l_u \le x \le r_u$ 且 $l_v \le x \le r_v$）。若這個圖**恰好是一棵樹**，就稱 $S$ 是**優美的**。

給定正整數 $k$ ($k \le n$)，對每個 $s = 1, 2, \ldots, k$，求大小為 $s$ 的優美集合數量，對 $998{,}244{,}353$ 取模。
:::

## What to implement · 要實作的函式

:::en
```cpp
#include "segment.h"
void init(int c, int t);
std::vector<int> segment(int n, int m, int k, std::vector<int> l, std::vector<int> r);
```

- `init` is called exactly once at the start; $c$ is the test number ($0$ for samples) and $t$ the number of test cases.
- `segment` is called exactly $t$ times. It must return a vector of length **exactly** $k + 1$ with $a_0 = 0$ and $a_s$ ($1 \le s \le k$) the number of beautiful sets of size $s$ modulo $998{,}244{,}353$.

The sample grader reads `c t`, then for each case `n m k` and $n$ lines `l_i r_i`; it prints $a_1, \ldots, a_k$ on one line per case.
:::

:::zh
```cpp
#include "segment.h"
void init(int c, int t);
std::vector<int> segment(int n, int m, int k, std::vector<int> l, std::vector<int> r);
```

- `init` 在程式開始時被呼叫恰好一次；$c$ 是測試點編號（樣例為 $0$），$t$ 是測試資料組數。
- `segment` 被呼叫恰好 $t$ 次，須回傳長度**恰好**為 $k + 1$ 的序列 $a$，其中 $a_0 = 0$，$a_s$ ($1 \le s \le k$) 是大小為 $s$ 的優美集合數量對 $998{,}244{,}353$ 取模。

評測程式的輸入：第一行 `c t`，接著每組資料第一行 `n m k`，再 $n$ 行 `l_i r_i`；每組資料輸出一行 $a_1, \ldots, a_k$。
:::

## Example · 範例

:::en
Input (`c t`, then three cases):

```
0 3
3 3 3
1 2
2 3
1 3
4 5 4
1 2
2 3
3 4
4 5
4 2 3
1 2
1 2
1 2
1 1
```

Output:

```
3 3 0
4 3 2 1
4 6 0
```

In case 1 all sets of size 1 and 2 are beautiful, but $\{0, 1, 2\}$ forms a triangle (a cycle), so the answers are $3, 3, 0$. In case 2 the beautiful sets are the 4 single segments, $\{0,1\}, \{1,2\}, \{2,3\}$, $\{0,1,2\}, \{1,2,3\}$ and $\{0,1,2,3\}$.
:::

:::zh
輸入（`c t`，接著三組資料）與輸出同上。

第一組資料中，大小為 1 和 2 的集合都是優美的，但 $\{0, 1, 2\}$ 構成三元環，不是樹，所以答案為 $3, 3, 0$。第二組資料中，優美集合為 4 個單元素集合、$\{0,1\}, \{1,2\}, \{2,3\}$、$\{0,1,2\}, \{1,2,3\}$ 和 $\{0,1,2,3\}$，答案為 $4, 3, 2, 1$。
:::

## Constraints · 資料範圍

:::en
Let $K$ be the sum of $k$ over all cases in one test. Always $1 \le t \le 20$, $1 \le n \le 3000$, $1 \le m \le 10^3$, $1 \le k \le n$, $K \le 200$.

- Property A: no segment contains another ($l_i > l_j$ or $r_i < r_j$ for $i \ne j$).
- Property B: any two segments are nested or disjoint.
- Property C: all $2n$ endpoints are distinct.

See the PDF for which tests have which limits and properties.
:::

:::zh
設 $K$ 為單個測試點內所有資料的 $k$ 之和。所有資料滿足 $1 \le t \le 20$，$1 \le n \le 3000$，$1 \le m \le 10^3$，$1 \le k \le n$，$K \le 200$。

- 特殊性質 A：任意兩條線段互不包含（$i \ne j$ 時 $l_i > l_j$ 或 $r_i < r_j$）。
- 特殊性質 B：任意兩條線段要麼包含、要麼不相交。
- 特殊性質 C：全部 $2n$ 個端點互不相同。

各測試點的範圍與特殊性質見 PDF。
:::
