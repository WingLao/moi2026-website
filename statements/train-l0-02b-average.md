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
Siu Ming scored a, b and c in three tests. Compute the average of the three scores, **rounded to 2 decimal places**.
:::

:::zh
小明三科考試的分數是 a, b, c。請計算三科的平均分，**四捨五入到小數點後兩位**。
:::

## Input · 輸入格式

:::en
One line with three integers a, b, c.
:::

:::zh
一行三個整數 a, b, c。
:::

## Output · 輸出格式

:::en
One decimal number with exactly 2 decimal places (e.g. `84.00`).
:::

:::zh
一個小數，保留兩位小數（例如 `84.00`）。
:::

## Sample Input 1 · 範例輸入 1

```text
90 85 77
```

## Sample Output 1 · 範例輸出 1

```text
84.00
```

## Explanation 1 · 說明 1

:::en
(90 + 85 + 77) ÷ 3 = 252 ÷ 3 = 84, so print `84.00`.
:::

:::zh
(90 + 85 + 77) ÷ 3 = 252 ÷ 3 = 84，輸出 `84.00`。
:::

## Sample Input 2 · 範例輸入 2

```text
100 99 99
```

## Sample Output 2 · 範例輸出 2

```text
99.33
```

## Explanation 2 · 說明 2

:::en
(100 + 99 + 99) ÷ 3 = 298 ÷ 3 = 99.333…, which rounds to `99.33`.

(A diagram is on the unit page of the training website.)
:::

:::zh
(100 + 99 + 99) ÷ 3 = 298 ÷ 3 = 99.333…，四捨五入後是 `99.33`。

（圖解見培訓路線網站的單元頁。）
:::

## Subtasks · 數據範圍

| Tests 測試點 | a, b, c |
|---|---|
| 1–10 | 0 ≤ a, b, c ≤ 100 |

## Before You Submit · 提交前檢查

| Check 檢查 | Python | C++ |
|---|---|---|
| Both samples pass 兩個樣例都通過 | ☐ | ☐ |
| Fast enough for the largest data? 最大數據會不會超時？ | ☐ | ☐ |
| Can the answer exceed int? 答案會不會超過 int？ | No need to worry 不用擔心 | ☐ use `long long` 用 `long long` |
| How to read input 讀入寫法 | `input().split()` | `cin >>` |
| Removed debug output (e.g. "Please enter") 刪除了除錯輸出（例如「請輸入」） | ☐ | ☐ |
