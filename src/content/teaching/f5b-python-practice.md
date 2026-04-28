# F5B Python 課堂練習

> 語言：Python 或 C++ 皆可。先找輸入、條件、輸出，再動手寫。
> Language: Python or C++. Find **input**, **condition**, and **output** first.

## 解題流程

| 步驟 | 說明 |
| --- | --- |
| `for` | 重複處理每一個數字 |
| `if` | 篩選 / 判斷條件 |
| `append()` | 收集符合條件的結果 |
| `dictionary` | 計數、查表、配對 |

---

### Exercise 1 · Number Sequences with `range()`
中文：用 `range()` 產生數列。

**Task**
- Print numbers from 1 to 100.
- Print numbers from 1 to 100 with a step of 3.

**Hint**
- `range(1, 101)` → 1 to 100
- `range(1, 101, 3)` → 1, 4, 7, 10 … （第三個數字代表每次加多少）

**Expected output**
```
1 2 3 4 ... 100
1 4 7 10 ... 100
```

---

### Exercise 2 · Square of Even Numbers
中文：只處理偶數，再平方。

**Task**
Given a list of integers, create a new result that contains the square of each even number.

**Hint**
- Check each number first. If it is even (`i % 2 == 0`), square it (`i * i`).
- 每看一個數字，先判斷是不是偶數；如果是，再做平方。

**Expected output**
```
Even squares: 4 16 36 64 100
```

---

### Exercise 3 · Factorial of 5
中文：階乘是連乘，不是加法。

**Task**
Use a `for` loop to compute the factorial of 5.

**Hint**
- `1 × 2 × 3 × 4 × 5 = 120`
- 用一個變數 `ans = 1`，每次乘以 `i`。

**Expected output**
```
Factorial of 5: 120
```

---

### Exercise 4 · Sum of Even Numbers (1–10)
中文：找偶數，順便加總。

**Task**
Calculate the sum of even numbers from 1 to 10.

**Hint**
- Loop from 1 to 10, check `i % 2 == 0`, then accumulate.

**Expected output**
```
2 4 6 8 10
Sum: 30
```

---

### Exercise 5 · Divisible by 13 (1–500)
中文：找出可被 13 整除的數字。

**Task**
- Print the numbers from 1 to 500 that are divisible by 13.
- Count how many there are.
- Find their sum.

**Hint**
- Use `i % 13 == 0` as the condition.
- Keep a counter `t` and an accumulator `ans`.

**Expected output**
```
13 26 39 ... 494
Total: 38
Sum: 9633
```

---

### Exercise 6 · Multiplication Table in Reverse Order
中文：用雙層 for 由 10 倒數到 1 顯示乘法表。

**Task**
Display the multiplication table from 10 down to 1, with each row only showing products up to `i × i`.

**Hint**
- Outer loop: `i` from 10 down to 1 (use `range(10, 0, -1)`).
- Inner loop: `j` from 1 to `i`.

**Expected output**
```
10* 1=10  10* 2=20  ...  10*10=100
 9* 1= 9   9* 2=18  ...   9* 9=81
 ...
 1* 1= 1
```

---

### Exercise 7 · Create a List with `append()`
中文：把符合條件的數字加入 list。

**Task**
Generate numbers from 1 to 20 and append only numbers divisible by 3 into a list. Print the result.

**Hint**
- Create an empty list `l = []` before the loop.
- Use `l.append(i)` inside the `if` block.

**Expected output**
```
[3, 6, 9, 12, 15, 18]
```

---

### Exercise 8 · List Statistics with NumPy
中文：輸入 5 個整數，求最大、最小、平均。

**Task**
Input 5 integers (space-separated on one line) and display the maximum, minimum, and average.

**Hint**
- `nums = list(map(int, input().split()))`
- Use `np.max()`, `np.min()`, `np.mean()`.
- Format average to 2 decimal places.

**Expected input**
```
10 20 30 40 50
```

**Expected output**
```
Max: 50
Min: 10
Average: 30.00
```

---

### Exercise 9 · Filter and Transform with NumPy
中文：大於平均的數字，平方後存進新 list。

**Task**
Input 8 integers, compute the average, and append the square of each number **greater than the average** into a new list.

**Hint**
- Compute average once: `avg = np.mean(nums)`
- Create `newList = []` **before** the loop, not inside.
- Append `i ** 2`, not `i`.

**Expected input**
```
2 4 6 8 10 12 14 16
```

**Expected output**
```
Original: [2, 4, 6, 8, 10, 12, 14, 16]
Average: 9.00
New list: [100, 144, 196, 256]
```

---

### Exercise 10 · Filter Even Numbers Above Average
中文：同時滿足「偶數」且「大於平均值」兩個條件。

