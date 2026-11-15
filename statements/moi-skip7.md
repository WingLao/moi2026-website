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
In the game "skip the sevens", N people stand in a circle. Player 1 says a starting number, the next player says the next number, and so on. If the number a player should say contains the digit 7 or is a multiple of 7, they must skip it (and any following numbers that also must be skipped) and say the next allowed number.

For example, with three players and starting number 3: 1:3, 2:4, 3:5, 1:6, 2:8 (skips 7), 3:9, 1:10, 2:11, 3:12, 1:13, 2:15 (skips 14), 3:16, 1:18 (skips 17), 2:19, 3:20, …

Counting from A to B with nobody making a mistake, how many times does each player have to skip? Skipping several numbers at once (e.g. 27 and 28) counts as **one** skip.
:::

:::zh
「不數七」遊戲中，N 個人圍成一圈。第一個人由某個數字開始數，下一個人數下一個數，如此類推。若輪到某人要數的數字含有 7 或是 7 的倍數，他就要跳過這個（或連續多個）數字，數下一個可以數的數字。

例如三人遊戲、由 3 開始：1:3，2:4，3:5，1:6，2:8（跳過 7），3:9，1:10，2:11，3:12，1:13，2:15（跳過 14），3:16，1:18（跳過 17），2:19，3:20，……

若由 A 數到 B 而大家都沒有數錯，每位玩家需要跳數多少次？一次跳過多個數字（例如同時跳過 27 和 28）只算**一次**。
:::

## Input · 輸入格式

:::en
One line with three positive integers N A B: the number of players (2 ≤ N ≤ 20), and counting goes from A to B (1 ≤ A < B ≤ 10,000,000). A and B are never numbers that must be skipped.
:::

:::zh
只有一行，三個正整數 N A B：玩家人數（2 ≤ N ≤ 20），由 A 數到 B（1 ≤ A < B ≤ 10,000,000）。保證 A 和 B 都不是要被跳過的數字。
:::

## Output · 輸出格式

:::en
One line with N integers separated by spaces: the number of skips of players 1 to N.
:::

:::zh
一行 N 個整數，以空格分隔：玩家 1 至 N 各自跳數的次數。
:::

## Sample Input · 範例輸入

```text
3 4 30
```

## Sample Output · 範例輸出

```text
2 1 2
```
