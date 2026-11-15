<!-- bilingual -->
## Official Statement · 官方題目

:::en
IOI 2026 Day 2 · communication task (2 copy/copies of your program talk to the official manager). Time limit 1.0 s per test.

Official files: [English PDF](/ioi/ioi2026-partition-en.pdf) · [Chinese (Macau) PDF](/ioi/ioi2026-partition-zh.pdf) · [template + sample grader (zip)](/ioi/ioi2026-partition-files.zip). The PDFs contain the figures.
:::

:::zh
IOI 2026 第 2 天 · 通訊題（你的程式會有 2 個副本與官方 manager 溝通）。每個測資時限 1.0 秒。

官方檔案：[英文 PDF](/ioi/ioi2026-partition-en.pdf) · [中文（澳門）PDF](/ioi/ioi2026-partition-zh.pdf) · [範本程式與樣例評分程式（zip）](/ioi/ioi2026-partition-files.zip)。圖片請看 PDF。
:::

## How to Submit · 提交方法

:::en
- **C++ only.** Submit only the required function(s) and `#include "partition.h"`; do **not** write `main` — the official grader provides it. Start from the template in the zip.
- Each subtask counts as one row in your result; its score is the subtask score × your **lowest** result over its tests (IOI rule).
- To keep the website small, 120 of the 169 official tests are used. Every subtask keeps at least one test.
:::

:::zh
- **只接受 C++。** 只需提交題目要求的函數，並加上 `#include "partition.h"`；**不要**寫 `main`，官方評分程式已經提供。請由 zip 內的範本開始。
- 每個子任務在結果中顯示為一行；分數 = 子任務分數 × 你在該子任務所有測資中**最低**的得分比例（IOI 規則）。
- 為了控制網站大小，使用了官方 169 組測資中的 120 組，每個子任務最少保留一組。
:::

## Statement (English) · 題目（英文）

:::en
Temur and his assistant, Ulug'bek, are preparing a magic trick for the Uzbekistan Got Talent show.
The trick revolves around Temur solving the following partition problem: partition a given
collection of positive integers into K non-empty groups such that the sum of the elements in each
group is the same. In other words, every integer from the collection must be assigned to exactly
one of the K groups, and the sum within each group must be equal. For example, if the given
collection is [2, 1, 6, 4, 5] and K = 3, a valid partition would be [2, 4], [1, 5], and [6]. In this case, the
sum of elements in each group is exactly 6.
The trick is performed as follows:
Ulug'bek and Temur enter separate booths and cannot communicate with each other.
A jury member gives Ulug'bek an array A of N  positive integers, A[0], A[1], ... , A[N − 1],
where each value is between 1 and M  inclusive. The jury member also gives Ulug'bek the
value of K.
Ulug'bek chooses at most K − 1 (not necessarily distinct) integers to add as new elements
to the array A. Each added integer must also be between 1 and M  inclusive.
The jury appends the integers chosen by Ulug'bek to the original array. This extended array
is then sorted in non-decreasing order and is given to Temur, along with the value of K.
Temur must then solve the partition problem for this extended, sorted array.
Your task is to devise and implement a strategy for Temur and Ulug'bek. It can be proven that,
under the given constraints, a strategy for them exists that allows them to successfully solve the
partition problem, regardless of the array A provided by the jury.

### Implementation Details

You should implement two procedures.
The procedure you should implement for Ulug'bek is:

```cpp
std::vector<int> add_numbers(std::vector<int> A, int K, int M)
```

A: an array of length N  representing the original array given to Ulug'bek.
K: the target number of groups; note that Ulug'bek may add up to K − 1 integers to the
array.
M : the maximum allowed value for each original and newly added integer.
This procedure is called exactly once for each test case.
The procedure should return an array C containing the integers that Ulug'bek wants to add to the
original array. Let S denote the length of the array C.
S must be at most K − 1.
Each element of C must be between 1 and M  inclusive.
The procedure you should implement for Temur is:

```cpp
std::vector<int> find_partition(std::vector<int> B, int K)
```

