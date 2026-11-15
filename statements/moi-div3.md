<!-- bilingual -->
## Note · 注意

:::en
MOI practice problem. Python 3 or C++17. Read from standard input and print to standard output.
:::

:::zh
MOI 練習題。可用 Python 3 或 C++17，從標準輸入讀入、輸出到標準輸出。
:::

## Description · 題目說明

:::en
Siu Ming loves the number 3. He knows that a number is divisible by 3 exactly when the sum of its digits is divisible by 3.

All his passwords are 8-digit positive integers that contain no digit 0 and are divisible by 3. He wrote them in a notebook, but worms ate some digits. Find every possible original password.
:::

:::zh
小明特別喜歡數字 3。他知道判斷一個整數能否被 3 整除，最簡單的方法是把各位數字加起來，若和能被 3 整除，原本的整數也能被 3 整除。

他的密碼都是 8 位正整數，不含數字 0，而且一定能被 3 整除。他把密碼寫在小冊子上，但部分數字被蟲蛀掉了。請找出密碼所有可能的原貌。
:::

## Input · 輸入格式

:::en
One 8-digit integer. Each digit `0` marks a digit eaten by worms. There is at least one and at most three `0`s.
:::

:::zh
一個 8 位整數，其中的 `0` 代表被蛀掉的數字。最少有一個、最多有三個 `0`。
:::

## Output · 輸出格式

:::en
Every possible password, one per line, from smallest to largest. Each `0` is replaced by a digit 1–9, and every number printed must be divisible by 3.
:::

:::zh
每行一個可能的密碼，由小至大列出。每個 `0` 都換成 1–9 的數字，而且輸出的每個數都必須能被 3 整除。
:::

## Sample Input · 範例輸入

```text
17460941
```

## Sample Output · 範例輸出

```text
17461941
17464941
17467941
```

## Subtasks · 數據範圍

:::en
10 tests: 3 with one `0`, 3 with two `0`s, 4 with three `0`s.
:::

:::zh
共 10 個數據：3 個只有一個 `0`，3 個有兩個 `0`，4 個有三個 `0`。
:::
