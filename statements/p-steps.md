<!-- bilingual -->
## Description · 題目說明

:::en
You are given an N×M maze. `0` is open and `1` is a wall. Start at the top-left cell (0,0); each step moves one cell up, down, left or right. Find the minimum number of steps to reach the bottom-right cell (N-1, M-1). If it cannot be reached, print -1.
:::

:::zh
給定一個 N×M 的迷宮，`0` 表示可以通行，`1` 表示牆。從左上角 (0,0) 出發，每步向上下左右移動一格，求到達右下角 (N-1, M-1) 的最少步數。若無法到達，輸出 -1。
:::

## Input · 輸入格式

:::en
Line 1: two positive integers N and M (2 ≤ N, M ≤ 10).

Next N lines: M characters each, `0` or `1`.
:::

:::zh
第 1 行：兩個正整數 N、M（2 ≤ N, M ≤ 10）。

接下來 N 行：每行 M 個字元（`0` 或 `1`）。
:::

## Output · 輸出格式

:::en
One line: the minimum number of steps, or -1 if the exit cannot be reached.
:::

:::zh
一行：最少步數；若無法到達則輸出 -1。
:::

## Sample Input · 範例輸入

```text
3 3
000
010
000
```

## Sample Output · 範例輸出

```text
4
```

## Explanation · 說明

:::en
Path: (0,0)→(0,1)→(0,2)→(1,2)→(2,2), 4 steps.
:::

:::zh
路徑為 (0,0)→(0,1)→(0,2)→(1,2)→(2,2)，共 4 步。
:::
