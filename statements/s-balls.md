<!-- bilingual -->
## Note · 注意

:::en
The test data for this problem may contain errors from the transfer; it will be checked again later.
:::

:::zh
本題的數據在搬運過程中可能有誤，稍後會再測試一次。
:::

## Description · 題目說明

:::en
Siu Ming has N identical balls and K boxes of different capacities, numbered 1 to K. The total capacity of the boxes is at least N. In how many ways can he put all N balls into the boxes (no box may hold more than its capacity)?
:::

:::zh
小明要收拾 N 個完全相同的球子，另外有 K 個容量不同的盒子，編號 1 至 K。已知盒子的總容量大於或等於球的數目。請問把這 N 個球子放進盒子（每個盒子不可超過容量）共有多少種方法？
:::

## Input · 輸入格式

:::en
Line 1: an integer T (1 ≤ T ≤ 20), the number of test groups. Each group has two lines:

- First line: two positive integers N and K (N ≤ 200).
- Second line: K positive integers, the capacity of each box in order (1 ≤ K ≤ 10).
:::

:::zh
第 1 行：一個整數 T（1 ≤ T ≤ 20），表示數據組數。每組數據有兩行：

- 第一行：兩個正整數 N 和 K（N ≤ 200）。
- 第二行：K 個正整數，依次表示每個盒子的容量（1 ≤ K ≤ 10）。
:::

## Output · 輸出格式

:::en
For each group, one integer: the number of ways, modulo 100,000,007.
:::

:::zh
每組數據輸出一個整數：方法數目除以 100,000,007 的餘數。
:::

## Sample Input · 範例輸入

```text
1
6 3
2 1 5
```

## Sample Output · 範例輸出

```text
5
```

## Special Cases · 特殊條件

:::en
- In at least one test, all boxes have the same capacity.
- Time limit: 0.5 s.
:::

:::zh
- 最少有一個測試數據內所有盒子的容量都相同。
- 時限：0.5 秒。
:::
