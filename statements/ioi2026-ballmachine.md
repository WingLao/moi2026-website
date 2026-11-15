<!-- bilingual -->
## Official Statement · 官方題目

:::en
IOI 2026 Day 1 · communication task (1 copy/copies of your program talk to the official manager). Time limit 3.5 s per test.

Official files: [English PDF](/ioi/ioi2026-ballmachine-en.pdf) · [Chinese (Macau) PDF](/ioi/ioi2026-ballmachine-zh.pdf) · [template + sample grader (zip)](/ioi/ioi2026-ballmachine-files.zip). The PDFs contain the figures.
:::

:::zh
IOI 2026 第 1 天 · 通訊題（你的程式會有 1 個副本與官方 manager 溝通）。每個測資時限 3.5 秒。

官方檔案：[英文 PDF](/ioi/ioi2026-ballmachine-en.pdf) · [中文（澳門）PDF](/ioi/ioi2026-ballmachine-zh.pdf) · [範本程式與樣例評分程式（zip）](/ioi/ioi2026-ballmachine-files.zip)。圖片請看 PDF。
:::

## How to Submit · 提交方法

:::en
- **C++ only.** Submit only the required function(s) and `#include "ballmachine.h"`; do **not** write `main` — the official grader provides it. Start from the template in the zip.
- Each subtask counts as one row in your result; its score is the subtask score × your **lowest** result over its tests (IOI rule).
- To keep the website small, 74 of the 74 official tests are used. Every subtask keeps at least one test.
:::

:::zh
- **只接受 C++。** 只需提交題目要求的函數，並加上 `#include "ballmachine.h"`；**不要**寫 `main`，官方評分程式已經提供。請由 zip 內的範本開始。
- 每個子任務在結果中顯示為一行；分數 = 子任務分數 × 你在該子任務所有測資中**最低**的得分比例（IOI 規則）。
- 為了控制網站大小，使用了官方 74 組測資中的 74 組，每個子任務最少保留一組。
:::

## Statement (English) · 題目（英文）

:::en
Madina has invented a ball machine to entertain the participants of the IOI. The internal structure
of the machine is as follows:
The machine consists of N  nodes, indexed from 0 to N − 1. Node N − 1 is called the root.
For each node u with 0 ≤ u < N − 1, the parent of node u is a node P[u] with P[u] > u,
and node u is a child of P[u]. The root has no parent. A node with no children is called a leaf.
You do not know N  or the parent P[u] of any node u. Instead, Madina tells you M , the number of
leaves, and that the indices of the leaves are 0, 1, ... , M − 1. Your task is to determine the internal
structure of the machine by operating it.
Each node of the machine can hold at most one ball, and each ball has a value which is a non-
negative integer. We say that a node has value x if it holds a ball with value x. A node is occupied if
it contains a ball; otherwise, it is free. Initially, every node is free.
You can perform two kinds of operations:
insert(U, X): attempt to insert a new ball with value X at leaf U.
If leaf U is occupied, the operation returns  false  without inserting the ball.
If leaf U is free, the ball is placed at node U. Then the ball repeatedly moves to the
parent of its current node as long as that parent is free. The movement stops when the
ball reaches the root or a node whose parent is occupied. The operation returns  true .
collect(): if the root is free (which means the machine is empty),  collect  returns an empty
array. Otherwise, the recursive procedure  traverse  described below gathers the values of
all balls that are currently in the machine into an array S. Initially, the array S is empty and
traverse(N - 1)  is called.
traverse(u):
append the value of the ball at node u to the end of S
let c[u] be the list of the occupied children of u
sort c[u] in non-decreasing order according to the values
of the balls at those nodes (if multiple nodes have the
same value, they can appear in any order)
for each v in c[u]:

```cpp
traverse(v)
```

