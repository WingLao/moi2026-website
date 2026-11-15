<!-- bilingual -->
## Official Statement · 官方題目

:::en
IOI 2026 Day 1 · communication task (1 copy/copies of your program talk to the official manager). Time limit 1.0 s per test.

Official files: [English PDF](/ioi/ioi2026-tiling-en.pdf) · [Chinese (Macau) PDF](/ioi/ioi2026-tiling-zh.pdf) · [template + sample grader (zip)](/ioi/ioi2026-tiling-files.zip). The PDFs contain the figures.
:::

:::zh
IOI 2026 第 1 天 · 通訊題（你的程式會有 1 個副本與官方 manager 溝通）。每個測資時限 1.0 秒。

官方檔案：[英文 PDF](/ioi/ioi2026-tiling-en.pdf) · [中文（澳門）PDF](/ioi/ioi2026-tiling-zh.pdf) · [範本程式與樣例評分程式（zip）](/ioi/ioi2026-tiling-files.zip)。圖片請看 PDF。
:::

## How to Submit · 提交方法

:::en
- **C++ only.** Submit only the required function(s) and `#include "tiling.h"`; do **not** write `main` — the official grader provides it. Start from the template in the zip.
- Each subtask counts as one row in your result; its score is the subtask score × your **lowest** result over its tests (IOI rule).
- To keep the website small, 225 of the 225 official tests are used. Every subtask keeps at least one test.
:::

:::zh
- **只接受 C++。** 只需提交題目要求的函數，並加上 `#include "tiling.h"`；**不要**寫 `main`，官方評分程式已經提供。請由 zip 內的範本開始。
- 每個子任務在結果中顯示為一行；分數 = 子任務分數 × 你在該子任務所有測資中**最低**的得分比例（IOI 規則）。
- 為了控制網站大小，使用了官方 225 組測資中的 225 組，每個子任務最少保留一組。
:::

## Statement (English) · 題目（英文）

:::en
Barchin and Charos are playing a game on a grid of 2N × 2M  unit square cells. The rows are
numbered 0 to 2N − 1 from top to bottom, and the columns are numbered 0 to 2M − 1 from left
to right. For 0 ≤ i < 2N  and 0 ≤ j < 2M , we denote the cell in row i and column j by (i,j).
Barchin gives Charos N ⋅M  blocks, one by one. Each block is a 2 × 2 square consisting of four
1 × 1 tiles. Barchin has colored every tile of the block either black or white while guaranteeing that
at least one tile is white.
Charos must place each block on the grid immediately after receiving it, without knowing what
blocks she will receive later. Blocks cannot be rotated. Each block must be placed entirely inside the
grid, covering exactly four grid cells. Moreover, the top-left tile of each block must cover a cell
whose row and column coordinates are both even. Each cell of the grid can be covered by at most
one block.
Barchin wins the game if, after any block is placed, there exists a 2 × 2 square of cells that is
covered by four black tiles. Formally, if cells (a,b), (a + 1,b), (a,b + 1), (a + 1,b + 1) are all
covered by black tiles for some 0 ≤ a < 2N − 1 and 0 ≤ b < 2M − 1, then Barchin wins. The
indices a and b do not need to be even.
Charos wins if she places all N ⋅M  blocks without Barchin ever winning. Note that placing N ⋅M
blocks will completely cover the grid.
Your task is to implement a strategy for Charos to win the game. It can be proven that, under the
given constraints, Charos can always place the blocks so as to guarantee a win, regardless of the
colorings of the blocks she receives later.

### Implementation Details

You should implement two procedures:

```cpp
void init(int N, int M)
```

N : half the number of rows in the grid.
M : half the number of columns in the grid.
The procedure is called exactly once per test case, at the beginning of the execution of your
program.

```cpp
std::pair<int, int> receive_block(int TL, int TR, int BL, int BR)
```

