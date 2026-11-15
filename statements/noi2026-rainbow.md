<!-- bilingual -->
## About this problem · 關於本題

:::en
NOI2026 Day 2 · **Rainbow Tree**. A problem with a **function interface**, judged with the official NOI 2026 grader. Official statement: [NOI2026 Day 2 PDF](/noi/noi2026-day2.pdf) (Chinese; the data-range tables are there).

- Time limit 1000 ms · memory 1024 MB. **C++ only.**
- Do **not** write `main`, and do not read standard input or write to standard output. Implement the function(s) below; the editor starts with a template.
- Tests: all 25 official tests (CCF, CC BY-NC), equally weighted.
- **Unverified:** our own reference solution has not been checked against these tests yet (the grader and checker were tested with brute-force solutions on small tests).
:::

:::zh
NOI2026 第二試「彩虹樹」，**函式介面**題目，本站用官方 NOI 2026 評測程式（grader）評測。官方題面：[NOI2026 第二試 PDF](/noi/noi2026-day2.pdf)（資料範圍表格請看 PDF）。

- 時限 1000 毫秒 · 記憶體 1024 MB。**只接受 C++。**
- **不要**寫 `main`，也不要讀標準輸入或寫標準輸出。只需實作下面的函式；編輯器已預先放好範本。
- 測資：官方全部 25 個測試點（CCF，CC BY-NC），每點分數相同。
- **未驗證：**本站尚未用自己的標準解核對這些測資（評測程式和評分程式已用小數據暴力解測試過）。
:::

## Description · 題目說明

:::en
The rainbow tree is a rooted tree with $n$ nodes numbered $0 \sim n-1$, root $0$; node $i$ ($1 \le i < n$) has parent $f_i$.

Every node can show any colour (infinitely many colours). The tree's **colourfulness** depends only on how many **different colours** each subtree has: if the subtree of node $i$ contains $c_i$ different colours, the colourfulness is $[c_0, c_1, \ldots, c_{n-1}]$. (Example in the PDF: nodes $0, 1, 5$ blue, $2, 4$ red, $3$ yellow give $[3, 2, 1, 2, 1, 1]$.)

A **rule** is a subset $S \subseteq \{1, 2, \ldots, n-1\}$: every node $u \in S$ has the same colour as some proper ancestor $p \ne u$. Let $w_S$ be the number of **different colourfulness sequences** of colourings that satisfy rule $S$.

Compute $\sum_{S \subseteq \{1, \ldots, n-1\}} w_S$ over all $2^{n-1}$ rules, modulo $998{,}244{,}353$.
:::

:::zh
彩虹樹是一棵有 $n$ 個結點的有根樹，結點編號 $0 \sim n-1$，根為 $0$，結點 $i$ ($1 \le i < n$) 的父親為 $f_i$。

每個結點都能顯現任意顏色（顏色有無窮多種）。彩虹樹的**繽紛度**只由每棵子樹中**不同顏色的數量**決定：設以 $i$ 為根的子樹中有 $c_i$ 種不同顏色，繽紛度為 $[c_0, c_1, \ldots, c_{n-1}]$。（PDF 中的例子：結點 $0, 1, 5$ 藍色，$2, 4$ 紅色，$3$ 黃色，繽紛度為 $[3, 2, 1, 2, 1, 1]$。）

一種**規律**是子集 $S \subseteq \{1, 2, \ldots, n-1\}$：$S$ 中每個結點 $u$ 的顏色都與它的某個祖先 $p$ ($p \ne u$) 相同。設滿足規律 $S$ 的彩虹樹的繽紛度共有 $w_S$ **種**。

求所有 $2^{n-1}$ 種規律的 $\sum_{S \subseteq \{1, \ldots, n-1\}} w_S$，對 $998{,}244{,}353$ 取模。
:::

## What to implement · 要實作的函式

:::en
```cpp
#include "rainbow.h"
int rainbow(int c, int n, std::vector<int> f);
```

$f$ has length $n$ with $f_0 = 0$. Called exactly once; return the answer modulo $998{,}244{,}353$. The sample grader reads `c n` and $f_1, \ldots, f_{n-1}$, and prints the answer.
:::

:::zh
```cpp
#include "rainbow.h"
int rainbow(int c, int n, std::vector<int> f);
```

$f$ 長度為 $n$，$f_0 = 0$。被呼叫恰好一次；回傳答案對 $998{,}244{,}353$ 取模。評測程式輸入：`c n` 與 $f_1, \ldots, f_{n-1}$；輸出答案。
:::

## Example · 範例

:::en
Input `0 3` / `0 0` (a root with two children) gives `8`: rule $\varnothing$ allows $[1,1,1], [2,1,1], [3,1,1]$; rules $\{1\}$ and $\{2\}$ each allow $[1,1,1], [2,1,1]$; rule $\{1, 2\}$ allows only $[1,1,1]$. So $3 + 2 + 2 + 1 = 8$.

Input `0 6` / `0 1 0 3 1` gives `279`.
:::

:::zh
輸入 `0 3` / `0 0`（根有兩個兒子）答案為 `8`：規律 $\varnothing$ 的繽紛度有 $[1,1,1], [2,1,1], [3,1,1]$ 三種；規律 $\{1\}$ 和 $\{2\}$ 各有 $[1,1,1], [2,1,1]$ 兩種；規律 $\{1, 2\}$ 只有 $[1,1,1]$ 一種。所以 $3 + 2 + 2 + 1 = 8$。

輸入 `0 6` / `0 1 0 3 1` 答案為 `279`。
:::

## Constraints · 資料範圍

:::en
$1 \le n \le 200$; $0 \le f_i < i$. Property A: $f_i = i - 1$ (a path). Property B: every node has at most two children. See the PDF for the per-test limits.
:::

:::zh
$1 \le n \le 200$；$0 \le f_i < i$。特殊性質 A：$f_i = i - 1$（一條鏈）。特殊性質 B：每個結點至多兩個兒子。各測試點範圍見 PDF。
:::
