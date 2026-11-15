<!-- bilingual -->
## Description · 題目說明

:::en
Read integers separated by a comma and a space. Print the original list, then a new list in which every value below the average is replaced by 0.
:::

:::zh
讀入以「逗號加空格」分隔的整數。先輸出原本的列表，再輸出把低於平均值的數全部換成 0 之後的新列表。
:::

## Input · 輸入格式

:::en
One line of integers separated by `, ` (a comma and a space).
:::

:::zh
一行整數，以 `, `（逗號加空格）分隔。
:::

## Output · 輸出格式

:::en
Two lines: the original list and the new list, both in Python list format.
:::

:::zh
兩行：原本的列表和新列表，都用 Python 列表格式。
:::

## Sample Input · 範例輸入

```text
5, 10, 15, 20, 25, 30
```

## Sample Output · 範例輸出

```text
[5, 10, 15, 20, 25, 30]
[0, 0, 15, 20, 25, 30]
```

## Hints · 提示

:::en
- Only values **strictly less** than the average become 0.
:::

:::zh
- 只有**嚴格小於**平均值的數才換成 0。
:::

## Constraints · 限制

:::en
- Language: Python 3 or C++17.
- Your output must match the sample output exactly, including labels such as `Sum:` and every space.
:::

:::zh
- 語言：Python 3 或 C++17。
- 輸出必須和範例輸出完全一樣，包括 `Sum:` 之類的標籤和每一個空格。
:::
