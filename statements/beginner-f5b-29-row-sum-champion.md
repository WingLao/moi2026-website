<!-- bilingual -->
## Description · 題目說明

:::en
Read a matrix. Compute the sum of each row and find the row with the largest sum.
:::

:::zh
讀入一個矩陣，計算每一行的總和，並找出總和最大的一行。
:::

## Input · 輸入格式

:::en
Line 1: the number of rows and columns. Then one line per row, numbers separated by spaces.
:::

:::zh
第 1 行：行數和列數。接着每行輸入矩陣的一行，數字以空格分隔。
:::

## Output · 輸出格式

:::en
`Row i sum:` for every row (rows numbered from 0), then `Best row:` and `Largest sum:`.
:::

:::zh
先為每一行輸出 `Row i sum:`（行號由 0 開始），再輸出 `Best row:` 和 `Largest sum:`。
:::

## Sample Input · 範例輸入

```text
3 3
10 20 30
25 15 10
18 18 18
```

## Sample Output · 範例輸出

```text
Row 0 sum: 60
Row 1 sum: 50
Row 2 sum: 54
Best row: 0
Largest sum: 60
```

## Hints · 提示

:::en
- The first input line gives the row count and the column count.
:::

:::zh
- 第一行輸入是行數和列數。
:::

## Constraints · 限制

:::en
- Language: Python 3 or C++17.
- Your output must match the sample output exactly, including labels such as `Sum:` and every space.
:::

:::zh
- 語言：Python 3 或 C++17。
- 輸出必須和範例輸出完全一樣，包括 `Sum:` 之類的標籤和每一個空格。
:::
