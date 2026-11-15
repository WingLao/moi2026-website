<!-- bilingual -->
## Description · 題目說明

:::en
You are given `n` half-open intervals `[l, r)`. Remove as few intervals as possible so that the remaining intervals do not overlap.
:::

:::zh
給你 `n` 個半開區間 `[l, r)`。請刪除最少數量的區間，使剩下的區間互不重疊。
:::

## Input · 輸入格式

:::en
- Line 1: an integer `n`.
- Next `n` lines: two integers `l` and `r`.
:::

:::zh
- 第 1 行：一個整數 `n`。
- 接下來 `n` 行：每行兩個整數 `l` 和 `r`。
:::

## Output · 輸出格式

:::en
Print the minimum number of intervals to remove.
:::

:::zh
輸出最少要刪除的區間數。
:::

## Sample Input · 範例輸入

```text
4
1 2
2 3
3 4
1 3
```

## Sample Output · 範例輸出

```text
1
```

## Hints · 提示

:::en
Sort by end point. Always keep the interval that ends earliest, because it leaves the most room for the rest.
:::

:::zh
按結束點排序。每次都保留最早結束的區間，因為它給後面的區間留下最多空間。
:::

## Constraints · 限制

:::en
- 1 ≤ n ≤ 100000
- -1000000000 ≤ l < r ≤ 1000000000
:::

:::zh
- 1 ≤ n ≤ 100000
- -1000000000 ≤ l < r ≤ 1000000000
:::
