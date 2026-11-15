<!-- bilingual -->
## Description · 題目說明

:::en
You are given an N×M grid. Each cell is `1` (land) or `0` (sea). An island is a group of land cells connected horizontally or vertically. Count the islands.
:::

:::zh
給定一個 N×M 的網格，每格是 `1`（陸地）或 `0`（海洋）。島嶼由上下左右相連的陸地格子組成。請計算島嶼的數量。
:::

## Input · 輸入格式

:::en
Line 1: two positive integers N and M (1 ≤ N, M ≤ 10): rows and columns.

Next N lines: M characters each, `0` or `1`, with no spaces.
:::

:::zh
第 1 行：兩個正整數 N、M（1 ≤ N, M ≤ 10），表示行數和列數。

接下來 N 行：每行 M 個字元（`0` 或 `1`），字元之間沒有空格。
:::

## Output · 輸出格式

:::en
One line: the number of islands.
:::

:::zh
一行：島嶼的數量。
:::

## Sample Input · 範例輸入

```text
4 5
11000
11000
00100
00011
```

## Sample Output · 範例輸出

```text
3
```

## Explanation · 說明

:::en
The three islands are: the top-left block, the single `1` in the middle, and the two connected `1`s at the bottom right.
:::

:::zh
三個島嶼分別是：左上角的一塊、中間的一個 `1`、右下角兩個相連的 `1`。
:::
