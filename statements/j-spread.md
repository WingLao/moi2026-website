<!-- bilingual -->
## Description · 題目說明

:::en
You are given an N×M grid. Each cell starts as 0 (healthy) or 1 (infected). Every minute, each infected cell infects its healthy neighbours above, below, left and right. After how many minutes is every cell infected? If some cell can never be infected, print -1.
:::

:::zh
給定一個 N×M 的網格，每格一開始是 0（健康）或 1（已感染）。每過一分鐘，每個已感染的格子會感染它上下左右的健康格子。多少分鐘後所有格子都被感染？如果有格子永遠無法被感染，輸出 -1。
:::

## Input · 輸入格式

:::en
Line 1: two positive integers N and M (1 ≤ N, M ≤ 50).

Next N lines: M integers (0 or 1), separated by spaces.
:::

:::zh
第 1 行：兩個正整數 N、M（1 ≤ N, M ≤ 50）。

接下來 N 行：每行 M 個整數（0 或 1），以空格分隔。
:::

## Output · 輸出格式

:::en
One line: the minimum number of minutes, or -1 if the whole grid can never be infected.
:::

:::zh
一行：最少需要的分鐘數；若無法全部感染則輸出 -1。
:::

## Sample Input · 範例輸入

```text
3 3
0 1 0
0 0 0
0 0 0
```

## Sample Output · 範例輸出

```text
3
```

## Explanation · 說明

:::en
Using (row, column) from 0: at minute 0 only (0,1) is infected. Minute 1: (0,0), (0,2), (1,1). Minute 2: (1,0), (1,2), (2,1). Minute 3: (2,0), (2,2) — now every cell is infected.
:::

:::zh
用（行, 列）表示，由 0 開始：第 0 分鐘只有 (0,1) 感染。第 1 分鐘：(0,0)、(0,2)、(1,1)。第 2 分鐘：(1,0)、(1,2)、(2,1)。第 3 分鐘：(2,0)、(2,2)，全部格子都被感染。
:::
