<!-- bilingual -->
## Description · 題目說明

:::en
You are given a string of lowercase letters and underscores `_`. An underscore is never the first or last character, and no two underscores are next to each other.

Replace every underscore with a lowercase letter that lies **between** its left and right neighbours in alphabetical order (equal is allowed). For example, in `"f_h"` (or `"h_f"`) the underscore can be `f`, `g` or `h`.

Print every possible way to fill in the string.
:::

:::zh
給定一個只含小寫英文字母和底線 `_` 的字串。底線不會出現在第一個或最後一個位置，也不會連續出現。

把每個底線換成一個小寫字母，條件是這個字母的字母順序必須在它左右兩個字母**之間**（可以相同）。例如 `"f_h"`（或 `"h_f"`）中，底線可以填 `f`、`g` 或 `h`。

請找出所有符合要求的填法。
:::

## Input · 輸入格式

:::en
One line with such a string.
:::

:::zh
只有一行，一個符合上述說明的字串。
:::

## Output · 輸出格式

:::en
One filled string per line, each the same length as the input. Print them in dictionary order, from smallest to largest.
:::

:::zh
每行輸出一個填好的字串，長度與輸入相同。按字典序由小到大輸出。
:::

## Sample Input · 範例輸入

```text
a_d_c
```

## Sample Output · 範例輸出

```text
aadcc
aaddc
abdcc
abddc
acdcc
acddc
addcc
adddc
```

## Special Cases · 特殊條件

:::en
- At least one test has exactly 1 `_`, one has exactly 2, and one has exactly 3.
- Every string is shorter than 80 characters.
- Every string has at most 10 `_`.
- Each test prints fewer than 150,000 strings.
- Time limit: 0.5 s.
:::

:::zh
- 最少有 1 個數據只有 1 個 `_`，最少 1 個只有 2 個，最少 1 個只有 3 個。
- 所有字串長度都少於 80。
- 所有字串的 `_` 都少於或等於 10 個。
- 每個測試數據輸出的字串總數少於 150,000。
- 時限：0.5 秒。
:::
