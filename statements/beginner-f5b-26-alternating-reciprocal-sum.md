<!-- bilingual -->
## Description · 題目說明

:::en
Read `n`. Compute `1/1^2 - 2/2^2 + 3/3^2 - 4/4^2 + ... ± n/n^2` and print the answer to 2 decimal places.
:::

:::zh
讀入 `n`，計算 `1/1^2 - 2/2^2 + 3/3^2 - 4/4^2 + ... ± n/n^2`，答案保留 2 位小數。
:::

## Input · 輸入格式

:::en
One integer `n`.
:::

:::zh
一個整數 `n`。
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
8
```

## Sample Output · 範例輸出

```text
Answer: 0.63
```

## Hints · 提示

:::en
- Each term simplifies to `1/i`. It is positive when `i` is odd and negative when `i` is even.
:::

:::zh
- 每一項可化簡成 `1/i`。`i` 是奇數時為正，偶數時為負。
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
