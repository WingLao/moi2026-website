<!-- bilingual -->
## Description · 題目說明

:::en
Given two strings `word1` and `word2` of lowercase letters, print the minimum number of operations needed to turn `word1` into `word2`. Allowed operations:

- insert a character
- delete a character
- replace a character
:::

:::zh
給定兩個只含小寫英文字母的字串 `word1` 和 `word2`，輸出把 `word1` 變成 `word2` 所需的最少操作次數。可以使用的操作：

- 插入一個字元
- 刪除一個字元
- 替換一個字元
:::

## Input · 輸入格式

:::en
Line 1: `word1`.

Line 2: `word2`.
:::

:::zh
第 1 行：`word1`。

第 2 行：`word2`。
:::

## Output · 輸出格式

:::en
Print the minimum number of operations.
:::

:::zh
輸出最少操作次數。
:::

## Sample Input · 範例輸入

```text
horse
ros
```

## Sample Output · 範例輸出

```text
3
```

## Hints · 提示

:::en
- Let `dp[i][j]` be the answer for the first `i` characters of `word1` and the first `j` characters of `word2`.
- If the current characters are equal, take `dp[i-1][j-1]`.
- Otherwise take the minimum of insert, delete and replace, plus one.
:::

:::zh
- 設 `dp[i][j]` 表示 `word1` 前 `i` 個字元變成 `word2` 前 `j` 個字元的最少操作次數。
- 如果目前兩個字元相同，直接取 `dp[i-1][j-1]`。
- 否則取插入、刪除、替換三者的最小值再加一。
:::

## Constraints · 限制

:::en
- `0 <= len(word1), len(word2) <= 200`
- Both strings contain only lowercase English letters.
:::

:::zh
- `0 <= len(word1), len(word2) <= 200`
- 兩個字串只包含小寫英文字母。
:::