After this procedure completes, all balls are removed from the machine, and  collect
returns S.
For example, consider a machine with N = 7 nodes and parent array P = [4, 6, 5, 5, 6, 6]. The
picture on the left displays the empty machine with node indices, while the picture on the right
shows a possible configuration of balls after some sequence of  insert  operations (this sequence
is given in the Example section).
When  collect()  is called, the root (node 6) is occupied, so S is initialized as S = [ ] and
traverse(6)  is called.
traverse(6) : node 6 has value 0; appending it to S gives S = [0]. The children of node 6 are 4, 1,
and 5, all of which are occupied. Their values are 20, 10, and 20, respectively. Sorting in non-
decreasing order yields c[6] = [1, 5, 4] (note that c[6] = [1, 4, 5] would also be valid, since nodes 4
and 5 have the same value). The procedure then calls  traverse  on each node in c[6] in that order.
traverse(1) : node 1 has value 10; appending it to S gives S = [0, 10]. Node 1 has no
occupied children, so this call ends.
traverse(5) : node 5 has value 20; appending it to S gives S = [0, 10, 20]. Node 5 has one
occupied child, node 2, so c[5] = [2] and the procedure calls  traverse(2) .
traverse(2) : node 2 has value 30; appending it to S gives S = [0, 10, 20, 30]. Node 2
has no occupied children, so this call ends.
The execution returns to  traverse(5)  which has processed all children in c[5], so its
call ends.
traverse(4) : node 4 has value 20; appending it to S gives S = [0, 10, 20, 30, 20]. Node 4
has no occupied children, so this call ends.
All calls have completed and there are no more nodes to process. Finally, every ball is removed
from the machine and  collect  returns the array S = [0, 10, 20, 30, 20].
Your task is to determine the number of nodes N  and report an array of parents
R = [R[0], R[1], ... , R[N − 2]] that describes the structure of the machine, but with a potentially
different labeling of the nodes that are not leaves and not the root. Formally, a reported array R is
considered correct if it is possible to assign a distinct label L[u] with 0 ≤ L[u] < N  to each node u
of the machine such that:
L[u] = u for all 0 ≤ u < M  and u = N − 1, and
L[P[u]] = R[L[u]] for all 0 ≤ u < N − 1.
It is not required that R[u] > u. The machine must be empty when you report your solution.
Let K be the number of  collect  operations performed, and B be the maximum value of any ball
across all  insert  calls. Let C = K + B. Then C must not exceed 1000. Your score in some
subtasks depends on the value of C.

### Implementation Details

You should implement the following procedure.

```cpp
std::vector<int> find_structure(int M)
```

M : the number of leaves in the machine.
The procedure is called exactly once for each test case.
The procedure must return an array R = [R[0], R[1], ... , R[N − 2]] of length N − 1, a
correct array of parents.
To interact with the machine, your procedure can call the following two procedures.
The first procedure is:

```cpp
bool insert(int U, int X)
```

U: the index of the leaf where the ball should be inserted. The condition 0 ≤ U < M  must
be met.
X: the integer value of the ball. The condition 0 ≤ X ≤ 1000 must be met.
This procedure returns  true  if the ball was successfully inserted, or  false  if leaf U was
already occupied.
This procedure can be called at most 500 000 times.
The second procedure is:

```cpp
std::vector<int> collect()
```

Collects the values on all inserted balls, empties the machine, and returns the collected array
S.
If at any point during the execution of your program the value of C exceeds 1000, your solution
will receive the verdict  Output isn't correct: Too many resources used .
The structure of the machine is fixed before  find_structure  is called. The grader is
deterministic in the sense that if you run it twice and both runs perform the same sequence of
operations, the calls to  collect  will return the same arrays.

### Constraints

2 ≤ N ≤ 1000
1 ≤ M ≤ 200
M < N

### Subtasks

Subtask Score Additional Constraints
1 5 The root has exactly M  children.
2 10 M ≤ 3
3 25 N ≤ 200, M ≤ 45
4 60 No additional constraints.
In subtasks 3 and 4, your score depends on the value of C as follows.
Subtask 3 (25 points)
Limits Score
1000 < C 0
45 < C ≤ 1000 13
C ≤ 45 25
Subtask 4 (60 points)
Limits Score
1000 < C 0
200 < C ≤ 1000 7
71 < C ≤ 200 47 −
44 < C ≤ 71 104 − C
C ≤ 44 60
Example
Consider the same machine as in the task description, so N = 7, M = 4, and P = [4, 6, 5, 5, 6, 6].
The machine is again shown in the following figure:
The grader makes the following call:

