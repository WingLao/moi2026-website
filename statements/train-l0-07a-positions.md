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
You are given n integers (positions start from 0) and a number target. Print how many times target appears, and **every** position where it appears.
:::

:::zh
給出 n 個整數（位置由 0 開始）和一個數 target。請輸出 target 出現了多少次，以及它出現的**每一個**位置。
:::

## Input · 輸入格式

:::en
| Line | Content |
|---|---|
| 1 | the integer n |
| 2 | n integers |
| 3 | the integer target |
:::

:::zh
| 行 | 內容 |
|---|---|
| 第 1 行 | 整數 n |
| 第 2 行 | n 個整數 |
| 第 3 行 | 整數 target |
:::

## Output · 輸出格式

:::en
| Line | Content |
|---|---|
| 1 | the number of times target appears |
| 2 | the positions in increasing order, separated by one space; print `-1` if target does not appear |
:::

:::zh
| 行 | 內容 |
|---|---|
| 第 1 行 | 出現次數 |
| 第 2 行 | 由小到大的位置，用一個空格分開；如果沒有出現，輸出 `-1` |
:::

## Sample Input 1 · 範例輸入 1

```text
10
35 52 68 12 47 52 36 52 74 27
52
```

## Sample Output 1 · 範例輸出 1

```text
3
1 5 7
```

## Explanation 1 · 說明 1

:::en
52 appears 3 times, at positions 1, 5 and 7. You need **all** of them, so do not `break` early.

(A diagram is on the unit page of the training website.)
:::

:::zh
52 出現 3 次，在位置 1、5、7。要找**全部**，所以不可以 `break`。

（圖解見培訓路線網站的單元頁。）
:::

## Sample Input 2 · 範例輸入 2

```text
5
1 2 3 4 5
9
```

## Sample Output 2 · 範例輸出 2

```text
0
-1
```

## Explanation 2 · 說明 2

:::en
9 does not appear: line 1 prints 0 and line 2 prints -1.
:::

:::zh
9 沒有出現：第 1 行輸出 0，第 2 行輸出 -1。
:::

## Subtasks · 數據範圍

| Tests 測試點 | n | Special property 特殊性質 |
|---|---|---|
| 1–2 | ≤ 100 | target appears once · target 只出現一次 |
| 3–4 | ≤ 100 | — |
| 5–10 | ≤ 1000 | — |

All tests: every number and target are between 0 and 5000.

全部測試點：每個數和 target 都在 0 到 5000 之間。

## Before You Submit · 提交前檢查

| Check 檢查 | Python | C++ |
|---|---|---|
| Both samples pass 兩個樣例都通過 | ☐ | ☐ |
| Fast enough for the largest data? 最大數據會不會超時？ | ☐ | ☐ |
| Can the answer exceed int? 答案會不會超過 int？ | No need to worry 不用擔心 | ☐ use `long long` 用 `long long` |
| How to read input 讀入寫法 | `input().split()` | `cin >>` |
| Removed debug output (e.g. "Please enter") 刪除了除錯輸出（例如「請輸入」） | ☐ | ☐ |
