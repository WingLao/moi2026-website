<!-- bilingual -->
## Description · 題目說明

:::en
Read some integers. Print the average to 2 decimal places, then print the numbers that are both even and greater than the average.
:::

:::zh
讀入一些整數。先輸出平均值（2 位小數），再輸出既是偶數、又大於平均值的數。
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
Line 1: the average (2 decimal places). Line 2: the matching numbers as a Python list, in their original order.
:::

:::zh
第 1 行：平均值（2 位小數）。第 2 行：符合條件的數，以 Python 列表輸出，保持原來次序。
:::

## Sample Input · 範例輸入

```text
5 8 12 15 20 7 18 9 14 6
```

## Sample Output · 範例輸出

```text
11.40
[12, 20, 18, 14]
```

## Hints · 提示

:::en
- Both conditions must be true: even **and** greater than the average.
:::

:::zh
- 兩個條件都要成立：是偶數，**而且**大於平均值。
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
