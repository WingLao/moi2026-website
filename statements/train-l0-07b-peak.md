<!-- bilingual -->
## Note · 注意

:::en
A practice problem from the training-path website (not a past MOI problem). Language: Python or C++. Read from standard input (keyboard) and print to standard output (screen).
:::

:::zh
培訓路線網站的正式練習題（不是 MOI 真題）。語言：Python 或 C++。從標準輸入（鍵盤）讀入，輸出到標準輸出（螢幕）。
:::

## Description · 題目說明

:::en
A list of numbers first goes up, reaches a highest point, then goes down — like a mountain. Print the position of the highest point (the peak). Positions start from 0.
:::

:::zh
一組數先上升，到達最高點後下降，像一座山。請輸出最高點（山頂）的位置（位置由 0 開始）。
:::

## Input · 輸入格式

:::en
| Line | Content |
|---|---|
| 1 | the integer n |
| 2 | n different integers that always form a mountain |
:::

:::zh
| 行 | 內容 |
|---|---|
| 第 1 行 | 整數 n |
| 第 2 行 | n 個不同的整數，形狀一定是一座山 |
:::

## Output · 輸出格式

:::en
One integer: the position of the peak.
:::

:::zh
一個整數：山頂的位置。
:::

## Sample Input 1 · 範例輸入 1

```text
6
12 35 52 68 47 27
```

## Sample Output 1 · 範例輸出 1

```text
3
```

## Explanation 1 · 說明 1

:::en
| Position | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| Number | 12 | 35 | 52 | **68** | 47 | 27 |
| Bigger than left? | — | ✓ | ✓ | ✓ | ✗ | ✗ |
| Bigger than right? | ✗ | ✗ | ✗ | ✓ | ✓ | — |

Only position 3 is bigger than both neighbours.
:::

:::zh
| 位置 | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| 數 | 12 | 35 | 52 | **68** | 47 | 27 |
| 比左邊大？ | — | ✓ | ✓ | ✓ | ✗ | ✗ |
| 比右邊大？ | ✗ | ✗ | ✗ | ✓ | ✓ | — |

只有位置 3 比左右兩邊都大。
:::

## Sample Input 2 · 範例輸入 2

```text
3
0 1 0
```

## Sample Output 2 · 範例輸出 2

```text
1
```

## Explanation 2 · 說明 2

:::en
The smallest mountain: 0 → 1 → 0, with the peak at position 1.
:::

:::zh
最短的山：0 → 1 → 0，山頂在位置 1。
:::

## Subtasks · 數據範圍

| Tests 測試點 | n |
|---|---|
| 1–5 | 3 ≤ n ≤ 100 |
| 6–10 | 3 ≤ n ≤ 1000 |

All tests: every number is between 0 and 10⁶; the peak is never at the first or last position.

全部測試點：每個數在 0 到 10⁶ 之間；山頂不會在第 0 格或最後一格。

## Before You Submit · 提交前檢查

| Check 檢查 | Python | C++ |
|---|---|---|
| Both samples pass 兩個樣例都通過 | ☐ | ☐ |
| Fast enough for the largest data? 最大數據會不會超時？ | ☐ | ☐ |
| Can the answer exceed int? 答案會不會超過 int？ | No need to worry 不用擔心 | ☐ use `long long` 用 `long long` |
| How to read input 讀入寫法 | `input().split()` | `cin >>` |
| Removed debug output (e.g. "Please enter") 刪除了除錯輸出（例如「請輸入」） | ☐ | ☐ |
