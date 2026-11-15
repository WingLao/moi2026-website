<!-- bilingual -->
## About this problem · 關於本題

:::en
NOI2026 Day 2 · **Kapok**. A problem with a **function interface**, judged with the official NOI 2026 grader. Official statement: [NOI2026 Day 2 PDF](/noi/noi2026-day2.pdf) (Chinese; the data-range tables are there).

- Time limit 2000 ms · memory 1024 MB. **C++ only.**
- Do **not** write `main`, and do not read standard input or write to standard output. Implement the function(s) below; the editor starts with a template.
- Tests: 8 of the 25 official tests (CCF, CC BY-NC; the largest are left out to keep the site small), equally weighted.
- **Unverified:** our own reference solution has not been checked against these tests yet (the grader and checker were tested with brute-force solutions on small tests).
:::

:::zh
NOI2026 第二試「木棉」，**函式介面**題目，本站用官方 NOI 2026 評測程式（grader）評測。官方題面：[NOI2026 第二試 PDF](/noi/noi2026-day2.pdf)（資料範圍表格請看 PDF）。

- 時限 2000 毫秒 · 記憶體 1024 MB。**只接受 C++。**
- **不要**寫 `main`，也不要讀標準輸入或寫標準輸出。只需實作下面的函式；編輯器已預先放好範本。
- 測資：官方 25 個測試點中的 8 個（CCF，CC BY-NC；最大的幾個沒有放上來），每點分數相同。
- **未驗證：**本站尚未用自己的標準解核對這些測資（評測程式和評分程式已用小數據暴力解測試過）。
:::

## Description · 題目說明

:::en
Little N's memory of her old garden is a sequence $a_0, \ldots, a_{n-1}$. Each kapok tree is an unrooted tree with labelled nodes; an interval $[l, r)$ of the memory describes one tree:

- it has $k = r - l + 2$ nodes numbered $0 \sim k - 1$;
- its Prüfer sequence is $[\min(a_l, k-1), \min(a_{l+1}, k-1), \ldots, \min(a_{r-1}, k-1)]$.

There are $m$ queries: in the tree of interval $[l_i, r_i)$, are nodes $x_i$ and $y_i$ adjacent?

**Prüfer sequence:** for a tree with nodes $0 \sim c-1$ ($c \ge 2$), repeat $c - 2$ times: take the leaf $v$ with the smallest number, record its only neighbour $p$, and delete $v$. The recorded $[p_0, \ldots, p_{c-3}]$ is the Prüfer sequence.
:::

:::zh
小 N 對故園的記憶是一個序列 $a_0, \ldots, a_{n-1}$。每棵木棉是一棵結點有標號的無根樹，記憶的區間 $[l, r)$ 描述一棵樹：

- 結點數為 $k = r - l + 2$，編號 $0 \sim k - 1$；
- 其 Prüfer 序列為 $[\min(a_l, k-1), \min(a_{l+1}, k-1), \ldots, \min(a_{r-1}, k-1)]$。

共 $m$ 次詢問：在區間 $[l_i, r_i)$ 對應的樹上，結點 $x_i$、$y_i$ 是否相鄰？

**Prüfer 序列：**對結點編號 $0 \sim c-1$ ($c \ge 2$) 的無根樹，重複 $c - 2$ 次：找出目前編號最小的葉子 $v$，記錄其唯一相鄰點 $p$，然後刪去 $v$。記錄下的 $[p_0, \ldots, p_{c-3}]$ 即為 Prüfer 序列。
:::

## What to implement · 要實作的函式

:::en
```cpp
#include "kapok.h"
std::vector<bool> kapok(int c, int n, int m, std::vector<int> a, std::vector<int> l, std::vector<int> r,
                        std::vector<int> x, std::vector<int> y);
```

Called exactly once; return exactly $m$ answers (`true` if adjacent). The sample grader reads `c n m`, the sequence, then $m$ lines `l r x y`, and prints `1` or `0` per line.
:::

:::zh
```cpp
#include "kapok.h"
std::vector<bool> kapok(int c, int n, int m, std::vector<int> a, std::vector<int> l, std::vector<int> r,
                        std::vector<int> x, std::vector<int> y);
```

被呼叫恰好一次；回傳恰好 $m$ 個答案（相鄰為 `true`）。評測程式輸入：`c n m`、序列、再 $m$ 行 `l r x y`；每行輸出 `1` 或 `0`。
:::

## Example · 範例

:::en
Input:

```
0 8 3
2 0 2 6 0 7 2 2
0 3 0 2
3 5 1 2
0 0 0 1
```

Output:

```
1
0
1
```

$[0, 3)$: 5 nodes, Prüfer $[2, 0, 2]$, edges $(1,2), (0,3), (0,2), (2,4)$, so $0, 2$ are adjacent. $[3, 5)$: 4 nodes, Prüfer $[3, 0]$, edges $(1,3), (0,2), (0,3)$, so $1, 2$ are not adjacent. $[0, 0)$: 2 nodes, empty Prüfer sequence, the only edge is $(0, 1)$.
:::

:::zh
輸入、輸出同上。

區間 $[0, 3)$：5 個結點，Prüfer 序列 $[2, 0, 2]$，邊集 $(1,2), (0,3), (0,2), (2,4)$，結點 $0, 2$ 相鄰。區間 $[3, 5)$：4 個結點，Prüfer 序列 $[3, 0]$，邊集 $(1,3), (0,2), (0,3)$，結點 $1, 2$ 不相鄰。區間 $[0, 0)$：2 個結點，Prüfer 序列為空，唯一的邊是 $(0, 1)$。
:::

## Constraints · 資料範圍

:::en
$1 \le n, m \le 2 \times 10^5$; $0 \le a_i < n + 2$; $0 \le l_i \le r_i \le n$; $0 \le x_i, y_i < r_i - l_i + 2$. Some tests have $a_i < 10$ or $< 10^3$, small $x_i, y_i$, random $x_i, y_i$ (property A), or $r_i = n$; see the PDF.
:::

:::zh
$1 \le n, m \le 2 \times 10^5$；$0 \le a_i < n + 2$；$0 \le l_i \le r_i \le n$；$0 \le x_i, y_i < r_i - l_i + 2$。部分測試點有 $a_i < 10$ 或 $< 10^3$、$x_i, y_i$ 較小、$x_i, y_i$ 隨機（特殊性質 A）或 $r_i = n$ 等限制，詳見 PDF。
:::
