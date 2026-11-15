<!-- bilingual -->
## Description · 題目說明

:::en
Given the names and scores of N students, sort them by score from high to low. If two scores are equal, sort by name in alphabetical (dictionary) order.
:::

:::zh
給定 N 個學生的姓名和分數，請按分數由高到低排序。若分數相同，按姓名的字典序由小到大排序。
:::

## Input · 輸入格式

:::en
Line 1: a positive integer N (1 ≤ N ≤ 20).

Next N lines: a name without spaces (length ≤ 10) and an integer score (0 ≤ score ≤ 100), separated by a space.
:::

:::zh
第 1 行：一個正整數 N（1 ≤ N ≤ 20）。

接下來 N 行：每行一個不含空格的姓名（長度 ≤ 10）和一個整數分數（0 ≤ score ≤ 100），以空格分隔。
:::

## Output · 輸出格式

:::en
N lines in sorted order, each `name score`.
:::

:::zh
N 行，按排序後的次序，每行輸出「姓名 分數」。
:::

## Sample Input · 範例輸入

```text
3
Alice 90
Bob 85
Carol 90
```

## Sample Output · 範例輸出

```text
Alice 90
Carol 90
Bob 85
```

## Explanation · 說明

:::en
Alice and Carol both have 90. Alphabetically Alice < Carol, so Alice comes first.
:::

:::zh
Alice 和 Carol 同樣是 90 分，依字典序 Alice < Carol，所以 Alice 排在前面。
:::
