# 04 · Task Scheduler

> Greedy Algorithm 練習題。此題已整理成 Problems 比賽題格式，可直接修改本 Markdown 題面和 `data/GA/ga-04-task-scheduler` 測資。

|項目|內容|
|---|---|
|任務名稱|`ga-04-task-scheduler`|
|組別|`GA`|
|難度|`Medium`|
|測資目錄|`data/GA/ga-04-task-scheduler`|
|來源|`LeetCode 621, rewritten as a contest-style problem`|
|對齊範例|`ga-04-task-scheduler-0.in` / `ga-04-task-scheduler-0.out`|

## 題目說明

A CPU must finish a sequence of tasks. Each task has an uppercase letter type. The same task type must be separated by at least `cooldown` time units. The CPU may be idle. Find the shortest total time.

## 輸入格式

- The first line contains two integers `n` and `cooldown`.
- The second line contains a string of length `n` using uppercase letters `A` to `Z`. Each character is one task.

## 輸出格式

- Print the minimum total time needed to complete all tasks.

## 範例輸入

```text
6 2
AAABBB
```

## 範例輸出

```text
8
```

## 貪婪提示

Let `max_freq` be the largest task frequency and `max_count` be the number of task types with that frequency. A lower bound is `(max_freq - 1) * (cooldown + 1) + max_count`; the answer is the maximum of this value and `n`.

## 限制

- 1 <= n <= 100000
- 0 <= cooldown <= 100000
- Tasks are uppercase English letters.
