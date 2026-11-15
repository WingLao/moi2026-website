<!-- bilingual -->
## Official Statement · 官方題目

:::en
IOI 2026 Day 1 · function implementation (the official grader calls your function). Time limit 1.0 s per test.

Official files: [English PDF](/ioi/ioi2026-monuments-en.pdf) · [Chinese (Macau) PDF](/ioi/ioi2026-monuments-zh.pdf) · [template + sample grader (zip)](/ioi/ioi2026-monuments-files.zip). The PDFs contain the figures.
:::

:::zh
IOI 2026 第 1 天 · 函數實作題（由官方評分程式呼叫你的函數）。每個測資時限 1.0 秒。

官方檔案：[英文 PDF](/ioi/ioi2026-monuments-en.pdf) · [中文（澳門）PDF](/ioi/ioi2026-monuments-zh.pdf) · [範本程式與樣例評分程式（zip）](/ioi/ioi2026-monuments-files.zip)。圖片請看 PDF。
:::

## How to Submit · 提交方法

:::en
- **C++ only.** Submit only the required function(s) and `#include "monuments.h"`; do **not** write `main` — the official grader provides it. Start from the template in the zip.
- Each subtask counts as one row in your result; its score is the subtask score × your **lowest** result over its tests (IOI rule).
- To keep the website small, 169 of the 233 official tests are used. Every subtask keeps at least one test.
:::

:::zh
- **只接受 C++。** 只需提交題目要求的函數，並加上 `#include "monuments.h"`；**不要**寫 `main`，官方評分程式已經提供。請由 zip 內的範本開始。
- 每個子任務在結果中顯示為一行；分數 = 子任務分數 × 你在該子任務所有測資中**最低**的得分比例（IOI 規則）。
- 為了控制網站大小，使用了官方 233 組測資中的 169 組，每個子任務最少保留一組。
:::

## Statement (English) · 題目（英文）

:::en
The famous Registan Square in Samarkand contains N  monuments standing in a line that passes
through the center of the square. The monuments are indexed from 0 to N − 1. Monument i (for
0 ≤ i < N ) is initially located at integer coordinate X[i]. The center of the square is at coordinate
0.
The architects require perfect symmetry with respect to the center. They want to move some
(possibly zero) of the monuments so that the final configuration is symmetric about the coordinate
0. Formally:
Every monument must be placed at integer coordinates.
Each integer coordinate may contain zero, one, or multiple monuments.
For every integer x > 0, the number of monuments at coordinate x must be equal to the
number of monuments at coordinate −x. Any number of monuments (possibly zero) can be
located at coordinate 0.
However, M  monuments are ancient and too fragile to be moved. Their indices are
P[0],P[1], ... ,P[M − 1]. These M  monuments must stay at their original coordinates. The
remaining N −M  monuments can be moved to any integer coordinates. The monuments do not
interfere with each other in any way during movements.
The cost of moving a single monument from coordinate a to coordinate b is the absolute difference
∣a −b∣. The total cost is the sum of the costs of all the monuments that are moved.
Your task is to find the minimum total cost to make the monument positions symmetric about
coordinate 0, or determine that it is impossible to achieve such a symmetry under the given
constraints.

### Implementation Details

You should implement the following procedure:

```cpp
long long get_cost(std::vector<int> X, std::vector<int> P)
```

X: a non-decreasing array of length N  describing the initial coordinates of the monuments.
P : a strictly increasing array of length M  describing the indices of the ancient monuments.
This procedure is called exactly once for each test case.
The procedure should return an integer: the minimum total cost to make the positions symmetric,
or −1 if it is impossible.

### Constraints

1 ≤ N ≤ 500 000
0 ≤ M ≤ N
−10 ≤ X[0] ≤ X[1] ≤ ... ≤ X[N − 1] ≤ 10
0 ≤ P[0] < P[1] < ... < P[M − 1] < N

### Subtasks

Subtask Score Additional Constraints
1 3 M = N
2 4 M = 0
3 5 X[P[j]] < 0 for each j such that 0 ≤ j < M .
4 6 N ≤ 10
5 5 N ≤ 19
6 5 N ≤ 32
7 13 N ≤ 200
8 17 N ≤ 4000
9 13 M ≤ 4000
10 29 No additional constraints.

### Examples

Example 1
Consider the following call:

```cpp
get_cost([-3, -2, 1, 3], [1, 2])
```

The initial configuration of the monuments is shown in the following figure.
9 9
There are N = 4 monuments, initially located at coordinates [−3, −2, 1, 3]. The indices of the
ancient monuments are P[0] = 1 and P[1] = 2. That is, the monuments at coordinates
X[P[0]] = −2 and X[P[1]] = 1 cannot be moved. The remaining monuments at coordinates −3
and 3 may be moved.
To achieve symmetry with minimum total cost, we should move the monuments as follows:
Move the monument from coordinate −3 to −1, at a cost of ∣(−3) − (−1)∣ = 2.
Move the monument from coordinate 3 to 2, at a cost of ∣3 − 2∣ = 1.
After these moves, the configuration becomes symmetric.
The total movement cost is 2 + 1 = 3, so the procedure should return 3.
Example 2
Consider the following call:

```cpp
get_cost([2, 2, 2, 3], [])
```

Here, M = 0, which means no monuments are ancient, and all monuments can be moved. One
solution with minimum total cost is to move all monuments to coordinate 0. The cost for each
monument is:
∣2 − 0∣ = 2 for monuments 0, 1, and 2.
∣3 − 0∣ = 3 for monument 3.
The total cost is 2 + 2 + 2 + 3 = 9. Hence, the procedure should return 9. Note that there are
other solutions with the same total cost.
Example 3
Consider the following call:

