<!-- bilingual -->
## Description · 題目說明

:::en
Siu Ming is planning his part-time jobs. He can do at most K jobs at the same time. There are N job offers, and he knows the start time and end time of each one. What is the maximum number of jobs he can take?
:::

:::zh
小明正在計劃他的兼職，他在同一時間內最多可以做 K 份兼職。一共有 N 份兼職機會，他知道每份兼職的開始時間和結束時間。請問他最多可以做多少份兼職？
:::

## Input · 輸入格式

:::en
Line 1: a positive integer T, the number of test groups. Each group:

- First line: two positive integers N (number of offers) and K (max jobs at the same time).
- Next N lines: two positive integers S (start time) and E (end time).

Limits: 2 ≤ N ≤ 300, 0 < S ≤ 1,000, 1 ≤ K ≤ 10.
:::

:::zh
第 1 行：一個正整數 T，表示數據組數。每組數據：

- 第一行：兩個正整數 N（兼職機會數目）和 K（同一時間最多可做的兼職數）。
- 接下來 N 行：每行兩個正整數 S（開始時間）和 E（結束時間）。

範圍：2 ≤ N ≤ 300，0 < S ≤ 1,000，1 ≤ K ≤ 10。
:::

## Output · 輸出格式

:::en
For each group, one positive integer: the maximum number of jobs.
:::

:::zh
每組數據輸出一個正整數：最多可以做的兼職數目。
:::

## Sample Input · 範例輸入

```text
2
3 1
1 5
5 8
2 7
3 2
1 5
5 8
2 7
```

## Sample Output · 範例輸出

```text
2
3
```

## Explanation · 說明

:::en
In the first group, the first job ends at time 5 and the second starts at time 5. These two jobs do **not** overlap.
:::

:::zh
第一組數據中，第一份兼職在時間 5 結束，第二份在時間 5 開始，這兩份兼職**不算**重疊。
:::

## Constraints · 限制

:::en
- Time limit: 0.5 s
:::

:::zh
- 時限：0.5 秒
:::
