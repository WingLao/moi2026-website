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
A company has N employees numbered 1 to N. Each has an experience value and a salary index; for historical reasons these are not always in proportion.

You must build the largest possible project team such that:

1. a member with higher experience never has a lower salary index than any member with lower experience;
2. several members may have the same experience, and then their salary indices may differ freely.
:::

:::zh
某公司有 N 位職員，編號 1 至 N，每人有一個經驗值和一個年薪指數。由於歷史原因，兩者不一定成正比。

請選出最多的成員組成專案團隊，條件是：

1. 經驗值較高的團員，年薪指數不能低於任何經驗值較低的團員；
2. 團員中可以有多個相同經驗值的成員，他們之間的年薪指數可以不同。
:::

## Input · 輸入格式

:::en
Several test groups. Each group:

- Line 1: a positive integer N, the number of employees (2 ≤ N ≤ 7,000; the total N in one file is at most 70,000).
- Line 2: N positive integers, the experience values of employees 1 to N.
- Line 3: N positive integers, the salary indices of employees 1 to N.

The last line is a single `0`.
:::

:::zh
輸入有若干組數據，每組：

- 第 1 行：一個正整數 N，職員數目（2 ≤ N ≤ 7,000；同一個測試檔案內所有 N 的總和不超過 70,000）。
- 第 2 行：N 個正整數，依次是職員 1 至 N 的經驗值。
- 第 3 行：N 個正整數，依次是職員 1 至 N 的年薪指數。

最後一行只有一個 `0`。
:::

## Output · 輸出格式

:::en
For each group:

- Line 1: M, the size of the largest valid team.
- Line 2: the M member numbers in increasing order.

If several largest teams exist, print any one of them.
:::

:::zh
每組數據：

- 第 1 行：M，符合要求的最大團隊人數。
- 第 2 行：M 個團員編號，由小到大排列。

若有多種最大團隊，輸出其中一種即可。
:::

## Sample Input · 範例輸入

```text
3
3 1 2
6 5 10
5
4 1 2 2 3
18 7 6 8 10
0
```

## Sample Output · 範例輸出

```text
2
1 2
4
1 3 4 5
```

## Explanation · 說明

:::en
For the first group, `2` / `2 3` is also a correct answer.
:::

:::zh
第一組測試數據中，`2` / `2 3` 也是正確答案。
:::

## Subtasks · 數據範圍

:::en
- 10 points: all experience values and all salary indices are different.
- 10 points: all salary indices are different, but experience values repeat.
- Other tests have no special limits.
:::

:::zh
- 10 分：所有經驗值及年薪指數均不相同。
- 10 分：所有年薪指數均不相同，但經驗值有重複。
- 其他測試數據沒有特別限制。
:::
