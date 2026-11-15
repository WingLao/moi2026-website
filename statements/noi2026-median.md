<!-- bilingual -->
## About this problem · 關於本題

:::en
NOI2026 Day 2 · **Median**. A problem with a **function interface**, judged with the official NOI 2026 grader. Official statement: [NOI2026 Day 2 PDF](/noi/noi2026-day2.pdf) (Chinese; the data-range tables are there).

- Time limit 1000 ms · memory 1024 MB. **C++ only.**
- Do **not** write `main`, and do not read standard input or write to standard output. Implement the function(s) below; the editor starts with a template.
- Tests: 16 of the 20 official tests (CCF, CC BY-NC; the largest are left out to keep the site small), equally weighted.
- **Unverified:** our own reference solution has not been checked against these tests yet (the grader and checker were tested with brute-force solutions on small tests).
:::

:::zh
NOI2026 第二試「中位數」，**函式介面**題目，本站用官方 NOI 2026 評測程式（grader）評測。官方題面：[NOI2026 第二試 PDF](/noi/noi2026-day2.pdf)（資料範圍表格請看 PDF）。

- 時限 1000 毫秒 · 記憶體 1024 MB。**只接受 C++。**
- **不要**寫 `main`，也不要讀標準輸入或寫標準輸出。只需實作下面的函式；編輯器已預先放好範本。
- 測資：官方 20 個測試點中的 16 個（CCF，CC BY-NC；最大的幾個沒有放上來），每點分數相同。
- **未驗證：**本站尚未用自己的標準解核對這些測資（評測程式和評分程式已用小數據暴力解測試過）。
:::

## Description · 題目說明

:::en
For a multiset $S$ of size $m$, sort it **from large to small** as $y_0 \ge y_1 \ge \cdots \ge y_{m-1}$. Its **median** is the $\lceil m/2 \rceil$-th largest: $\text{Median}(S) = y_{\lceil m/2 \rceil - 1}$. **This may differ from the usual definition.**

Given a sequence $a_0, \ldots, a_{n-1}$ and $k \le n$, a **partition** chooses $0 < b_1 < \cdots < b_{k-1} < n$, splitting the sequence into $k$ segments $[0, b_1), [b_1, b_2), \ldots, [b_{k-1}, n)$. Its **balance** is the median of the $k$ segment medians.

Find the maximum balance over all partitions.
:::

:::zh
對大小為 $m$ 的可重集 $S$，將元素**從大到小**排序為 $y_0 \ge y_1 \ge \cdots \ge y_{m-1}$，定義其**中位數**為第 $\lceil m/2 \rceil$ 大的數：$\text{Median}(S) = y_{\lceil m/2 \rceil - 1}$。**注意：本題的中位數定義可能與常規定義不同。**

給定序列 $a_0, \ldots, a_{n-1}$ 與 $k \le n$。一個**劃分**選擇 $0 < b_1 < \cdots < b_{k-1} < n$，把序列分成 $k$ 段 $[0, b_1), [b_1, b_2), \ldots, [b_{k-1}, n)$。劃分的**平衡度**是這 $k$ 段各自中位數所成可重集的中位數。

求所有劃分中平衡度的最大值。
:::

## What to implement · 要實作的函式

:::en
```cpp
#include "median.h"
void init(int c, int t);
int median(int n, int k, std::vector<int> a);
```

`init` is called once at the start; `median` is called exactly $t$ times and returns the maximum balance. The sample grader reads `c t`, then for each case `n k` and the sequence; it prints one answer per line.
:::

:::zh
```cpp
#include "median.h"
void init(int c, int t);
int median(int n, int k, std::vector<int> a);
```

`init` 在開始時被呼叫一次；`median` 被呼叫恰好 $t$ 次，回傳平衡度的最大值。評測程式輸入：第一行 `c t`，每組資料一行 `n k`、一行序列；每組輸出一行答案。
:::

## Example · 範例

:::en
Input:

```
0 2
10 4
6 5 1 9 2 3 10 7 4 8
10 5
5 7 3 10 8 2 9 1 6 4
```

Output:

```
9
8
```

Case 1: $b = (3, 5, 7)$ gives $[6,5,1], [9,2], [3,10], [7,4,8]$ with medians $5, 9, 10, 7$, balance $\text{Median}(\{5,9,10,7\}) = 9$. Case 2: $b = (2,4,6,8)$ gives medians $7, 10, 8, 9, 6$, balance $8$.
:::

:::zh
輸入、輸出同上。

第一組：$b = (3, 5, 7)$ 把序列分成 $[6,5,1], [9,2], [3,10], [7,4,8]$，中位數為 $5, 9, 10, 7$，平衡度 $\text{Median}(\{5,9,10,7\}) = 9$。第二組：$b = (2,4,6,8)$ 得中位數 $7, 10, 8, 9, 6$，平衡度 $8$。
:::

## Constraints · 資料範圍

:::en
Let $N$ be the sum of $n$ in one test. $1 \le t \le 20$, $5 \le n \le 10^6$, $2 \le k \le n$, $N \le 10^6$, $1 \le a_i \le n$. Property A: $a_i \le 2$. See the PDF for the per-test limits (some tests fix $k = 2, 3, 5$, $k \le 10$, or $k$ even).
:::

:::zh
設 $N$ 為單個測試點內所有 $n$ 之和。$1 \le t \le 20$，$5 \le n \le 10^6$，$2 \le k \le n$，$N \le 10^6$，$1 \le a_i \le n$。特殊性質 A：$a_i \le 2$。各測試點範圍見 PDF（部分測試點 $k = 2, 3, 5$、$k \le 10$ 或 $k$ 為偶數）。
:::