```cpp
get_cost([1, 2, 3, 4], [0, 1, 2, 3])
```

All 4 monuments are ancient and cannot be moved. Since their coordinates are all positive, it is
impossible to make the configuration symmetric about 0. Hence, the procedure should return −1.

### Sample Grader

Input format:
N M
X[0] X[1] ... X[N-1]
P[0] P[1] ... P[M-1]
Note that the third line may be empty if M  is 0.
Output format:
C
Here, C is the value returned by  get_cost .
:::

## Statement (Chinese) · 題目（中文）

:::zh
撒馬爾罕著名的雷吉斯坦廣場上有 N  座紀念碑,它們呈直線穿過廣場中心。 這些紀念碑的索引由 0 開始
到 N − 1。第 i 座紀念碑(0 ≤ i < N )的初始位置是在整數座標 X[i] 處。而廣場中心位於座標 0 處。
建築師的需求是要以中心為軸完全對稱。他們希望移動一些(也可以是不移動 )紀念碑,使最終的佈局以
座標 0 為軸對稱。
正式描述:
每個紀念碑都必須放置在整數座標處。
每個整數座標可以包含零個、一個或多個紀念碑。
對於每個整數 x > 0,座標 x 處的紀念碑數量必須等於在對應座標 −x 處的紀念碑數量。座標 0 處
可以有任意數量的紀念碑(也可是 0 個)。
然 而 , 有  M  座 古 老 的 紀 念 碑 因 為 年 代 久 遠 , 過 於 脆 弱 , 無 法 搬 遷 。  它 們 的 索 引 分 別 為
P[0],P[1], ... ,P[M − 1]。這 M  座紀念碑必須保留在原座標。其餘 N −M  座紀念碑就可以移動到任
意整數座標。 紀念碑在移動的過程中不會以任何形式影響其他紀念碑。
把單一座紀念碑由座標 a 移動到座標 b 的成本是兩者的絕對差 ∣a −b∣。而總成本就是所有古蹟的移動成
本總和。
你的任務是要找到移動紀念碑後要完成對座標 0 的對稱最小總成本,或者判斷在給定的約束條件下不可能
實現這種對稱。

### 實作細節

您應該編寫以下的子程序:

```cpp
long long get_cost(std::vector<int> X, std::vector<int> P)
```

X:⻑度為 N  的非遞減數組,用於描述各紀念碑的初始座標。
P :⻑度為 M  的嚴格遞增數組,用於描述古老的紀念碑的索引。
對於每個測試樣例,此過程只會呼叫一次。
子程序應傳回一個整數:使位置對稱的最小總成本,如果不可能,輸出−1 。

### 約束條件

1 ≤ N ≤ 500 000
0 ≤ M ≤ N
−10 ≤ X[0] ≤ X[1] ≤ ... ≤ X[N − 1] ≤ 10
0 ≤ P[0] < P[1] < ... < P[M − 1] < N

### 子任務

子任務 分數 附加限制
1 3 M = N
2 4 M = 0
3 5 X[P[j]] < 0 當中 j 取值範圍是 0 ≤ j < M .
4 6 N ≤ 10
5 5 N ≤ 19
6 5 N ≤ 32
7 13 N ≤ 200
8 17 N ≤ 4000
9 13 M ≤ 4000
10 29 沒有限制

### 範例

範例 1
請考慮以下調用:

```cpp
get_cost([-3, -2, 1, 3], [1, 2])
```

下圖顯示了紀念碑的初始佈局。
共有 N = 4 座紀念碑,最初位於座標 [−3, −2, 1, 3]。古老的紀念碑索引為 P[0] = 1 和 P[1] = 2。也就
是說,座標為 X[P[0]] = −2 和 X[P[1]] = 1 紀念碑不能移動。座標為 −3 和 3 的剩餘紀念碑可以移
9 9
動。
要完成對稱的最小總成本,我們應該要根據以下的紀念碑移動方法:
把紀念碑從 −3 移到 −1,成本是 ∣(−3) − (−1)∣ = 2。
把紀念碑從 3 移到 2,成本是 ∣3 − 2∣ = 1。
完成這些移動後,佈局將會變成對稱。
總紀念碑的移動成本是 2 + 1 = 3,所以程序應該返回 3。
範例 2
請考慮以下調用:

```cpp
get_cost([2, 2, 2, 3], [])
```

這裏,M = 0,意思是沒有古老的紀念碑,即所有的紀念碑都能夠移動。 其中一個最小總成本的解是把
所有紀念碑全部移動到座標 0。 對於每座紀念碑的成本是:
對於紀念碑 0, 1, 2 號的成本是 ∣2 − 0∣ = 2。
對於紀念碑 3 號的成本是 ∣3 − 0∣ = 3。
總成本是 2 + 2 + 2 + 3 = 9。因此,程序應該返回 9。注意還存在其他解法也有相同的總成本。
範例 3
請考慮以下調用:

```cpp
get_cost([1, 2, 3, 4], [0, 1, 2, 3])
```

所有 4 座紀念碑都是古老的所以無法移動。而他們的座標都是正數,它不可以完成對座標 0 對稱的佈局。
因此,程序應該返回 −1。

### 樣例評分程式

輸入格式:
N M
X[0] X[1] ... X[N-1]
P[0] P[1] ... P[M-1]
注意當 M  是 0 時,第三行可能是空行
輸出格式:
C
這裏,C 是  get_cost  的返回值。
:::
