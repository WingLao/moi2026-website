# 03 · Non-overlapping Intervals

> Greedy Algorithm 練習題。此題已整理成 Problems 比賽題格式，可直接修改本 Markdown 題面和 `data/GA/ga-03-non-overlapping-intervals` 測資。

|項目|內容|
|---|---|
|任務名稱|`ga-03-non-overlapping-intervals`|
|組別|`GA`|
|難度|`Medium`|
|測資目錄|`data/GA/ga-03-non-overlapping-intervals`|
|來源|`LeetCode 435, rewritten as a contest-style problem`|
|對齊範例|`ga-03-non-overlapping-intervals-0.in` / `ga-03-non-overlapping-intervals-0.out`|

## 題目說明

You are given `n` half-open intervals `[l, r)`. Remove as few intervals as possible so that the remaining intervals do not overlap.

## 輸入格式

- The first line contains an integer `n`.
- The next `n` lines each contain two integers `l` and `r`.

## 輸出格式

- Print the minimum number of intervals that must be removed.

## 範例輸入

```text
4
1 2
2 3
3 4
1 3
```

## 範例輸出

```text
1
```

## 貪婪提示

Sort by ending time ascending. Always keep the interval that ends earliest, because it leaves the most room for future intervals.

## 限制

- 1 <= n <= 100000
- -1000000000 <= l < r <= 1000000000
