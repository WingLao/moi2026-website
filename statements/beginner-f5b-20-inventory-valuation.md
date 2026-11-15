<!-- bilingual -->
## Description · 題目說明

:::en
Use the two fixed dictionaries below and print the total value of the inventory (price × stock, added together for every item).

- `prices = {"pen": 10, "pencil": 5, "eraser": 8}`
- `stock = {"pen": 20, "pencil": 50, "eraser": 10}`
:::

:::zh
使用下面兩個固定的字典，輸出存貨總值（每件貨品的「價錢 × 數量」加起來）。

- `prices = {"pen": 10, "pencil": 5, "eraser": 8}`
- `stock = {"pen": 20, "pencil": 50, "eraser": 10}`
:::

## Input · 輸入格式

:::en
This problem has no input.
:::

:::zh
本題沒有輸入。
:::

## Output · 輸出格式

:::en
One integer: the total value.
:::

:::zh
一個整數：存貨總值。
:::

## Sample Input · 範例輸入

```text
(no input · 沒有輸入)
```

## Sample Output · 範例輸出

```text
630
```

## Hints · 提示

:::en
- Loop over the keys of `prices` and look up the same key in `stock`.
:::

:::zh
- 逐一取出 `prices` 的鍵，再到 `stock` 找同一個鍵。
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
