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
The school system requires a password to follow these 4 rules:

| Rule | Requirement |
|---|---|
| 1 | at least 8 characters long |
| 2 | at least one uppercase letter (A–Z) |
| 3 | at least one lowercase letter (a–z) |
| 4 | at least one digit (0–9) |

Read a password. If it follows every rule, print `OK`; otherwise print the numbers of the rules it **breaks**, from small to large.
:::

:::zh
學校系統要求密碼符合以下 4 條規則：

| 規則 | 內容 |
|---|---|
| 1 | 長度最少 8 個字元 |
| 2 | 最少一個大寫字母（A–Z） |
| 3 | 最少一個小寫字母（a–z） |
| 4 | 最少一個數字（0–9） |

輸入一個密碼。全部符合輸出 `OK`；否則由小到大輸出**不符合**的規則編號。
:::

## Input · 輸入格式

:::en
One line: a string s (no spaces).
:::

:::zh
一行字串 s（沒有空格）。
:::

## Output · 輸出格式

:::en
`OK`, or the numbers of the broken rules separated by one space.
:::

:::zh
`OK`，或不符合的規則編號，用一個空格分開。
:::

## Sample Input 1 · 範例輸入 1

```text
Macau2026
```

## Sample Output 1 · 範例輸出 1

```text
OK
```

## Explanation 1 · 說明 1

:::en
| Rule | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| Macau2026 | 9 characters ✓ | M ✓ | acau ✓ | 2026 ✓ |
:::

:::zh
| 規則 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| Macau2026 | 9 個字元 ✓ | M ✓ | acau ✓ | 2026 ✓ |
:::

## Sample Input 2 · 範例輸入 2

```text
abc
```

## Sample Output 2 · 範例輸出 2

```text
1 2 4
```

## Explanation 2 · 說明 2

:::en
| Rule | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| abc | 3 characters ✗ | ✗ | ✓ | ✗ |
:::

:::zh
| 規則 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| abc | 3 個字元 ✗ | ✗ | ✓ | ✗ |
:::

## Subtasks · 數據範圍

| Tests 測試點 | Length 長度 |
|---|---|
| 1–10 | 1 to 100 · 1 至 100 |

All tests: only English letters, digits and the symbols `!@#$%^&*_-+=?`.

全部測試點：只有英文字母、數字和符號 `!@#$%^&*_-+=?`。

## Before You Submit · 提交前檢查

| Check 檢查 | Python | C++ |
|---|---|---|
| Both samples pass 兩個樣例都通過 | ☐ | ☐ |
| Fast enough for the largest data? 最大數據會不會超時？ | ☐ | ☐ |
| Can the answer exceed int? 答案會不會超過 int？ | No need to worry 不用擔心 | ☐ use `long long` 用 `long long` |
| How to read input 讀入寫法 | `input().split()` | `cin >>` |
| Removed debug output (e.g. "Please enter") 刪除了除錯輸出（例如「請輸入」） | ☐ | ☐ |
