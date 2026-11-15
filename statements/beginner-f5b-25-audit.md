<!-- bilingual -->
## Description · 題目說明

:::en
Read two lists. Count how many values appear in both lists. Repeated values count separately (for example, if 3 appears twice in both lists it counts as 2).
:::

:::zh
讀入兩個列表，數一數有多少個數同時出現在兩個列表中。重複的數要分開計算（例如 3 在兩個列表都出現兩次，就算 2 個）。
:::

## Input · 輸入格式

:::en
Line 1: the first list. Line 2: the second list. Numbers are separated by spaces.
:::

:::zh
第 1 行：第一個列表。第 2 行：第二個列表。數字以空格分隔。
:::

## Output · 輸出格式

:::en
One integer: the number of common values.
:::

:::zh
一個整數：共同數值的個數。
:::

## Sample Input · 範例輸入

```text
2 3 3 5 1 2 3 4 5 8 9
3 0 7 4 5 6 3
```

## Sample Output · 範例輸出

```text
4
```

## Hints · 提示

:::en
- Sort both lists and use two pointers. When the values match, move both pointers.
:::

:::zh
- 把兩個列表排序，用雙指針；數值相同時兩個指針都向前移。
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
