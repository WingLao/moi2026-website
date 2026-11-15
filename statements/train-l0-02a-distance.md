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
n students run in a long-distance race at sports day. Each runs k laps, and each lap is L metres. How many metres do they run altogether?
:::

:::zh
運動會有 n 名同學參加長跑。每人跑 k 圈，每圈 L 米。所有同學一共跑了多少米？
:::

## Input · 輸入格式

:::en
One line with three integers n, k, L.
:::

:::zh
一行三個整數 n, k, L。
:::

## Output · 輸出格式

:::en
One integer: the total distance in metres.
:::

:::zh
一個整數：總距離（米）。
:::

## Sample Input 1 · 範例輸入 1

```text
30 4 400
```

## Sample Output 1 · 範例輸出 1

```text
48000
```

## Explanation 1 · 說明 1

:::en
30 × 4 × 400 = 48000.
:::

:::zh
30 × 4 × 400 = 48000。
:::

## Sample Input 2 · 範例輸入 2

```text
1000000 1000000 1000000
```

## Sample Output 2 · 範例輸出 2

```text
1000000000000000000
```

## Explanation 2 · 說明 2

:::en
The answer is 10¹⁸, far larger than the limit of `int` (about 2.1 × 10⁹).

(A diagram is on the unit page of the training website.)
:::

:::zh
答案是 10¹⁸，比 `int` 的上限（約 2.1 × 10⁹）大得多。

（圖解見培訓路線網站的單元頁。）
:::

## Subtasks · 數據範圍

| Tests 測試點 | n, k, L | Largest answer 答案最大約 |
|---|---|---|
| 1–4 | ≤ 1000 | 10⁹ |
| 5–10 | ≤ 10⁶ | 10¹⁸ |

All tests: n, k, L ≥ 1.

全部測試點：n, k, L ≥ 1。

## Before You Submit · 提交前檢查

| Check 檢查 | Python | C++ |
|---|---|---|
| Both samples pass 兩個樣例都通過 | ☐ | ☐ |
| Fast enough for the largest data? 最大數據會不會超時？ | ☐ | ☐ |
| Can the answer exceed int? 答案會不會超過 int？ | No need to worry 不用擔心 | ☐ use `long long` 用 `long long` |
| How to read input 讀入寫法 | `input().split()` | `cin >>` |
| Removed debug output (e.g. "Please enter") 刪除了除錯輸出（例如「請輸入」） | ☐ | ☐ |
