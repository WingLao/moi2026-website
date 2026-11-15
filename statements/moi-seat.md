<!-- bilingual -->
## Note · 注意

:::en
MOI practice problem. Python 3 or C++17. Read from standard input and print to standard output.
:::

:::zh
MOI 練習題。可用 Python 3 或 C++17，從標準輸入讀入、輸出到標準輸出。
:::

## Description · 題目說明

:::en
N people queue at the door of a school talent show; number them 1 … N in queue order. Each holds a ticket with a seat number, and you lead them to their seats. Unfortunately some tickets were printed wrongly: seat numbers may repeat or be outside the real seats 1 … N.

Your method: go through the queue in order. If a person's seat number is valid and the seat is still empty, seat them there. Otherwise, send them to a waiting line. After everyone with a usable ticket is seated, take the people in the waiting line in order and give each one the empty seat with the smallest number.

For each seat, which person (queue number) sits in it?
:::

:::zh
學校舉行才藝表演，N 位觀眾在門口排隊，按排隊次序編號 1 … N。每人手持一張印有座位編號的門票，你負責帶他們入座。可是印票出了差錯：座位編號可能重複，甚至不在實際座位 1 … N 範圍內。

你的方法：按排隊次序逐一處理。若某人的座位編號正確而且該座位仍然空着，就帶他入座；否則讓他到另一條暫時等候的隊伍。所有能對號入座的觀眾坐好後，再按等候隊伍的次序，逐一安排他們坐到編號最小的空座位。

請問每個座位上坐的是哪一位觀眾（排隊編號）？
:::

## Input · 輸入格式

:::en
Several test groups. Each group:

- Line 1: a positive integer N, the number of people (1 ≤ N ≤ 200).
- Line 2: N integers, the seat numbers on the tickets in queue order.

The last line is a single `0`.
:::

:::zh
輸入有若干組數據，每組：

- 第 1 行：一個正整數 N，觀眾總數（1 ≤ N ≤ 200）。
- 第 2 行：N 個整數，依排隊次序是各人門票上的座位編號。

最後一行只有一個 `0`。
:::

## Output · 輸出格式

:::en
For each group, one line with N integers: the queue numbers of the people sitting in seats 1 to N.
:::

:::zh
每組數據輸出一行 N 個整數：依次是坐在座位 1 至 N 上的觀眾的排隊編號。
:::

## Sample Input · 範例輸入

```text
10
9 8 1 4 12 8 2 1 3 11
5
1 1 1 1 1
0
```

## Sample Output · 範例輸出

```text
3 7 9 4 5 6 8 2 1 10
1 2 3 4 5
```
