<!-- bilingual -->
## Description · 題目說明

:::en
Read some integers. Print the mean, the standard deviation, and the list of values greater than `mean + std`.
:::

:::zh
讀入一些整數。輸出平均數、標準差，以及所有大於 `平均數 + 標準差` 的數組成的列表。
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
Three lines: the mean, the standard deviation (2 decimal places), and the list. Follow the sample exactly.
:::

:::zh
三行：平均數、標準差（2 位小數）和列表。格式請完全依照範例。
:::

## Sample Input · 範例輸入

```text
10 12 15 18 20 22 25 30 5 8
```

## Sample Output · 範例輸出

```text
16.5
7.54
[25, 30]
```

## Hints · 提示

:::en
- Use the population standard deviation (the value returned by `numpy.std`).
:::

:::zh
- 使用母體標準差（即 `numpy.std` 的結果）。
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
