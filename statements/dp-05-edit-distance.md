# 05 · Edit Distance

> 動態規劃（DP）練習題。此題已整理成 Problems 比賽題格式，可直接修改本 Markdown 題面和 `data/DP/dp-05-edit-distance` 測資。

|項目|內容|
|---|---|
|任務名稱|`dp-05-edit-distance`|
|組別|`DP`|
|難度|`Hard`|
|測資目錄|`data/DP/dp-05-edit-distance`|
|來源|`LeetCode 72, rewritten as a contest-style problem`|
|對齊範例|`dp-05-edit-distance-0.in` / `dp-05-edit-distance-0.out`|

## 題目說明

給定兩個只包含小寫英文字母的字串 `word1` 與 `word2`，請輸出把 `word1` 轉換成 `word2` 所需的最少操作次數。允許操作如下：

- 插入一個字元
- 刪除一個字元
- 替換一個字元

## 輸入格式

第一行包含字串 `word1`。
第二行包含字串 `word2`。

## 輸出格式

輸出一行，包含最少操作次數。

## 範例輸入

```text
horse
ros
```

## 範例輸出

```text
3
```

## 提示

- 可設 `dp[i][j]` 表示 `word1` 前 `i` 個字元轉成 `word2` 前 `j` 個字元的最少操作次數。
- 如果目前字元相同，就可直接繼承 `dp[i-1][j-1]`。
- 否則從插入、刪除、替換三種操作中取最小值再加一。

## 限制

- `0 <= len(word1), len(word2) <= 200`
- `word1` 與 `word2` 只包含小寫英文字母。