```cpp
find_structure(4)
```

The procedure can make the following sequence of calls:
1. insert(0, 0) : leaf 0 is free, so a ball with value 0 is placed at leaf 0. Node P[0] = 4 is free,
so the ball moves to node 4. Node P[4] = 6 is free, so the ball moves to node 6. Since node 6
is the root, the movement stops. The call returns  true .
2. insert(3, 20) : leaf 3 is free, so a ball with value 20 is placed at leaf 3. Node P[3] = 5 is
free, so the ball moves to node 5. Since P[5] = 6 is occupied, the movement stops. The call
returns  true .
3. insert(1, 10) : leaf 1 is free, so a ball with value 10 is placed at leaf 1. Since P[1] = 6 is
occupied, the ball stays at node 1. The call returns  true .
4. insert(2, 30) : leaf 2 is free, so a ball with value 30 is placed at leaf 2. Since P[2] = 5 is
occupied, the ball stays at node 2. The call returns  true .
5
C
5. insert(1, 25) : leaf 1 is occupied, so the ball is not placed at leaf 1. The call return  false .
6. insert(0, 20) : leaf 0 is free, so a ball with value 20 is placed at leaf 0. Node P[0] = 4 is
free, so the ball moves to node 4. Since P[4] = 6 is occupied, the movement stops. The call
returns  true .
The resulting configuration of balls was already displayed in the task description.
Next, the procedure can call:

```cpp
collect()
```

The execution of this call was already explained in the task description, so this call returns
S = [0, 10, 20, 30, 20]. Afterwards, the machine is once again empty.
Next, the procedure can call  insert(2,25) . Leaf 2 is free, so a ball with value 25 is placed at leaf
2. This ball then moves to node 5, and then to node 6, where it stops. The call returns  true . The
resulting configuration of balls is shown in the following figure.
Finally, the procedure can call  collect()  which returns S = [25] and empties the machine.
There are two correct parent arrays that find_structure  can return: R = P = [4, 6, 5, 5, 6, 6]
(which corresponds to the labeling L = [0, 1, 2, 3, 4, 5, 6]), and R = [5, 6, 4, 4, 6, 6] (which
corresponds to the labeling L = [0, 1, 2, 3, 5, 4, 6]). In this example, K = 2 and B = 30, so C = 32.

### Sample Grader

Input format:
N M
P[0] P[1] P[2] ... P[N-2]
Output format:
K B C
Q
R[0] R[1] R[2] ... R[Q-1]
Here, Q is the length of the array R returned by  find_structure .
:::

## Statement (Chinese) · 題目（中文）

:::zh
Madina 發明了一台發球機,用來娛樂 IOI 的參賽者。 該機器的內部結構如下:
機器由N 個節點 組成,索引範圍從0到N − 1。節點N − 1稱為 根節點。
對於每個節點u(其中0 ≤ u < N − 1),節點u的 父節點 為節點P[u](其P[u] > u),而節點u
則是P[u]的 子節點。根節點沒有父節點。沒有子節點的節點稱為 葉節點。
你不知道N ,也不知道任何節點u的父節點P[u]。相反地,Madina 告訴你葉節點的數量為M ,以及葉節
點的索引為0, 1, ... , M − 1。你的任務是透過操作這台機器來推斷其內部結構。
機器中的每個節點最多可容納一個 球,每個球都有一個 值,該值為非負整數。若某節點所容納的球之值
為x,則稱該節點的值為x。若節點包含一個球,則該節點為 佔用 狀態;否則,即為 空閒 狀態。 初始
時,所有節點皆為空閒。
您可以執行兩類操作:
insert(U, X):嘗試將值X的新球體插入到葉節點U 。
若葉節點U 已被佔用,則操作會返回 false 而不插入該球體。
若葉節點U 為空閒,則將球體放置於節點U 。 接著,只要當前節點的父節點為空,球體便會
反覆移動至該父節點。當球體抵達根節點,或抵達其父節點已被佔用的節點時,移動即停
止。此操作會傳回true 。
collect():若根節點為空(表示機器為空),則 collect 會傳回一個空陣列。 否則,下文所述的遞
歸程序 traverse 會將目前位於機器中的所有球的值收集到陣列S中。初始時,陣列S為空,並會呼
叫traverse(N - 1) 。
traverse(u) :
將節點  u 處的球體值追加至  S 的末尾
設  c[u] 是  u 的已占用子節點清單
根據這些節點處球體的值,將  c[u] 按非遞减順序排序
(若多個節點具有相同數值,則可按任意順序排列)
對於  c[u] 中的每個  v :

