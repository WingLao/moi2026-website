<!-- bilingual -->
## Description · 題目說明

:::en
Many small tribes live in the mountains. Some tribes are linked by paths, and every path is **one-way**: a path from A to B can only be used from A to B (a path from B to A would be a separate path).

Tribes form communities. In a community, every tribe must be able to reach every other tribe in it, directly or through other tribes. A tribe that cannot form a community with others is a community on its own. Find all the communities.
:::

:::zh
山區散落着很多小部落，有些部落之間有小路相連，而所有小路都是**單向**的：由 A 通向 B 的小路只能由 A 走到 B（由 B 通向 A 會是另一條小路）。

部落之間要組成社群。在同一個社群中，每個部落都必須可以直接或間接走到社群中的每一個其他部落。不能與其他部落組成社群的部落，自己單獨組成一個社群。請找出所有社群。
:::

## Input · 輸入格式

:::en
Line 1: a positive integer T (T ≤ 50), the number of test groups. Each group:

- First line: N (number of tribes) and R (number of paths).
- Next R lines: two integers U V — a one-way path from tribe U to tribe V (1 ≤ U, V ≤ N, 1 ≤ N ≤ 400).
:::

:::zh
第 1 行：一個正整數 T（T ≤ 50），表示數據組數。每組數據：

- 第一行：N（部落數目）和 R（小路數目）。
- 接下來 R 行：每行兩個整數 U V，表示有一條由部落 U 單向通往部落 V 的小路（1 ≤ U, V ≤ N，1 ≤ N ≤ 400）。
:::

## Output · 輸出格式

:::en
For each group:

- First line: K, the number of communities.
- Next K lines: `U S`, where U is the smallest tribe number in the community and S is the number of tribes in it.
- List the communities by U from small to large.
:::

:::zh
每組數據：

- 第一行：K，社群的數目。
- 接下來 K 行：`U S`，U 是該社群中編號最小的部落，S 是該社群的部落數目。
- 按 U 由小到大輸出。
:::

## Sample Input · 範例輸入

```text
2
3 2
1 2
2 1
7 10
1 4
3 2
3 7
5 4
1 2
5 2
2 5
6 5
6 3
7 6
```

## Sample Output · 範例輸出

```text
2
1 2
3 1
4
1 1
2 2
3 3
4 1
```

## Constraints · 限制

:::en
- Time limit: 0.5 s
:::

:::zh
- 時限：0.5 秒
:::
