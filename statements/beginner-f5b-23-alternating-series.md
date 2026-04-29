# F5B 23 · Alternating Series Value

> F5B Python 課堂練習。此題已整理成 Problems 題目範本，可直接修改本 Markdown 題面和 `data/Beginner/f5b-23-alternating-series` 測資。

|項目|內容|
|---|---|
|任務名稱|`f5b-23-alternating-series`|
|組別|`Beginner`|
|測資目錄|`data/Beginner/f5b-23-alternating-series`|
|來源|`F5B_2025_2026_20260416.ipynb`|
|對齊範例|`f5b-23-alternating-series-0.in` / `f5b-23-alternating-series-0.out`|

## 題目說明

Input an even integer `n`. Compute `1/2^2 - 2/3^2 + 3/4^2 - ... + (n-1)/n^2` and print the answer to 2 decimal places.

## 輸入格式

Standard input follows the sample format below.

## 輸出格式

Print exactly the required result for the given task.

## 範例輸入

```text
10
```

## 範例輸出

```text
Answer: 0.09
```

## 提示

- The `k`-th denominator starts at `k = 2`. Positive when `k` is even, negative when `k` is odd.

## 限制

- Language: Python 3 or C++17.
- Follow the output format exactly, including labels such as `Total:`, `Sum:`, or `Answer:` where shown.
