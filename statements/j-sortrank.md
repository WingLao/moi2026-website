# SORTRANK (sortrank)

> 此網站版本改用 Markdown 題面，範例輸入 / 輸出直接對齊 `data` 內的 `*-0.in` / `*-0.out`，避免題面與測資不一致。

|項目|內容|
|---|---|
|任務名稱|`sortrank`|
|組別|`J`|
|測資目錄|`data/J/sortrank`|
|原始 PDF|`J-sortrank.pdf`|
|對齊範例|`sortrank-0.in` / `sortrank-0.out`|

## 輸入格式

The first line contains an integer N.

Each of the next N lines contains a name and a score.

## 輸出格式

Print the ranking list sorted by score descending.

If two students have the same score, sort them by name in ascending alphabetical order.

## 範例輸入

```text
4
Amy 75
Ben 88
Cody 88
Dora 60
```

## 範例輸出

```text
Ben 88
Cody 88
Amy 75
Dora 60
```

## 限制

1 <= N <= 1000

Names contain only English letters and no spaces.

0 <= score <= 100
