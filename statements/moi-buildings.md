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
A long main road is divided into M equal blocks numbered 1 to M (M ≤ 1,000,000). Some blocks are houses and the others are leisure areas. Block 1 and block M are always houses.

The government wants to turn some leisure blocks into new houses. For the environment, every **new** house must have at least K leisure blocks between it and any other house (existing or new) on both sides. Existing houses do not have to follow this rule among themselves. New houses must be on the road (blocks 1 to M) and on blocks that were leisure areas.

Given the positions of the existing houses, find the maximum number of new houses that can be added.
:::

:::zh
有一條長長的主路，分成 M 段等距的路區，編號 1 至 M（M ≤ 1,000,000）。有些路區是房屋區，其餘是休閒區。第 1 個和第 M 個路區一定是房屋區。

政府想把部分休閒區改建為房屋區。為了環保，每個**新**房屋區的兩側，與任何其他房屋區（原有或新建）之間都必須保留最少 K 個休閒區。原有房屋區之間的距離不一定符合這個要求。新房屋區必須在這條路上（路區 1 至 M），而且原本是休閒區。

給定原有房屋區的位置，求最多可以新增多少個房屋區。
:::

## Input · 輸入格式

:::en
Several test groups. Each group:

- Line 1: two positive integers N (number of existing houses, 2 ≤ N ≤ 50) and K.
- Line 2: N integers in increasing order: the blocks of the existing houses. The first is always 1 and the last is M.

The last line of the input is `0 0`.
:::

:::zh
輸入有若干組測試數據，每組格式如下：

- 第 1 行：兩個正整數 N（現有房屋區數目，2 ≤ N ≤ 50）和 K。
- 第 2 行：N 個由小至大排列的整數，表示原有房屋區的路區編號。第一個一定是 1，最後一個就是 M。

輸入的最後一行只有兩個 `0`，表示結束。
:::

## Output · 輸出格式

:::en
For each group, one non-negative integer: the maximum number of new houses.
:::

:::zh
每組數據輸出一個非負整數：最多可以新增的房屋區數目。
:::

## Sample Input · 範例輸入

```text
4 2
1 3 5 6
5 2
1 4 13 19 21
0 0
```

## Sample Output · 範例輸出

```text
0
3
```

## Explanation · 說明

:::en
In the first group no block can become a house. In the second group, 2 new houses fit between 4 and 13 (at 7 and 10) and 1 between 13 and 19 (at 16): 3 in total.
:::

:::zh
第一組數據中，沒有路區可以改建。第二組數據中，4 和 13 之間可新增 2 個（7 和 10），13 和 19 之間可新增 1 個（16），共 3 個。
:::

## Special Cases · 特殊條件

:::en
- Three of the test files contain only one test group.
:::

:::zh
- 本題有三個輸入檔案只有一組測試數據。
:::
