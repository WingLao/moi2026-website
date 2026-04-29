# F5B 06 · Multiplication Table in Reverse Order

> F5B Python 課堂練習。此題已整理成 Problems 題目範本，可直接修改本 Markdown 題面和 `data/Beginner/f5b-06-reverse-multiplication-table` 測資。

|項目|內容|
|---|---|
|任務名稱|`f5b-06-reverse-multiplication-table`|
|組別|`Beginner`|
|測資目錄|`data/Beginner/f5b-06-reverse-multiplication-table`|
|來源|`F5B_2025_2026_20260416.ipynb`|
|對齊範例|`f5b-06-reverse-multiplication-table-0.in` / `f5b-06-reverse-multiplication-table-0.out`|

## 題目說明

Display the multiplication table from 10 down to 1. Row `i` should show products from `i*1` to `i*i`.

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
10*1=10 10*2=20 10*3=30 10*4=40 10*5=50 10*6=60 10*7=70 10*8=80 10*9=90 10*10=100
9*1=9 9*2=18 9*3=27 9*4=36 9*5=45 9*6=54 9*7=63 9*8=72 9*9=81
8*1=8 8*2=16 8*3=24 8*4=32 8*5=40 8*6=48 8*7=56 8*8=64
7*1=7 7*2=14 7*3=21 7*4=28 7*5=35 7*6=42 7*7=49
6*1=6 6*2=12 6*3=18 6*4=24 6*5=30 6*6=36
5*1=5 5*2=10 5*3=15 5*4=20 5*5=25
4*1=4 4*2=8 4*3=12 4*4=16
3*1=3 3*2=6 3*3=9
2*1=2 2*2=4
1*1=1
```

## 提示

- Use a nested loop: outer loop from 10 down to 1, inner loop from 1 to `i`.

## 限制

- Language: Python 3 or C++17.
- Follow the output format exactly, including labels such as `Total:`, `Sum:`, or `Answer:` where shown.
