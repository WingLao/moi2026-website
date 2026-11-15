<!-- bilingual -->
## Description · 題目說明

:::en
Given a sequence of `n` integers, find the length of its longest strictly increasing subsequence (LIS). A subsequence does not need to be contiguous, but it must keep the original order.
:::

:::zh
給定一個長度為 `n` 的整數序列，求它的最長嚴格遞增子序列（LIS）的長度。子序列不需要連續，但必須保持原本的次序。
:::

## Input · 輸入格式

:::en
Line 1: an integer `n`.

Line 2: `n` integers.
:::

:::zh
第 1 行：一個整數 `n`。

第 2 行：`n` 個整數。
:::

## Output · 輸出格式

:::en
Print the length of the LIS.
:::

:::zh
輸出最長嚴格遞增子序列的長度。
:::

## Sample Input · 範例輸入

```text
8
10 9 2 5 3 7 101 18
```

## Sample Output · 範例輸出

```text
4
```

## Hints · 提示

:::en
- Let `dp[i]` be the LIS length that ends at element `i`.
- For each `i`, try every `j < i` with `a[j] < a[i]`.
:::

:::zh
- 設 `dp[i]` 為「以第 `i` 個數結尾」的最長遞增子序列長度。
- 對每個 `i`，檢查所有 `j < i` 且 `a[j] < a[i]` 的位置。
:::

## Constraints · 限制

:::en
- `1 <= n <= 2000`
- `-10^9 <= a[i] <= 10^9`
:::

:::zh
- `1 <= n <= 2000`
- `-10^9 <= a[i] <= 10^9`
:::
