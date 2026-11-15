<!-- bilingual -->
## Description · 題目說明

:::en
There are unlimited coins worth 1, 5, 10, 50 and 100. Given an amount V, find the minimum number of coins whose total is exactly V.
:::

:::zh
有面值 1、5、10、50、100 的硬幣，每種數量無限。給定金額 V，求最少需要幾枚硬幣才能剛好湊成 V。
:::

## Input · 輸入格式

:::en
One line with a positive integer V (1 ≤ V ≤ 10000).
:::

:::zh
一行，一個正整數 V（1 ≤ V ≤ 10000）。
:::

## Output · 輸出格式

:::en
One line: the minimum number of coins.
:::

:::zh
一行：最少需要的硬幣數量。
:::

## Sample Input · 範例輸入

```text
1
```

## Sample Output · 範例輸出

```text
1
```

## Explanation · 說明

:::en
Greedy works here: always take the largest coin that still fits.

- V = 1: one 1-coin, answer **1**.
- V = 126 = 100 + 10 + 10 + 5 + 1: **5** coins.
- V = 55 = 50 + 5: **2** coins.
:::

:::zh
這題可以用貪心：每次都取能放進去的最大面值。

- V = 1：一枚 1 元，答案是 **1**。
- V = 126 = 100 + 10 + 10 + 5 + 1：共 **5** 枚。
- V = 55 = 50 + 5：共 **2** 枚。
:::
