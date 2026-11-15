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
You are given the lengths a, b, c of three line segments. Decide what kind of triangle they form and print its code:

| Code | Case |
|---|---|
| 0 | Not a triangle (two sides add up to ≤ the third) |
| 1 | Equilateral |
| 2 | Isosceles (exactly two sides equal) |
| 3 | Right-angled |
| 4 | Any other triangle |

The three sides are not necessarily in increasing order.
:::

:::zh
給出三條線段的長度 a, b, c。判斷它們能組成哪一種三角形，按下表輸出代號：

| 代號 | 情況 |
|---|---|
| 0 | 不能組成三角形（某兩邊之和 ≤ 第三邊） |
| 1 | 等邊三角形 |
| 2 | 等腰三角形（恰好兩邊相等） |
| 3 | 直角三角形 |
| 4 | 其他三角形 |

三條邊的次序不一定由小到大。
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
One integer: the code.
:::

:::zh
一個整數：代號。
:::

## Sample Input 1 · 範例輸入 1

```text
3 4 5
```

## Sample Output 1 · 範例輸出 1

```text
3
```

## Explanation 1 · 說明 1

:::en
3 + 4 > 5, so it is a triangle; all sides are different; 3² + 4² = 9 + 16 = 25 = 5², so it is right-angled.

(A diagram is on the unit page of the training website.)
:::

:::zh
3 + 4 > 5，可以組成三角形；三邊都不相等；3² + 4² = 9 + 16 = 25 = 5²，是直角三角形。

（圖解見培訓路線網站的單元頁。）
:::

## Sample Input 2 · 範例輸入 2

```text
2 2 5
```

## Sample Output 2 · 範例輸出 2

```text
0
```

## Explanation 2 · 說明 2

:::en
2 + 2 = 4 ≤ 5, so it is not a triangle. Check "is it a triangle?" first, then the type.
:::

:::zh
2 + 2 = 4 ≤ 5，不能組成三角形。先判斷「能不能組成」，才判斷種類。
:::

## Subtasks · 數據範圍

| Tests 測試點 | a, b, c |
|---|---|
| 1–4 | 1 ≤ a, b, c ≤ 1000 |
| 5–10 | 1 ≤ a, b, c ≤ 2 × 10⁹ |

## Before You Submit · 提交前檢查

| Check 檢查 | Python | C++ |
|---|---|---|
| Both samples pass 兩個樣例都通過 | ☐ | ☐ |
| Fast enough for the largest data? 最大數據會不會超時？ | ☐ | ☐ |
| Can the answer exceed int? 答案會不會超過 int？ | No need to worry 不用擔心 | ☐ use `long long` 用 `long long` |
| How to read input 讀入寫法 | `input().split()` | `cin >>` |
| Removed debug output (e.g. "Please enter") 刪除了除錯輸出（例如「請輸入」） | ☐ | ☐ |
