<!-- bilingual -->
## About this problem · 關於本題

:::en
NOI2026 Day 1 · **Teleport**. A problem with a **function interface**, judged with the official NOI 2026 grader. Official statement: [NOI2026 Day 1 PDF](/noi/noi2026-day1.pdf) (Chinese; the data-range tables are there).

- Time limit 3500 ms · memory 1024 MB. **C++ only.**
- Do **not** write `main`, and do not read standard input or write to standard output. Implement the function(s) below; the editor starts with a template.
- Tests: 8 of the 20 official tests (CCF, CC BY-NC; the largest are left out to keep the site small), equally weighted.
- **Unverified:** our own reference solution has not been checked against these tests yet (the grader and checker were tested with brute-force solutions on small tests).
:::

:::zh
NOI2026 第一試「傳送」，**函式介面**題目，本站用官方 NOI 2026 評測程式（grader）評測。官方題面：[NOI2026 第一試 PDF](/noi/noi2026-day1.pdf)（資料範圍表格請看 PDF）。

- 時限 3500 毫秒 · 記憶體 1024 MB。**只接受 C++。**
- **不要**寫 `main`，也不要讀標準輸入或寫標準輸出。只需實作下面的函式；編輯器已預先放好範本。
- 測資：官方 20 個測試點中的 8 個（CCF，CC BY-NC；最大的幾個沒有放上來），每點分數相同。
- **未驗證：**本站尚未用自己的標準解核對這些測資（評測程式和評分程式已用小數據暴力解測試過）。
:::

## Description · 題目說明

:::en
Country C has $n$ cities numbered $0 \sim n-1$, connected by $n - 1$ roads forming a tree; road $i$ joins $u_i$ and $v_i$ and takes $1$ unit of time.

Every city has a teleporter. Using it also takes $1$ unit of time and sends you to one of the $n$ cities **uniformly at random** — possibly the city you are in.

There are $m$ tests; test $i$ goes from city $x_i$ to city $y_i$. A **plan** fixes, for every city other than the destination, either one neighbouring city to walk to or "use the teleporter"; whenever you are in that city you act the same way. Formally it is a sequence $[a_0, \ldots, a_{n-1}]$ with $a_{y_i} = -1$, and for $j \ne y_i$ either $a_j$ is a neighbour of $j$ or $a_j = n$ (teleport). A plan is **reasonable** if its expected time is finite.

For each test, find the minimum expected time over all reasonable plans.
:::

:::zh
C 國有 $n$ 座城市，編號 $0 \sim n-1$，由 $n - 1$ 條道路連成樹；第 $i$ 條道路連接 $u_i$ 與 $v_i$，走一條道路耗時 $1$。

每座城市都有一扇傳送門。使用傳送門同樣耗時 $1$，但會把人**等機率**地傳送到 $n$ 座城市之一，**也可能傳送到目前所在的城市**。

共有 $m$ 次測試，第 $i$ 次從城市 $x_i$ 出發前往城市 $y_i$。一種**通行方式**是對每座非終點城市事先選定「走到某個相鄰城市」或「使用傳送門」，每次到達該城市都照此行動。形式化地，它是序列 $[a_0, \ldots, a_{n-1}]$，其中 $a_{y_i} = -1$，對 $j \ne y_i$，$a_j$ 與 $j$ 相鄰或 $a_j = n$（使用傳送門）。期望耗時為有限值的通行方式稱為**合理的**。

對每次測試，求所有合理通行方式中期望耗時的最小值。
:::

## What to implement · 要實作的函式

:::en
```cpp
#include "teleport.h"
std::vector<std::pair<long long, int>> teleport(int c, int n, int m, std::vector<int> u, std::vector<int> v,
                                                std::vector<int> x, std::vector<int> y);
```

- $c$ is the test number ($0$ for samples). The function is called exactly once.
- Return exactly $m$ pairs $(a_i, b_i)$: the minimum expected time of test $i$ as the **reduced fraction** $a_i / b_i$ ($b_i = 1$ for an integer).

The sample grader reads `c n m`, $n - 1$ lines `u_i v_i`, then $m$ lines `x_i y_i`; it prints `a_i b_i` per line.
:::

:::zh
```cpp
#include "teleport.h"
std::vector<std::pair<long long, int>> teleport(int c, int n, int m, std::vector<int> u, std::vector<int> v,
                                                std::vector<int> x, std::vector<int> y);
```

- $c$ 是測試點編號（樣例為 $0$）。此函式被呼叫恰好一次。
- 回傳恰好 $m$ 個二元組 $(a_i, b_i)$：第 $i$ 次測試期望耗時最小值的**最簡分數** $a_i / b_i$（整數時 $b_i = 1$）。

評測程式的輸入：第一行 `c n m`，接著 $n - 1$ 行 `u_i v_i`，再 $m$ 行 `x_i y_i`；每行輸出 `a_i b_i`。
:::

## Example · 範例

:::en
Input:

```
0 4 4
0 1
1 2
2 3
0 3
0 1
0 2
1 2
```

Output:

```
7 3
1 1
2 1
1 1
```

For test 0 (from 0 to 3 on the path $0-1-2-3$): walking $[1, 2, 3, -1]$ takes $3$; $[4, 2, 3, -1]$ (teleport from city 0 until you leave it) takes $7/3$ on average; $[4, 4, 3, -1]$ takes $3$; $[1, 0, 4, -1]$ never ends, so it is not reasonable. The minimum is $7/3$.
:::

:::zh
輸入、輸出同上。

第 0 次測試（在路徑 $0-1-2-3$ 上從 0 到 3）：通行方式 $[1, 2, 3, -1]$ 耗時固定為 $3$；$[4, 2, 3, -1]$ 會在城市 0 不斷使用傳送門直到離開，期望耗時 $7/3$；$[4, 4, 3, -1]$ 期望耗時 $3$；$[1, 0, 4, -1]$ 會永遠在城市 0 與 1 間移動，不是合理的。可以證明最小值為 $7/3$。
:::

## Constraints · 資料範圍

:::en
$2 \le n \le 5 \times 10^5$, $1 \le m \le 10^6$; the roads form a tree; $x_i \ne y_i$.

- Property A: road $i$ joins $i$ and $i + 1$ (a path).
- Property B: $y_i = 0$ for all tests.

See the PDF for the per-test limits.
:::

:::zh
$2 \le n \le 5 \times 10^5$，$1 \le m \le 10^6$；所有道路構成一棵樹；$x_i \ne y_i$。

- 特殊性質 A：第 $i$ 條道路連接 $i$ 與 $i + 1$（一條鏈）。
- 特殊性質 B：所有測試的 $y_i = 0$。

各測試點範圍見 PDF。
:::
