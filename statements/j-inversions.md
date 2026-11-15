<!-- bilingual -->
## Description · 題目說明

:::en
Given a sequence A of N integers, a pair (i, j) is an inversion if i < j and A[i] > A[j]. Count the inversions.
:::

:::zh
給定長度為 N 的整數序列 A。若 i < j 且 A[i] > A[j]，則 (i, j) 稱為一個逆序對。請計算逆序對的總數。
:::

## Input · 輸入格式

:::en
Line 1: a positive integer N (1 ≤ N ≤ 10^5).

Line 2: N integers (1 ≤ A[i] ≤ 10^9), separated by spaces.
:::

:::zh
第 1 行：一個正整數 N（1 ≤ N ≤ 10^5）。

第 2 行：N 個整數（1 ≤ A[i] ≤ 10^9），以空格分隔。
:::

## Output · 輸出格式

:::en
One line: the number of inversions.
:::

:::zh
一行：逆序對的數量。
:::

## Sample Input · 範例輸入

```text
5
3 1 2 5 4
```

## Sample Output · 範例輸出

```text
3
```

## Explanation · 說明

:::en
The inversions are (3,1), (3,2) and (5,4): 3 pairs.
:::

:::zh
逆序對為 (3,1)、(3,2)、(5,4)，共 3 對。
:::
