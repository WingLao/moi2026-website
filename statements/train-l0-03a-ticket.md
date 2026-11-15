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
A bus fare depends on the passenger's **age** and the **boarding time**:

| Age | Normal | Peak hours |
|---|---|---|
| 0–5 | \$0 | \$0 |
| 6–18 | \$4 | \$5 |
| 19–64 | \$6 | \$8 |
| 65 or above | \$3 | \$3 |

Peak hours are 7, 8, 9 and 17, 18, 19 (h is the hour of boarding). Given a passenger's age and boarding hour, print the fare.
:::

:::zh
巴士車票按**年齡**和**上車時間**收費：

| 年齡 | 平時 | 繁忙時段 |
|---|---|---|
| 0–5 歲 | 0 元 | 0 元 |
| 6–18 歲 | 4 元 | 5 元 |
| 19–64 歲 | 6 元 | 8 元 |
| 65 歲或以上 | 3 元 | 3 元 |

繁忙時段是 7、8、9 時和 17、18、19 時（h 是上車時的「時」）。輸入一位乘客的年齡和上車時間，輸出車費。
:::

## Input · 輸入格式

:::en
One line with two integers: the age and the boarding hour h.
:::

:::zh
一行兩個整數：年齡 age 和上車時間 h。
:::

## Output · 輸出格式

:::en
One integer: the fare in dollars.
:::

:::zh
一個整數：車費（元）。
:::

## Sample Input 1 · 範例輸入 1

```text
12 8
```

## Sample Output 1 · 範例輸出 1

```text
5
```

## Explanation 1 · 說明 1

:::en
Age 12, hour 8 (peak hours) → \$5.

(A diagram is on the unit page of the training website.)
:::

:::zh
12 歲、8 時（繁忙時段）→ 5 元。

（圖解見培訓路線網站的單元頁。）
:::

## Sample Input 2 · 範例輸入 2

```text
70 18
```

## Sample Output 2 · 範例輸出 2

```text
3
```

## Explanation 2 · 說明 2

:::en
Age 70 ≥ 65 → always \$3, whatever the time.
:::

:::zh
70 歲 ≥ 65 → 不論時段都是 3 元。
:::

## Subtasks · 數據範圍

| Tests 測試點 | Special property 特殊性質 |
|---|---|
| 1–3 | h is not a peak hour · h 不在繁忙時段 |
| 4–10 | — |

All tests: 0 ≤ age ≤ 120, 0 ≤ h ≤ 23.

全部測試點：0 ≤ age ≤ 120，0 ≤ h ≤ 23。

## Before You Submit · 提交前檢查

| Check 檢查 | Python | C++ |
|---|---|---|
| Both samples pass 兩個樣例都通過 | ☐ | ☐ |
| Fast enough for the largest data? 最大數據會不會超時？ | ☐ | ☐ |
| Can the answer exceed int? 答案會不會超過 int？ | No need to worry 不用擔心 | ☐ use `long long` 用 `long long` |
| How to read input 讀入寫法 | `input().split()` | `cin >>` |
| Removed debug output (e.g. "Please enter") 刪除了除錯輸出（例如「請輸入」） | ☐ | ☐ |
