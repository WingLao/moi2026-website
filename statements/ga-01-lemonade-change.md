# 01 · Lemonade Change

> Greedy Algorithm 練習題。此題已整理成 Problems 比賽題格式，可直接修改本 Markdown 題面和 `data/GA/ga-01-lemonade-change` 測資。

|項目|內容|
|---|---|
|任務名稱|`ga-01-lemonade-change`|
|組別|`GA`|
|難度|`Easy`|
|測資目錄|`data/GA/ga-01-lemonade-change`|
|來源|`LeetCode 860, rewritten as a contest-style problem`|
|對齊範例|`ga-01-lemonade-change-0.in` / `ga-01-lemonade-change-0.out`|

## 題目說明

A lemonade stand sells each cup for 5 dollars. Customers pay in order using 5, 10, or 20 dollar bills. You start with no change. Decide whether every customer can receive the correct change.

## 輸入格式

- The first line contains an integer `n`.
- The second line contains `n` integers, each equal to `5`, `10`, or `20`, representing the bills paid in order.

## 輸出格式

- Print `true` if all customers can be served with correct change; otherwise print `false`.

## 範例輸入

```text
5
5 5 10 10 20
```

## 範例輸出

```text
false
```

## 貪婪提示

Keep counts of 5-dollar and 10-dollar bills. For a 20-dollar bill, prefer giving 10+5 as change, preserving more 5-dollar bills for future customers.

## 限制

- 1 <= n <= 100000
- Each bill is 5, 10, or 20.
