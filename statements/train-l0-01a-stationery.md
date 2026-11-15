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
Siu Ming buys stationery: b pens at a dollars each and d notebooks at c dollars each. How much does he pay in total?
:::

:::zh
小明到文具店買東西：每支筆 a 元，買 b 支；每本筆記簿 c 元，買 d 本。小明一共要付多少元？
:::

## Input · 輸入格式

:::en
One line with four integers a, b, c, d, separated by spaces.
:::

:::zh
一行四個整數 a, b, c, d，用空格分開。
:::

## Output · 輸出格式

:::en
One integer: the total amount to pay.
:::

:::zh
一個整數：要付的總金額。
:::

## Sample Input 1 · 範例輸入 1

```text
3 4 5 2
```

## Sample Output 1 · 範例輸出 1

```text
22
```

## Explanation 1 · 說明 1

:::en
| Item | Calculation | Amount |
|---|---|---|
| Pens | 3 × 4 | 12 |
| Notebooks | 5 × 2 | 10 |
| Total | 12 + 10 | **22** |

(A diagram is on the unit page of the training website.)
:::

:::zh
| 東西 | 計算 | 金額 |
|---|---|---|
| 筆 | 3 × 4 | 12 |
| 筆記簿 | 5 × 2 | 10 |
| 合共 | 12 + 10 | **22** |

（圖解見培訓路線網站的單元頁。）
:::

## Sample Input 2 · 範例輸入 2

```text
1000 1000 1000 1000
```

## Sample Output 2 · 範例輸出 2

```text
2000000
```

## Explanation 2 · 說明 2

:::en
1000 × 1000 + 1000 × 1000 = 2000000.
:::

:::zh
1000 × 1000 + 1000 × 1000 = 2000000。
:::

## Subtasks · 數據範圍

| Tests 測試點 | a, b, c, d |
|---|---|
| 1–10 | 1 ≤ a, b, c, d ≤ 1000 |

## Before You Submit · 提交前檢查

| Check 檢查 | Python | C++ |
|---|---|---|
| Both samples pass 兩個樣例都通過 | ☐ | ☐ |
| Fast enough for the largest data? 最大數據會不會超時？ | ☐ | ☐ |
| Can the answer exceed int? 答案會不會超過 int？ | No need to worry 不用擔心 | ☐ use `long long` 用 `long long` |
| How to read input 讀入寫法 | `input().split()` | `cin >>` |
| Removed debug output (e.g. "Please enter") 刪除了除錯輸出（例如「請輸入」） | ☐ | ☐ |
