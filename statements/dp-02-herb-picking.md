<!-- bilingual -->
## Description · 題目說明

:::en
You have `T` minutes to pick herbs and `M` kinds of herbs to choose from. Each herb takes some time to pick and has a value, and each herb can be picked at most once. Find the maximum total value you can get within `T` minutes.
:::

:::zh
你有 `T` 分鐘採藥，共有 `M` 種草藥可選。每種草藥有採摘所需時間和價值，而且每種最多只能採一次。求在總時間不超過 `T` 的情況下，可以得到的最大總價值。
:::

## Input · 輸入格式

:::en
Line 1: two integers `T` and `M`.

Next `M` lines: two integers `time` and `value` for one herb.
:::

:::zh
第 1 行：兩個整數 `T` 和 `M`。

接下來 `M` 行：每行兩個整數 `time` 和 `value`，表示一種草藥的採摘時間和價值。
:::

## Output · 輸出格式

:::en
Print the maximum total value.
:::

:::zh
輸出最大總價值。
:::

## Sample Input · 範例輸入

```text
10 4
3 4
4 5
5 10
2 3
```

## Sample Output · 範例輸出

```text
17
```

## Hints · 提示

:::en
- This is the classic 0/1 knapsack problem.
- Let `dp[j]` be the best value using at most `j` minutes.
- Loop `j` from large to small so that each herb is used only once.
:::

:::zh
- 這是標準的 0/1 背包。
- 設 `dp[j]` 表示總時間不超過 `j` 時的最大價值。
- 更新時 `j` 要由大到小，避免同一種草藥被重複使用。
:::

## Constraints · 限制

:::en
- `1 <= T <= 1000`
- `1 <= M <= 200`
- `1 <= time, value <= 1000`
:::

:::zh
- `1 <= T <= 1000`
- `1 <= M <= 200`
- `1 <= time, value <= 1000`
:::
