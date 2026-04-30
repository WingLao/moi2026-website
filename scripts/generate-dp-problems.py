from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
STATEMENTS_DIR = ROOT / "statements"
DATA_DIR = ROOT / "data" / "DP"


@dataclass(frozen=True)
class Case:
    input_text: str
    output_text: str


def fib(n: int) -> int:
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b


def herb_max_value(limit_time: int, herbs: list[tuple[int, int]]) -> int:
    dp = [0] * (limit_time + 1)
    for time_cost, value in herbs:
        for time_left in range(limit_time, time_cost - 1, -1):
            dp[time_left] = max(dp[time_left], dp[time_left - time_cost] + value)
    return dp[limit_time]


def coin_change(coins: list[int], amount: int) -> int:
    inf = amount + 1
    dp = [inf] * (amount + 1)
    dp[0] = 0
    for value in range(1, amount + 1):
        for coin in coins:
            if coin <= value:
                dp[value] = min(dp[value], dp[value - coin] + 1)
    return -1 if dp[amount] == inf else dp[amount]


def lis_length(nums: list[int]) -> int:
    if not nums:
      return 0
    dp = [1] * len(nums)
    best = 1
    for i in range(len(nums)):
        for j in range(i):
            if nums[i] > nums[j]:
                dp[i] = max(dp[i], dp[j] + 1)
        best = max(best, dp[i])
    return best


def edit_distance(word1: str, word2: str) -> int:
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i - 1] == word2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1
    return dp[m][n]


def write_problem_files(slug: str, statement_text: str, cases: list[Case]) -> None:
    statement_path = STATEMENTS_DIR / f"{slug}.md"
    statement_path.write_text(statement_text, encoding="utf-8")

    problem_dir = DATA_DIR / slug
    problem_dir.mkdir(parents=True, exist_ok=True)
    for index, case in enumerate(cases):
        (problem_dir / f"{slug}-{index}.in").write_text(case.input_text, encoding="utf-8")
        (problem_dir / f"{slug}-{index}.out").write_text(case.output_text, encoding="utf-8")


def build_fib_problem() -> tuple[str, str, list[Case]]:
    slug = "dp-01-fibonacci-number"
    inputs = [0, 1, 2, 4, 10, 20, 30, 35, 40, 45]
    cases = [Case(f"{n}\n", f"{fib(n)}\n") for n in inputs]
    statement = f"""# 01 · Fibonacci Number

> 動態規劃（DP）練習題。此題已整理成 Problems 比賽題格式，可直接修改本 Markdown 題面和 `data/DP/{slug}` 測資。

|項目|內容|
|---|---|
|任務名稱|`{slug}`|
|組別|`DP`|
|難度|`Easy`|
|測資目錄|`data/DP/{slug}`|
|來源|`LeetCode 509, rewritten as a contest-style problem`|
|對齊範例|`{slug}-0.in` / `{slug}-0.out`|

## 題目說明

給定一個整數 `n`，請你輸出費氏數列第 `n` 項 `F(n)`。定義如下：

- `F(0) = 0`
- `F(1) = 1`
- `F(n) = F(n-1) + F(n-2)`，其中 `n >= 2`

## 輸入格式

第一行包含一個整數 `n`。

## 輸出格式

輸出一行，包含 `F(n)` 的值。

## 範例輸入

```text
{cases[3].input_text.strip()}
```

## 範例輸出

```text
{cases[3].output_text.strip()}
```

## 提示

- 這是一題基礎的一維 DP。
- 由小到大計算 `F(0), F(1), ..., F(n)` 即可。

## 限制

- `0 <= n <= 45`
"""
    return slug, statement, cases