```cpp
traverse(v)
```

此程序完成後,所有球都會從機器中移除,且collect 會傳回S。
舉例來說,假設有一台擁有N = 7 個節點的機器,其父節點陣列為P = [4, 6, 5, 5, 6, 6] 。 左側圖片顯示
了帶有節點索引的空機器,而右側圖片則展示了一系列 insert  操作後球體的可能配置(此操作序列詳見
「範例」章節)。
當呼叫collect() 時,根節點(節點6)已被佔用,因此S被初始化為S = [],並呼叫 traverse(6) 。
traverse(6)  :節點6的值為0;將其附加至S後,結果為S = [0]。節點6的子節點分別為4 、1及5,這
些節點均已被佔用。它們的值分別為20、10及20。 按非遞減順序排序後,結果為c[6] = [1, 5, 4](請注
意,c[6] = [1, 4, 5]也是有效的,因為節點4和5的值相同)。接著,此程序會依此順序對c[6]中的每個節點
呼叫traverse 。
traverse(1) :節點1的值為10;將其附加至S後,結果為S = [0, 10]。節點1 沒有被佔用的子節
點,因此此呼叫結束。
traverse(5) :節點5的值為20;將其附加至S後,得到S = [0, 10, 20]。節點5 有一個被佔用的
子節點,即節點2,因此c[5] = [2]並呼叫程序 traverse(2) 。
traverse(2) :節點2的值為30;將其附加至S後,得到S = [0, 10, 20, 30] 。節點2沒有被
佔用的子節點,因此此呼叫結束。
執行流程返回至traverse(5) ,該節點已處理完c[5]中的所有子節點,因此此呼叫結束。
traverse(4) :節點4的值為20;將其追加至S後,結果為S = [0, 10, 20, 30, 20] 。節點4沒有被
佔用的子節點,因此此呼叫結束。
所有呼叫均已完成,且沒有更多節點需要處理。最後,所有球體皆從機器中移除,且 collect  會傳回陣
列S = [0, 10, 20, 30, 20]。
您的任務是確定節點數量N ,並回報一個描述機器結構的父節點陣列R = [R[0], R[1], ... , R[N − 2]],但
對於非葉節點且非根節點的節點,其標籤可能有所不同。 正式來說,如果能夠為機器的每個節點 u 分配
一個不同的標籤 L[u],且 0 ≤ L[u] < N ,則稱所報告的數組 R 是正確的:
對於所有0 ≤ u < M 和u = N − 1,皆滿足L[u] = u;以及
對於所有0 ≤ u < N − 1,皆滿足L[P[u]] = R[L[u]]。
無需滿足R[u] > u。回報解法時,機器 必須為空。
設K為執行的 collect 操作次數,B為所有insert 呼叫中任意球的最大值。設C = K + B。C不得超過
1000。 您在某些子任務中的得分取決於C的值。

### 實作細節

您應實作以下程序。

```cpp
std::vector<int> find_structure(int M)
```

M :機器中的葉節點數量。
此程序針對每個測試案例會被呼叫 exactly once。
此程序必須回傳一個⻑度為N − 1的陣列R = [R[0], R[1], ... , R[N − 2]],此陣列應為正確的父節
點陣列。
為了與機器互動,您的程序可以呼叫以下兩個程序。
第一個程序是:

```cpp
bool insert(int U, int X)
```

U :應將球插入的葉節點索引。必須滿足條件0 ≤ U < M 。
X:球的整數值。必須滿足條件0 ≤ X ≤ 1000。
若球成功插入,此程序會傳回true ;若葉節點U 已佔用,則傳回 false 。
此程序最多可被呼叫500 000次。
第二個程序如下:

