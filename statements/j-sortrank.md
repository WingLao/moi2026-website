<!-- bilingual -->
## Description · 題目說明

:::en
Given N students' names and scores, print the ranking list: higher scores first; students with the same score are sorted by name in alphabetical order.
:::

:::zh
給定 N 個學生的姓名和分數，輸出排名榜：分數高的排前面；分數相同時，按姓名的字母順序排列。
:::

## Input · 輸入格式

:::en
Line 1: an integer N.

Next N lines: a name and a score.
:::

:::zh
第 1 行：一個整數 N。

接下來 N 行：每行一個姓名和一個分數。
:::

## Output · 輸出格式

:::en
N lines, `name score`, sorted by score (descending), then by name (ascending).
:::

:::zh
N 行，每行「姓名 分數」，先按分數由高到低，再按姓名由小到大排序。
:::

## Sample Input · 範例輸入

```text
4
Amy 75
Ben 88
Cody 88
Dora 60
```

## Sample Output · 範例輸出

```text
Ben 88
Cody 88
Amy 75
Dora 60
```

## Constraints · 限制

:::en
- 1 ≤ N ≤ 1000
- Names contain only English letters, with no spaces.
- 0 ≤ score ≤ 100
:::

:::zh
- 1 ≤ N ≤ 1000
- 姓名只含英文字母，沒有空格。
- 0 ≤ score ≤ 100
:::