def build_herb_problem() -> tuple[str, str, list[Case]]:
    slug = "dp-02-herb-picking"
    raw_cases = [
        (5, [(6, 10), (4, 7), (2, 4)]),
        (10, [(3, 4), (4, 5), (5, 10), (2, 3)]),
        (8, [(2, 3), (3, 4), (4, 5), (5, 8)]),
        (15, [(5, 10), (6, 18), (7, 12), (3, 7), (4, 9)]),
        (20, [(2, 2), (3, 4), (5, 7), (6, 9), (7, 13), (9, 18)]),
        (25, [(12, 24), (10, 20), (8, 15), (6, 12), (4, 8)]),
        (30, [(9, 20), (13, 35), (7, 16), (4, 9), (11, 28), (5, 12)]),
        (50, [(10, 60), (20, 100), (30, 120), (25, 90), (15, 70)]),
        (18, [(4, 6), (6, 13), (9, 20), (5, 8), (3, 5), (7, 14)]),
        (40, [(8, 12), (12, 25), (15, 35), (18, 40), (6, 10), (7, 13), (9, 18)]),
    ]
    cases: list[Case] = []
    for limit_time, herbs in raw_cases:
        first_line = f"{limit_time} {len(herbs)}\n"
        body = "".join(f"{time_cost} {value}\n" for time_cost, value in herbs)
        cases.append(Case(first_line + body, f"{herb_max_value(limit_time, herbs)}\n"))

    statement = f"""# 02 · Herb Picking

> 動態規劃（DP）練習題。此題已整理成 Problems 比賽題格式，可直接修改本 Markdown 題面和 `data/DP/{slug}` 測資。

|項目|內容|
|---|---|
|任務名稱|`{slug}`|
|組別|`DP`|
|難度|`Easy`|
|測資目錄|`data/DP/{slug}`|
|來源|`Luogu P1048, rewritten as a contest-style problem`|
|對齊範例|`{slug}-0.in` / `{slug}-0.out`|

## 題目說明

你有總共 `T` 分鐘可以採藥，並且有 `M` 種草藥可供選擇。每種草藥都有採摘所需時間與價值，而且每種草藥最多只能採一次。請求出在總時間不超過 `T` 的情況下，可以得到的最大總價值。

## 輸入格式

第一行包含兩個整數 `T` 和 `M`。
接下來 `M` 行，每行包含兩個整數 `time` 和 `value`，分別表示採摘所需時間與草藥價值。

## 輸出格式

輸出一行，包含可取得的最大總價值。

## 範例輸入

```text
{cases[1].input_text.strip()}
```

## 範例輸出

```text
{cases[1].output_text.strip()}
```

## 提示

- 這是一題標準 0/1 背包。
- 使用 `dp[j]` 表示總時間不超過 `j` 時的最大總價值。
- 更新時要從大到小枚舉時間，避免同一種草藥被重複使用。

## 限制

- `1 <= T <= 1000`
- `1 <= M <= 200`
- `1 <= time, value <= 1000`
"""
    return slug, statement, cases


def build_coin_change_problem() -> tuple[str, str, list[Case]]:
    slug = "dp-03-coin-change"
    raw_cases = [
        ([1], 0),
        ([1, 2, 5], 11),
        ([2], 3),
        ([2, 5, 6], 11),
        ([1, 3, 4], 6),
        ([2, 4, 6], 8),
        ([5, 7, 8], 15),
        ([3, 7, 10], 21),
        ([2, 5, 10, 20], 27),
        ([4, 9, 15], 37),
    ]
    cases: list[Case] = []
    for coins, amount in raw_cases:
        input_text = f"{len(coins)} {amount}\n" + " ".join(str(coin) for coin in coins) + "\n"
        cases.append(Case(input_text, f"{coin_change(coins, amount)}\n"))

    statement = f"""# 03 · Coin Change

> 動態規劃（DP）練習題。此題已整理成 Problems 比賽題格式，可直接修改本 Markdown 題面和 `data/DP/{slug}` 測資。

|項目|內容|
|---|---|
|任務名稱|`{slug}`|
|組別|`DP`|
|難度|`Medium`|
|測資目錄|`data/DP/{slug}`|
|來源|`LeetCode 322, rewritten as a contest-style problem`|
|對齊範例|`{slug}-0.in` / `{slug}-0.out`|

## 題目說明

給定 `n` 種硬幣面額，以及一個目標金額 `amount`。每種硬幣可以使用任意多次。請輸出湊成 `amount` 所需的最少硬幣數量；如果無法湊出，請輸出 `-1`。

## 輸入格式

第一行包含兩個整數 `n` 和 `amount`。
第二行包含 `n` 個正整數，表示各種硬幣面額。

## 輸出格式

輸出一行，包含最少硬幣數量；若無法湊出則輸出 `-1`。

## 範例輸入

```text
{cases[3].input_text.strip()}
```

## 範例輸出

```text
{cases[3].output_text.strip()}
```

## 提示

- 這是一題完全背包 DP。
- 可設 `dp[x]` 表示湊出總額 `x` 所需的最少硬幣數量。
- 若 `dp[amount]` 最後仍是無法達成的狀態，輸出 `-1`。

## 限制

- `1 <= n <= 30`
- `0 <= amount <= 10000`
- `1 <= coin[i] <= 10000`
"""
    return slug, statement, cases


