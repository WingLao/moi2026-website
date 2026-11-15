<!-- bilingual -->
## Description · 題目說明

:::en
A group of money changers swaps a silver note for small coins. The region has N different coin values, and you have unlimited coins of each value. For a given note value, find:

- P: the number of different ways to make the value with coins, and
- M: the smallest number of coins needed.
:::

:::zh
有一個特別的換錢黨，把一定面額的銀卷換成碎銀（零碎的錢幣）。該地區有 N 種不同面值的碎銀，每種都有無限個。對於一張給定面額的銀卷，請求出：

- P：用碎銀組成這個面額的方法數目；
- M：所需碎銀數目最少的組合要用多少個碎銀。
:::

## Input · 輸入格式

:::en
Line 1: a positive integer T, the number of test groups. Each group has two lines:

- First line: an integer N, then N different coin values (1 ≤ N ≤ 20; every coin value ≤ 95).
- Second line: an integer Q, then Q different note values to exchange (every note value ≤ 1,500).
:::

:::zh
第 1 行：一個正整數 T，表示有多少組數據。每組數據有兩行：

- 第一行：一個整數 N，之後是 N 個不同的碎銀面值（1 ≤ N ≤ 20，碎銀面值都 ≤ 95）。
- 第二行：一個整數 Q，之後是 Q 個不同的、要對換的銀卷面值（銀卷面值都 ≤ 1,500）。
:::

## Output · 輸出格式

:::en
For each group, print Q lines, one per note: two integers `P M`. If a note cannot be made with the coins, print `0 0` for it.
:::

:::zh
每組數據輸出 Q 行，每張銀卷一行：兩個整數 `P M`。如果某張銀卷無法用碎銀組成，該行輸出 `0 0`。
:::

## Sample Input · 範例輸入

```text
2
3 5 7 13
4 8 90 20 65
2 1 2
3 19 2 5
```

## Sample Output · 範例輸出

```text
0 0
12 8
2 2
7 5
10 10
2 1
3 3
```

## Explanation · 說明

:::en
In the second group the coins are 1 and 2. A note of 19 can be made in 10 ways: (1×19), (1×17 + 2), …, (1 + 2×9). The fewest coins is (1 + 2×9), which uses 10 coins.

In the first group, the note 8 cannot be made from 5, 7 and 13, so the output is `0 0`.
:::

:::zh
第二組數據的碎銀面值是 1 和 2。對換面值 19 的銀卷共有 10 種方法：(1×19)、(1×17 + 2)、……、(1 + 2×9)。用碎銀最少的是 (1 + 2×9)，共 10 個。

第一組數據中，面額 8 的銀卷無法用 5、7、13 組成，因此輸出 `0 0`。
:::

## Special Cases · 特殊條件

:::en
- In at least one test, the coin values in every group are pairwise coprime.
- In each test, the total number of notes is less than 100,000.
- For every group, P ≤ 2^31 − 1.
- Time limit: 0.8 s.
:::

:::zh
- 最少有一個測試數據內，每一組碎銀的面值兩兩互質。
- 每個測試數據中，要對換的銀卷總數少於 100,000。
- 每組數據中 P ≤ 2^31 − 1。
- 時限：0.8 秒。
:::
