<!-- bilingual -->
## Official Statement · 官方題目

:::en
IOI 2026 Day 2 · function implementation with partial scoring. Time limit 0.5 s per test.

Official files: [English PDF](/ioi/ioi2026-magiccity-en.pdf) · [Chinese (Macau) PDF](/ioi/ioi2026-magiccity-zh.pdf) · [template + sample grader (zip)](/ioi/ioi2026-magiccity-files.zip). The PDFs contain the figures.
:::

:::zh
IOI 2026 第 2 天 · 函數實作題（有部分分）。每個測資時限 0.5 秒。

官方檔案：[英文 PDF](/ioi/ioi2026-magiccity-en.pdf) · [中文（澳門）PDF](/ioi/ioi2026-magiccity-zh.pdf) · [範本程式與樣例評分程式（zip）](/ioi/ioi2026-magiccity-files.zip)。圖片請看 PDF。
:::

## How to Submit · 提交方法

:::en
- **C++ only.** Submit only the required function(s) and `#include "magiccity.h"`; do **not** write `main` — the official grader provides it. Start from the template in the zip.
- Each subtask counts as one row in your result; its score is the subtask score × your **lowest** result over its tests (IOI rule).
- To keep the website small, 51 of the 51 official tests are used. Every subtask keeps at least one test.
:::

:::zh
- **只接受 C++。** 只需提交題目要求的函數，並加上 `#include "magiccity.h"`；**不要**寫 `main`，官方評分程式已經提供。請由 zip 內的範本開始。
- 每個子任務在結果中顯示為一行；分數 = 子任務分數 × 你在該子任務所有測資中**最低**的得分比例（IOI 規則）。
- 為了控制網站大小，使用了官方 51 組測資中的 51 組，每個子任務最少保留一組。
:::

## Statement (English) · 題目（英文）

:::en
The mayor of Tashkent wants to redesign the famous Magic City amusement park. You are given a
positive integer K and your task is to design a park as follows:
Choose an integer N , the number of attractions. The attractions are labeled with integers
from 0 to N − 1.
Add bidirectional walkways, each between a pair of distinct attractions. It is allowed to have
more than one walkway between the same pair of attractions. It is not required to be able
to travel between every pair of attractions using the walkways.
For each i such that 0 ≤ i < N , assign attraction i a type T[i]. There are 2K types
numbered from 0 to 2K − 1. Every type should be assigned to at least one attraction.
Different attractions may have the same type.
Market research revealed that:
1. Each visitor prefers to visit three attractions without visiting two attractions of the same type
consecutively.
2. Visitors dislike attractions that are an endpoint of many walkways.
In order to satisfy all potential visitors, the mayor imposes two conditions on your design.
We call an ordered triple of types (t , t , t ) for 0 ≤ t , t , t < 2K interesting if t ≠ t  and
t ≠ t . Note that t  might be equal to t . Thus, there are 2K ⋅ (2K − 1)  interesting triples.
Condition 1: For each interesting triple (t , t , t ), there must exist three attractions a , a , a  (with
0 ≤ a , a , a < N ) such that:
The types of a , a , a  match t , t , t . That is, T[a ] = t , T[a ] = t , and T[a ] = t .
There is a walkway between a  and a .
There is a walkway between a  and a .
It is irrelevant whether or not there is a walkway between a  and a . Also note that when t = t ,
the attractions a  and a  may be the same.
Condition 2: Each attraction can be an endpoint of at most K walkways.
This task consists of 50 output-only subtasks with partial scoring. Each subtask corresponds to a
specific value of K, and you must design a park that satisfies all above conditions for that value of
K. Your score depends on the number of attractions in your solution: fewer attractions yield a
higher or equal score.
1 2 3 1 2 3 1 2
2 3 1 3 2
1 2 3 1 2 3
1 2 3
1 2 3 1 2 3 1 1 2 2 3 3
1 2
2 3
1 3 1 3
1 3

### Implementation Details

There are two methods to submit your solution, and you may use either one for each subtask:
Procedure call
Output file
To submit your solution via a procedure call, you should implement the following procedure:
std::pair<std::vector<int>,std::vector<std::pair<int, int>>>

```cpp
construct(int K)
```

