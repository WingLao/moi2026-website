<!-- bilingual -->
## Description · 題目說明

:::en
Print every number from 1 to 500 that is divisible by 13. Then print how many there are and their sum.
:::

:::zh
輸出 1 至 500 之間所有能被 13 整除的數，然後輸出它們的個數和總和。
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
Line 1: the numbers, separated by spaces. Line 2: `Total:` and the count. Line 3: `Sum:` and the sum.
:::

:::zh
第 1 行：這些數，以空格分隔。第 2 行：`Total:` 和個數。第 3 行：`Sum:` 和總和。
:::

## Sample Input · 範例輸入

```text
(no input · 沒有輸入)
```

## Sample Output · 範例輸出

```text
13 26 39 52 65 78 91 104 117 130 143 156 169 182 195 208 221 234 247 260 273 286 299 312 325 338 351 364 377 390 403 416 429 442 455 468 481 494
Total: 38
Sum: 9633
```

## Hints · 提示

:::en
- Use `i % 13 == 0`, a counter and a running sum.
:::

:::zh
- 用 `i % 13 == 0` 判斷，並用一個計數器和一個累加變數。
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
