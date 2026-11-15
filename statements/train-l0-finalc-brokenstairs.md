<!-- bilingual -->
## Note · 注意

:::en
Final mock exam of the L0 training course (MOI Group P level). Language: Python or C++. Read from standard input (keyboard) and print to standard output (screen).
:::

:::zh
L0 培訓課程結業模擬賽題目（MOI P 組難度）。語言：Python 或 C++。從標準輸入（鍵盤）讀入，輸出到標準輸出（螢幕）。
:::

## Description · 題目說明

:::en
A staircase has N steps; you walk from step 0 (the ground) to step N. Each move climbs 1 or 2 steps, but K of the steps are broken and you **must not step on them**.

How many different ways are there?
:::

:::zh
一段樓梯共 N 級，由第 0 級（地面）走到第 N 級。每次可以走 1 級或 2 級，但有 K 級樓梯壞了，**不可以踏上**。

一共有多少種走法？
:::

## Input · 輸入格式

:::en
| Line | Content |
|---|---|
| 1 | two integers N, K |
| 2 | K integers: the broken steps (this line is empty when K = 0) |
:::

:::zh
| 行 | 內容 |
|---|---|
| 第 1 行 | 兩個整數 N, K |
| 第 2 行 | K 個整數：壞了的樓梯（K = 0 時這一行是空的） |
:::

## Output · 輸出格式

:::en
One integer: the number of ways (print 0 if step N cannot be reached).
:::

:::zh
一個整數：走法數目（走不到就輸出 0）。
:::

## Sample Input 1 · 範例輸入 1

```text
5 1
3
```

## Sample Output 1 · 範例輸出 1

```text
2
```

## Explanation 1 · 說明 1

:::en
Step 3 is broken:

| Way | Path |
|---|---|
| 1 | 0 → 1 → 2 → 4 → 5 |
| 2 | 0 → 2 → 4 → 5 |
:::

:::zh
第 3 級壞了：

| 走法 | 經過 |
|---|---|
| 1 | 0 → 1 → 2 → 4 → 5 |
| 2 | 0 → 2 → 4 → 5 |
:::

## Sample Input 2 · 範例輸入 2

```text
4 2
1 2
```

## Sample Output 2 · 範例輸出 2

```text
0
```

## Explanation 2 · 說明 2

:::en
Steps 1 and 2 are both broken. From the ground you can reach at most step 2, so you can never get up: 0 ways.
:::

:::zh
第 1、2 級都壞了，由地面一步最多到第 2 級，走不上去：0 種。
:::

## Subtasks · 數據範圍

| Tests 測試點 | N | K |
|---|---|---|
| 1–4 | ≤ 30 | K = 0 |
| 5–10 | ≤ 30 | ≤ 6 |

All tests: broken steps are between 1 and N − 1 and all different; step N is never broken.

全部測試點：壞的樓梯在 1 至 N − 1 之間，互不相同；第 N 級不會壞。

## Before You Submit · 提交前檢查

| Check 檢查 | Python | C++ |
|---|---|---|
| Both samples pass 兩個樣例都通過 | ☐ | ☐ |
| Fast enough for the largest data? 最大數據會不會超時？ | ☐ | ☐ |
| Can the answer exceed int? 答案會不會超過 int？ | No need to worry 不用擔心 | ☐ use `long long` 用 `long long` |
| How to read input 讀入寫法 | `input().split()` | `cin >>` |
| Removed debug output (e.g. "Please enter") 刪除了除錯輸出（例如「請輸入」） | ☐ | ☐ |
