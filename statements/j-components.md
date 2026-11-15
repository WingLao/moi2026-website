<!-- bilingual -->
## Description · 題目說明

:::en
An undirected graph has N nodes (numbered 1 to N) and E edges. Count its connected components.
:::

:::zh
給定一個有 N 個節點（編號 1 至 N）和 E 條邊的無向圖，請計算圖中連通分量的數量。
:::

## Input · 輸入格式

:::en
Line 1: two integers N (1 ≤ N ≤ 1000) and E (0 ≤ E ≤ 5000).

Next E lines: two integers u and v (1 ≤ u, v ≤ N): an edge between u and v.
:::

:::zh
第 1 行：兩個整數 N（1 ≤ N ≤ 1000）和 E（0 ≤ E ≤ 5000）。

接下來 E 行：每行兩個整數 u、v（1 ≤ u, v ≤ N），表示 u 和 v 之間有一條邊。
:::

## Output · 輸出格式

:::en
One line: the number of connected components.
:::

:::zh
一行：連通分量的數量。
:::

## Sample Input · 範例輸入

```text
5 3
1 2
2 3
4 5
```

## Sample Output · 範例輸出

```text
2
```

## Explanation · 說明

:::en
Nodes {1, 2, 3} form one component and {4, 5} form another: 2 in total.
:::

:::zh
節點 {1, 2, 3} 是一個連通分量，{4, 5} 是另一個，共 2 個。
:::
