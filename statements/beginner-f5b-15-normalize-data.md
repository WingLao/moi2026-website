<!-- bilingual -->
## Description · 題目說明

:::en
Read some integers. Normalize each number with `(x - min) / (max - min)`, round it to 2 decimal places, and print the list.
:::

:::zh
讀入一些整數。用 `(x - min) / (max - min)` 把每個數標準化，四捨五入到 2 位小數，然後輸出列表。
:::

## Input · 輸入格式

:::en
One line of integers separated by spaces.
:::

:::zh
一行整數，以空格分隔。
:::

## Output · 輸出格式

:::en
One line: the list of normalized values in Python format (e.g. `0.0`, `0.25`).
:::

:::zh
一行：Python 格式的標準化數值列表（例如 `0.0`、`0.25`）。
:::

## Sample Input · 範例輸入

```text
10 20 30 40 50
```

## Sample Output · 範例輸出

```text
[0.0, 0.25, 0.5, 0.75, 1.0]
```

## Hints · 提示

:::en
- Compute the minimum and maximum once, before the loop.
:::

:::zh
- 在迴圈之前先算好最小值和最大值。
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
