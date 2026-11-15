<!-- bilingual -->
## Official Statement · 官方題目

:::en
IOI 2026 Day 2 · communication task (64 copy/copies of your program talk to the official manager). Time limit 0.5 s per test.

Official files: [English PDF](/ioi/ioi2026-classroom-en.pdf) · [Chinese (Macau) PDF](/ioi/ioi2026-classroom-zh.pdf) · [template + sample grader (zip)](/ioi/ioi2026-classroom-files.zip). The PDFs contain the figures.
:::

:::zh
IOI 2026 第 2 天 · 通訊題（你的程式會有 64 個副本與官方 manager 溝通）。每個測資時限 0.5 秒。

官方檔案：[英文 PDF](/ioi/ioi2026-classroom-en.pdf) · [中文（澳門）PDF](/ioi/ioi2026-classroom-zh.pdf) · [範本程式與樣例評分程式（zip）](/ioi/ioi2026-classroom-files.zip)。圖片請看 PDF。
:::

## How to Submit · 提交方法

:::en
- **C++ only.** Submit only the required function(s) and `#include "classroom.h"`; do **not** write `main` — the official grader provides it. Start from the template in the zip.
- Each subtask counts as one row in your result; its score is the subtask score × your **lowest** result over its tests (IOI rule).
- To keep the website small, 52 of the 52 official tests are used. Every subtask keeps at least one test.
:::

:::zh
- **只接受 C++。** 只需提交題目要求的函數，並加上 `#include "classroom.h"`；**不要**寫 `main`，官方評分程式已經提供。請由 zip 內的範本開始。
- 每個子任務在結果中顯示為一行；分數 = 子任務分數 × 你在該子任務所有測資中**最低**的得分比例（IOI 規則）。
- 為了控制網站大小，使用了官方 52 組測資中的 52 組，每個子任務最少保留一組。
:::

## Statement (English) · 題目（英文）

:::en
A prominent high school in Tashkent celebrates its anniversary by hosting a game between
students and teachers. There are N  students sitting in the classroom, numbered from 0 to N − 1.
Each student holds a piece of paper that contains an array of integers. Initially, each paper is blank,
so it contains an empty array.
The students are playing the game with M  teachers, numbered from 0 to M − 1, and the
headmaster. The game is played in M  steps, also numbered from 0 to M − 1. In step j, teacher j
enters the classroom and the following events take place:
Some (possibly zero) students raise their hand. It is guaranteed that in every step at least
one student does not raise their hand, and each student may raise their hand at most once
during the entire game.
The teacher looks at the papers the students currently hold, and may modify the papers
held by the students that did not raise their hand in this step. For each such student, the
teacher can replace the contents of their paper with a new (possibly empty) array of
integers. Each integer must be between 0 and 63, inclusive, and the array can have at most
63 elements.
After these modifications, teacher j leaves and the students exchange their papers
according to a secret permutation P . That is, each student i (0 ≤ i < N ) gives their paper to
student P[i], where P[0], P[1], ... , P[N − 1] are N  distinct integers between 0 and N − 1,
inclusive. The values of P  are fixed during all steps of the game, but the teachers and the
headmaster do not know them.
Once all M  steps have finished and the last exchange according to P  has been performed, the
headmaster enters. Looking only at the papers held by the students, the headmaster must
determine, for every student i (0 ≤ i < N ), the step number j in which student i raised their
hand, or conclude that student i never raised their hand.
The teachers cannot communicate with other teachers or the headmaster, except through the
arrays of integers written on the papers. Each teacher knows the step at which they enter the
classroom.
Your task is to devise and implement a strategy for the teachers and the headmaster that correctly
identifies whether and when each student raised their hand. Your score will depend on the
maximum length of any array written on a paper: a shorter maximum length yields a higher or
equal score.

### Implementation Details

