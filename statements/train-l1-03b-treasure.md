<!-- bilingual -->
## Note · 注意

:::en
Training problem (CSP-J round 2 style). On this website, read from standard input and print to standard output; Python and C++ are both accepted. In the real CSP contest only C++ is allowed and you must use the files `treasure.in` / `treasure.out`.
:::

:::zh
培訓題（CSP-J 第二輪題型）。在本網站請從標準輸入讀入、輸出到標準輸出，Python 和 C++ 都接受。正式 CSP 比賽只可用 C++，而且要用檔案 `treasure.in` / `treasure.out`。
:::

## Description · 題目說明

:::en
A map has n rows and m columns; the cell in row i, column j has aᵢⱼ gold coins buried in it.

The explorers make q plans. Each plan digs up the rectangle with top-left corner (x₁, y₁) and bottom-right corner (x₂, y₂). Find the **total number of coins** for each plan.
:::

:::zh
一張 n 行 m 列的地圖，第 i 行第 j 列的格子埋有 aᵢⱼ 枚金幣。

探險隊提出 q 個計劃，每個計劃挖開以 (x₁, y₁) 為左上角、(x₂, y₂) 為右下角的矩形。請算出每個計劃能得到的**金幣總數**。
:::

## Input · 輸入格式

:::en
| Line | Content |
|---|---|
| 1 | three integers n, m, q |
| next n lines | m integers each: the map |
| next q lines | four integers x₁, y₁, x₂, y₂ |
:::

:::zh
| 行 | 內容 |
|---|---|
| 第 1 行 | 三個整數 n, m, q |
| 之後 n 行 | 每行 m 個整數，表示地圖 |
| 之後 q 行 | 每行四個整數 x₁, y₁, x₂, y₂ |
:::

## Output · 輸出格式

:::en
q lines; line i is the total number of coins for plan i.
:::

:::zh
共 q 行，第 i 行是第 i 個計劃的金幣總數。
:::

## Sample Input 1 · 範例輸入 1

```text
3 4 2
1 2 0 3
4 0 5 1
2 6 1 0
2 2 3 3
1 1 3 4
```

## Sample Output 1 · 範例輸出 1

```text
12
25
```

## Explanation 1 · 說明 1

:::en
| Plan | Cells | Answer |
|---|---|---|
| 2 2 3 3 | 0 + 5 + 6 + 1 | 12 |
| 1 1 3 4 | the whole map | 25 |

(A diagram is on the unit page of the training website.)
:::

:::zh
| 計劃 | 範圍 | 答案 |
|---|---|---|
| 2 2 3 3 | 0 + 5 + 6 + 1 | 12 |
| 1 1 3 4 | 整張地圖 | 25 |

（圖解見培訓路線網站的單元頁。）
:::

## Sample Input 2 · 範例輸入 2

```text
1 5 2
7 0 3 0 7
1 1 1 5
1 2 1 4
```

## Sample Output 2 · 範例輸出 2

```text
17
3
```

## Explanation 2 · 說明 2

:::en
| Plan | Cells | Answer |
|---|---|---|
| 1 1 1 5 | 7 + 0 + 3 + 0 + 7 | 17 |
| 1 2 1 4 | 0 + 3 + 0 | 3 |
:::

:::zh
| 計劃 | 範圍 | 答案 |
|---|---|---|
| 1 1 1 5 | 7 + 0 + 3 + 0 + 7 | 17 |
| 1 2 1 4 | 0 + 3 + 0 | 3 |
:::

## Subtasks · 數據範圍

| Tests 測試點 | n, m | q | Special property 特殊性質 |
|---|---|---|---|
| 1–3 | ≤ 50 | ≤ 50 | — |
| 4–5 | n = 1, m ≤ 500 | ≤ 2×10⁵ | one row only · 只有一行 |
| 6–10 | ≤ 500 | ≤ 2×10⁵ | — |

All tests: 0 ≤ aᵢⱼ ≤ 10⁵; 1 ≤ x₁ ≤ x₂ ≤ n, 1 ≤ y₁ ≤ y₂ ≤ m.

全部測試點：0 ≤ aᵢⱼ ≤ 10⁵；1 ≤ x₁ ≤ x₂ ≤ n，1 ≤ y₁ ≤ y₂ ≤ m。

## Before You Submit · 提交前檢查

| Check 檢查 | Python | C++ |
|---|---|---|
| Both samples pass 兩個樣例都通過 | ☐ | ☐ |
| Fast enough for the largest data? 最大數據會不會超時？ | ☐ | ☐ |
| Can the answer exceed int? 答案會不會超過 int？ | No need to worry 不用擔心 | ☐ use `long long` 用 `long long` |
| Contest: file names correct? 比賽時檔名正確？ | Contest is C++ only 比賽只可用 C++ | ☐ `freopen` |
| Removed debug output 刪除了除錯輸出 | ☐ | ☐ |