TL, TR, BL, BR: the colors of the top-left, top-right, bottom-left, and bottom-right tiles of
the current block, respectively, as shown in the figure below. Each value is either 0 (white) or
1 (black).
This procedure is called exactly N ⋅M  times per test case, after the initial call to  init .
This procedure should return a pair of integers (i,j), where i is the row coordinate and j is the
column coordinate of the cell where the top-left tile of this block should be placed. Both i and j
must be even, and the 2 × 2 region covered by the block must not overlap any previously placed
block.
If  receive_block  ever returns a pair that does not satisfy these requirements, or if after placing
the block a 2 × 2 square of cells becomes completely covered by black tiles, the grader will
immediately terminate your program and the verdict for the test case will be  Output isn't
correct .
The behaviour of the grader is not adaptive. This means that the sequence of blocks Barchin gives
to Charos is fixed before  init  is called.

### Constraints

For each block, let S be the number of black tiles among its four tiles. That is,
S = TL +TR +BL +BR.
1 ≤ N,M ≤ 100
0 ≤ S ≤ 3 for every block.

### Subtasks

Subtask Score Additional Constraints
1 6 S = 1 for every block, and N = 2.
2 16 S = 3 for every block. N = M , N  is even, and each of the four possible
block colorings appears exactly  times.
3 10 S = 1 for every block.
4 29 S ≤ 2 for every block.
5 39 No additional constraints.
Example
Consider a game with N = 1 and M = 2, so the grid has 2 rows and 4 columns. The grader first
calls:

```cpp
init(1, 2)
```

Initially, all cells are empty. The grid looks like this:
There are N ⋅M = 2 blocks to place. Suppose Barchin gives a block with three black tiles and one
white tile at the top-right corner. The grader calls:

```cpp
receive_block(1, 0, 1, 1)
```

Charos decides to place this block at the left side of the grid by returning (0, 0).
The grid now looks like this:
4
N 2
Barchin then gives another block with three black tiles and one white tile at the top-left corner:

```cpp
receive_block(0, 1, 1, 1)
```

The only remaining cell with even row and even column that can serve as the top-left corner of a
2 × 2 block is (0, 2), so Charos returns (0, 2). The grid ends up like this:
No 2 × 2 square is completely covered by black tiles, so Charos has successfully placed all blocks
without Barchin ever winning. Charos wins the game.

### Sample Grader

Input format:
N M
TL[0] TR[0] BL[0] BR[0]
TL[1] TR[1] BL[1] BR[1]
...
TL[NM-1] TR[NM-1] BL[NM-1] BR[NM-1]
Output format:
R[0] C[0]
R[1] C[1]
...
R[NM-1] C[NM-1]
Here, R[k] and C[k] are the pair of integers returned by the k-th call to  receive_block.
:::

## Statement (Chinese) · 題目（中文）

:::zh
Barchin 和 Charos 正在一個由 2N × 2M  正方形單元格組成的網格上玩遊戲。 行由上至下編號為 0 到
2N − 1 ,列由左至右編號為 0 到 2M − 1 。 對於 0 ≤ i < 2N  和 0 ≤ j < 2M  ,我們將 i 行和第 j
列的單元格表示為 (i,j) 。
Barchin 依序給 Charos N ⋅M  個方塊。每個方塊都是一個 2 × 2 正方形,由四個 1 × 1 小瓷磚組成。
Barchin 已把每個小瓷磚塗成黑色或白色,但保證至少有一個小方塊是白色的。
Charos 必須在收到方塊後立即將其放置在網格上,而不知道之後會收到哪些方塊。 方塊不能旋轉。每個
方塊必須完全放置在網格內,且剛好覆蓋四個網格單元。此外,每個方塊左上角的瓷磚必須覆蓋一個行座
標和列座標均為偶數的網格。 網格中的每個單元格最多只能被一個瓷磚覆蓋。
如果放置任意方塊後,存在一個 2 × 2 的正方形,其中四個單元格被四個黑色瓷磚覆蓋,則 Barchin 獲
勝 。 形 式 上 , 如 果 單 元  (a,b), (a + 1,b), (a,b + 1), (a + 1,b + 1) 都 被 黑 色 瓷 磚 覆 蓋 , 其 中
0 ≤ a < 2N − 1 且 0 ≤ b < 2M − 1 ,則 Barchin 獲勝。索引 a 和 b 不必是偶數。
如果 Charos 放置所有 N ⋅M  個方塊,而 Barchin 一次也沒有獲勝,則 Charos 獲勝。 注意,放置
N ⋅M  個方塊將完全覆蓋網格。
你的任務是為 Charos 制定贏得比賽的策略。 可以證明,在給定的限制條件下,無論 Charos 之後收到什
麼顏色的方塊,她總是可以放置方塊以確保獲勝。