You need to implement two procedures, one for the teachers and one for the headmaster.
The procedure you should implement for the teachers is:
std::vector<std::vector<int>> process_step(
int N, int M, int R,
std::vector<int> T,

```cpp
std::vector<std::vector<int>> A)
```

N : the number of students.
M : the number of steps, and also the number of teachers.
R: the current step number (from 0 to M − 1).
T : a (possibly empty) array consisting of the indices of the students who raise their hand in
this step, sorted in increasing order.
A: an array of length N  describing the papers, where A[i] (0 ≤ i < N ) is the array of
integers on the paper held by student i at the beginning of the step.
This procedure is called exactly M  times per game, in the order R = 0, 1, ... , M − 1.
The procedure should return an array B of length N , representing the papers after the teacher's
modifications, in the same format as A.
For every student i that raised their hand (that is, i appears in T ), the paper must not be
changed, so B[i] = A[i].
For each i such that 0 ≤ i < N , the length of B[i] must not exceed 63, and every integer in
B[i] must be between 0 and 63, inclusive.
The procedure you should implement for the headmaster is:
std::vector<int> determine_steps(

```cpp
int N, int M, std::vector<std::vector<int>> A)
```

N , M : the same as above.
A: an array of length N , where A[i] is the array of integers on the paper held by student i
after all M  steps.
This procedure is called exactly once per game, after the final call to  process_step .
The procedure must return an array D of length N . For each i such that 0 ≤ i < N , it must hold
that
D[i] = j if student i raised their hand during step j, or
D[i] = −1 if student i never raised their hand during the entire game.
Your program is not allowed to store or transmit any information from one call to
process_step  to another, except through the return value of  process_step . If your program
attempts to do this, your score in CMS may be incorrect and may be reduced after the end of the
contest. Note that the grader may execute multiple instances of your program simultaneously. This
means that calls to  process_step  and  determine_steps from the same game may be executed
in different instances, and calls to  process_step  and  determine_steps  from different games
may be executed in the same instance. Each test case includes up to 5 games.

### Constraints

2 ≤ N ≤ 63
1 ≤ M ≤ 63
Each student raises their hand at most once during the entire game. In other words, for
every student i, there is at most one step j in which i raises their hand.
At each step, at least one student does not raise their hand.
Subtasks and Scoring
Subtask Score Additional Constraints
1 4 M = 1
2 6 N = 2
3 9 P[i] = i for all 0 ≤ i ≤ N − 1.
4 25 At most one student raises their hand at each step.
5 56 No additional constraints.
For each test case, your score is 0 (reported as  Output isn't correct  in CMS) if the return value
of any call to procedure  process_step  is invalid or if the return value of any call to procedure
determine_steps  is incorrect.
Otherwise, let C be the maximum length of any array in any B returned by  process_step . Then,
the score for a test case in a subtask with score S is calculated as S ⋅ X, where X depends on C
according to the following table:
Condition X
C ≤ 2 1.00
C = 3 0.75
C = 4 0.55
5 ≤ C ≤ 13 0.50 − 0.03 ⋅ (C − 5)
14 ≤ C ≤ 63 0.19 ⋅ + 0.04
Example
Consider a scenario with N = 4 students, M = 2 teachers, and permutation P = [0, 3, 1, 2].
Initially, all papers are empty.
The grader first calls:

```cpp
process_step(4, 2, 0, [1], [[], [], [], []])
```

Student 1 has raised their hand, so their paper cannot be modified. Teacher 0 may decide to write
[10] on the paper of student 0, write [1, 63, 4] on the paper of student 3, and leave student 2's
paper empty. To do this, the procedure must return B = [[10], [ ], [ ], [1, 63, 4]].
After teacher 0 leaves, the students exchange their papers according to P . After the exchange, the
papers are A = [[10], [ ], [1, 63, 4], [ ]].
The grader now calls:

```cpp
process_step(4, 2, 1, [0,3], [[10], [], [1,63,4], []])
```

Students 0 and 3 have raised their hand, so their papers cannot be modified. Teacher 1 may decide
to write [0, 40] on the paper of student 1 and write [1, 50] on the paper of student 2. To do this, the
procedure must return B = [[10], [0, 40], [1, 50], [ ]].
After teacher 1 leaves, the papers are again exchanged according to P . After the exchange, the
papers are A = [[10], [1, 50], [ ], [0, 40]].
Finally, the grader calls:

```cpp
determine_steps(4, 2, [[10], [1,50], [], [0,40]])
```

This procedure must return the array D = [1, 0, −1, 1] since students 0 and 3 raised their hand in
step 1, student 1 raised their hand in step 0, and student 2 never raised their hand. In this
64−14
64−C
example, C = 3.

### Sample Grader

Input format:
N M
Q[0] Q[1] ... Q[N-1]
P[0] P[1] ... P[N-1]
Here, Q is an array of length N , where Q[i] = j if student i raises their hand during step j, or
Q[i] = −1 if student i never raises their hand during the entire game.
Output format:
Following each call to  process_step , the sample grader outputs the contents of the papers. Let
K be the length of B and L[i] be the length of B[i] (for each 0 ≤ i < K). The sample grader prints
B in the following format, followed by an empty line:
K
L[0] B[0][0] B[0][1] ... B[0][L[0]-1]
L[1] B[1][0] B[1][1] ... B[1][L[1]-1]
:
L[K-1] B[K-1][0] B[K-1][1] ... B[K-1][L[K-1]-1]
The sample grader then exchanges the papers according to permutation P . If K ≠ N , the sample
grader prints an error message and terminates instead.
After calling  determine_steps , the sample grader outputs:
C H
D[0] D[1] ... D[H-1]
Here, H is the length of the array D returned by  determine_steps .
:::

## Statement (Chinese) · 題目（中文）

:::zh
塔什干一所著名高中舉辦師生對抗賽,慶祝建校週年。 教室裡坐著 N  位學生,編號從 0 到 N − 1 。每
個學生手裡拿著一張紙,紙上寫著一個整數陣列。最初,每張紙都是空白的,所以它包含的是一個空數
組。
學生們正在和 M  位老師, 編號從 0 到 M − 1 以及一位校⻑玩遊戲。 遊戲以 M  步驟進行,步數也從 0
到 M − 1 編號。 在步驟 j 中,教師 j 進入教室,並發生以下事件:
可能有部分(甚至沒有)學生舉手。可以保證,每一步至少有一名學生不舉手,並且每位學生在整
個遊戲過程中最多只能舉手一次。
教師查看學生手中的紙張,並可修改未舉手學生的紙張的內容。對於每位未舉手的學生,教師可以
將他們紙張上的內容替換為一個新的(可能為空的)整數數組。每個整數必須介於 0 和 63 之間
(含 0 和 63),且陣列最多只能包含 63 個元素。
經過這些修改後,老師 j 離開,學生們依照一個秘密排列 P  交換紙張。也就是說,每個學生 i (
0 ≤ i < N  ) 將自己的紙張交給學生 P[i] ,其中 P[0], P[1], ... , P[N − 1] 是介於 0 和 N − 1 之
間的 N  個不同的整數(包含 0 及 N − 1) 。 P  的值在整個遊戲過程中都是固定的,但老師和校⻑
都不知道這些值。
當所有 M  個步驟完成且根據 P  進行的最後一次交換也完成後,校⻑進入。校⻑只能查看學生手中的紙
張,必須確定每位學生 i ( 0 ≤ i < N  ) 舉手的步驟編號為 j ,或得出結論:學生 i 從未舉過手。
教師們無法與其他教師或校⻑交流,只能透過學生互相傳遞的紙條上所寫的整數陣列進行溝通。每個教師
都知道他自己是第幾個老師進入課室。
你的任務是為教師和校⻑設計並實施一項策略,以準確識別每位學生舉手的時間和方式。你的得分將取決
於紙上所寫數組的最大⻑度數組,其⻑度越短所得分越高或相同。

### 實作細節

你需要實施兩項程序,一項針對教師,一項針對校⻑。
你應該實現給教師的程式是:
std::vector<std::vector<int>> process_step(
int N, int M, int R,
std::vector<int> T,

```cpp
std::vector<std::vector<int>> A)
```

N  :學生人數。
M  :步數,也是教師人數。
R :目前步驟編號(從 0 到 M − 1 )。
T  :一個(可能為空的)數組,包含在此步驟中舉手的學生的索引,以升序排列
A : ⻑度為 N  的數組,用於描述紙張,其中 A[i] ( 0 ≤ i < N  ) 是學生i在步驟開始時所持有的紙
張上的整數數組。
此過程每局遊戲調用 M  次,順序為 R = 0, 1, ... , M − 1 。
過程應傳回⻑度為 N  的陣列 B ,表示教師修改後的紙張,格式與 A 相同。
每位舉手的學生 i (即 i 出現在 T  ),紙張不得更改,因此 B[i] = A[i] 。
對於每個 i 使得 0 ≤ i < N  , B[i] 的⻑度不得超過 63 ,且 B[i] 中的每個整數都必須在 0 和 63
。
你應該實現給校⻑的程式是:
std::vector<int> determine_steps(

```cpp
int N, int M, std::vector<std::vector<int>> A)
```

N  , M  : 與上述相同。
A : ⻑度為 N  的數組,其中 A[i] 是學生 i 在所有 M  步驟之後所持紙張上的整數數組。
此過程在每個遊戲中只調用一次,在最後一次調用 process_step  之後調用。
過程必須傳回⻑度為 N  數組 D 對於每個滿足 0 ≤ i < N  的 i ,必須滿足以下條件:
若學生 i 在步驟 j 期間舉手,則 D[i] = j ,或者
如果學生 i 在整個遊戲過程中從未舉手, D[i] = −1 。
您的程式不允許儲存或傳遞任何訊息,除了透過  process_step  的回傳值進行傳遞外。 如果您的程式嘗
試這樣做,您在 CMS 中的得分可能不正確,並且可能會在比賽結束後被降低。請注意,評分員可能會同
時執行您程式的多個實例。這意味著,同一局遊戲中對  process_step  和  determine_steps  呼叫可能
會在不同的實例中執行,而不同局遊戲中對  process_step  和  determine_steps  呼叫可能會在同一個
實例中執行。每個測試案例最多包含 5 遊戲。

### 約束條件

2 ≤ N ≤ 63
1 ≤ M ≤ 63
在整個遊戲過程中,每位學生最多舉手一次。換句話說,對於每位學生 i ,最多只有一步 j 中 i 會
舉手。
在每個步驟中,至少有一名學生不舉手。
子任務和評分
子任務 分數 附加限制條件
1 4 M = 1
2 6 N = 2
3 9 對所有 0 ≤ i ≤ N − 1, P[i] = i 。
4 25 每一步最多只有一名學生舉手。
5 56 無其他限制。
對 於 每 個 測 試 案 例 , 如 果 對 過 程   process_step  的 任 何 呼 叫 返 回 值 無 效 , 或 者 對 過 程
determine_steps  的任何呼叫返回值不正確,則您的得分為 0 (在 CMS 中報告為  Output isn't
correct  )。
否則,令 C 為  process_step  傳回的任 B 中任意數組的最大⻑度。然後,子任務中得分為 S 測試案例
的得分計算為 S ⋅ X ,其中 X 根據下表取決於 C :
條件 X
C ≤ 2 1.00
C = 3 0.75
C = 4 0.55
5 ≤ C ≤ 13 0.50 − 0.03 ⋅ (C − 5)
14 ≤ C ≤ 63 0.19 ⋅ + 0.04
例子
考慮一個場景,其中 N = 4 名學生, M = 2 教師,排列 P = [0, 3, 1, 2] 。 最初,所有紙張都是空白
的。
評分員首先呼叫:

```cpp
process_step(4, 2, 0, [1], [[ ], [ ], [ ], [ ]])
```

學生 1 舉手了,所以他的紙張不能修改。 教師 0 可以決定在學生 0 的紙張上寫 [10] ,在學生 3 的紙張上
寫 [1, 63, 4] ,並將學生 2 的紙張留空。為此,該過程必須傳回 B = [[10], [ ], [ ], [1, 63, 4]] 。
老師 0 離開後,學生們依照 P  交換紙張。交換後,紙張為A = [[10], [ ], [1, 63, 4], [ ]] 。
評分員現在呼叫:
64−14
64−C

```cpp
process_step(4, 2, 1, [0,3], [[10], [ ], [1,63,4], [ ]])
```

學生 0 和 3 舉手示意,因此他們的紙張不能修改。 教師 1 可以決定在學生 1 的紙張上寫 [0, 40] ,在學生
2 的紙張上寫 [1, 50] 。為此,該過程必須傳回 B = [[10], [0, 40], [1, 50], [ ]] 。
老師 1 離開後,紙張再次依照 P  交換。交換後,紙張為 A = [[10], [1, 50], [ ], [0, 40]] 。
最後,評分員呼叫:

```cpp
determine_steps(4, 2, [[10], [1,50], [ ], [0,40]])
```

此過程必須返回數組 D = [1, 0, −1, 1] 因為學生 0 和 3 在步驟 1 中舉手,學生 1 在步驟 0 中舉手,而學
生 2 從未舉手。在本例中, C = 3 。

### 樣例評分程式

輸入格式:
N M
Q[0] Q[1] ... Q[N-1]
P[0] P[1] ... P[N-1]
這裡, Q 是一個⻑度為 N  的數組,其中 Q[i] = j 如果學生 i 在步驟 j 舉手,或者 Q[i] = −1 如果學生
i 在整個遊戲中從未舉手。
輸出格式:
每次呼叫  process_step  後,範例評分器都會輸出紙張的內容。 設 K 為 B 的⻑度, L[i] 為 B[i] 的⻑
度(對於每個 0 ≤ i < K )。 範例評分器以以下格式列印B ,後面跟著一個空白行:
K
L[0] B[0][0] B[0][1] ... B[0][L[0]-1]
L[1] B[1][0] B[1][1] ... B[1][L[1]-1]
:
L[K-1] B[K-1][0] B[K-1][1] ... B[K-1][L[K-1]-1]
然後,樣本評分員依照排列 P  交換紙張。 如果 K ≠ N  ,則樣本評分器將列印錯誤訊息並終止。
呼叫 determine_steps  後,範例評分器輸出:
C H
D[0] D[1] ... D[H-1]
這裡, H 是  determine_steps  傳回的陣列 D 的⻑度。
:::