B: an array of length N + S containing both the original integers from A and the integers
that Ulug'bek added. The elements of array B are sorted in non-decreasing order.
K: the target number of groups.
This procedure is called exactly once for each test case.
The procedure should return an array P  that represents the partition of B into K disjoint groups.
The length of P  should be N + S.
For each j such that 0 ≤ j < N + S, P[j] signifies the group to which B[j] belongs.
The groups should be numbered from 0 to K − 1, meaning 0 ≤ P[j] < K must hold for
each 0 ≤ j < N + S.
For each i between 0 and K − 1 inclusive, there must be at least one element j
(0 ≤ j < N + S) such that P[j] = i.
The sum of elements assigned to each of the K groups must be identical.
In the actual grading, a program that calls the above procedures is run exactly two times.
During the first run of the program:
add_numbers  is called exactly once.
The returned array is processed by the grading system to compute array B.
During the second run of the program:
find_partition  is called exactly once.

### Constraints

3 ≤ N ≤ 100 000
2 ≤ K ≤ 100 000
K ≤ N
1 ≤ M ≤ 10
1 ≤ A[i] ≤ M  for each i such that 0 ≤ i < N .
9

### Subtasks

Subtask Score Additional Constraints
1 5 N = 3
2 4 M = 1
3 7 M ≤ 2
4 10 N ≤ 10
5 7 K = 2
6 12 K ≤ 3
7 17 K ≤ 10
8 20 K ≤ 100
9 18 No additional constraints.
Example
Consider the following call:

```cpp
add_numbers([8, 2, 9, 6, 1, 5, 5], 3, 9)
```

In this example A = [8, 2, 9, 6, 1, 5, 5]. We want to partition the numbers into K = 3 groups.
Ulug'bek can add numbers between 1 and M = 9.
The procedure can return [5, 4], meaning that Ulug'bek decides to add S = 2 new integers: 5 and
4. These are valid since both elements are between 1 and M = 9.
The extended array is then sorted and passed to Temur with the following call:

```cpp
find_partition([1, 2, 4, 5, 5, 5, 6, 8, 9], 3)
```

We might divide the integers from this array into these three groups: [1, 5, 9], [2, 5, 8], and [4, 5, 6].
Note that the sum of each of these groups is equal to 15. To report this partition, the procedure
should return the array [0, 1, 2, 0, 1, 2, 2, 1, 0].

### Sample Grader

Input format:
N K M
A[0] A[1] ... A[N-1]
Output format:
After the call to  add_numbers  completes, the sample grader:
Computes the sorted array B.
Prints arrays C and B in the following format, followed by an empty line:
S
C[0] C[1] ... C[S-1]
B[0] B[1] ... B[N+S-1]
After the call to  find_partition  completes, the grader outputs:
L
P[0] P[1] ... P[L-1]
Here, L is the length of the array P  returned by  find_partition .
:::

## Statement (Chinese) · 題目（中文）

:::zh
帖木兒和他的助手⺎魯伯正在為《烏茲別克斯坦達人秀》節目準備一場魔術表演。 這個魔術的核心在於帖
木兒要解決以下這個分組問題:將一組給定的正整數分成K 個非空組,且每個組內元素的和都必須相等。
換言之,集合中的每個整數都必須被分配到K個非空組別內的其中一個,且每個組別內的元素的和必須相
等。 例如,若給定的集合為[2, 1, 6, 4, 5]和K = 3,則一個有效的劃分方式為[2, 4]、 [1, 5] 以及[6]。 在這
種情況下,每個組別的中元素的和均恰好為6。
此魔術的表演方式如下:
⺎魯伯與帖木兒分別進入獨立的隔間,彼此無法溝通。
一位評審向⺎魯伯提供一個陣列 A,其中包含 N  個正整數,A[0], A[1], ... , A[N − 1],每個數值
介於 1 至 M  之間(含兩端)。該評審同時也向⺎魯伯提供數值 K。
⺎魯伯選擇至多 K − 1 個整數(不一定互不相同),將其 作為新元素加入 陣列 A。每個新增的整
數也必須介於 1 至 M  之間(包含兩端)。
評審將⺎魯伯選出的整數新增至原始陣列中。接著,此擴充後的陣列將被按非遞減順序排序,並連
同K的值一併提供給帖木兒。
帖木兒必須針對此擴充且已排序的陣列,解決其分區問題。
你的任務是為帖木兒和⺎魯伯設計並實踐設定策略。可以證明,在給定的限制下,無論評審提供的陣列A
是甚麼樣的,都存在著一套能夠讓他們成功解決分組問題的策略。