def build_lis_problem() -> tuple[str, str, list[Case]]:
    slug = "dp-04-longest-increasing-subsequence"
    raw_cases = [
        [5],
        [5, 4, 3, 2, 1],
        [1, 2, 3, 4, 5],
        [10, 9, 2, 5, 3, 7, 101, 18],
        [0, 1, 0, 3, 2, 3],
        [7, 7, 7, 7, 7],
        [4, 10, 4, 3, 8, 9],
        [3, 1, 8, 2, 5],
        [2, 6, 8, 3, 4, 5, 1],
        [9, 1, 3, 7, 5, 6, 20],
    ]
    cases: list[Case] = []
    for nums in raw_cases:
        input_text = f"{len(nums)}\n" + " ".join(str(num) for num in nums) + "\n"
        cases.append(Case(input_text, f"{lis_length(nums)}\n"))

    statement = f"""# 04 · Longest Increasing Subsequence

> 動態規劃（DP）練習題。此題已整理成 Problems 比賽題格式，可直接修改本 Markdown 題面和 `data/DP/{slug}` 測資。

|項目|內容|
|---|---|
|任務名稱|`{slug}`|
|組別|`DP`|
|難度|`Medium`|
|測資目錄|`data/DP/{slug}`|
|來源|`LeetCode 300, rewritten as a contest-style problem`|
|對齊範例|`{slug}-0.in` / `{slug}-0.out`|

## 題目說明

給定一個長度為 `n` 的整數序列，請找出其中最長嚴格遞增子序列（Longest Increasing Subsequence, LIS）的長度。子序列不需要連續，但必須保持原本順序。

## 輸入格式

第一行包含一個整數 `n`。
第二行包含 `n` 個整數，表示序列中的元素。

## 輸出格式

輸出一行，包含最長嚴格遞增子序列的長度。

## 範例輸入

```text
{cases[3].input_text.strip()}
```

## 範例輸出

```text
{cases[3].output_text.strip()}
```

## 提示

- 可定義 `dp[i]` 為「以第 `i` 個數結尾」的最長遞增子序列長度。
- 對每個 `i`，檢查所有 `j < i` 且 `a[j] < a[i]` 的位置做轉移。

## 限制

- `1 <= n <= 2000`
- `-10^9 <= a[i] <= 10^9`
"""
    return slug, statement, cases


def build_edit_distance_problem() -> tuple[str, str, list[Case]]:
    slug = "dp-05-edit-distance"
    raw_cases = [
        ("", ""),
        ("horse", "ros"),
        ("intention", "execution"),
        ("kitten", "sitting"),
        ("abc", "abc"),
        ("abc", ""),
        ("", "abc"),
        ("algorithm", "altruistic"),
        ("distance", "editing"),
        ("dynamic", "programming"),
    ]
    cases: list[Case] = []
    for word1, word2 in raw_cases:
        input_text = f"{word1}\n{word2}\n"
        cases.append(Case(input_text, f"{edit_distance(word1, word2)}\n"))

    statement = f"""# 05 · Edit Distance

> 動態規劃（DP）練習題。此題已整理成 Problems 比賽題格式，可直接修改本 Markdown 題面和 `data/DP/{slug}` 測資。

|項目|內容|
|---|---|
|任務名稱|`{slug}`|
|組別|`DP`|
|難度|`Hard`|
|測資目錄|`data/DP/{slug}`|
|來源|`LeetCode 72, rewritten as a contest-style problem`|
|對齊範例|`{slug}-0.in` / `{slug}-0.out`|

## 題目說明

給定兩個只包含小寫英文字母的字串 `word1` 與 `word2`，請輸出把 `word1` 轉換成 `word2` 所需的最少操作次數。允許操作如下：

- 插入一個字元
- 刪除一個字元
- 替換一個字元

## 輸入格式

第一行包含字串 `word1`。
第二行包含字串 `word2`。

## 輸出格式

輸出一行，包含最少操作次數。

## 範例輸入

```text
{cases[1].input_text.strip()}
```

## 範例輸出

```text
{cases[1].output_text.strip()}
```

## 提示

- 可設 `dp[i][j]` 表示 `word1` 前 `i` 個字元轉成 `word2` 前 `j` 個字元的最少操作次數。
- 如果目前字元相同，就可直接繼承 `dp[i-1][j-1]`。
- 否則從插入、刪除、替換三種操作中取最小值再加一。

## 限制

- `0 <= len(word1), len(word2) <= 200`
- `word1` 與 `word2` 只包含小寫英文字母。
"""
    return slug, statement, cases


def verify_cases() -> None:
    problems = [
        build_fib_problem(),
        build_herb_problem(),
        build_coin_change_problem(),
        build_lis_problem(),
        build_edit_distance_problem(),
    ]
    for slug, statement, cases in problems:
        if "```text" not in statement:
            raise AssertionError(f"{slug}: statement missing fenced sample")
        write_problem_files(slug, statement, cases)
        if len(cases) != 10:
            raise AssertionError(f"{slug}: expected 10 cases, got {len(cases)}")


if __name__ == "__main__":
    verify_cases()
    print("Generated 5 DP problems with 10 testcase pairs each.")