### 實作細節

您應該實施以下兩個步驟:

```cpp
void init(int N, int M)
```

N  :網格中行數的一半。
M  :網格中列數的一半。
過程在每個測試案例中只調用一次,即在程式執行開始時調用。

```cpp
std::pair<int, int> receive_block(int TL, int TR, int BL, int BR);
```

TL 、 TR 、 BL 、 BR :分別為目前方塊左上角、右上角、左下角和右下角瓷磚的顏色,如下
圖所示。每個值要麼是 0 (白色),要麼是1 (黑色)。
首次呼叫 init  之後,每個測試案例將呼叫此程序 N ⋅M  次。
此過程應傳回一對整數 (i,j) ,其中 i 是該區塊左上角圖塊應放置的單元格的行座標, j 是該單元格的列
座標。 i 和 j 都必須是偶數,且該區塊覆蓋的 2 × 2 區域不得與任何先前放置的區塊重疊。
如果  receive_block  傳回的鍵值對不符合這些要求,或放置方塊後,一個 2 × 2 儲存格完全被黑色瓷
磚覆蓋,則評分器會立即終止您的程序,且該測試案例的判定結果為 Output isn't correct  。
評分器的行為不具備自適應性。這表示在呼叫 init 之前,Barchin 交給 Charos 的方塊順序就已經固定好
了。

### 約束條件

對於每個方塊,令 S 為其四個中黑色瓷磚的數量。即 S = TL +TR +BL +BR 。
1 ≤ N,M ≤ 100
對於每個區塊, 0 ≤ S ≤ 3 。

### 子任務

子任
務
分
數 附加限制條件
1 6 每區塊的 S = 1 ,且 N = 2 。
2 16 每個方塊的 S = 3 。 N = M  , N  為偶數,四種可能的方塊著色方案每一種都恰好
出現  次。
3 10 每個方塊 S = 1 。
4 29 每個方塊 S ≤ 2 。
5 39 無其他限制。
例子
考慮一個遊戲,其中 N = 1 , M = 2 ,因此網格有 2 行和 4 列。 評分員首先大喊:

```cpp
init(1, 2)
```

初始狀態下,所有儲存格均為空。網格如下圖所示:
4
N 2
需放置 N ⋅M = 2 積木。 假設Barchin給出一個方塊,其中包含三個黑瓷磚和一個位於右上角的白瓷
磚。評分器會呼叫:

```cpp
receive_block(1, 0, 1, 1)
```

Charos 決定將此區塊放置在網格的左側,並返回 (0, 0) 。
現在的網格看起來是這樣的:
Barchin隨後又拿出一個方塊,其中有三塊黑色瓷磚及一塊位於左上角有一個白色瓷磚:

```cpp
receive_block(0, 1, 1, 1)
```

唯一剩餘的行和列均為偶數且能作為 2 × 2 方塊左上角的網格是 (0, 2) ,因此 Charos 傳回 (0, 2) 。最終
的網格如下圖所示:
沒有 2 × 2 方格被黑色瓷磚完全覆蓋,因此 Charos 成功放置了所有方塊,Barchin 從未獲勝。 Charos
贏得比賽。

### 樣例評測程式

輸入格式:
N M
TL[0] TR[0] BL[0] BR[0]
TL[1] TR[1] BL[1] BR[1]
...
TL[NM-1] TR[NM-1] BL[NM-1] BR[NM-1]
輸出格式:
R[0] C[0]
R[1] C[1]
...
R[NM-1] C[NM-1]
這裡, R[k] 和 C[k] 是第 k 次呼叫  receive_block  傳回的一對整數。
:::
