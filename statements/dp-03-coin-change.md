<!-- bilingual -->
## Description · 題目說明

:::en
There are `n` kinds of coins and a target `amount`. Each kind of coin can be used any number of times. Print the minimum number of coins that make exactly `amount`; if it is impossible, print `-1`.
:::

:::zh
有 `n` 種硬幣面值和一個目標金額 `amount`，每種硬幣可以用任意多次。輸出湊成 `amount` 所需的最少硬幣數量；如果湊不出，輸出 `-1`。
:::

## Input · 輸入格式

:::en
Line 1: two integers `n` and `amount`.

Line 2: `n` positive integers, the coin values.
:::

:::zh
第 1 行：兩個整數 `n` 和 `amount`。

第 2 行：`n` 個正整數，表示各種硬幣面值。
:::

## Output · 輸出格式

:::en
Print the minimum number of coins, or `-1` if it is impossible.
:::

:::zh
輸出最少硬幣數量；若湊不出則輸出 `-1`。
:::

## Sample Input · 範例輸入

```text
3 11
2 5 6
```

## Sample Output · 範例輸出

```text
2
```

## Hints · 提示

:::en
- This is an unbounded knapsack DP.
- Let `dp[x]` be the fewest coins that make `x`.
- If `dp[amount]` is still unreachable at the end, print `-1`.
:::

:::zh
- 這是完全背包 DP。
- 設 `dp[x]` 表示湊出 `x` 所需的最少硬幣數量。
- 如果最後 `dp[amount]` 仍是不能達到的狀態，輸出 `-1`。
:::

## Constraints · 限制

:::en
- `1 <= n <= 30`
- `0 <= amount <= 10000`
- `1 <= coin[i] <= 10000`
:::

:::zh
- `1 <= n <= 30`
- `0 <= amount <= 10000`
- `1 <= coin[i] <= 10000`
:::
