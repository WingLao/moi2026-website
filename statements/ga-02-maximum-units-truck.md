<!-- bilingual -->
## Description · 題目說明

:::en
A truck can carry at most `k` boxes. There are several types of boxes; for each type you know how many boxes there are and how many units each box holds. Find the maximum total number of units the truck can carry.
:::

:::zh
一輛貨車最多可載 `k` 個箱子。箱子有好幾種，每種你都知道有多少個，以及每個箱子裝了多少件貨物。求貨車最多能載多少件貨物。
:::

## Input · 輸入格式

:::en
- Line 1: two integers `m` (number of box types) and `k`.
- Next `m` lines: two integers `count` and `units` for one box type.
:::

:::zh
- 第 1 行：兩個整數 `m`（箱子種類數）和 `k`。
- 接下來 `m` 行：每行兩個整數 `count` 和 `units`，描述一種箱子。
:::

## Output · 輸出格式

:::en
Print the maximum total number of units.
:::

:::zh
輸出最多能載的貨物總件數。
:::

## Sample Input · 範例輸入

```text
3 4
1 3
2 2
3 1
```

## Sample Output · 範例輸出

```text
8
```

## Hints · 提示

:::en
Sort the box types by `units` from high to low and load the best boxes first until the truck is full.
:::

:::zh
按 `units` 由大到小排序，先裝最值錢的箱子，直到貨車載滿。
:::

## Constraints · 限制

:::en
- 1 ≤ m ≤ 100000
- 1 ≤ k ≤ 1000000000
- 1 ≤ count, units ≤ 100000
:::

:::zh
- 1 ≤ m ≤ 100000
- 1 ≤ k ≤ 1000000000
- 1 ≤ count, units ≤ 100000
:::
