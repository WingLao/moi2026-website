# 02 · Maximum Units on a Truck

> Greedy Algorithm 練習題。此題已整理成 Problems 比賽題格式，可直接修改本 Markdown 題面和 `data/GA/ga-02-maximum-units-truck` 測資。

|項目|內容|
|---|---|
|任務名稱|`ga-02-maximum-units-truck`|
|組別|`GA`|
|難度|`Easy`|
|測資目錄|`data/GA/ga-02-maximum-units-truck`|
|來源|`LeetCode 1710, rewritten as a contest-style problem`|
|對齊範例|`ga-02-maximum-units-truck-0.in` / `ga-02-maximum-units-truck-0.out`|

## 題目說明

A truck can carry at most `k` boxes. There are several box types. For each type, you know how many boxes exist and how many units each box contains. Maximize the total units loaded onto the truck.

## 輸入格式

- The first line contains two integers `m` and `k`.
- The next `m` lines each contain two integers `count` and `units`, describing one box type.

## 輸出格式

- Print the maximum total number of units that can be loaded.

## 範例輸入

```text
3 4
1 3
2 2
3 1
```

## 範例輸出

```text
8
```

## 貪婪提示

Sort box types by `units` descending. Load the highest-value boxes first until the truck is full.

## 限制

- 1 <= m <= 100000
- 1 <= k <= 1000000000
- 1 <= count, units <= 100000
