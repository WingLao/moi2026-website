# 09 · Filter and Transform with NumPy

> Beginner Python 課堂練習。此題已整理成 Problems 題目範本，可直接修改本 Markdown 題面和 `data/Beginner/f5b-09-filter-transform` 測資。

|項目|內容|
|---|---|
|任務名稱|`f5b-09-filter-transform`|
|組別|`Beginner`|
|測資目錄|`data/Beginner/f5b-09-filter-transform`|
|來源|`F5B_2025_2026_20260416.ipynb`|
|對齊範例|`f5b-09-filter-transform-0.in` / `f5b-09-filter-transform-0.out`|

## 題目說明

Input 8 integers. Compute the average, square every number greater than the average, and store those squares in a new list.

## 輸入格式

Standard input follows the sample format below.

## 輸出格式

Print exactly the required result for the given task.

## 範例輸入

```text
2 4 6 8 10 12 14 16
```

## 範例輸出

```text
Original: [2, 4, 6, 8, 10, 12, 14, 16]
Average: 9.00
New list: [100, 144, 196, 256]
```

## 提示

- Create the new list before the loop. Append `i ** 2`, not `i`.

## 限制

- Language: Python 3 or C++17.
- Follow the output format exactly, including labels such as `Total:`, `Sum:`, or `Answer:` where shown.