K: half the number of attraction types, and also the maximum number of walkways that
each attraction can be an endpoint of.
This procedure is called exactly once for each subtask.
The procedure should return a pair (T, E) describing an amusement park. Let M  be the number
of walkways in your park.
T : an array of length N  describing the types of attractions.
E: an array of length M  describing the walkways. For each 0 ≤ j < M , E[j] = (U[j], V [j])
represents a bidirectional walkway between distinct attractions U[j] and V [j].
To submit your solution via an output file, create and submit a text file in the following format:
N M
T[0] T[1] ... T[N-1]
U[0] V[0]
U[1] V[1]
...
U[M-1] V[M-1]
Note that your solution must satisfy the following constraints to be considered valid:
N ≤ 2000
0 ≤ T[i] < 2K for each 0 ≤ i < N , and every type should be assigned to at least one
attraction.
0 ≤ U[j], V [j] < N  and U[j] ≠ V [j] for each 0 ≤ j < M .
Conditions 1 and 2 must be met.

### Constraints

1 ≤ K ≤ 50

### Scoring

There are 50 subtasks, one for each integer K from 1 to 50. For Subtask i (1 ≤ i ≤ 50), the value
of K is i.
Each subtask has a score S and a target number of attractions P  according to the table below.
Subtasks S P
1 1 2
2 8 12
3 9 24
4 9 40
5 9 50
6 - 10 4 12 ⋅ K
11 - 12 3 12 ⋅ K
13 - 50 1 12 ⋅ K
For each subtask, if your solution does not describe a valid amusement park, then the score of
your solution will be 0 (reported as  Output isn't correct  in CMS).
Otherwise, your score is calculated based on N  and the parameters S and P  as follows:
Condition Score
N ≤ P S
P < N ≤ 2P (0.4 + 0.3 ⋅ ) ⋅ S
2P < N ≤ 2000 (0.1 + 0.3 ⋅ ) ⋅ S
Example
Consider the following call:

```cpp
construct(1)
```

In this example, K = 1, so there are 2K = 2 types of attractions. The figure below shows a valid
solution with N = 4 attractions and M = 2 walkways. Attractions 0, 1, 2 are of type 0, and
attraction 3 is of type 1.
P
2P−N
N
2P
There are two interesting triples:
For the type triple (0, 1, 0), we can choose (a , a , a ) = (2, 3, 2).
For the type triple (1, 0, 1), we can choose (a , a , a ) = (3, 2, 3).
This means that Condition 1 is satisfied.
The procedure can return the pair ([0, 0, 0, 1], [(0, 1), (2, 3)]). Note that the provided solution for
this example might not be optimal for K = 1.

### Sample Grader

Input format:
K
Output format:
N M
T[0] T[1] ... T[N-1]
U[0] V[0]
U[1] V[1]
...
U[M-1] V[M-1]
Note that the output of the sample grader matches the required format for the output file.
1 2 3
1 2 3
:::

## Statement (Chinese) · 題目（中文）

:::zh
塔什干市⻑希望重新規劃著名的「魔法城」遊樂園。 給定一個正整數 K,你的任務是設計一座符合以下
要求的遊樂園:
選擇一個整數 N  作為景點的數量,並將這些設施標記為從 0 到 N − 1 的整數。
在不同的景點之間添加雙向走道。它也允許兩個景點之間存在多於一條的走道。但並非必須能夠透
過走道在每一對景點之間穿梭。
對於每個 i 滿足 0 ≤ i < N ,請為景點 i 指派類型 T[i]。共有 2K 種類型,編號範圍為 0 至
2K − 1。 每種類型都應被指派給至少一個景點。不同的景點可能具有相同的類型。
市場調查顯示:
1. 每位遊客偏好參觀恰好三個景點,且不會連續參觀兩個同類型的景點。
2. 遊客不喜歡多條走道盡頭的景點。
為了滿足所有潛在遊客的需求,市⻑對你的設計提出了兩項條件。
我們稱一個有序三元組類型 (t , t , t ),其中 0 ≤ t , t , t < 2K,當 t ≠ t  且 t ≠ t  時是有趣的。
注意 t  可能等於 t 。因此,有 2K ⋅ (2K − 1)  有趣的三元組。
條 件  1 :  對 於 每 個 有 趣 的 三 元 組  (t , t , t ) , 必 須 存 在 三 個 景 點  a  、  a  、  a ( 其 中
0 ≤ a , a , a < N ),使得:
a , a , a  的類型與 t , t , t  的類型相符。也就是說, T[a ] = t ,T[a ] = t ,且 T[a ] = t 。
在 a  和 a  之間有一條人行道。
在 a  和 a  之間有一條人行道。
a  和 a  之間是否有通道並不重要。另請注意,當 t = t  時,景點 a  和 a  可能相同。
條件 2: 每個景點最多可以成為 K 條走道的終點。
這項任務包含50分部分評分的僅輸出子任務。每個子任務對應一個特定的 K 值,你必須設計一個樂園,
使其滿足該 K 值對應的所有上述條件。 您的分數取決於解決方案中所包含的景點數量:景點數量越少,
分數越高或相同。

### 實作細節

提交解決方案有兩種方法,每個子任務可以使用其中任何一種方法:
過程呼叫
1 2 3 1 2 3 1 2 2 3
1 3 2
1 2 3 1 2 3
1 2 3
1 2 3 1 2 3 1 1 2 2 3 3
1 2
2 3
1 3 1 3 1 3
輸出檔案
要透過過程呼叫提交解決方案,您應該實現以下過程:
std::pair<std::vector<int>,std::vector<std::pair<int, int>>>

```cpp
construct(int K)
```

K:景點類型數量的一半,也是每個景點可以作為終點的走道的最大數量。
對於每個子任務,此過程恰好只調用一次。
該過程應返回一對 (T, E) 來描述一個遊樂園。假設 M  是你的遊樂園走道數量。
T:⻑度為 N  的數組用於描述景點的類型。
E:⻑度為 M  的數組用於描述走道。對於每個 0 ≤ j < M ,E[j] = (U[j], V [j]) 代表連接不同景
點 U[j] 與 V [j] 之間的雙向步道。
若要透過 輸出檔案 提交您的解法,請建立並提交一個符合以下格式的文字檔案:
N M
T[0] T[1] ... T[N-1]
U[0] V[0]
U[1] V[1]
...
U[M-1] V[M-1]
請注意,您的解法必須滿足以下限制條件,才被視為有效:
N ≤ 2000
0 ≤ T[i] < 2K,且 0 ≤ i < N , 而且每種類型都應被分配至至少一項景點。
0 ≤ U[j], V [j] < N  且 U[j] ≠ V [j],且 0 ≤ j < M .
條件 1 和 2 必須滿足.
限制條件
1 ≤ K ≤ 50
計分
共有 50 個子任務,每個整數 K(範圍從 1 到 50)對應一個子任務。 對於子任務 i(1 ≤ i ≤ 50),K
的值為 i。
根據下表,每個子任務都有一個分數 S 以及一個目標吸引力數 P 。
子任務 S P
1 1 2
2 8 12
3 9 24
4 9 40
5 9 50
6 - 10 4 12 ⋅ K
11 - 12 3 12 ⋅ K
13 - 50 1 12 ⋅ K
對於每個子任務,若您的解法未能描述一個有效的遊樂園,則該解法的得分將為 0(在 CMS 中顯示為
Output isn't correct )。
否則,您的分數將根據 N  以及參數 S 和 P  如下計算:
條件 分數
N ≤ P S
P < N ≤ 2P (0.4 + 0.3 ⋅ ) ⋅ S
2P < N ≤ 2000 (0.1 + 0.3 ⋅ ) ⋅ S
樣例
請考慮以下呼叫:

```cpp
construct(1)
```

在此範例中,K = 1,因此共有 2K = 2 種遊樂設施類型。 下圖顯示了一個有效的解法,其中包含
N = 4 個遊樂設施與 M = 2 條步道。 遊樂設施 0, 1, 2 屬於 0 類型,而遊樂設施 3 則屬於 1 類型。
有兩個有趣的三元組:
對於類型三元組 (0, 1, 0),我們可以選擇 (a , a , a ) = (2, 3, 2)。
P
2P−N
N
2P
1 2 3
對於類型三元組 (1, 0, 1),我們可以選擇 (a , a , a ) = (3, 2, 3)。
這表示滿足條件 1。
該程序可以返回元組 ([0, 0, 0, 1], [(0, 1), (2, 3)])。 請注意,此範例中提供的解法對於 K = 1 而言,可能
並非最優解。
樣例評測器
輸入格式:
K
輸出格式:
N M
T[0] T[1] ... T[N-1]
U[0] V[0]
U[1] V[1]
...
U[M-1] V[M-1]
請注意,樣例評分器的輸出結果符合輸出檔案所需的格式。
1 2 3
:::
