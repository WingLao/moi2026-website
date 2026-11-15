<!-- bilingual -->
## Description · 題目說明

:::en
Given a sequence of N integers, find the length of its longest strictly increasing subsequence (LIS). A subsequence need not be contiguous, but it keeps the original order and each element is strictly smaller than the next.
:::

:::zh
給定長度為 N 的整數序列，求它的最長嚴格遞增子序列（LIS）的長度。子序列不需要連續，但必須保持原有次序，而且每一項嚴格小於下一項。
:::

## Input · 輸入格式

:::en
Line 1: a positive integer N (1 ≤ N ≤ 1000).

Line 2: N integers, each with absolute value at most 10^9, separated by spaces.
:::

:::zh
第 1 行：一個正整數 N（1 ≤ N ≤ 1000）。

第 2 行：N 個整數，絕對值都不超過 10^9，以空格分隔。
:::

## Output · 輸出格式

:::en
One line: the length of the LIS.
:::

:::zh
一行：最長嚴格遞增子序列的長度。
:::

## Sample Input · 範例輸入

```text
8
10 9 2 5 3 7 101 18
```

## Sample Output · 範例輸出

```text
4
```

## Explanation · 說明

:::en
One longest increasing subsequence is [2, 3, 7, 101], length 4.
:::

:::zh
其中一個最長遞增子序列是 [2, 3, 7, 101]，長度為 4。
:::
