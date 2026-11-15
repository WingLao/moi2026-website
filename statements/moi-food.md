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
You are a food expert and you have a table that, for any two foods a and b, gives your pleasure value when you eat a and **immediately** after it eat b. The value may be negative.

A friend has N foods numbered 1 to N for a dinner party and asks you to choose a menu with the highest total pleasure (the sum of the values of every two consecutive dishes). Rules:

- Foods must be served in increasing order of their numbers (if b > a, b can only come after a).
- Each food appears at most once, and at least one food must be chosen.
- No two consecutive dishes may have a negative pleasure value.
:::

:::zh
你是一位美食專家，你有一個表：對任何兩種食物 a 和 b，表中列出先吃 a、**緊接着**吃 b 時的愉快值。愉快值可能是負數。

你的朋友為晚宴準備了 N 種食物，編號 1 至 N，請你選出總愉快值（每兩道連續食物的愉快值之和）最高的菜單。規則：

- 食物必須按編號由小到大出場（若 b > a，b 只能在 a 之後出現）。
- 每種食物最多出現一次，而且最少要選一種。
- 任何兩道連續的食物，愉快值都不可以是負數。
:::

## Input · 輸入格式

:::en
Several test groups. Each group:

- Line 1: two integers N and F (2 ≤ N ≤ 50). F tells which output format to use (see Output).
- Next N lines: N integers each. The j-th number on line i is the pleasure of eating food j right after food i. It is 0 when i = j; all other values are non-zero with absolute value at most 200.

The last line is a single `0`. All groups in one test file have the same F.
:::

:::zh
輸入有若干組數據，每組：

- 第 1 行：兩個整數 N 和 F（2 ≤ N ≤ 50）。F 決定輸出格式（見輸出說明）。
- 接下來 N 行：每行 N 個整數，第 i 行第 j 個數是先吃食物 i、接着吃食物 j 的愉快值。i = j 時為 0；其他數值都不為 0，絕對值不超過 200。

最後一行只有一個 `0`。同一個測試檔案內所有數據的 F 值相同。
:::

## Output · 輸出格式

:::en
**If F = 0:** one line with the highest total pleasure.

**If F = 1:** two lines: the highest total pleasure; then M (the number of foods chosen) followed by the M food numbers in order.

If several menus give the highest total, print the one that is smallest in dictionary order, comparing food numbers one by one (a shorter list that is a prefix of a longer one is smaller), e.g. [1] < [1,3,5] < [2,3] < [3].
:::

:::zh
**當 F = 0：** 輸出一行，最高總愉快值。

**當 F = 1：** 輸出兩行：最高總愉快值；然後是 M（所選食物數目）和依次的 M 個食物編號。

若有多種菜單同樣得到最高總愉快值，輸出字典序最小的一種：逐個比較食物編號，較短而且是另一個開頭的列表較小，例如 [1] < [1,3,5] < [2,3] < [3]。
:::

## Sample Input 1 · 範例輸入 1

```text
4 0
0 3 6 16
3 0 8 7
-2 9 0 -1
1 10 10 0
4 0
0 6 14 6
3 0 6 4
1 9 0 7
5 8 2 0
0
```

## Sample Output 1 · 範例輸出 1

```text
16
21
```

## Sample Input 2 · 範例輸入 2

```text
4 1
0 3 6 16
3 0 8 7
-2 9 0 -1
1 10 10 0
4 1
0 6 14 6
3 0 6 4
1 9 0 7
5 8 2 0
0
```

## Sample Output 2 · 範例輸出 2

```text
16
2 1 4
21
3 1 3 4
```

## Explanation 2 · 說明 2

:::en
Sample 2 is the same as sample 1 except that F = 1.
:::

:::zh
樣例 2 與樣例 1 相同，只是 F = 1。
:::
