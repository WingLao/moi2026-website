<!-- bilingual -->
## Description · 題目說明

:::en
A CPU must finish a list of tasks. Each task is an uppercase letter (its type). Two tasks of the same type must be at least `cooldown` time units apart. Each task takes 1 time unit and the CPU may stay idle. Find the shortest total time.
:::

:::zh
CPU 要完成一連串任務，每個任務用一個大寫字母表示類型。相同類型的兩個任務之間最少要相隔 `cooldown` 個時間單位。每個任務需時 1 個單位，CPU 可以閒置。求完成所有任務的最短總時間。
:::

## Input · 輸入格式

:::en
- Line 1: two integers `n` and `cooldown`.
- Line 2: a string of length `n` made of `A`–`Z`; each character is one task.
:::

:::zh
- 第 1 行：兩個整數 `n` 和 `cooldown`。
- 第 2 行：長度為 `n`、由 `A`–`Z` 組成的字串，每個字元是一個任務。
:::

## Output · 輸出格式

:::en
Print the minimum total time.
:::

:::zh
輸出最短總時間。
:::

## Sample Input · 範例輸入

```text
6 2
AAABBB
```

## Sample Output · 範例輸出

```text
8
```

## Hints · 提示

:::en
Let `max_freq` be the highest task count and `max_count` the number of task types with that count. The answer is the larger of `(max_freq - 1) * (cooldown + 1) + max_count` and `n`.
:::

:::zh
設 `max_freq` 是出現最多的次數，`max_count` 是有這個次數的任務類型數目。答案是 `(max_freq - 1) * (cooldown + 1) + max_count` 和 `n` 之中較大的一個。
:::

## Constraints · 限制

:::en
- 1 ≤ n ≤ 100000
- 0 ≤ cooldown ≤ 100000
- Tasks are uppercase English letters.
:::

:::zh
- 1 ≤ n ≤ 100000
- 0 ≤ cooldown ≤ 100000
- 任務是大寫英文字母。
:::
