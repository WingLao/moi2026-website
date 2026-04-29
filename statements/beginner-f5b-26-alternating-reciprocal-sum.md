# F5B 26 · Alternating Reciprocal Sum

> F5B Python 課堂練習。此題已整理成 Problems 題目範本，可直接修改本 Markdown 題面和 `data/Beginner/f5b-26-alternating-reciprocal-sum` 測資。

|項目|內容|
|---|---|
|任務名稱|`f5b-26-alternating-reciprocal-sum`|
|組別|`Beginner`|
|測資目錄|`data/Beginner/f5b-26-alternating-reciprocal-sum`|
|來源|`F5B_2025_2026_20260416.ipynb`|
|對齊範例|`f5b-26-alternating-reciprocal-sum-0.in` / `f5b-26-alternating-reciprocal-sum-0.out`|

## 題目說明

Input `n`. Compute `1/1^2 - 2/2^2 + 3/3^2 - 4/4^2 + ... ± n/n^2` and print the answer to 2 decimal places.

## 輸入格式

Standard input follows the sample format below.

## 輸出格式

Print exactly the required result for the given task.

## 範例輸入

```text
8
```

## 範例輸出

```text
Answer: 0.63
```

## 提示

- Each term simplifies to `1/i`. Positive when `i` is odd and negative when `i` is even.

## 限制

- Language: Python 3 or C++17.
- Follow the output format exactly, including labels such as `Total:`, `Sum:`, or `Answer:` where shown.
