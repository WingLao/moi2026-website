<!-- bilingual -->
## Note · 注意

:::en
Training problem (CSP-J round 2 style). On this website, read from standard input and print to standard output; Python and C++ are both accepted. In the real CSP contest only C++ is allowed and you must use the files `divisible.in` / `divisible.out`.
:::

:::zh
培訓題（CSP-J 第二輪題型）。在本網站請從標準輸入讀入、輸出到標準輸出，Python 和 C++ 都接受。正式 CSP 比賽只可用 C++，而且要用檔案 `divisible.in` / `divisible.out`。
:::

## Description · 題目說明

:::en
You are given n integers a₁ … aₙ (possibly negative) and a positive integer m.

If the sum of a block of consecutive numbers aₗ + … + aᵣ is divisible by m, the block is called a "divisible range". How many divisible ranges are there? (l ≤ r; ranges with a different l or r count as different.)
:::

:::zh
給出 n 個整數 a₁ … aₙ（可能是負數）和正整數 m。

如果一段連續的數 aₗ + … + aᵣ 的和能被 m 整除，就叫它「整除區間」。請問共有多少個整除區間？（l ≤ r；l 或 r 不同就算不同的區間。）
:::

## Input · 輸入格式

:::en
| Line | Content |
|---|---|
| 1 | two integers n, m |
| 2 | n integers a₁ … aₙ |
:::

:::zh
| 行 | 內容 |
|---|---|
| 第 1 行 | 兩個整數 n, m |
| 第 2 行 | n 個整數 a₁ … aₙ |
:::

## Output · 輸出格式

:::en
One integer: the number of divisible ranges.
:::

:::zh
一個整數：整除區間的個數。
:::

## Sample Input 1 · 範例輸入 1

```text
5 3
1 2 3 4 5
```

## Sample Output 1 · 範例輸出 1

```text
7
```

## Explanation 1 · 說明 1

:::en
| Range | Sum |
|---|---|
| [1,2] | 3 |
| [3,3] | 3 |
| [1,3] | 6 |
| [2,4] | 9 |
| [4,5] | 9 |
| [3,5] | 12 |
| [1,5] | 15 |

(A diagram is on the unit page of the training website.)
:::

:::zh
| 區間 | 和 |
|---|---|
| [1,2] | 3 |
| [3,3] | 3 |
| [1,3] | 6 |
| [2,4] | 9 |
| [4,5] | 9 |
| [3,5] | 12 |
| [1,5] | 15 |

（圖解見培訓路線網站的單元頁。）
:::

## Sample Input 2 · 範例輸入 2

```text
4 4
-1 5 -4 4
```

## Sample Output 2 · 範例輸出 2

```text
6
```

## Explanation 2 · 說明 2

:::en
| Range | [1,2] | [1,3] | [1,4] | [3,3] | [3,4] | [4,4] |
|---|---|---|---|---|---|---|
| Sum | 4 | 0 | 4 | −4 | 0 | 4 |

0 and −4 are also divisible by 4.
:::

:::zh
| 區間 | [1,2] | [1,3] | [1,4] | [3,3] | [3,4] | [4,4] |
|---|---|---|---|---|---|---|
| 和 | 4 | 0 | 4 | −4 | 0 | 4 |

0 和 −4 也能被 4 整除。
:::

## Subtasks · 數據範圍

| Tests 測試點 | n | m | Special property 特殊性質 |
|---|---|---|---|
| 1–3 | ≤ 300 | ≤ 10 | — |
| 4–6 | ≤ 5000 | ≤ 1000 | — |
| 7–8 | ≤ 2×10⁵ | ≤ 10⁶ | all aᵢ ≥ 0 · 所有 aᵢ ≥ 0 |
| 9–10 | ≤ 2×10⁵ | ≤ 10⁶ | — |

All tests: |aᵢ| ≤ 10⁹, 1 ≤ m ≤ 10⁶.

全部測試點：|aᵢ| ≤ 10⁹，1 ≤ m ≤ 10⁶。

## Before You Submit · 提交前檢查

| Check 檢查 | Python | C++ |
|---|---|---|
| Both samples pass 兩個樣例都通過 | ☐ | ☐ |
| Fast enough for the largest data? 最大數據會不會超時？ | ☐ | ☐ |
| Can the answer exceed int? 答案會不會超過 int？ | No need to worry 不用擔心 | ☐ use `long long` 用 `long long` |
| Contest: file names correct? 比賽時檔名正確？ | Contest is C++ only 比賽只可用 C++ | ☐ `freopen` |
| Removed debug output 刪除了除錯輸出 | ☐ | ☐ |
