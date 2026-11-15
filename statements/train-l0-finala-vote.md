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
There are m candidates numbered 1 to m, and each of the n students casts one vote.

Print the winner and their number of votes; if there is a tie, the candidate with the **smaller number** wins. Then print the number of votes of every candidate.
:::

:::zh
班上有 m 位候選人，號碼 1 至 m。全班 n 人每人投一票。

請輸出得票最多的候選人和他的票數；如果同票，選**號碼較小**的。然後輸出每位候選人的票數。
:::

## Input · 輸入格式

:::en
| Line | Content |
|---|---|
| 1 | two integers n, m |
| 2 | n integers: who each vote is for |
:::

:::zh
| 行 | 內容 |
|---|---|
| 第 1 行 | 兩個整數 n, m |
| 第 2 行 | n 個整數：每張票投給誰 |
:::

## Output · 輸出格式

:::en
| Line | Content |
|---|---|
| 1 | the winner's number and their votes |
| 2 | the votes of candidates 1 to m, separated by one space |
:::

:::zh
| 行 | 內容 |
|---|---|
| 第 1 行 | 當選號碼和票數 |
| 第 2 行 | 1 至 m 號的票數，用一個空格分開 |
:::

## Sample Input 1 · 範例輸入 1

```text
7 3
2 1 2 3 2 1 3
```

## Sample Output 1 · 範例輸出 1

```text
2 3
2 3 2
```

## Explanation 1 · 說明 1

:::en
| Candidate | 1 | 2 | 3 |
|---|---|---|---|
| Votes | 2 | **3** | 2 |
:::

:::zh
| 候選人 | 1 | 2 | 3 |
|---|---|---|---|
| 票數 | 2 | **3** | 2 |
:::

## Sample Input 2 · 範例輸入 2

```text
4 2
1 2 2 1
```

## Sample Output 2 · 範例輸出 2

```text
1 2
2 2
```

## Explanation 2 · 說明 2

:::en
Candidates 1 and 2 both have 2 votes, so the smaller number, 1, wins.
:::

:::zh
1 號和 2 號都是 2 票，選號碼較小的 1 號。
:::

## Subtasks · 數據範圍

| Tests 測試點 | n | m |
|---|---|---|
| 1–3 | ≤ 100 | ≤ 3 |
| 4–10 | ≤ 10⁵ | ≤ 1000 |

All tests: every vote is between 1 and m.

全部測試點：每張票都在 1 至 m 之間。

## Before You Submit · 提交前檢查

| Check 檢查 | Python | C++ |
|---|---|---|
| Both samples pass 兩個樣例都通過 | ☐ | ☐ |
| Fast enough for the largest data? 最大數據會不會超時？ | ☐ | ☐ |
| Can the answer exceed int? 答案會不會超過 int？ | No need to worry 不用擔心 | ☐ use `long long` 用 `long long` |
| How to read input 讀入寫法 | `input().split()` | `cin >>` |
| Removed debug output (e.g. "Please enter") 刪除了除錯輸出（例如「請輸入」） | ☐ | ☐ |
