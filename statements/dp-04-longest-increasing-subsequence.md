# 04 · Longest Increasing Subsequence

> 動態規劃（DP）練習題。此題已整理成 Problems 比賽題格式，可直接修改本 Markdown 題面和 `data/DP/dp-04-longest-increasing-subsequence` 測資。

|項目|內容|
|---|---|
|任務名稱|`dp-04-longest-increasing-subsequence`|
|組別|`DP`|
|難度|`Medium`|
|測資目錄|`data/DP/dp-04-longest-increasing-subsequence`|
|來源|`LeetCode 300, rewritten as a contest-style problem`|
|對齊範例|`dp-04-longest-increasing-subsequence-0.in` / `dp-04-longest-increasing-subsequence-0.out`|

## 題目說明

給定一個長度為 `n` 的整數序列，請找出其中最長嚴格遞增子序列（Longest Increasing Subsequence, LIS）的長度。子序列不需要連續，但必須保持原本順序。

## 輸入格式

第一行包含一個整數 `n`。
第二行包含 `n` 個整數，表示序列中的元素。

## 輸出格式

輸出一行，包含最長嚴格遞增子序列的長度。

## 範例輸入

```text
8
10 9 2 5 3 7 101 18
```

## 範例輸出

```text
4
```

## 提示

- 可定義 `dp[i]` 為「以第 `i` 個數結尾」的最長遞增子序列長度。
- 對每個 `i`，檢查所有 `j < i` 且 `a[j] < a[i]` 的位置做轉移。

## 限制

- `1 <= n <= 2000`
- `-10^9 <= a[i] <= 10^9`
