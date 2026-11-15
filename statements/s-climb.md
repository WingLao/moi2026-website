<!-- bilingual -->
## Description · 題目說明

:::en
You are given a polynomial of degree n (2 ≤ n ≤ 8):

`f(x) = a_n x^n + a_(n-1) x^(n-1) + ... + a_1 x + a_0`

It has n − 1 turning points (think of them as hilltops and valley bottoms on the curve). You are also given x1 and x2; between them, f(x) has exactly one turning point. Find the x-position x0 of that turning point.
:::

:::zh
給定一個 n 次函數（2 ≤ n ≤ 8）：

`f(x) = a_n x^n + a_(n-1) x^(n-1) + ... + a_1 x + a_0`

它共有 n − 1 個極值（可以想像成曲線上的山峰頂或山谷底）。另外給定 x1 和 x2，在這個區間內 f(x) 只有一個極值。請找出這個極值所在的 x 位置 x0。
:::

## Input · 輸入格式

:::en
Line 1: a positive integer T (1 ≤ T ≤ 10), the number of test groups. Each group has two lines:

- First line: N, X1 and X2, with X1 < X2.
- Second line: N + 1 real numbers (at most 4 decimal places): the coefficients a_N, a_(N-1), …, a_1, a_0.
:::

:::zh
第 1 行：一個正整數 T（1 ≤ T ≤ 10），表示數據組數。每組數據有兩行：

- 第一行：N、X1 和 X2，其中 X1 < X2。
- 第二行：N + 1 個實數（小數點後最多 4 位），依次是係數 a_N、a_(N-1)、……、a_1、a_0。
:::

## Output · 輸出格式

:::en
For each group, the x of the turning point between X1 and X2, with exactly 5 decimal places.
:::

:::zh
每組數據輸出一個實數：X1 與 X2 之間極值所在的 x，小數點後必須正好 5 位。
:::

## Sample Input · 範例輸入

```text
1
2 -2.5 1.5
1.0 1.0 -6.0
```

## Sample Output · 範例輸出

```text
-0.50000
```

## Special Cases · 特殊條件

:::en
- One test has N = 2 and one test has N = 3.
- Time limit: 0.5 s; memory limit: 128 MB.
:::

:::zh
- 有一個測試數據 N = 2，有一個 N = 3。
- 時限：0.5 秒；記憶體限制：128 MB。
:::
