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
A map has N rows and M columns; `1` is land and `0` is sea. Land cells connected up, down, left or right belong to the same island (**diagonals do not count**).

Print the number of islands and the size (number of cells) of the largest island.
:::

:::zh
地圖有 N 行 M 列，`1` 是陸地，`0` 是海。上下左右相連的陸地屬於同一個島（**斜角不算相連**）。

請輸出島的數目，以及最大的島有多少格。
:::

## Input · 輸入格式

:::en
| Line | Content |
|---|---|
| 1 | two integers N, M |
| next N lines | a 0/1 string of length M |
:::

:::zh
| 行 | 內容 |
|---|---|
| 第 1 行 | 兩個整數 N, M |
| 之後 N 行 | 每行一個長度 M 的 0 / 1 字串 |
:::

## Output · 輸出格式

:::en
Two integers: the number of islands and the size of the largest one (print `0 0` if there is no island).
:::

:::zh
兩個整數：島的數目、最大島的格數（沒有島就輸出 `0 0`）。
:::

## Sample Input 1 · 範例輸入 1

```text
4 5
11000
11001
00011
10000
```

## Sample Output 1 · 範例輸出 1

```text
3 4
```

## Explanation 1 · 說明 1

:::en
| Island | Cells (row, column) | Size |
|---|---|---|
| 1 | (0,0) (0,1) (1,0) (1,1) | **4** |
| 2 | (1,4) (2,3) (2,4) | 3 |
| 3 | (3,0) | 1 |
:::

:::zh
| 島 | 格子（行, 列） | 格數 |
|---|---|---|
| 1 | (0,0) (0,1) (1,0) (1,1) | **4** |
| 2 | (1,4) (2,3) (2,4) | 3 |
| 3 | (3,0) | 1 |
:::

## Sample Input 2 · 範例輸入 2

```text
2 2
00
00
```

## Sample Output 2 · 範例輸出 2

```text
0 0
```

## Explanation 2 · 說明 2

:::en
Everything is sea: 0 islands, largest size 0.
:::

:::zh
全部是海：0 個島，最大 0 格。
:::

## Subtasks · 數據範圍

| Tests 測試點 | N, M | Special property 特殊性質 |
|---|---|---|
| 1–4 | ≤ 20 | special maps (1 cell, all sea, all land, chessboard) · 特別地圖（1 格、全海、全陸、棋盤） |
| 5–10 | ≤ 20 | random · 隨機 |

## Before You Submit · 提交前檢查

| Check 檢查 | Python | C++ |
|---|---|---|
| Both samples pass 兩個樣例都通過 | ☐ | ☐ |
| Fast enough for the largest data? 最大數據會不會超時？ | ☐ | ☐ |
| Can the answer exceed int? 答案會不會超過 int？ | No need to worry 不用擔心 | ☐ use `long long` 用 `long long` |
| How to read input 讀入寫法 | `input().split()` | `cin >>` |
| Removed debug output (e.g. "Please enter") 刪除了除錯輸出（例如「請輸入」） | ☐ | ☐ |
