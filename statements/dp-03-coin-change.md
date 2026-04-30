# 03 · Coin Change

> 動態規劃（DP）練習題。此題已整理成 Problems 比賽題格式，可直接修改本 Markdown 題面和 `data/DP/dp-03-coin-change` 測資。

|項目|內容|
|---|---|
|任務名稱|`dp-03-coin-change`|
|組別|`DP`|
|難度|`Medium`|
|測資目錄|`data/DP/dp-03-coin-change`|
|來源|`LeetCode 322, rewritten as a contest-style problem`|
|對齊範例|`dp-03-coin-change-0.in` / `dp-03-coin-change-0.out`|

## 題目說明

給定 `n` 種硬幣面額，以及一個目標金額 `amount`。每種硬幣可以使用任意多次。請輸出湊成 `amount` 所需的最少硬幣數量；如果無法湊出，請輸出 `-1`。

## 輸入格式

第一行包含兩個整數 `n` 和 `amount`。
第二行包含 `n` 個正整數，表示各種硬幣面額。

## 輸出格式

輸出一行，包含最少硬幣數量；若無法湊出則輸出 `-1`。

## 範例輸入

```text
3 11
2 5 6
```

## 範例輸出

```text
2
```

## 提示

- 這是一題完全背包 DP。
- 可設 `dp[x]` 表示湊出總額 `x` 所需的最少硬幣數量。
- 若 `dp[amount]` 最後仍是無法達成的狀態，輸出 `-1`。

## 限制

- `1 <= n <= 30`
- `0 <= amount <= 10000`
- `1 <= coin[i] <= 10000`
