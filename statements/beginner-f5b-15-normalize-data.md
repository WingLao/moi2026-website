# F5B 15 · Normalize Data

> F5B Python 課堂練習。此題已整理成 Problems 題目範本，可直接修改本 Markdown 題面和 `data/Beginner/f5b-15-normalize-data` 測資。

|項目|內容|
|---|---|
|任務名稱|`f5b-15-normalize-data`|
|組別|`Beginner`|
|測資目錄|`data/Beginner/f5b-15-normalize-data`|
|來源|`F5B_2025_2026_20260416.ipynb`|
|對齊範例|`f5b-15-normalize-data-0.in` / `f5b-15-normalize-data-0.out`|

## 題目說明

Input integers. Normalize each number using `(x - min) / (max - min)`, round to 2 decimal places, and print the list.

## 輸入格式

Standard input follows the sample format below.

## 輸出格式

Print exactly the required result for the given task.

## 範例輸入

```text
10 20 30 40 50
```

## 範例輸出

```text
[0.0, 0.25, 0.5, 0.75, 1.0]
```

## 提示

- Compute the minimum and maximum once before the loop.

## 限制

- Language: Python 3 or C++17.
- Follow the output format exactly, including labels such as `Total:`, `Sum:`, or `Answer:` where shown.
