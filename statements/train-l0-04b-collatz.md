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
Start with a positive integer n and repeat the following until n becomes 1:

| If n is | it becomes |
|---|---|
| even | n ÷ 2 |
| odd | 3n + 1 |

Print how many operations are done, and the largest number that appears (including the starting n).
:::

:::zh
對一個正整數 n 重複做以下操作，直到 n 變成 1：

| n 是 | 變成 |
|---|---|
| 偶數 | n ÷ 2 |
| 奇數 | 3n + 1 |

請輸出一共做了多少次操作，以及過程中出現過的最大數（包括一開始的 n）。
:::

## Input · 輸入格式

:::en
One positive integer n.
:::

:::zh
一個正整數 n。
:::

## Output · 輸出格式

:::en
One line with two integers: the number of operations and the largest number, separated by one space.
:::

:::zh
一行兩個整數：操作次數和最大數，用一個空格分開。
:::

## Sample Input 1 · 範例輸入 1

```text
6
```

## Sample Output 1 · 範例輸出 1

```text
8 16
```

## Explanation 1 · 說明 1

:::en
6 → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1: 8 operations, largest number 16.

(A diagram is on the unit page of the training website.)
:::

:::zh
6 → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1：共 8 次，最大數 16。

（圖解見培訓路線網站的單元頁。）
:::

## Sample Input 2 · 範例輸入 2

```text
1
```

## Sample Output 2 · 範例輸出 2

```text
0 1
```

## Explanation 2 · 說明 2

:::en
n is already 1, so no operations are needed: 0 operations, largest number 1.
:::

:::zh
n 一開始已經是 1，不用操作：0 次，最大數 1。
:::

## Subtasks · 數據範圍

| Tests 測試點 | n |
|---|---|
| 1–5 | 1 ≤ n ≤ 1000 |
| 6–10 | 1 ≤ n ≤ 10⁶ |

Hint: when n ≤ 10⁶, the numbers along the way can exceed 5 × 10¹⁰.

提示：n ≤ 10⁶ 時，過程中的數最大可超過 5 × 10¹⁰。

## Before You Submit · 提交前檢查

| Check 檢查 | Python | C++ |
|---|---|---|
| Both samples pass 兩個樣例都通過 | ☐ | ☐ |
| Fast enough for the largest data? 最大數據會不會超時？ | ☐ | ☐ |
| Can the answer exceed int? 答案會不會超過 int？ | No need to worry 不用擔心 | ☐ use `long long` 用 `long long` |
| How to read input 讀入寫法 | `input().split()` | `cin >>` |
| Removed debug output (e.g. "Please enter") 刪除了除錯輸出（例如「請輸入」） | ☐ | ☐ |
