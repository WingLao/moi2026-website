<!-- bilingual -->
## Note · 注意

:::en
MOI practice problem. Python 3 or C++17. Read from standard input and print to standard output.
:::

:::zh
MOI 練習題。可用 Python 3 或 C++17，從標準輸入讀入、輸出到標準輸出。
:::

## Description · 題目說明

:::en
All of Siu Ming's classmates live on the same street, and he has collected their building numbers. He wants to know:

- the smallest difference between two classmates' building numbers (who live closest), and
- the largest gap between two classmates with **no other classmate living between them**.

He only cares about the differences, not who the classmates are.
:::

:::zh
小明發現所有同學都住在同一條街上，於是收集了他們所住大廈的門牌號碼。他想知道：

- 哪兩位同學住得最近，即門牌號碼相差最少；
- 哪兩位同學之間分隔最遠：門牌號碼相差最大，而且**中間沒有其他同學居住**。

他只關心門牌號碼的差，不需要知道是哪位同學。
:::

## Input · 輸入格式

:::en
Line 1: a positive integer N, the number of classmates (2 ≤ N ≤ 50).

Line 2: N different positive integers, the building numbers (each at most 1000).
:::

:::zh
第 1 行：一個正整數 N，班上同學的總數（2 ≤ N ≤ 50）。

第 2 行：N 個不同的正整數，表示各同學的門牌號碼（都不大於 1000）。
:::

## Output · 輸出格式

:::en
One line with two integers separated by a space: the smallest difference and the largest gap.
:::

:::zh
一行兩個整數，以一個空格分開：最小的門牌號碼差和最大的分隔。
:::

## Sample Input · 範例輸入

```text
5
22 5 9 16 1
```

## Sample Output · 範例輸出

```text
4 7
```

## Explanation · 說明

:::en
The smallest difference is 4 (1 and 5, or 5 and 9). The largest gap is 7 (between 9 and 16).
:::

:::zh
最小的門牌號碼差是 4（1 和 5，或 5 和 9）；最大分隔是 7（9 和 16 之間）。
:::
