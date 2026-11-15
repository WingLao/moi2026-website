<!-- bilingual -->
## Description · 題目說明

:::en
Read the coin values and an amount. Use a greedy algorithm to print the minimum number of coins needed.
:::

:::zh
讀入各種硬幣的面值和一個金額，用貪心方法輸出最少需要多少枚硬幣。
:::

## Input · 輸入格式

:::en
Line 1: the coin values, separated by spaces. Line 2: the amount.
:::

:::zh
第 1 行：硬幣面值，以空格分隔。第 2 行：金額。
:::

## Output · 輸出格式

:::en
One integer: the number of coins.
:::

:::zh
一個整數：硬幣數量。
:::

## Sample Input · 範例輸入

```text
1 5 10 25
63
```

## Sample Output · 範例輸出

```text
6
```

## Hints · 提示

:::en
- Sort the coin values from largest to smallest, then use as many of each as possible.
:::

:::zh
- 把面值由大到小排序，每種面值盡量多用。
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
