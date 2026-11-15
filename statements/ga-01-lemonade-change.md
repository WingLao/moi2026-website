<!-- bilingual -->
## Description · 題目說明

:::en
A lemonade stand sells each cup for \$5. Customers pay one by one with a \$5, \$10 or \$20 bill. You start with no change. Decide whether every customer can receive the correct change.
:::

:::zh
檸檬水攤每杯賣 5 元。顧客按次序付款，每人付一張 5 元、10 元或 20 元紙幣。你一開始沒有任何零錢。請判斷能否給每位顧客找回正確的零錢。
:::

## Input · 輸入格式

:::en
- Line 1: an integer `n`.
- Line 2: `n` integers, each `5`, `10` or `20`: the bills paid, in order.
:::

:::zh
- 第 1 行：一個整數 `n`。
- 第 2 行：`n` 個整數，每個是 `5`、`10` 或 `20`，依次表示顧客付的紙幣。
:::

## Output · 輸出格式

:::en
Print `true` if every customer can get correct change; otherwise print `false`.
:::

:::zh
如果每位顧客都能找到正確零錢，輸出 `true`；否則輸出 `false`。
:::

## Sample Input · 範例輸入

```text
5
5 5 10 10 20
```

## Sample Output · 範例輸出

```text
false
```

## Hints · 提示

:::en
Count your \$5 and \$10 bills. For a \$20 bill, give \$10 + \$5 if you can, so you keep more \$5 bills for later customers.
:::

:::zh
記住手上有幾張 5 元和 10 元。收到 20 元時，能找「10 + 5」就優先這樣找，以保留更多 5 元給後面的顧客。
:::

## Constraints · 限制

:::en
- 1 ≤ n ≤ 100000
- Each bill is 5, 10 or 20.
:::

:::zh
- 1 ≤ n ≤ 100000
- 每張紙幣是 5、10 或 20。
:::
