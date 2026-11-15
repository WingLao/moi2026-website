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
N runners (numbered 1 to N) run along a long road made of cells numbered 1, 2, 3, …. The road is split into N sections. Section 1 runs from cell 1 to cell D₁, section 2 from D₁+1 to D₂, section 3 from D₂+1 to D₃, and so on; Dᵢ is the end cell of section i.

At the start, runner i stands on the first cell of section i and runs towards larger numbers. There are M wormholes; each connects two cells. When a runner **steps onto** one end of a wormhole, they are sent to the other end and keep running towards larger numbers from there, until they reach an end cell.

The wormholes have these properties:

- the two ends are in different sections;
- no end is a start cell or an end cell of a section;
- each cell is the end of at most one wormhole;
- all ends are inside the N sections;
- the wormholes never create a loop, so every runner always reaches some end cell.

For each runner, find the end cell they reach.
:::

:::zh
有 N 位運動員（編號 1 至 N）在一條長路上跑步，這條路由編號 1、2、3……的路格組成，分成 N 段路段。第 1 段由路格 1 到 D₁，第 2 段由 D₁+1 到 D₂，第 3 段由 D₂+1 到 D₃，如此類推；Dᵢ 是第 i 段的終點。

最初運動員 i 站在第 i 段的起點，然後向大數字方向跑。路上有 M 個蟲洞，每個連接兩個路格。運動員**踏上**蟲洞一端時，會被傳送到另一端，然後從那裏繼續向大數字方向跑，直到到達一個終點為止。

蟲洞的特點：

- 兩端分別在兩個不同的路段上；
- 端口不會在任何起點或終點上；
- 每個路格最多是一個蟲洞的端口；
- 端口都在這 N 段路段之內；
- 蟲洞不會形成任何環，所以每位運動員最終必定到達某個終點。

請求出每位運動員最終到達哪一個終點。
:::

## Input · 輸入格式

:::en
Several test groups. Each group:

- Line 1: two positive integers N and M (2 ≤ N ≤ 500, 1 ≤ M ≤ 4,000).
- Line 2: N positive integers D₁ … D_N, the end cells of the sections (all less than 10⁹).
- Next M lines: two positive integers, the cells at the two ends of a wormhole.

The last line is `0 0`.
:::

:::zh
輸入有若干組數據，每組：

- 第 1 行：兩個正整數 N 和 M（2 ≤ N ≤ 500，1 ≤ M ≤ 4,000）。
- 第 2 行：N 個正整數 D₁ … D_N，依次是各路段終點的路格編號（都小於 10⁹）。
- 接下來 M 行：每行兩個正整數，表示一個蟲洞兩端的路格編號。

最後一行是兩個 `0`。
:::

## Output · 輸出格式

:::en
For each group, one line with N integers: the end cells reached by runners 1 to N.
:::

:::zh
每組數據輸出一行 N 個整數：運動員 1 至 N 所到達的終點路格編號。
:::

## Sample Input · 範例輸入

```text
3 3
6 10 15
3 9
8 12
14 5
0 0
```

## Sample Output · 範例輸出

```text
10 6 15
```

## Explanation · 說明

:::en
Paths ("=>" is a wormhole, ">>" is normal running):

- Runner 1: 1 >> 3 => 9 >> 10
- Runner 2: 7 >> 8 => 12 >> 14 => 5 >> 6
- Runner 3: 11 >> 12 => 8 >> 9 => 3 >> 5 => 14 >> 15
:::

:::zh
各運動員的路線（「=>」表示穿越蟲洞，「>>」表示正常跑）：

- 第一位：1 >> 3 => 9 >> 10
- 第二位：7 >> 8 => 12 >> 14 => 5 >> 6
- 第三位：11 >> 12 => 8 >> 9 => 3 >> 5 => 14 >> 15
:::
