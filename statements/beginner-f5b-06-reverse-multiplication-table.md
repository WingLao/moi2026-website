<!-- bilingual -->
## Description · 題目說明

:::en
Print the multiplication table from 10 down to 1. Row `i` shows the products `i*1` up to `i*i`.
:::

:::zh
由 10 倒數到 1 輸出乘數表。第 `i` 行輸出 `i*1` 至 `i*i` 的乘積。
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
10 lines. Each item has the form `i*j=product`, separated by spaces (see the sample).
:::

:::zh
共 10 行。每一項的格式是 `i*j=乘積`，以空格分隔（見範例）。
:::

## Sample Input · 範例輸入

```text
(no input · 沒有輸入)
```

## Sample Output · 範例輸出

```text
10*1=10 10*2=20 10*3=30 10*4=40 10*5=50 10*6=60 10*7=70 10*8=80 10*9=90 10*10=100
9*1=9 9*2=18 9*3=27 9*4=36 9*5=45 9*6=54 9*7=63 9*8=72 9*9=81
8*1=8 8*2=16 8*3=24 8*4=32 8*5=40 8*6=48 8*7=56 8*8=64
7*1=7 7*2=14 7*3=21 7*4=28 7*5=35 7*6=42 7*7=49
6*1=6 6*2=12 6*3=18 6*4=24 6*5=30 6*6=36
5*1=5 5*2=10 5*3=15 5*4=20 5*5=25
4*1=4 4*2=8 4*3=12 4*4=16
3*1=3 3*2=6 3*3=9
2*1=2 2*2=4
1*1=1
```

## Hints · 提示

:::en
- Use a nested loop: the outer loop goes from 10 down to 1, the inner loop from 1 to `i`.
:::

:::zh
- 使用巢狀迴圈：外層由 10 倒數到 1，內層由 1 數到 `i`。
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
