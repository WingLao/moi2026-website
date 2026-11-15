<!-- bilingual -->
## About this problem · 關於本題

:::en
NOI2026 Day 1 · **Pudding**. An **interactive** problem, judged with the official NOI 2026 grader. Official statement: [NOI2026 Day 1 PDF](/noi/noi2026-day1.pdf) (Chinese; the data-range tables are there).

- Time limit 10000 ms · memory 1024 MB. **C++ only.**
- Do **not** write `main`, and do not read standard input or write to standard output. Implement the function(s) below; the editor starts with a template.
- Tests: all 3 official tests (10 + 20 + 70 points, partial points by the official formula).
- **Unverified:** our own reference solution has not been checked against these tests yet (the grader and checker were tested with brute-force solutions on small tests).
:::

:::zh
NOI2026 第一試「布丁」，**互動題**，本站用官方 NOI 2026 評測程式（grader）評測。官方題面：[NOI2026 第一試 PDF](/noi/noi2026-day1.pdf)（資料範圍表格請看 PDF）。

- 時限 10000 毫秒 · 記憶體 1024 MB。**只接受 C++。**
- **不要**寫 `main`，也不要讀標準輸入或寫標準輸出。只需實作下面的函式；編輯器已預先放好範本。
- 測資：官方全部 3 個測試點（10 + 20 + 70 分，按官方公式給部分分）。
- **未驗證：**本站尚未用自己的標準解核對這些測資（評測程式和評分程式已用小數據暴力解測試過）。
:::

## Description · 題目說明

:::en
The tastiness of every pudding is a positive integer at most $4500$. Little L made a pudding of tastiness $w$ ($w \le m$). Little S must find $w$.

Little S may buy some puddings with tastiness $a_0, \ldots, a_{k-1}$ and give them to Little L. She mixes in her own pudding, sorts all of them by tastiness into $[b_0, \ldots, b_k]$, and tells Little S the value $\sum_{i=1}^{k} \gcd(b_{i-1}, b_i)$. Then she eats the bought puddings.

Help Little S find $w$ using as few purchases and as few puddings as possible.
:::

:::zh
所有布丁的美味度都是不超過 $4500$ 的正整數。小 L 做了一塊美味度為 $w$ 的布丁（$w \le m$），小 S 要求出 $w$。

小 S 可以購買若干塊美味度為 $a_0, \ldots, a_{k-1}$ 的布丁交給小 L。小 L 把自己的布丁混進去，按美味度升序排成 $[b_0, \ldots, b_k]$，然後告訴小 S $\sum_{i=1}^{k} \gcd(b_{i-1}, b_i)$ 的值，最後把小 S 買來的布丁吃掉。

請幫小 S 制定購買策略，以盡量少的購買次數和布丁總數求出 $w$。
:::

## What to implement · 要實作的函式

:::en
```cpp
#include "pudding.h"
void init(int c, int t);
int find_tastiness(int c, int m);
int query_tastiness(std::vector<int> a);   // provided by the grader
```

- `init` is called once at the start ($c$ test number, $t$ number of cases).
- `find_tastiness(c, m)` is called exactly $t$ times and must return $w$.
- `query_tastiness(a)` makes one purchase: $a$ must be non-empty with every element in $[1, 4500]$; it returns the value described above.
- In each call of `find_tastiness` you may call `query_tastiness` at most $15$ times, with total length of all $a$ at most $3000$.
- The grader is **not adaptive**: $w$ is fixed before each call.
:::

:::zh
```cpp
#include "pudding.h"
void init(int c, int t);
int find_tastiness(int c, int m);
int query_tastiness(std::vector<int> a);   // 由交互庫提供
```

- `init` 在開始時被呼叫一次（$c$ 測試點編號，$t$ 資料組數）。
- `find_tastiness(c, m)` 被呼叫恰好 $t$ 次，須回傳 $w$。
- `query_tastiness(a)` 進行一次購買：$a$ 必須非空，每個元素都是 $[1, 4500]$ 內的整數；回傳上述的值。
- 每次 `find_tastiness` 中，`query_tastiness` 最多呼叫 $15$ 次，所有 $a$ 的長度總和不超過 $3000$。
- 交互庫**不是適應性的**：每次呼叫前 $w$ 已經確定。
:::

## Example · 範例

:::en
If $w = 26$: `query_tastiness([2026, 7, 20])` sorts to $[7, 20, 26, 2026]$ and returns $1 + 2 + 2 = 5$; `query_tastiness([13, 52])` gives $[13, 26, 52]$ and returns $13 + 26 = 39$; then return $26$. That used $2$ queries and $3 + 2 = 5$ puddings.
:::

:::zh
若 $w = 26$：呼叫 `query_tastiness([2026, 7, 20])`，排序後為 $[7, 20, 26, 2026]$，回傳 $1 + 2 + 2 = 5$；呼叫 `query_tastiness([13, 52])`，得 $[13, 26, 52]$，回傳 $13 + 26 = 39$；然後回傳 $26$。共用了 $2$ 次詢問、$3 + 2 = 5$ 塊布丁。
:::

## Tests and scoring · 測試點與計分

:::en
| Test | Points | $t$ | $m$ | Property |
| :-: | :-: | :-: | :-: | :-: |
| 1 | 10 | 35 | 35 | none |
| 2 | 20 | 430 | 3000 | $w$ is prime |
| 3 | 70 | 3000 | 3000 | none |

A wrong answer or an invalid query gives $0$ for the test. Otherwise, with $Q$ the maximum number of queries and $S$ the maximum total length over all cases, the score is $\lfloor f(Q) \cdot g(S) \cdot \text{points} \rfloor$:

- $f(Q) = 1$ if $Q \le 4$, else $0.7^{Q-4}$;
- $g(S) = 1$ if $S \le 35$; $1 - (S - 35)/100$ if $S \le 75$; $0.2 + \sqrt{(235 - S)/1000}$ if $S \le 235$; $0.2 \times 2^{-(S-235)/1500}$ if $S \le 3000$.
:::

:::zh
表格同上（測試點 2 的特殊性質：$w$ 為質數）。

答案錯誤或詢問不合法，該測試點得 $0$ 分。否則，設 $Q$ 為所有資料中詢問次數的最大值，$S$ 為所有資料中 $a$ 長度總和的最大值，得分為 $\lfloor f(Q) \cdot g(S) \cdot \text{分值} \rfloor$：

- $Q \le 4$ 時 $f(Q) = 1$，否則 $f(Q) = 0.7^{Q-4}$；
- $S \le 35$ 時 $g(S) = 1$；$S \le 75$ 時 $1 - (S - 35)/100$；$S \le 235$ 時 $0.2 + \sqrt{(235 - S)/1000}$；$S \le 3000$ 時 $0.2 \times 2^{-(S-235)/1500}$。
:::