```cpp
std::vector<int> collect()
```

收集所有已插入球的數值,清空機器,並傳回已收集的陣列S。
若在程式執行期間的任何時刻,C的值超過1000,您的解法將被判為 Output isn't correct: Too
many resources used 。
在呼叫  find_structure  之前,機器的結構就已經確定了。評分程式是確定性的,也就是說,如果運行
兩次,並且兩次運行都執行相同的操作序列,那麼對 collect  的呼叫將傳回相同的陣列。
限制條件
2 ≤ N ≤ 1000
1 ≤ M ≤ 200
M < N

### 子任務

子任務 分數 附加限制條件
1 5 根節點剛好有M 個子節點。
2 10 M ≤ 3
3 25 N ≤ 200, M ≤ 45
4 60 無其他限制。
在子任務 3 和 4 中,你的分數取決於C的值,如下所示。
子任務 3(25 分)
限制 分數
1000 < C 0
45 < C ≤ 1000 13
C ≤ 45 25
子任務 4(60 分)
限制 分數
1000 < C 0
200 < C ≤ 1000 7
71 < C ≤ 200 47 −
44 < C ≤ 71 104 − C
C ≤ 44 60

### 範例

考慮與題目描述中相同的機器,因此N = 7、M = 4 以及P = [4, 6, 5, 5, 6, 6] 。該機器再次如以下圖所
示:
5
C
評分器會發出以下呼叫:

```cpp
find_structure(4)
```

該程序可以發出以下一連串的呼叫:
1. insert(0, 0) :葉節點0處於空閒狀態,因此將一個值為0的球放置於葉節點0。節點P[0] = 4處
於空閒狀態,因此球移動至節點4。節點P[4] = 6處於空閒狀態,因此球移動至節點6。由於節點6
是根節點,因此移動停止。此呼叫返回true 。
2. insert(3, 20) :葉節點3為空,因此將值為20的球放置於葉節點3。節點P[3] = 5 為空,因此球
移動至節點5。由於P[5] = 6已被佔用,移動停止。此呼叫返回 true 。
3. insert(1, 10) :葉節點1為空,因此將值為10的球放置於葉節點1。 由於P[1] = 6 已被佔用,
因此球仍留在節點1。此呼叫返回true 。
4. insert(2, 30) :葉節點2為空,因此將值為30的球放置於葉節點2。由於P[2] = 5 已被佔用,因
此球仍留在節點2。此呼叫返回true 。
5. insert(1, 25) :葉節點1已被佔用,因此球不會被放置於葉節點1。此呼叫返回 false 。
6. insert(0, 20) :葉節點0為空,因此將值為20的球放置於葉節點0。節點P[0] = 4 為空,因此球
移動至節點4。由於P[4] = 6已被佔用,移動因此停止。此呼叫返回 true 。
最終的球配置已在題目說明中顯示。
接下來,此程序可呼叫:

```cpp
collect()
```

此呼叫的執行過程已在任務說明中闡述,因此此呼叫會傳回S = [0, 10, 20, 30, 20] 。之後,機器再次處於
空狀態。
接著,程序可呼叫  insert(2,25) 。葉節點2為空,因此將值為25的球放置於葉節點0。該球隨後移動至
節點5,接著移動至節點6,並在此停止。此呼叫會傳回true 。 球體的最終配置如以下圖所示。
最後,此程序可呼叫 collect() ,該函式會傳回S = [25]並清空機器。
find_structure  可 能 返 回 兩 種 正 確 的 父 陣 列 : R = P = [4, 6, 5, 5, 6, 6] ( 對 應 標 籤
L = [0, 1, 2, 3, 4, 5, 6] ) 以 及 R = [5, 6, 4, 4, 6, 6] ( 對 應 標 籤 L = [0, 1, 2, 3, 5, 4, 6] ) 。 在 此 範 例 中 ,
K = 2與B = 30,因此C = 32。

### 樣例評分程式

輸入格式:
N M
P[0] P[1] P[2] ... P[N-2]
輸出格式:
K B C
Q
R[0] R[1] R[2] ... R[Q-1]
此處,Q即為find_structure 所返回的陣列R的⻑度。
:::
