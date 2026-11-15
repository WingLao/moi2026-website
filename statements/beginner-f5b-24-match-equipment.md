<!-- bilingual -->
## Description · 題目說明

:::en
Each player needs equipment whose strength is at least the player's requirement. Each piece of equipment can be used by only one player. Print the maximum number of players who can get equipment.
:::

:::zh
每位球員需要強度不低於他要求的器材，每件器材只可以給一位球員。輸出最多有多少位球員能配到器材。
:::

## Input · 輸入格式

:::en
Line 1: the players' requirements. Line 2: the equipment strengths. Numbers are separated by spaces.
:::

:::zh
第 1 行：各球員的要求。第 2 行：各器材的強度。數字以空格分隔。
:::

## Output · 輸出格式

:::en
One integer: the maximum number of matched players.
:::

:::zh
一個整數：最多能配對的球員數。
:::

## Sample Input · 範例輸入

```text
1 2
2 3 4
```

## Sample Output · 範例輸出

```text
2
```

## Hints · 提示

:::en
- Sort both lists and use two pointers.
:::

:::zh
- 把兩個列表排序，再用雙指針。
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
