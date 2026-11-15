<!-- bilingual -->
## Description · 題目說明

:::en
Read an even integer `n`. Compute `1/2^2 - 2/3^2 + 3/4^2 - ... + (n-1)/n^2` and print the answer to 2 decimal places.
:::

:::zh
讀入一個偶數 `n`，計算 `1/2^2 - 2/3^2 + 3/4^2 - ... + (n-1)/n^2`，答案保留 2 位小數。
:::

## Input · 輸入格式

:::en
One even integer `n`.
:::

:::zh
一個偶數 `n`。
:::

## Output · 輸出格式

:::en
One line: `Answer:` followed by the value with 2 decimal places.
:::

:::zh
一行：`Answer:`，後面接答案（2 位小數）。
:::

## Sample Input · 範例輸入

```text
10
```

## Sample Output · 範例輸出

```text
Answer: 0.09
```

## Hints · 提示

:::en
- Let the denominator be `k^2` with `k` from 2 to `n`. The term is positive when `k` is even and negative when `k` is odd.
:::

:::zh
- 設分母是 `k^2`，`k` 由 2 到 `n`。`k` 是偶數時該項為正，奇數時為負。
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
