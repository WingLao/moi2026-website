<!-- bilingual -->
## Description · 題目說明

:::en
Read 8 integers. Compute the average. Square every number that is greater than the average and store the squares in a new list.
:::

:::zh
讀入 8 個整數並計算平均值。把每個大於平均值的數取平方，存入一個新列表。
:::

## Input · 輸入格式

:::en
One line with 8 integers separated by spaces.
:::

:::zh
一行，8 個整數，以空格分隔。
:::

## Output · 輸出格式

:::en
Three lines: `Original:` and the original list, `Average:` with 2 decimal places, `New list:` and the new list.
:::

:::zh
三行：`Original:` 和原本的列表、`Average:` 和平均值（2 位小數）、`New list:` 和新列表。
:::

## Sample Input · 範例輸入

```text
2 4 6 8 10 12 14 16
```

## Sample Output · 範例輸出

```text
Original: [2, 4, 6, 8, 10, 12, 14, 16]
Average: 9.00
New list: [100, 144, 196, 256]
```

## Hints · 提示

:::en
- Create the new list before the loop. Append `i ** 2`, not `i`.
:::

:::zh
- 在迴圈之前建立新列表。加入的是 `i ** 2`，不是 `i`。
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
