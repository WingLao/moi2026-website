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
A timer shows that s seconds have passed. Convert it to hours:minutes:seconds. Each part has **two digits** (add a leading 0 if needed).
:::

:::zh
計時器顯示已經過了 s 秒。請把它換成「時:分:秒」的格式，每一部分都用**兩位數**表示（不足兩位前面補 0）。
:::

## Input · 輸入格式

:::en
One integer s.
:::

:::zh
一個整數 s。
:::

## Output · 輸出格式

:::en
One line in the format `HH:MM:SS`.
:::

:::zh
一行，格式為 `HH:MM:SS`。
:::

## Sample Input 1 · 範例輸入 1

```text
3725
```

## Sample Output 1 · 範例輸出 1

```text
01:02:05
```

## Explanation 1 · 說明 1

:::en
3725 s = 1 hour (3600 s) + 2 minutes (120 s) + 5 s.

(A diagram is on the unit page of the training website.)
:::

:::zh
3725 秒 = 1 小時（3600 秒）+ 2 分鐘（120 秒）+ 5 秒。

（圖解見培訓路線網站的單元頁。）
:::

## Sample Input 2 · 範例輸入 2

```text
59
```

## Sample Output 2 · 範例輸出 2

```text
00:00:59
```

## Explanation 2 · 說明 2

:::en
59 seconds is less than 1 minute, so the hours and minutes are both 00.
:::

:::zh
59 秒不到 1 分鐘，所以時和分都是 00。
:::

## Subtasks · 數據範圍

| Tests 測試點 | s |
|---|---|
| 1–3 | 0 ≤ s < 60 |
| 4–6 | 0 ≤ s < 3600 |
| 7–10 | 0 ≤ s ≤ 359999 |

## Before You Submit · 提交前檢查

| Check 檢查 | Python | C++ |
|---|---|---|
| Both samples pass 兩個樣例都通過 | ☐ | ☐ |
| Fast enough for the largest data? 最大數據會不會超時？ | ☐ | ☐ |
| Can the answer exceed int? 答案會不會超過 int？ | No need to worry 不用擔心 | ☐ use `long long` 用 `long long` |
| How to read input 讀入寫法 | `input().split()` | `cin >>` |
| Removed debug output (e.g. "Please enter") 刪除了除錯輸出（例如「請輸入」） | ☐ | ☐ |