### 實作細節

你應該要編寫兩個子程序。
你應該要為⺎魯伯編寫的子程序如下:

```cpp
std::vector<int> add_numbers(std::vector<int> A, int K, int M)
```

A:⻑度為N 的陣列,代表提供給⺎魯伯的原始陣列。
K:目標分組數量;請注意,⺎魯伯可能會向陣列中加入最多 K − 1 個整數。
M :允許每個原始整數及新增整數的最大值。
此程式針對每個測試案例只會被呼叫一次。
程式傳回一個陣列C,其中包含⺎魯伯欲新增至原始陣列中的整數。 設S表示陣列C的⻑度。
S必須不大於K − 1。
C每個元素必須在1與M 之間(含兩端)。
您應該為 帖木兒 編寫的子程序如下:

```cpp
std::vector<int> find_partition(std::vector<int> B, int K)
```

B:一個⻑度為N + S的陣列,其中包含來自A的原始整數以及⺎魯伯新增的整數。陣列B的元素
按照非遞減順序排序。
K:目標分組數。
此程序針對每個測試案例僅被呼叫一次。
子程序回傳一個陣列P , 表示將B分為K個互不相交的分組。
P 的⻑度應為N + S。
對於每個j且滿足0 ≤ j < N + S的情況, P[j]表示B[j]屬於的分組。
分組應從0編號至K − 1,這意味著對於每個0 ≤ j < N + S, 0 ≤ P[j] < K必須成立。
對於每個位於 0 至 K − 1 之間(含兩端)的 i,必須至少有一個元素 j (0 ≤ j < N + S),且須滿
足 P[j] = i。
分配給 K 個群組的元素總和必須完全相同。
在實際評分過程中,調用上述程序的方案將被執行兩次。
在首次執行期間:
add_numbers 會被呼叫恰好一次。
評分系統會處理該回傳的陣列,以計算陣列B。
在第二次執行期間:
find_partition  會被呼叫恰好一次。

### 約束條件

3 ≤ N ≤ 100 000
2 ≤ K ≤ 100 000
K ≤ N
1 ≤ M ≤ 10
對於每個 i,皆有 1 ≤ A[i] ≤ M ,且滿足 0 ≤ i < N 。
9

### 子任務

子任務 分數 其他約束條件
1 5 N = 3
2 4 M = 1
3 7 M ≤ 2
4 10 N ≤ 10
5 7 K = 2
6 12 K ≤ 3
7 17 K ≤ 10
8 20 K ≤ 100
9 18 沒有其他約束條件

### 範例

```cpp
add_numbers([8, 2, 9, 6, 1, 5, 5], 3, 9)
```

這裡範例中, A = [8, 2, 9, 6, 1, 5, 5]。 我們希望將這些數字分成K = 3組。 ⺎魯伯可以添加1與M = 9
之間的數字。
此程式可傳回[5, 4],表示烏魯格貝克決定增加S = 2個新增的整數: 5及4。 由於這兩個元素均在1與
M = 9之間,因此是有效的。
接著對擴展後的陣列進行排序,並透過以下調用將其傳遞給 帖木兒:

```cpp
find_partition([1, 2, 4, 5, 5, 5, 6, 8, 9], 3)
```

我們可以將此陣列中的整數分為以下三組:[1, 5, 9]、[2, 5, 8]以及[4, 5, 6]。 請注意,這三組的每組總和皆
等於15。 為了提交此分組結果,該子程序應傳回陣列[0, 1, 2, 0, 1, 2, 2, 1, 0]。

### 樣例評分程式

輸入格式:
N K M
A[0] A[1] ... A[N-1]
輸出格式:
在呼叫add_numbers 完成後,樣例評分器會:
計算出已排序的陣列B。
用以下格式輸出陣列C和B,後面接一行空行:
S
C[0] C[1] ... C[S-1]
B[0] B[1] ... B[N+S-1]
在調用find_partition 完成後,評分程式會輸出:
L
P[0] P[1] ... P[L-1]
此處,L是find_partition 所回傳的陣列P 的⻑度。
:::