**Task**
From a list of numbers, find those that are **both even and greater than the average**. Print the average and the filtered list.

**Expected input**
```
5 8 12 15 20 7 18 9 14 6
```

**Expected output**
```
11.40
[12, 20, 18, 14]
```

---

### Exercise 11 · Count Above and Below Average
中文：分別計算大於平均和小於平均（含等於）的個數。

**Task**
Count how many numbers are **greater than** the average, and how many are **not greater than** the average.

**Expected input**
```
1 2 3 4 5 9 100 10
```

**Expected output**
```
16.75
1
7
```

---

### Exercise 12 · Replace Values Below Average
中文：小於平均值就改成 0，否則保留原值。

**Task**
For each number in the list, if it is less than the average replace it with `0`; otherwise keep the original value. Print the original list and the new list.

**Expected input** (comma-space separated)
```
5, 10, 15, 20, 25, 30
```

**Expected output**
```
[5, 10, 15, 20, 25, 30]
[0, 0, 15, 20, 25, 30]
```

---

### Exercise 13 · Standard Deviation Challenge
中文：找出大於 mean + std 的數字。

**Task**
Compute the mean and standard deviation, then collect numbers **greater than `mean + std`** into a new list.

**Hint**
- `np.std(nums)` gives the standard deviation.
- Threshold: `np.mean(nums) + np.std(nums)`.

**Expected input**
```
10 12 15 18 20 22 25 30 5 8
```

**Expected output**
```
16.5
7.54
[25, 30]
```

---

### Exercise 14 · Cumulative Sum
中文：每一步都把總和累加起來，存入新 list。

**Task**
Create a new list that stores the **cumulative sum** — each element is the sum of all numbers up to that position.

**Expected input**
```
1 2 3 4
```

**Expected output**
```
[1, 3, 6, 10]
```

---

### Exercise 15 · Normalize Data
中文：把資料縮放到 0 到 1 之間。

**Task**
Normalize each number using the formula `(x - min) / (max - min)` and round to 2 decimal places.

**Hint**
- Compute `min_v` and `max_v` once before the loop.
- Use `round(value, 2)`.

**Expected input**
```
10 20 30 40 50
```

**Expected output**
```
[0.0, 0.25, 0.5, 0.75, 1.0]
```

---

### Exercise 16 · Character Frequency
中文：統計每個字元出現幾次，存入 dictionary。

**Task**
Count the frequency of each character in a string and store the result in a dictionary.

**Hint**
- If the character is already in the dictionary, increment its count.
- Otherwise, set its count to 1.

**Example**
```
text = "google"
```

**Expected output**
```
{'g': 2, 'o': 2, 'l': 1, 'e': 1}
```

---

### Exercise 17 · Two Sum
中文：找出兩個相加等於目標值的數字的索引。

**Task**
Given a list `nums` and a `target`, find two indices such that the two numbers add up to the target.

**Example**
```
nums = [2, 7, 11, 15]
target = 9
```

**Expected output**
```
[0, 1]
```

---

### Exercise 18 · First Unique Character
中文：先統計次數，再找第一個只出現一次的字元的索引。

**Task**
Find the **index** of the first non-repeating character in a string.

**Hint**
- First pass: count frequency of each character using a dictionary.
- Second pass: iterate through the string by index; return the first index whose character has frequency 1.

**Example**
```
s = "leetcode"
```

**Expected output**
```
0
```

---

### Exercise 19 · Most Frequent Word
中文：找出出現次數最多的單字。

**Task**
Find the word that appears most frequently in a sentence.

**Hint**
- Split the sentence into words with `.split()`.
- Count with a dictionary, then find the key with the highest value.

**Example**
```
sentence = "apple banana apple cherry apple banana"
```

**Expected output**
```
apple
```

---

### Exercise 20 · Inventory Valuation
中文：價格 × 數量，再全部加總。

**Task**
Use two dictionaries (`prices` and `stock`) to calculate the total inventory value.

**Example**
```
prices = {"pen": 10, "pencil": 5, "eraser": 8}
stock  = {"pen": 20, "pencil": 50, "eraser": 10}
```

**Expected output**
```
630
```

---

### Exercise 21 · Roman to Integer
中文：用對應表把羅馬數字轉成整數。

**Task**
Convert a Roman numeral string to an integer using the provided map.

**Hint**
- `roman_map = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}`
- For a basic version, simply sum up the value of each character.

**Example**
```
s = "XIV"
```

**Expected output**
```
16
```

---

### Exercise 22 · Minimum Coins
中文：先選最大面額，直到湊出目標金額（貪心法）。

**Task**
Use the **greedy algorithm** to determine the minimum number of coins required to make up a target amount.

**Hint**
- Sort denominations from largest to smallest.
- For each denomination, use as many as possible: `v = amount // deno`, then subtract.

