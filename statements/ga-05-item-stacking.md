<!-- bilingual -->
## Description · 題目說明

:::en
There are `n` items in one vertical stack. To reach an item, you must lift every item above it. Item `i` weighs `w_i` and will be reached `f_i` times. Choose the order from top to bottom so that the total lifting energy is as small as possible.
:::

:::zh
有 `n` 件物品疊成一疊。要拿某件物品，必須先抬起它上面的所有物品。第 `i` 件物品重 `w_i`，會被拿取 `f_i` 次。請安排由上到下的次序，使抬起物品所花的總能量最少。
:::

## Input · 輸入格式

:::en
- Line 1: an integer `n`.
- Next `n` lines: two integers `w_i` and `f_i`.
:::

:::zh
- 第 1 行：一個整數 `n`。
- 接下來 `n` 行：每行兩個整數 `w_i` 和 `f_i`。
:::

## Output · 輸出格式

:::en
Print the minimum total energy.
:::

:::zh
輸出最少的總能量。
:::

## Sample Input · 範例輸入

```text
3
2 3
4 1
1 5
```

## Sample Output · 範例輸出

```text
6
```

## Hints · 提示

:::en
For two items with `A` above `B`, the cost between them is `w_A * f_B`; after swapping it becomes `w_B * f_A`. Put `A` above `B` when `w_A * f_B < w_B * f_A` — this is sorting by `w / f` without using division.
:::

:::zh
若 `A` 在 `B` 上面，兩者之間的代價是 `w_A * f_B`；對調後變成 `w_B * f_A`。當 `w_A * f_B < w_B * f_A` 時把 `A` 放上面——即按 `w / f` 由小到大排序，但不用做除法。
:::

## Constraints · 限制

:::en
- 1 ≤ n ≤ 200000
- 1 ≤ w_i, f_i ≤ 1000000
- The answer fits in a signed 64-bit integer.
:::

:::zh
- 1 ≤ n ≤ 200000
- 1 ≤ w_i, f_i ≤ 1000000
- 答案在 64 位元有號整數範圍內。
:::
