<!-- bilingual -->
## Description · 題目說明

:::en
N children numbered 1 to N stand in a circle. They play a version of the "Josephus" game.

Child 1 starts with the ball (this counts as child 1 receiving it for the first time). Whoever holds the ball passes it to the `k`-th child on their right (counting in the passing direction). When a child receives the ball for the `T`-th time, they pass it on as usual and then **immediately leave** the circle; they never take part again.

The game continues until only one child remains. Print that child's number.
:::

:::zh
N 個小朋友編號 1 至 N，圍成一個圈，玩一個複雜版的「猴子選大王」遊戲。

編號 1 的小朋友一開始拿着球（算作他第一次收到球）。拿着球的小朋友把球傳給右手邊第 `k` 位小朋友（按傳球方向數）。當一位小朋友第 `T` 次收到球時，他照樣把球傳出去，然後**立即離開**圈子，不再參與傳球。

一直進行到圈子只剩下一位小朋友。請輸出他的編號。
:::

## Input · 輸入格式

:::en
One line with three positive integers N, k and T separated by spaces (k < N ≤ 12,000, 1 ≤ k ≤ 20, 1 ≤ T ≤ 5).
:::

:::zh
只有一行，三個正整數 N、k 和 T，以空格分隔（k < N ≤ 12,000，1 ≤ k ≤ 20，1 ≤ T ≤ 5）。
:::

## Output · 輸出格式

:::en
One positive integer: the number of the last child.
:::

:::zh
一個正整數：最後留下的小朋友的編號。
:::

## Explanation · 說明

:::en
Sample 1: 3 children, the ball goes to the 2nd child on the right, and a child leaves on receiving the ball for the 2nd time. Brackets mark who holds the ball:
:::

:::zh
樣例 1：共 3 位小朋友，每次傳給右邊第 2 位，第 2 次收到球的小朋友要離開。括號表示拿着球的小朋友：
:::

## Trace 1 · 過程 1

```text
(1) 2 3
1 2 (3)
1 (2) 3
(1) 2 3
2 (3)
2 (3)
2
```

## Note · 注意

:::en
Sample 2: input `6 3 1`, output `5`. 6 children, the ball goes to the 3rd child on the right, and a child leaves on receiving the ball for the 1st time:
:::

:::zh
樣例 2：輸入 `6 3 1`，輸出 `5`。共 6 位小朋友，每次傳給右邊第 3 位，第 1 次收到球就要離開：
:::

## Trace 2 · 過程 2

```text
(1) 2 3 4 5 6
2 3 (4) 5 6
(2) 3 5 6
3 5 (6)
(3) 5
5
```

## Special Cases · 特殊條件

:::en
- Two tests have T = 1.
- Time limit: 0.5 s.
:::

:::zh
- 有 2 個數據 T = 1。
- 時限：0.5 秒。
:::
