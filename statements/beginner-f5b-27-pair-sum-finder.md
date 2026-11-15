<!-- bilingual -->
## Description · 題目說明

:::en
Read some numbers and a target. Print every pair that adds up to the target (each number can be used at most once), then print how many pairs there are.
:::

:::zh
讀入一些數和一個目標值。輸出所有相加等於目標值的數對（每個數最多用一次），最後輸出數對的數量。
:::

## Input · 輸入格式

:::en
Line 1: the numbers, separated by spaces. Line 2: the target.
:::

:::zh
第 1 行：各個數，以空格分隔。第 2 行：目標值。
:::

## Output · 輸出格式

:::en
One pair per line in the form `(a, b)` with the smaller number first, in increasing order. Last line: `Total:` and the count.
:::

:::zh
每行一個數對，格式 `(a, b)`，小的數在前，按由小到大次序。最後一行：`Total:` 和數量。
:::

## Sample Input · 範例輸入

```text
1 4 6 7 9 10
11
```

## Sample Output · 範例輸出

```text
(1, 10)
(4, 7)
Total: 2
```

## Hints · 提示

:::en
- Sort the list first, then use two pointers or a set.
:::

:::zh
- 先排序，再用雙指針或集合。
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
