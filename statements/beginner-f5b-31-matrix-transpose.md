<!-- bilingual -->
## Description · 題目說明

:::en
Read a matrix. Print the original matrix, then its transpose (rows become columns).
:::

:::zh
讀入一個矩陣，先輸出原本的矩陣，再輸出它的轉置矩陣（行變成列）。
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
`Original:` followed by each row as a Python list, then `Transpose:` followed by each row of the transpose.
:::

:::zh
`Original:` 之後每行輸出一行（Python 列表格式），然後 `Transpose:` 之後輸出轉置矩陣的每一行。
:::

## Sample Input · 範例輸入

```text
2 3
1 2 3
4 5 6
```

## Sample Output · 範例輸出

```text
Original:
[1, 2, 3]
[4, 5, 6]
Transpose:
[1, 4]
[2, 5]
[3, 6]
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
