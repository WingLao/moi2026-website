# 01 · Fibonacci Number

> 動態規劃（DP）練習題。此題已整理成 Problems 比賽題格式，可直接修改本 Markdown 題面和 `data/DP/dp-01-fibonacci-number` 測資。

|項目|內容|
|---|---|
|任務名稱|`dp-01-fibonacci-number`|
|組別|`DP`|
|難度|`Easy`|
|測資目錄|`data/DP/dp-01-fibonacci-number`|
|來源|`LeetCode 509, rewritten as a contest-style problem`|
|對齊範例|`dp-01-fibonacci-number-0.in` / `dp-01-fibonacci-number-0.out`|

## 題目說明

給定一個整數 `n`，請你輸出費氏數列第 `n` 項 `F(n)`。定義如下：

- `F(0) = 0`
- `F(1) = 1`
- `F(n) = F(n-1) + F(n-2)`，其中 `n >= 2`

## 輸入格式

第一行包含一個整數 `n`。

## 輸出格式

輸出一行，包含 `F(n)` 的值。

## 範例輸入

```text
4
```

## 範例輸出

```text
3
```

## 提示

- 這是一題基礎的一維 DP。
- 由小到大計算 `F(0), F(1), ..., F(n)` 即可。

## 限制

- `0 <= n <= 45`