**Example**
```
deno = [1, 5, 10, 25]
amount = 63
```

**Expected output**
```
6
```

---

### Exercise 23 · Alternating Series Value
中文：依照正負號規律，逐項相加。

**Task**
Compute `f(n) = 1/2² - 2/3² + 3/4² - … + (n-1)/n²`, where `n` is an even integer.

**Hint**
- The `k`-th term (starting at `k = 2`) is `(k-1) / k²`.
- Sign: positive when `k` is even, negative when `k` is odd.
- Loop `k` from 2 to `n` inclusive.

**Example**
```
n = 10
```

**Expected output**
```
Answer: 0.09
```

---

### Exercise 24 · Match Players with Equipment
中文：配對學生與裝備，每件裝備只能用一次，且必須滿足 `equipment >= player requirement`。

**Task**
Determine the **maximum number of players** that can be matched. Both lists must be sorted first. Use two pointers.

**Example 1**
```
players   = [2, 3, 4]
equipment = [1, 2]
```
```
Output: 1
```

**Example 2**
```
players   = [1, 2]
equipment = [2, 3, 4]
```
```
Output: 2
```

---

### Exercise 25 · Audit
中文：找出兩個已排序 List 中相同的數值，計算共有幾個。

**Task**
Given two lists `A` and `B`, sort both, then use two pointers to count how many values appear in both lists (count duplicates separately).

**Example**
```
A = [2, 3, 3, 5, 1, 2, 3, 4, 5, 8, 9]
B = [3, 0, 7, 4, 5, 6, 3]
```

**Expected output**
```
4
```

---

### Exercise 26 · Alternating Reciprocal Sum
中文：奇數項相加、偶數項相減，逐項累加。

**Task**
Compute `g(n) = 1/1² - 2/2² + 3/3² - 4/4² + … ± n/n²`.

**Hint**
- The `i`-th term is `i / i²` = `1/i`.
- Positive when `i` is odd, negative when `i` is even.
- Loop `i` from 1 to `n` inclusive.

**Example**
```
n = 8
```

**Expected output**
```
Answer: 0.00
```

---

### Exercise 27 · Pair Sum Finder
中文：找出所有相加等於目標值的配對（每個數字只能用一次）。

**Task**
Find all pairs of numbers that add up to the target. Each number may only be used once. Print each pair and the total count.

**Example**
```
nums   = [1, 4, 6, 7, 9, 10]
target = 11
```

**Expected output**
```
(1, 10)
(4, 7)
Total: 2
```

---

### Exercise 28 · Selection Sort + Median
中文：用選擇排序法排序（雙層迴圈），再找中位數。

**Task**
Sort the list using **selection sort** (implement with a double loop — do not use `.sort()`), then print the sorted list and its median.

**Hint**
- Outer loop: pick position `i`.
- Inner loop: find the minimum in `nums[i+1:]` and swap if smaller.
- Median index: `len(nums) // 2`.

**Example**
```
nums = [8, 3, 5, 1, 9]
```

**Expected output**
```
Sorted: [1, 3, 5, 8, 9]
Median: 5
```

---

### Exercise 29 · Row Sum Champion
中文：找出二維 list 中，哪一列的總和最大。

**Task**
Use a double loop to compute each row sum, then find the row with the largest sum.

**Example**
```
scores = [
    [10, 20, 30],
    [25, 15, 10],
    [18, 18, 18]
]
```

**Expected output**
```
Row 0 sum: 60
Row 1 sum: 50
Row 2 sum: 54
Best row: 0
Largest sum: 60
```

---

### Exercise 30 · Closest Pair Difference
中文：找出差值最小的兩個數字配對。

**Task**
Use a double loop to find the pair with the **smallest absolute difference**. Print the pair and the difference.

**Hint**
- Sort the list first. Then compare adjacent elements — the closest pair will always be adjacent after sorting.
- Or use a brute-force double loop over all pairs.

**Example**
```
nums = [8, 3, 15, 10, 12]
```

**Expected output**
```
Pair: (10, 12)
Difference: 2
```

---

### Exercise 31 · Matrix Transpose
中文：將矩陣轉置（列變欄、欄變列）。

**Task**
Print the original matrix, then print its transpose.

**Hint**
- If the original has `r` rows and `c` columns, the transpose has `c` rows and `r` columns.
- `T[i][j] = matrix[j][i]`
- Build with a double loop: outer over columns of original, inner over rows of original.

**Example**
```
matrix = [
    [1, 2, 3],
    [4, 5, 6]
]
```

**Expected output**
```
Original:
[1, 2, 3]
[4, 5, 6]
Transpose:
[1, 4]
[2, 5]
[3, 6]
```
