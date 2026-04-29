# 05 · Item Stacking

> Greedy Algorithm 練習題。此題已整理成 Problems 比賽題格式，可直接修改本 Markdown 題面和 `data/GA/ga-05-item-stacking` 測資。

|項目|內容|
|---|---|
|任務名稱|`ga-05-item-stacking`|
|組別|`GA`|
|難度|`Hard`|
|測資目錄|`data/GA/ga-05-item-stacking`|
|來源|`APCS-style greedy exchange argument problem`|
|對齊範例|`ga-05-item-stacking-0.in` / `ga-05-item-stacking-0.out`|

## 題目說明

There are `n` items stacked vertically. To access an item, all items above it must be lifted. Item `i` has weight `w_i` and will be accessed `f_i` times. Arrange the stack from top to bottom to minimize total lifting energy.

## 輸入格式

- The first line contains an integer `n`.
- The next `n` lines each contain two integers `w_i` and `f_i`.

## 輸出格式

- Print the minimum total energy.

## 範例輸入

```text
3
2 3
4 1
1 5
```

## 範例輸出

```text
6
```

## 貪婪提示

For two items `A` above `B`, the pair cost is `w_A * f_B`; after swapping, it is `w_B * f_A`. Put `A` above `B` when `w_A * f_B < w_B * f_A`, equivalent to sorting by increasing `w / f` without floating-point division.

## 限制

- 1 <= n <= 200000
- 1 <= w_i, f_i <= 1000000
- The answer fits in a signed 64-bit integer.
