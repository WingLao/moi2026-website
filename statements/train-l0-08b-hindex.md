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
A student has written n articles; article i has been cited cᵢ times.

The **H-index** is the largest h such that there are h articles each cited **at least h times**. Print the H-index.
:::

:::zh
一位同學寫了 n 篇文章，第 i 篇被引用了 cᵢ 次。

**H 指數**是最大的 h：可以找到 h 篇文章，每篇都被引用**最少 h 次**。請輸出 H 指數。
:::

## Input · 輸入格式

:::en
| Line | Content |
|---|---|
| 1 | the integer n |
| 2 | n integers c₁ … cₙ |
:::

:::zh
| 行 | 內容 |
|---|---|
| 第 1 行 | 整數 n |
| 第 2 行 | n 個整數 c₁ … cₙ |
:::

## Output · 輸出格式

:::en
One integer: the H-index.
:::

:::zh
一個整數：H 指數。
:::

## Sample Input 1 · 範例輸入 1

```text
5
3 0 6 1 5
```

## Sample Output 1 · 範例輸出 1

```text
3
```

## Explanation 1 · 說明 1

:::en
Sort from large to small, then check each article:

| Article (after sorting) | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Citations | 6 | 5 | 3 | 1 | 0 |
| Citations ≥ article number? | ✓ | ✓ | ✓ | ✗ | ✗ |

The last ✓ is at article 3, so the H-index is 3.
:::

:::zh
先由大到小排好，再逐篇檢查：

| 第幾篇（排好後） | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| 引用次數 | 6 | 5 | 3 | 1 | 0 |
| 次數 ≥ 第幾篇？ | ✓ | ✓ | ✓ | ✗ | ✗ |

最後一個 ✓ 在第 3 篇，所以 H 指數 = 3。
:::

## Sample Input 2 · 範例輸入 2

```text
3
1 3 1
```

## Sample Output 2 · 範例輸出 2

```text
1
```

## Explanation 2 · 說明 2

:::en
After sorting: 3, 1, 1. Article 1: 3 ≥ 1 ✓; article 2: 1 ≥ 2 ✗. The H-index is 1.
:::

:::zh
排好後是 3、1、1：第 1 篇 3 ≥ 1 ✓；第 2 篇 1 ≥ 2 ✗。H 指數 = 1。
:::

## Subtasks · 數據範圍

| Tests 測試點 | n |
|---|---|
| 1–3 | 1 ≤ n ≤ 10 |
| 4–10 | 1 ≤ n ≤ 1000 |

All tests: 0 ≤ cᵢ ≤ 1000.

全部測試點：0 ≤ cᵢ ≤ 1000。

## Before You Submit · 提交前檢查

| Check 檢查 | Python | C++ |
|---|---|---|
| Both samples pass 兩個樣例都通過 | ☐ | ☐ |
| Fast enough for the largest data? 最大數據會不會超時？ | ☐ | ☐ |
| Can the answer exceed int? 答案會不會超過 int？ | No need to worry 不用擔心 | ☐ use `long long` 用 `long long` |
| How to read input 讀入寫法 | `input().split()` | `cin >>` |
| Removed debug output (e.g. "Please enter") 刪除了除錯輸出（例如「請輸入」） | ☐ | ☐ |
