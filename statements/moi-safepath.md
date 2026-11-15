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
There are N countries numbered 1 to N, and you are the president of country 1. Some pairs of countries are joined by two-way roads (at most one road between two countries), and every country can reach every other country.

A war has broken out, so you are calling back your diplomats. Each country has a danger value (a non-negative integer; larger is more dangerous). Your own country and the countries that have diplomats have danger 0; all other countries have danger greater than 0.

For each diplomat, plan a route home whose **total danger** (the sum of the danger values of all countries on the route) is as small as possible. If several routes have the same total danger, choose the one with the shortest total length.
:::

:::zh
有 N 個國家，編號 1 至 N，而你是國家 1 的總統。部分國家之間有雙向公路相連（兩國之間最多一條），而且所有國家都可以互相到達。

當地爆發戰爭，你決定召回所有外交人員。每個國家有一個危險指數（非負整數，越大越危險）。你自己的國家和有外交人員的國家，危險指數都是 0；其他國家都大於 0。

請為每位外交人員規劃回國路線，使沿途所有國家的**危險指數總和**最低；若有多條路線危險指數總和相同，取總長度最短的一條。
:::

## Input · 輸入格式

:::en
Several test groups. Each group:

- Line 1: two positive integers N and K: the number of countries and roads (2 ≤ N ≤ 1000, K ≤ 2N).
- Line 2: N non-negative integers, the danger values of countries 1 to N. The first is always 0 (your country); the other 0s are the countries with diplomats.
- Next K lines: three positive integers a b d: a road of length d between countries a and b.

The last line is `0 0`.
:::

:::zh
輸入有若干組數據，每組：

- 第 1 行：兩個正整數 N 和 K，國家數目和公路數目（2 ≤ N ≤ 1000，K ≤ 2N）。
- 第 2 行：N 個非負整數，依次是國家 1 至 N 的危險指數。第一個一定是 0（你的國家）；其餘的 0 代表有外交人員的國家。
- 接下來 K 行：每行三個正整數 a b d，表示國家 a 和 b 之間有一條長度為 d 的公路。

最後一行是兩個 `0`。
:::

## Output · 輸出格式

:::en
For each diplomat, one line with two integers I P: the total danger of their route and its total length. List the diplomats in increasing order of their country number.
:::

:::zh
每位外交人員輸出一行兩個整數 I P：回國路線的危險指數總和和總長度。按外交人員所在國家的編號由小到大輸出。
:::

## Sample Input · 範例輸入

```text
7 8
0 4 3 2 0 7 0
1 2 3
1 3 4
2 5 1
2 4 6
4 6 5
4 7 2
6 7 3
3 7 20
0 0
```

## Sample Output · 範例輸出

```text
4 4
3 24
```

## Explanation · 說明

:::en
Diplomats are in countries 5 and 7. From 5: 5 → 2 → 1, danger 4, length 4. From 7: 7 → 4 → 2 → 1 has danger 6, but 7 → 3 → 1 has danger 3 (length 24), which is safer.
:::

:::zh
外交人員在國家 5 和 7。由 5：5 → 2 → 1，危險指數 4，長度 4。由 7：7 → 4 → 2 → 1 危險指數是 6，而 7 → 3 → 1 危險指數只有 3（長度 24），較安全。
:::
