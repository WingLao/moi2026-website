<!-- bilingual -->
## Description · 題目說明

:::en
The elf village is celebrating its N-th anniversary with a programming contest for teams of two. By the rules, the skill scores of the two team members must add up to exactly N.

Given the skill score of every elf, count how many valid teams can be formed.
:::

:::zh
精靈村將迎來 N 周年慶典，並舉行一場二人一隊的電腦程式比賽。根據賽規，兩名隊員的技術指數之和必須剛好等於 N。

村長有所有精靈的技術指數清單，請計算今年合乎參賽資格的組合共有多少種。
:::

## Input · 輸入格式

:::en
Line 1: a positive integer T, the number of test groups. Each group has two lines:

- First line: N (the anniversary) and M (the number of elves); 2 ≤ N ≤ 300, 2 ≤ M ≤ 50,000.
- Second line: M positive integers, the skill scores (each ≤ 1,000).
:::

:::zh
第 1 行：一個正整數 T，表示數據組數。每組數據有兩行：

- 第一行：N（周年數）和 M（精靈數目）；2 ≤ N ≤ 300，2 ≤ M ≤ 50,000。
- 第二行：M 個正整數，表示每個精靈的技術指數（每個 ≤ 1,000）。
:::

## Output · 輸出格式

:::en
T lines: for each group, the number of valid teams.
:::

:::zh
T 行：每組數據輸出合乎要求的組隊方法數目。
:::

## Sample Input · 範例輸入

```text
2
10 6
8 3 2 2 7 5
20 5
9 41 3 10 7
```

## Sample Output · 範例輸出

```text
3
0
```

## Explanation · 說明

:::en
In the first group the teams adding up to 10 are (8, 2), (8, 2) and (3, 7). There are two elves with score 2, so 8 can team up with either of them — two different teams.
:::

:::zh
第一組數據中，和為 10 的組合有 (8, 2)、(8, 2)、(3, 7)。因為有兩個技術指數是 2 的精靈，8 可以和其中任何一個組隊，算兩個不同的組合。
:::

## Constraints · 限制

:::en
- Time limit: 0.5 s
:::

:::zh
- 時限：0.5 秒
:::
