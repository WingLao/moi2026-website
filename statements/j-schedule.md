<!-- bilingual -->
## Description · 題目說明

:::en
There are N tasks. Each has a start time s and an end time e (s < e). Only one task can run at a time, so the chosen tasks must not overlap (one may start exactly when another ends). What is the maximum number of tasks you can choose?
:::

:::zh
有 N 個任務，每個任務有開始時間 s 和結束時間 e（s < e）。同一時間只能執行一個任務，所以選擇的任務時間不能重疊（允許首尾相接）。最多可以選擇幾個任務？
:::

## Input · 輸入格式

:::en
Line 1: a positive integer N (1 ≤ N ≤ 10^5).

Next N lines: two integers s and e (0 ≤ s < e ≤ 10^9).
:::

:::zh
第 1 行：一個正整數 N（1 ≤ N ≤ 10^5）。

接下來 N 行：每行兩個整數 s、e（0 ≤ s < e ≤ 10^9）。
:::

## Output · 輸出格式

:::en
One line: the maximum number of tasks.
:::

:::zh
一行：最多可以選擇的任務數量。
:::

## Sample Input · 範例輸入

```text
4
1 3
2 5
3 6
5 7
```

## Sample Output · 範例輸出

```text
2
```

## Explanation · 說明

:::en
Choose [1,3] and [3,6], or [1,3] and [5,7]. At most 2 tasks.
:::

:::zh
可選 [1,3] 和 [3,6]，或 [1,3] 和 [5,7]，最多 2 個。
:::
