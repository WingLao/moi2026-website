# 動態規劃整理

## 1. 主題總覽

| 項目 | 內容 |
| --- | --- |
| 定義 | 把大問題拆成小問題，並把算過的答案存起來 |
| 適用條件 | 最優子結構、重複子問題 |
| 常見做法 | 記憶化搜尋、表格法 |
| 核心能力 | 狀態定義、轉移公式、初始值、填表順序 |

## 2. 做 DP 題的標準流程

| 步驟 | 要想什麼 |
| --- | --- |
| 1. 定義狀態 | `dp[i]` 或 `dp[i][j]` 代表什麼 |
| 2. 找轉移公式 | 目前答案由哪些更小狀態推出 |
| 3. 設初始值 | 最小子問題的答案是什麼 |
| 4. 決定填表順序 | 先算哪些格子 |
| 5. 找最終答案 | 最後答案在哪個位置 |

## 3. 常見做法

| 方法 | 特色 | 適合情況 |
| --- | --- | --- |
| Top-down | 遞迴加記憶化 | 關係清楚、想從定義出發 |
| Bottom-up | 由小到大填表 | 考試常見、教學最穩定 |

## 4. 經典例題

| 題目 | 狀態定義 | 轉移公式 | 範例答案 |
| --- | --- | --- | --- |
| 爬樓梯 | `dp[i]` = 到第 `i` 階的方法數 | `dp[i] = dp[i-1] + dp[i-2]` | `n = 5` 時 `8` |
| Coin Change | `dp[i]` = 湊出金額 `i` 的最少硬幣數 | `dp[i] = min(dp[i], dp[i-coin] + 1)` | `amount = 11` 時 `3` |
| LIS | `dp[i]` = 以第 `i` 個元素結尾的 LIS 長度 | 若 `nums[j] < nums[i]`，則 `dp[i] = max(dp[i], dp[j] + 1)` | 範例答案 `4` |

## 5. Python 參考解

### 5.1 爬樓梯

![爬樓梯例題：每一階的方法數，都是前一階和前兩階的方法數相加。](/teaching/dp-climbing-stairs.svg)

```python
def climb_stairs(n):
    if n <= 2:
        return n

    dp = [0] * (n + 1)
    dp[1] = 1
    dp[2] = 2

    for i in range(3, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]

    return dp[n]
```

### 5.2 Coin Change

![Coin Change 例題：用表格觀察較小金額如何推到較大金額，最後得到 amount = 6 的最少硬幣數。](/teaching/dp-coin-change.svg)

```python
def coin_change(coins, amount):
    INF = float("inf")
    dp = [INF] * (amount + 1)
    dp[0] = 0

    for i in range(1, amount + 1):
        for coin in coins:
            if i - coin >= 0:
                dp[i] = min(dp[i], dp[i - coin] + 1)

    return dp[amount] if dp[amount] != INF else -1
```

### 5.3 LIS

```python
def length_of_lis(nums):
    n = len(nums)
    dp = [1] * n

    for i in range(n):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)

    return max(dp)
```

## 6. 常見 DP 類型

| 類型 | 例子 | 重點 |
| --- | --- | --- |
| 一維 DP | 爬樓梯、打家劫舍、最少硬幣數 | 往前看前幾格 |
| 二維 DP | LCS、編輯距離、01 背包 | 狀態有兩個維度 |
| 區間 DP | 合併石子、回文子序列 | 狀態是一段區間 |
| 背包 DP | 0/1 背包、完全背包 | 容量與轉移順序很重要 |

## 7. 常見錯誤

| 錯誤 | 說明 | 修正方式 |
| --- | --- | --- |
| 狀態定義不清 | 不知道 `dp[i]` 到底代表什麼 | 先用完整中文寫出定義 |
| 初始值設錯 | 公式對但答案仍錯 | 先檢查 base case |
| 填表順序錯 | 依賴值還沒算出來 | 按依賴方向填表 |
| 暴力遞迴 | 重複計算太多 | 改成記憶化或 Bottom-up |

## 8. 課堂練習

| 題目 | 答案 |
| --- | --- |
| `n = 6`，求爬樓梯方法數 | `13` |
| `coins = [1, 3, 4]`，`amount = 6`，求最少硬幣數 | `2` |
| `nums = [0, 1, 0, 3, 2, 3]`，求 LIS 長度 | `4` |
| `text1 = "abcde"`，`text2 = "ace"`，求 LCS 長度 | `3` |

## 9. 延伸題目

| 平台 | 題目 | 重點 |
| --- | --- | --- |
| 洛谷 | P1216 數字三角形 | 二維 DP 入門 |
| 洛谷 | P1048 採藥 | 0/1 背包 |
| 洛谷 | P1616 疯狂的采药 | 完全背包 |
| LeetCode | 70. Climbing Stairs | DP 入門 |
| LeetCode | 198. House Robber | 一維 DP |
| LeetCode | 322. Coin Change | 最少硬幣數 |
| LeetCode | 300. Longest Increasing Subsequence | LIS |
| LeetCode | 1143. Longest Common Subsequence | 二維 DP |

## 10. 一句總結

> DP 最重要的不是背公式，而是先定義清楚狀態，再決定怎樣由小推大。
