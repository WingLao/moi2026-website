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
Given a positive integer n, find how many digits it has and the sum of its digits.
:::

:::zh
輸入一個正整數 n，求它有多少位數字，以及各位數字之和。
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
One line with two integers: the number of digits and the digit sum, separated by one space.
:::

:::zh
一行兩個整數：位數和數字和，用一個空格分開。
:::

## Sample Input 1 · 範例輸入 1

```text
2026
```

## Sample Output 1 · 範例輸出 1

```text
4 10
```

## Explanation 1 · 說明 1

:::en
2026 has 4 digits, and 2 + 0 + 2 + 6 = 10.

(A diagram is on the unit page of the training website.)
:::

:::zh
2026 有 4 位，2 + 0 + 2 + 6 = 10。

（圖解見培訓路線網站的單元頁。）
:::

## Sample Input 2 · 範例輸入 2

```text
1000000000000000000
```

## Sample Output 2 · 範例輸出 2

```text
19 1
```

## Explanation 2 · 說明 2

:::en
10¹⁸ is a 1 followed by 18 zeros: 19 digits, digit sum 1. Read it as a `long long` in C++.
:::

:::zh
10¹⁸ 是 1 後面有 18 個 0：共 19 位，數字和是 1。C++ 要用 `long long` 讀入。
:::

## Subtasks · 數據範圍

| Tests 測試點 | n |
|---|---|
| 1–4 | 1 ≤ n ≤ 10⁹ |
| 5–10 | 1 ≤ n ≤ 10¹⁸ |

## Before You Submit · 提交前檢查

| Check 檢查 | Python | C++ |
|---|---|---|
| Both samples pass 兩個樣例都通過 | ☐ | ☐ |
| Fast enough for the largest data? 最大數據會不會超時？ | ☐ | ☐ |
| Can the answer exceed int? 答案會不會超過 int？ | No need to worry 不用擔心 | ☐ use `long long` 用 `long long` |
| How to read input 讀入寫法 | `input().split()` | `cin >>` |
| Removed debug output (e.g. "Please enter") 刪除了除錯輸出（例如「請輸入」） | ☐ | ☐ |
