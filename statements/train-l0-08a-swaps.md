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
Read n integers and sort them from small to large with **bubble sort**: compare neighbours, and swap only when the left one is **bigger** (equal numbers are not swapped).

Print the sorted numbers, then the total number of swaps.
:::

:::zh
輸入 n 個整數，用**冒泡排序**由小到大排序：每次比較相鄰兩格，左邊比右邊**大**才交換（相等不交換）。

先輸出排好的數，再輸出一共交換了幾次。
:::

## Input · 輸入格式

:::en
| Line | Content |
|---|---|
| 1 | the integer n |
| 2 | n integers |
:::

:::zh
| 行 | 內容 |
|---|---|
| 第 1 行 | 整數 n |
| 第 2 行 | n 個整數 |
:::

## Output · 輸出格式

:::en
| Line | Content |
|---|---|
| 1 | the sorted numbers, separated by one space |
| 2 | the number of swaps |
:::

:::zh
| 行 | 內容 |
|---|---|
| 第 1 行 | 排好的數，用一個空格分開 |
| 第 2 行 | 交換次數 |
:::

## Sample Input 1 · 範例輸入 1

```text
5
5 1 4 2 8
```

## Sample Output 1 · 範例輸出 1

```text
1 2 4 5 8
4
```

## Explanation 1 · 說明 1

:::en
Round 1 makes 3 swaps and round 2 makes 1 more: 3 + 1 = 4 swaps.
:::

:::zh
第 1 輪交換 3 次，第 2 輪再交換 1 次：共 3 + 1 = 4 次。
:::

## Sample Input 2 · 範例輸入 2

```text
10
35 52 68 12 47 52 36 52 74 27
```

## Sample Output 2 · 範例輸出 2

```text
12 27 35 36 47 52 52 52 68 74
19
```

## Explanation 2 · 說明 2

:::en
Round 1 makes 6 swaps; keep counting in every round — 19 swaps in total.

(A diagram is on the unit page of the training website.)
:::

:::zh
第 1 輪交換了 6 次；之後每一輪照樣數，總共 19 次。

（圖解見培訓路線網站的單元頁。）
:::

## Subtasks · 數據範圍

| Tests 測試點 | n | Special property 特殊性質 |
|---|---|---|
| 1–3 | ≤ 10 | — |
| 4 | ≤ 1000 | already sorted · 已經由小到大 |
| 5 | ≤ 1000 | sorted from large to small · 由大到小 |
| 6–10 | ≤ 1000 | — |

All tests: every number is between 0 and 1000.

全部測試點：每個數在 0 到 1000 之間。

## Before You Submit · 提交前檢查

| Check 檢查 | Python | C++ |
|---|---|---|
| Both samples pass 兩個樣例都通過 | ☐ | ☐ |
| Fast enough for the largest data? 最大數據會不會超時？ | ☐ | ☐ |
| Can the answer exceed int? 答案會不會超過 int？ | No need to worry 不用擔心 | ☐ use `long long` 用 `long long` |
| How to read input 讀入寫法 | `input().split()` | `cin >>` |
| Removed debug output (e.g. "Please enter") 刪除了除錯輸出（例如「請輸入」） | ☐ | ☐ |
