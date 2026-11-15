<!-- bilingual -->
## Note · 注意

:::en
Training problem (CSP-J round 2 style). On this website, read from standard input and print to standard output; Python and C++ are both accepted. In the real CSP contest only C++ is allowed and you must use the files `range.in` / `range.out`.
:::

:::zh
培訓題（CSP-J 第二輪題型）。在本網站請從標準輸入讀入、輸出到標準輸出，Python 和 C++ 都接受。正式 CSP 比賽只可用 C++，而且要用檔案 `range.in` / `range.out`。
:::

## Description · 題目說明

:::en
Siu Ming recorded his income and spending for n days: a₁, a₂, …, aₙ (positive is income, negative is spending).

There are q questions. Each gives l and r; answer the **total** from day l to day r.
:::

:::zh
小明記錄了 n 天的收支 a₁, a₂, …, aₙ（正數是收入，負數是支出）。

有 q 次詢問，每次給出 l 和 r，請回答第 l 天到第 r 天的**收支總和**。
:::

## Input · 輸入格式

:::en
| Line | Content |
|---|---|
| 1 | two integers n, q |
| 2 | n integers a₁ … aₙ |
| next q lines | two integers l, r |
:::

:::zh
| 行 | 內容 |
|---|---|
| 第 1 行 | 兩個整數 n, q |
| 第 2 行 | n 個整數 a₁ … aₙ |
| 之後 q 行 | 每行兩個整數 l, r |
:::

## Output · 輸出格式

:::en
q lines; line i is the answer to question i.
:::

:::zh
共 q 行，第 i 行是第 i 次詢問的答案。
:::

## Sample Input 1 · 範例輸入 1

```text
6 4
3 -1 4 1 -5 9
1 3
2 5
4 6
6 6
```

## Sample Output 1 · 範例輸出 1

```text
6
-1
5
9
```

## Explanation 1 · 說明 1

:::en
| Question | Calculation | Answer |
|---|---|---|
| 1 3 | 3 + (−1) + 4 | 6 |
| 2 5 | (−1) + 4 + 1 + (−5) | −1 |
| 4 6 | 1 + (−5) + 9 | 5 |
| 6 6 | 9 | 9 |

(A diagram is on the unit page of the training website.)
:::

:::zh
| 詢問 | 計算 | 答案 |
|---|---|---|
| 1 3 | 3 + (−1) + 4 | 6 |
| 2 5 | (−1) + 4 + 1 + (−5) | −1 |
| 4 6 | 1 + (−5) + 9 | 5 |
| 6 6 | 9 | 9 |

（圖解見培訓路線網站的單元頁。）
:::

## Sample Input 2 · 範例輸入 2

```text
3 2
1000000000 1000000000 1000000000
1 3
2 2
```

## Sample Output 2 · 範例輸出 2

```text
3000000000
1000000000
```

## Explanation 2 · 說明 2

:::en
The answer 3000000000 is larger than the limit of `int`, 2147483647.
:::

:::zh
答案 3000000000 超過 `int` 的上限 2147483647。
:::

## Subtasks · 數據範圍

| Tests 測試點 | n, q | abs(aᵢ) |
|---|---|---|
| 1–3 | ≤ 1000 | ≤ 10⁹ |
| 4–6 | ≤ 10⁵ | ≤ 1000 |
| 7–10 | ≤ 10⁵ | ≤ 10⁹ |

All tests: 1 ≤ l ≤ r ≤ n.

全部測試點：1 ≤ l ≤ r ≤ n。

## Before You Submit · 提交前檢查

| Check 檢查 | Python | C++ |
|---|---|---|
| Both samples pass 兩個樣例都通過 | ☐ | ☐ |
| Fast enough for the largest data? 最大數據會不會超時？ | ☐ | ☐ |
| Can the answer exceed int? 答案會不會超過 int？ | No need to worry 不用擔心 | ☐ use `long long` 用 `long long` |
| Contest: file names correct? 比賽時檔名正確？ | Contest is C++ only 比賽只可用 C++ | ☐ `freopen` |
| Removed debug output 刪除了除錯輸出 | ☐ | ☐ |
