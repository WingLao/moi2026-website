<!-- bilingual -->
## Description · 題目說明

:::en
Given an integer `n`, print the `n`-th Fibonacci number `F(n)`, defined as:

- `F(0) = 0`
- `F(1) = 1`
- `F(n) = F(n-1) + F(n-2)` for `n >= 2`
:::

:::zh
給定整數 `n`，輸出費氏數列第 `n` 項 `F(n)`。定義如下：

- `F(0) = 0`
- `F(1) = 1`
- 當 `n >= 2` 時，`F(n) = F(n-1) + F(n-2)`
:::

## Input · 輸入格式

:::en
One integer `n`.
:::

:::zh
一個整數 `n`。
:::

## Output · 輸出格式

:::en
Print `F(n)`.
:::

:::zh
輸出 `F(n)`。
:::

## Sample Input · 範例輸入

```text
4
```

## Sample Output · 範例輸出

```text
3
```

## Hints · 提示

:::en
- This is a basic one-dimensional DP.
- Compute `F(0), F(1), ..., F(n)` from small to large.
:::

:::zh
- 這是基本的一維 DP。
- 由小到大計算 `F(0), F(1), ..., F(n)` 即可。
:::

## Constraints · 限制

:::en
- `0 <= n <= 45`
:::

:::zh
- `0 <= n <= 45`
:::
