# F5B 05 · Divisible by 13 (1-500)

> F5B Python 課堂練習。此題已整理成 Problems 題目範本，可直接修改本 Markdown 題面和 `data/Beginner/f5b-05-divisible-by-13` 測資。

|項目|內容|
|---|---|
|任務名稱|`f5b-05-divisible-by-13`|
|組別|`Beginner`|
|測資目錄|`data/Beginner/f5b-05-divisible-by-13`|
|來源|`F5B_2025_2026_20260416.ipynb`|
|對齊範例|`f5b-05-divisible-by-13-0.in` / `f5b-05-divisible-by-13-0.out`|

## 題目說明

Print all numbers from 1 to 500 divisible by 13, then print the count and sum.

## 輸入格式

This problem does not require standard input.

## 輸出格式

Print exactly the required result for the given task.

## 範例輸入

```text
(no standard input)
```

## 範例輸出

```text
13 26 39 52 65 78 91 104 117 130 143 156 169 182 195 208 221 234 247 260 273 286 299 312 325 338 351 364 377 390 403 416 429 442 455 468 481 494
Total: 38
Sum: 9633
```

## 提示

- Use `i % 13 == 0`, a counter, and an accumulator.

## 限制

- Language: Python 3 or C++17.
- Follow the output format exactly, including labels such as `Total:`, `Sum:`, or `Answer:` where shown.
