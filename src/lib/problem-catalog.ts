export type ProblemLevel = 'Beginner' | 'GA' | 'DP' | 'P' | 'J' | 'S' | 'CSPJ' | 'CSPS' | 'NOIP' | 'NOI' | 'IOI';

export type ProblemCatalogEntry = {
  slug: string;
  title: string;
  level: ProblemLevel;
  statementFilename: string;
  pdfFilename?: string;
  pdfAliases?: string[];
  dataDirName?: string;
  timeLimitMs?: number;
  memoryLimitMb?: number;
};

const F5B_BEGINNER_PROBLEMS: readonly ProblemCatalogEntry[] = [
  { slug: 'beginner-f5b-01-number-sequences', title: '01 Number Sequences with range() · 用 range() 產生數列', level: 'Beginner', dataDirName: 'f5b-01-number-sequences', statementFilename: 'beginner-f5b-01-number-sequences.md' },
  { slug: 'beginner-f5b-02-even-squares', title: '02 Square of Even Numbers · 偶數的平方', level: 'Beginner', dataDirName: 'f5b-02-even-squares', statementFilename: 'beginner-f5b-02-even-squares.md' },
  { slug: 'beginner-f5b-03-factorial-5', title: '03 Factorial of 5 · 5 的階乘', level: 'Beginner', dataDirName: 'f5b-03-factorial-5', statementFilename: 'beginner-f5b-03-factorial-5.md' },
  { slug: 'beginner-f5b-04-even-sum', title: '04 Sum of Even Numbers (1–10) · 1 至 10 的偶數和', level: 'Beginner', dataDirName: 'f5b-04-even-sum', statementFilename: 'beginner-f5b-04-even-sum.md' },
  { slug: 'beginner-f5b-05-divisible-by-13', title: '05 Divisible by 13 (1–500) · 1 至 500 中 13 的倍數', level: 'Beginner', dataDirName: 'f5b-05-divisible-by-13', statementFilename: 'beginner-f5b-05-divisible-by-13.md' },
  { slug: 'beginner-f5b-06-reverse-multiplication-table', title: '06 Multiplication Table in Reverse Order · 倒序乘數表', level: 'Beginner', dataDirName: 'f5b-06-reverse-multiplication-table', statementFilename: 'beginner-f5b-06-reverse-multiplication-table.md' },
  { slug: 'beginner-f5b-07-append-list', title: '07 Create a List with append() · 用 append() 建立列表', level: 'Beginner', dataDirName: 'f5b-07-append-list', statementFilename: 'beginner-f5b-07-append-list.md' },
  { slug: 'beginner-f5b-08-list-statistics', title: '08 List Statistics with NumPy · 用 NumPy 計算統計數據', level: 'Beginner', dataDirName: 'f5b-08-list-statistics', statementFilename: 'beginner-f5b-08-list-statistics.md' },
  { slug: 'beginner-f5b-09-filter-transform', title: '09 Filter and Transform with NumPy · 篩選並轉換數據', level: 'Beginner', dataDirName: 'f5b-09-filter-transform', statementFilename: 'beginner-f5b-09-filter-transform.md' },
  { slug: 'beginner-f5b-10-even-above-average', title: '10 Even Numbers Above Average · 高於平均的偶數', level: 'Beginner', dataDirName: 'f5b-10-even-above-average', statementFilename: 'beginner-f5b-10-even-above-average.md' },
  { slug: 'beginner-f5b-11-count-average', title: '11 Count Above and Below Average · 數一數高於和不高於平均的數', level: 'Beginner', dataDirName: 'f5b-11-count-average', statementFilename: 'beginner-f5b-11-count-average.md' },
  { slug: 'beginner-f5b-12-replace-below-average', title: '12 Replace Values Below Average · 把低於平均的數換成 0', level: 'Beginner', dataDirName: 'f5b-12-replace-below-average', statementFilename: 'beginner-f5b-12-replace-below-average.md' },
  { slug: 'beginner-f5b-13-standard-deviation', title: '13 Standard Deviation Challenge · 標準差挑戰', level: 'Beginner', dataDirName: 'f5b-13-standard-deviation', statementFilename: 'beginner-f5b-13-standard-deviation.md' },
  { slug: 'beginner-f5b-14-cumulative-sum', title: '14 Cumulative Sum · 累加和', level: 'Beginner', dataDirName: 'f5b-14-cumulative-sum', statementFilename: 'beginner-f5b-14-cumulative-sum.md' },
  { slug: 'beginner-f5b-15-normalize-data', title: '15 Normalize Data · 數據標準化', level: 'Beginner', dataDirName: 'f5b-15-normalize-data', statementFilename: 'beginner-f5b-15-normalize-data.md' },
  { slug: 'beginner-f5b-16-character-frequency', title: '16 Character Frequency · 字元出現次數', level: 'Beginner', dataDirName: 'f5b-16-character-frequency', statementFilename: 'beginner-f5b-16-character-frequency.md' },
  { slug: 'beginner-f5b-17-two-sum', title: '17 Two Sum · 兩數之和', level: 'Beginner', dataDirName: 'f5b-17-two-sum', statementFilename: 'beginner-f5b-17-two-sum.md' },
  { slug: 'beginner-f5b-18-first-unique-character', title: '18 First Unique Character · 第一個不重複的字元', level: 'Beginner', dataDirName: 'f5b-18-first-unique-character', statementFilename: 'beginner-f5b-18-first-unique-character.md' },
  { slug: 'beginner-f5b-19-most-frequent-word', title: '19 Most Frequent Word · 出現最多的單字', level: 'Beginner', dataDirName: 'f5b-19-most-frequent-word', statementFilename: 'beginner-f5b-19-most-frequent-word.md' },
  { slug: 'beginner-f5b-20-inventory-valuation', title: '20 Inventory Valuation · 計算存貨總值', level: 'Beginner', dataDirName: 'f5b-20-inventory-valuation', statementFilename: 'beginner-f5b-20-inventory-valuation.md' },
  { slug: 'beginner-f5b-21-roman-to-integer', title: '21 Roman to Integer · 羅馬數字轉整數', level: 'Beginner', dataDirName: 'f5b-21-roman-to-integer', statementFilename: 'beginner-f5b-21-roman-to-integer.md' },
  { slug: 'beginner-f5b-22-minimum-coins', title: '22 Minimum Coins · 最少硬幣數', level: 'Beginner', dataDirName: 'f5b-22-minimum-coins', statementFilename: 'beginner-f5b-22-minimum-coins.md' },
  { slug: 'beginner-f5b-23-alternating-series', title: '23 Alternating Series Value · 交錯級數求值', level: 'Beginner', dataDirName: 'f5b-23-alternating-series', statementFilename: 'beginner-f5b-23-alternating-series.md' },
  { slug: 'beginner-f5b-24-match-equipment', title: '24 Match Players with Equipment · 球員配器材', level: 'Beginner', dataDirName: 'f5b-24-match-equipment', statementFilename: 'beginner-f5b-24-match-equipment.md' },
  { slug: 'beginner-f5b-25-audit', title: '25 Audit · 核數', level: 'Beginner', dataDirName: 'f5b-25-audit', statementFilename: 'beginner-f5b-25-audit.md' },
  { slug: 'beginner-f5b-26-alternating-reciprocal-sum', title: '26 Alternating Reciprocal Sum · 交錯倒數和', level: 'Beginner', dataDirName: 'f5b-26-alternating-reciprocal-sum', statementFilename: 'beginner-f5b-26-alternating-reciprocal-sum.md' },
  { slug: 'beginner-f5b-27-pair-sum-finder', title: '27 Pair Sum Finder · 找出和為目標值的數對', level: 'Beginner', dataDirName: 'f5b-27-pair-sum-finder', statementFilename: 'beginner-f5b-27-pair-sum-finder.md' },
  { slug: 'beginner-f5b-28-selection-sort-median', title: '28 Selection Sort + Median · 選擇排序和中位數', level: 'Beginner', dataDirName: 'f5b-28-selection-sort-median', statementFilename: 'beginner-f5b-28-selection-sort-median.md' },
  { slug: 'beginner-f5b-29-row-sum-champion', title: '29 Row Sum Champion · 行總和冠軍', level: 'Beginner', dataDirName: 'f5b-29-row-sum-champion', statementFilename: 'beginner-f5b-29-row-sum-champion.md' },
  { slug: 'beginner-f5b-30-closest-pair-difference', title: '30 Closest Pair Difference · 差最小的一對數', level: 'Beginner', dataDirName: 'f5b-30-closest-pair-difference', statementFilename: 'beginner-f5b-30-closest-pair-difference.md' },
  { slug: 'beginner-f5b-31-matrix-transpose', title: '31 Matrix Transpose · 矩陣轉置', level: 'Beginner', dataDirName: 'f5b-31-matrix-transpose', statementFilename: 'beginner-f5b-31-matrix-transpose.md' },
];

const GREEDY_ALGORITHM_PROBLEMS: readonly ProblemCatalogEntry[] = [
  { slug: 'ga-01-lemonade-change', title: '01 Lemonade Change · 檸檬水找錢', level: 'GA', dataDirName: 'ga-01-lemonade-change', statementFilename: 'ga-01-lemonade-change.md' },
  { slug: 'ga-02-maximum-units-truck', title: '02 Maximum Units on a Truck · 貨車最多載貨量', level: 'GA', dataDirName: 'ga-02-maximum-units-truck', statementFilename: 'ga-02-maximum-units-truck.md' },
  { slug: 'ga-03-non-overlapping-intervals', title: '03 Non-overlapping Intervals · 不重疊的區間', level: 'GA', dataDirName: 'ga-03-non-overlapping-intervals', statementFilename: 'ga-03-non-overlapping-intervals.md' },
  { slug: 'ga-04-task-scheduler', title: '04 Task Scheduler · 任務排程', level: 'GA', dataDirName: 'ga-04-task-scheduler', statementFilename: 'ga-04-task-scheduler.md' },
  { slug: 'ga-05-item-stacking', title: '05 Item Stacking · 物品疊放', level: 'GA', dataDirName: 'ga-05-item-stacking', statementFilename: 'ga-05-item-stacking.md' },
];

const DYNAMIC_PROGRAMMING_PROBLEMS: readonly ProblemCatalogEntry[] = [
  { slug: 'dp-01-fibonacci-number', title: '01 Fibonacci Number · 費氏數列', level: 'DP', dataDirName: 'dp-01-fibonacci-number', statementFilename: 'dp-01-fibonacci-number.md' },
  { slug: 'dp-02-herb-picking', title: '02 Herb Picking · 採藥', level: 'DP', dataDirName: 'dp-02-herb-picking', statementFilename: 'dp-02-herb-picking.md' },
  { slug: 'dp-03-coin-change', title: '03 Coin Change · 找換硬幣', level: 'DP', dataDirName: 'dp-03-coin-change', statementFilename: 'dp-03-coin-change.md' },
  { slug: 'dp-04-longest-increasing-subsequence', title: '04 Longest Increasing Subsequence · 最長遞增子序列', level: 'DP', dataDirName: 'dp-04-longest-increasing-subsequence', statementFilename: 'dp-04-longest-increasing-subsequence.md' },
  { slug: 'dp-05-edit-distance', title: '05 Edit Distance · 編輯距離', level: 'DP', dataDirName: 'dp-05-edit-distance', statementFilename: 'dp-05-edit-distance.md' },
];

// >>> TRAINING_PROBLEMS（由 build_moi_oj.py 產生，勿手改）
const TRAINING_PROBLEMS: readonly ProblemCatalogEntry[] = [
  { slug: 'train-l0-01a-stationery', title: 'L0-01A Buying Stationery · 買文具', level: 'P', dataDirName: 'train-l0-01a-stationery', statementFilename: 'train-l0-01a-stationery.md' },
  { slug: 'train-l0-01b-clock', title: 'L0-01B Seconds to Clock Time · 秒數換時間', level: 'P', dataDirName: 'train-l0-01b-clock', statementFilename: 'train-l0-01b-clock.md' },
  { slug: 'train-l0-02a-distance', title: 'L0-02A Total Running Distance · 長跑總距離', level: 'P', dataDirName: 'train-l0-02a-distance', statementFilename: 'train-l0-02a-distance.md' },
  { slug: 'train-l0-02b-average', title: 'L0-02B Average Score · 平均分', level: 'P', dataDirName: 'train-l0-02b-average', statementFilename: 'train-l0-02b-average.md' },
  { slug: 'train-l0-03a-ticket', title: 'L0-03A Bus Fare · 車票價格', level: 'P', dataDirName: 'train-l0-03a-ticket', statementFilename: 'train-l0-03a-ticket.md' },
  { slug: 'train-l0-03b-triangle', title: 'L0-03B Triangles · 三角形', level: 'P', dataDirName: 'train-l0-03b-triangle', statementFilename: 'train-l0-03b-triangle.md' },
  { slug: 'train-l0-04a-digits', title: 'L0-04A Digit Sum · 數字和', level: 'P', dataDirName: 'train-l0-04a-digits', statementFilename: 'train-l0-04a-digits.md' },
  { slug: 'train-l0-04b-collatz', title: 'L0-04B Hailstone Numbers · 冰雹數', level: 'P', dataDirName: 'train-l0-04b-collatz', statementFilename: 'train-l0-04b-collatz.md' },
  { slug: 'train-l0-07a-positions', title: 'L0-07A Find All Positions · 找出所有位置', level: 'P', dataDirName: 'train-l0-07a-positions', statementFilename: 'train-l0-07a-positions.md' },
  { slug: 'train-l0-07b-peak', title: 'L0-07B Mountain Peak · 山頂', level: 'P', dataDirName: 'train-l0-07b-peak', statementFilename: 'train-l0-07b-peak.md' },
  { slug: 'train-l0-08a-swaps', title: 'L0-08A Bubble Sort Swaps · 冒泡交換次數', level: 'P', dataDirName: 'train-l0-08a-swaps', statementFilename: 'train-l0-08a-swaps.md' },
  { slug: 'train-l0-08b-hindex', title: 'L0-08B H-index · H 指數', level: 'P', dataDirName: 'train-l0-08b-hindex', statementFilename: 'train-l0-08b-hindex.md' },
  { slug: 'train-l0-finala-vote', title: 'L0 Final A Class Election · 班長選舉', level: 'P', dataDirName: 'train-l0-finala-vote', statementFilename: 'train-l0-finala-vote.md' },
  { slug: 'train-l0-finalb-password', title: 'L0 Final B Password Check · 密碼檢查', level: 'P', dataDirName: 'train-l0-finalb-password', statementFilename: 'train-l0-finalb-password.md' },
  { slug: 'train-l0-finalc-brokenstairs', title: 'L0 Final C Broken Stairs · 破樓梯', level: 'P', dataDirName: 'train-l0-finalc-brokenstairs', statementFilename: 'train-l0-finalc-brokenstairs.md' },
  { slug: 'train-l0-finald-islandarea', title: 'L0 Final D Island Area · 島嶼面積', level: 'P', dataDirName: 'train-l0-finald-islandarea', statementFilename: 'train-l0-finald-islandarea.md' },
  { slug: 'train-l1-03a-range', title: 'L1-03A Range Sum · 區間和', level: 'J', dataDirName: 'train-l1-03a-range', statementFilename: 'train-l1-03a-range.md' },
  { slug: 'train-l1-03b-treasure', title: 'L1-03B Treasure Map · 寶藏地圖', level: 'J', dataDirName: 'train-l1-03b-treasure', statementFilename: 'train-l1-03b-treasure.md' },
  { slug: 'train-l1-03c-divisible', title: 'L1-03C Divisible Ranges · 整除區間', level: 'J', dataDirName: 'train-l1-03c-divisible', statementFilename: 'train-l1-03c-divisible.md' },
];
// <<< TRAINING_PROBLEMS

// MOI practice problems (20_比賽資料/MOI/MOI練習題_md); data generated and verified 2026-11-15
const MOI_PRACTICE_PROBLEMS: readonly ProblemCatalogEntry[] = [
  { slug: 'moi-buildings', title: 'Extra Houses · 加建', level: 'P', dataDirName: 'moi-buildings', statementFilename: 'moi-buildings.md' },
  { slug: 'moi-div3', title: 'Worm-eaten Password · 被蟲蛀的密碼', level: 'P', dataDirName: 'moi-div3', statementFilename: 'moi-div3.md' },
  { slug: 'moi-neighbor', title: 'Neighbours · 鄰居', level: 'P', dataDirName: 'moi-neighbor', statementFilename: 'moi-neighbor.md' },
  { slug: 'moi-seat', title: 'Find Your Seat · 對號入座', level: 'P', dataDirName: 'moi-seat', statementFilename: 'moi-seat.md' },
  { slug: 'moi-skip7', title: 'Skip the Sevens · 不數七', level: 'P', dataDirName: 'moi-skip7', statementFilename: 'moi-skip7.md' },
  { slug: 'moi-food', title: 'Food Expert · 美食專家', level: 'J', dataDirName: 'moi-food', statementFilename: 'moi-food.md' },
  { slug: 'moi-run', title: 'Through the Wormholes · 穿越蟲洞', level: 'J', dataDirName: 'moi-run', statementFilename: 'moi-run.md' },
  { slug: 'moi-safepath', title: 'Safe Route Home · 安全路線', level: 'J', dataDirName: 'moi-safepath', statementFilename: 'moi-safepath.md' },
  { slug: 'moi-teams', title: 'Team Building · 團隊', level: 'J', dataDirName: 'moi-teams', statementFilename: 'moi-teams.md' },
];

// IOI 2026 (official task archive; judged with the official graders by scripts/ioi-judge.py)
const IOI_PROBLEMS: readonly ProblemCatalogEntry[] = [
  { slug: 'ioi2026-ballmachine', title: 'IOI 2026 Day 1 Ball Machine · 發球機', level: 'IOI', dataDirName: 'ioi2026-ballmachine', statementFilename: 'ioi2026-ballmachine.md' },
  { slug: 'ioi2026-monuments', title: 'IOI 2026 Day 1 Monuments · 紀念碑', level: 'IOI', dataDirName: 'ioi2026-monuments', statementFilename: 'ioi2026-monuments.md' },
  { slug: 'ioi2026-tiling', title: 'IOI 2026 Day 1 Tiling Game · 砌瓷磚遊戲', level: 'IOI', dataDirName: 'ioi2026-tiling', statementFilename: 'ioi2026-tiling.md' },
  { slug: 'ioi2026-classroom', title: 'IOI 2026 Day 2 Classroom Game · 課堂遊戲', level: 'IOI', dataDirName: 'ioi2026-classroom', statementFilename: 'ioi2026-classroom.md' },
  { slug: 'ioi2026-magiccity', title: 'IOI 2026 Day 2 Magic City · 魔法城', level: 'IOI', dataDirName: 'ioi2026-magiccity', statementFilename: 'ioi2026-magiccity.md' },
  { slug: 'ioi2026-partition', title: 'IOI 2026 Day 2 Partition · 分組問題', level: 'IOI', dataDirName: 'ioi2026-partition', statementFilename: 'ioi2026-partition.md' },
];

// CSP-J/S, NOIP, NOI (statements from Luogu, data from CCF where public; built by scratchpad/lg/build_contests.py)
const CONTEST_PROBLEMS: readonly ProblemCatalogEntry[] = [
  { slug: 'cspj2019-p5660', title: 'CSP-J 2019 Number Game · 數字遊戲', level: 'CSPJ', dataDirName: 'cspj2019-p5660', statementFilename: 'cspj2019-p5660.md', timeLimitMs: 1000, memoryLimitMb: 250 },
  { slug: 'cspj2019-p5661', title: 'CSP-J 2019 Bus Transfer · 公交換乘', level: 'CSPJ', dataDirName: 'cspj2019-p5661', statementFilename: 'cspj2019-p5661.md', timeLimitMs: 1000, memoryLimitMb: 250 },
  { slug: 'cspj2019-p5662', title: 'CSP-J 2019 Souvenirs · 紀念品', level: 'CSPJ', dataDirName: 'cspj2019-p5662', statementFilename: 'cspj2019-p5662.md', timeLimitMs: 1000, memoryLimitMb: 250 },
  { slug: 'cspj2019-p5663', title: 'CSP-J 2019 Processing Parts · 加工零件', level: 'CSPJ', dataDirName: 'cspj2019-p5663', statementFilename: 'cspj2019-p5663.md', timeLimitMs: 1000, memoryLimitMb: 250 },
  { slug: 'csps2019-p5657', title: 'CSP-S 2019 Gray Code · 格雷碼', level: 'CSPS', dataDirName: 'csps2019-p5657', statementFilename: 'csps2019-p5657.md', timeLimitMs: 1000, memoryLimitMb: 256 },
  { slug: 'csps2019-p5658', title: 'CSP-S 2019 Bracket Tree · 括號樹', level: 'CSPS', dataDirName: 'csps2019-p5658', statementFilename: 'csps2019-p5658.md', timeLimitMs: 1000, memoryLimitMb: 250 },
  { slug: 'csps2019-p5659', title: 'CSP-S 2019 Numbers on a Tree · 樹上的數', level: 'CSPS', dataDirName: 'csps2019-p5659', statementFilename: 'csps2019-p5659.md', timeLimitMs: 2000, memoryLimitMb: 250 },
  { slug: 'csps2019-p5664', title: 'CSP-S 2019 Emiya\'s Meals Today · Emiya 家今天的飯', level: 'CSPS', dataDirName: 'csps2019-p5664', statementFilename: 'csps2019-p5664.md', timeLimitMs: 1000, memoryLimitMb: 250 },
  { slug: 'csps2019-p5665', title: 'CSP-S 2019 Partition · 劃分', level: 'CSPS', dataDirName: 'csps2019-p5665', statementFilename: 'csps2019-p5665.md', timeLimitMs: 2000, memoryLimitMb: 1024 },
  { slug: 'csps2019-p5666', title: 'CSP-S 2019 Centroids of a Tree · 樹的重心', level: 'CSPS', dataDirName: 'csps2019-p5666', statementFilename: 'csps2019-p5666.md', timeLimitMs: 4000, memoryLimitMb: 250 },
  { slug: 'cspj2020-p7071', title: 'CSP-J 2020 Excellent Splitting · 優秀的拆分', level: 'CSPJ', dataDirName: 'cspj2020-p7071', statementFilename: 'cspj2020-p7071.md', timeLimitMs: 1000, memoryLimitMb: 256 },
  { slug: 'cspj2020-p7072', title: 'CSP-J 2020 Live Awards · 直播獲獎', level: 'CSPJ', dataDirName: 'cspj2020-p7072', statementFilename: 'cspj2020-p7072.md', timeLimitMs: 1000, memoryLimitMb: 256 },
  { slug: 'cspj2020-p7073', title: 'CSP-J 2020 Expression · 表示式', level: 'CSPJ', dataDirName: 'cspj2020-p7073', statementFilename: 'cspj2020-p7073.md', timeLimitMs: 1000, memoryLimitMb: 256 },
  { slug: 'cspj2020-p7074', title: 'CSP-J 2020 Grid Path Sum · 方格取數', level: 'CSPJ', dataDirName: 'cspj2020-p7074', statementFilename: 'cspj2020-p7074.md', timeLimitMs: 1000, memoryLimitMb: 256 },
  { slug: 'csps2020-p7075', title: 'CSP-S 2020 Julian Day · 儒略日', level: 'CSPS', dataDirName: 'csps2020-p7075', statementFilename: 'csps2020-p7075.md', timeLimitMs: 1000, memoryLimitMb: 256 },
  { slug: 'csps2020-p7076', title: 'CSP-S 2020 Zoo · 動物園', level: 'CSPS', dataDirName: 'csps2020-p7076', statementFilename: 'csps2020-p7076.md', timeLimitMs: 1000, memoryLimitMb: 256 },
  { slug: 'csps2020-p7077', title: 'CSP-S 2020 Function Calls · 函式呼叫', level: 'CSPS', dataDirName: 'csps2020-p7077', statementFilename: 'csps2020-p7077.md', timeLimitMs: 2000, memoryLimitMb: 256 },
  { slug: 'csps2020-p7078', title: 'CSP-S 2020 Greedy Snakes · 貪吃蛇', level: 'CSPS', dataDirName: 'csps2020-p7078', statementFilename: 'csps2020-p7078.md', timeLimitMs: 2000, memoryLimitMb: 256 },
  { slug: 'cspj2021-p7909', title: 'CSP-J 2021 Sharing Candies · 分糖果', level: 'CSPJ', dataDirName: 'cspj2021-p7909', statementFilename: 'cspj2021-p7909.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'cspj2021-p7910', title: 'CSP-J 2021 Insertion Sort · 插入排序', level: 'CSPJ', dataDirName: 'cspj2021-p7910', statementFilename: 'cspj2021-p7910.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'cspj2021-p7911', title: 'CSP-J 2021 Network Connections · 網路連線', level: 'CSPJ', dataDirName: 'cspj2021-p7911', statementFilename: 'cspj2021-p7911.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'cspj2021-p7912', title: 'CSP-J 2021 Little Bear\'s Fruit Baskets · 小熊的果籃', level: 'CSPJ', dataDirName: 'cspj2021-p7912', statementFilename: 'cspj2021-p7912.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'csps2021-p7913', title: 'CSP-S 2021 Gate Allocation · 廊橋分配', level: 'CSPS', dataDirName: 'csps2021-p7913', statementFilename: 'csps2021-p7913.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'csps2021-p7914', title: 'CSP-S 2021 Bracket Sequences · 括號序列', level: 'CSPS', dataDirName: 'csps2021-p7914', statementFilename: 'csps2021-p7914.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'csps2021-p7915', title: 'CSP-S 2021 Palindrome · 迴文', level: 'CSPS', dataDirName: 'csps2021-p7915', statementFilename: 'csps2021-p7915.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'csps2021-p7916', title: 'CSP-S 2021 Traffic Planning · 交通規劃', level: 'CSPS', dataDirName: 'csps2021-p7916', statementFilename: 'csps2021-p7916.md', timeLimitMs: 3000, memoryLimitMb: 512 },
  { slug: 'cspj2022-p8813', title: 'CSP-J 2022 Power · 乘方', level: 'CSPJ', dataDirName: 'cspj2022-p8813', statementFilename: 'cspj2022-p8813.md', timeLimitMs: 500, memoryLimitMb: 128 },
  { slug: 'cspj2022-p8814', title: 'CSP-J 2022 Decryption · 解密', level: 'CSPJ', dataDirName: 'cspj2022-p8814', statementFilename: 'cspj2022-p8814.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'cspj2022-p8815', title: 'CSP-J 2022 Logical Expression · 邏輯表示式', level: 'CSPJ', dataDirName: 'cspj2022-p8815', statementFilename: 'cspj2022-p8815.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'cspj2022-p8816', title: 'CSP-J 2022 Rising Point Sequence · 上升點列', level: 'CSPJ', dataDirName: 'cspj2022-p8816', statementFilename: 'cspj2022-p8816.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'csps2022-p8817', title: 'CSP-S 2022 Holiday Plan · 假期計劃', level: 'CSPS', dataDirName: 'csps2022-p8817', statementFilename: 'csps2022-p8817.md', timeLimitMs: 2000, memoryLimitMb: 512 },
  { slug: 'csps2022-p8818', title: 'CSP-S 2022 Strategy Game · 策略遊戲', level: 'CSPS', dataDirName: 'csps2022-p8818', statementFilename: 'csps2022-p8818.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'csps2022-p8819', title: 'CSP-S 2022 Star Wars · 星戰', level: 'CSPS', dataDirName: 'csps2022-p8819', statementFilename: 'csps2022-p8819.md', timeLimitMs: 2000, memoryLimitMb: 512 },
  { slug: 'csps2022-p8820', title: 'CSP-S 2022 Data Transmission · 資料傳輸', level: 'CSPS', dataDirName: 'csps2022-p8820', statementFilename: 'csps2022-p8820.md', timeLimitMs: 3000, memoryLimitMb: 1024 },
  { slug: 'cspj2023-p9748', title: 'CSP-J 2023 Little Apples · 小蘋果', level: 'CSPJ', dataDirName: 'cspj2023-p9748', statementFilename: 'cspj2023-p9748.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'cspj2023-p9749', title: 'CSP-J 2023 Highway · 公路', level: 'CSPJ', dataDirName: 'cspj2023-p9749', statementFilename: 'cspj2023-p9749.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'cspj2023-p9750', title: 'CSP-J 2023 Quadratic Equation · 一元二次方程', level: 'CSPJ', dataDirName: 'cspj2023-p9750', statementFilename: 'cspj2023-p9750.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'cspj2023-p9751', title: 'CSP-J 2023 Tour Bus · 旅遊巴士', level: 'CSPJ', dataDirName: 'cspj2023-p9751', statementFilename: 'cspj2023-p9751.md', timeLimitMs: 1000, memoryLimitMb: 500 },
  { slug: 'csps2023-p9752', title: 'CSP-S 2023 Combination Lock · 密碼鎖', level: 'CSPS', dataDirName: 'csps2023-p9752', statementFilename: 'csps2023-p9752.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'csps2023-p9753', title: 'CSP-S 2023 Elimination Game · 消消樂', level: 'CSPS', dataDirName: 'csps2023-p9753', statementFilename: 'csps2023-p9753.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'csps2023-p9754', title: 'CSP-S 2023 Structs · 結構體', level: 'CSPS', dataDirName: 'csps2023-p9754', statementFilename: 'csps2023-p9754.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'csps2023-p9755', title: 'CSP-S 2023 Planting Trees · 種樹', level: 'CSPS', dataDirName: 'csps2023-p9755', statementFilename: 'csps2023-p9755.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'cspj2024-p11227', title: 'CSP-J 2024 Playing Cards · 撲克牌', level: 'CSPJ', dataDirName: 'cspj2024-p11227', statementFilename: 'cspj2024-p11227.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'cspj2024-p11228', title: 'CSP-J 2024 Map Exploration · 地圖探險', level: 'CSPJ', dataDirName: 'cspj2024-p11228', statementFilename: 'cspj2024-p11228.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'cspj2024-p11229', title: 'CSP-J 2024 Matchsticks · 小木棍', level: 'CSPJ', dataDirName: 'cspj2024-p11229', statementFilename: 'cspj2024-p11229.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'cspj2024-p11230', title: 'CSP-J 2024 Word Chain · 接龍', level: 'CSPJ', dataDirName: 'cspj2024-p11230', statementFilename: 'cspj2024-p11230.md', timeLimitMs: 2000, memoryLimitMb: 512 },
  { slug: 'csps2024-p11231', title: 'CSP-S 2024 Duel · 決鬥', level: 'CSPS', dataDirName: 'csps2024-p11231', statementFilename: 'csps2024-p11231.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'csps2024-p11232', title: 'CSP-S 2024 Speed Detection · 超速檢測', level: 'CSPS', dataDirName: 'csps2024-p11232', statementFilename: 'csps2024-p11232.md', timeLimitMs: 2000, memoryLimitMb: 512 },
  { slug: 'csps2024-p11233', title: 'CSP-S 2024 Coloring · 染色', level: 'CSPS', dataDirName: 'csps2024-p11233', statementFilename: 'csps2024-p11233.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'csps2024-p11234', title: 'CSP-S 2024 Arena Game · 擂臺遊戲', level: 'CSPS', dataDirName: 'csps2024-p11234', statementFilename: 'csps2024-p11234.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'cspj2025-p14357', title: 'CSP-J 2025 Build the Number · 拼數', level: 'CSPJ', dataDirName: 'cspj2025-p14357', statementFilename: 'cspj2025-p14357.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'cspj2025-p14358', title: 'CSP-J 2025 Seats · 座位', level: 'CSPJ', dataDirName: 'cspj2025-p14358', statementFilename: 'cspj2025-p14358.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'cspj2025-p14359', title: 'CSP-J 2025 XOR Sum · 異或和', level: 'CSPJ', dataDirName: 'cspj2025-p14359', statementFilename: 'cspj2025-p14359.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'cspj2025-p14360', title: 'CSP-J 2025 Polygon · 多邊形', level: 'CSPJ', dataDirName: 'cspj2025-p14360', statementFilename: 'cspj2025-p14360.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'csps2025-p14361', title: 'CSP-S 2025 Club Recruitment · 社團招新', level: 'CSPS', dataDirName: 'csps2025-p14361', statementFilename: 'csps2025-p14361.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'csps2025-p14362', title: 'CSP-S 2025 Road Repair · 道路修復', level: 'CSPS', dataDirName: 'csps2025-p14362', statementFilename: 'csps2025-p14362.md', timeLimitMs: 2000, memoryLimitMb: 512 },
  { slug: 'csps2025-p14363', title: 'CSP-S 2025 Homophone Replacement · 諧音替換', level: 'CSPS', dataDirName: 'csps2025-p14363', statementFilename: 'csps2025-p14363.md', timeLimitMs: 2000, memoryLimitMb: 2048 },
  { slug: 'csps2025-p14364', title: 'CSP-S 2025 Staff Hiring · 員工招聘', level: 'CSPS', dataDirName: 'csps2025-p14364', statementFilename: 'csps2025-p14364.md', timeLimitMs: 2000, memoryLimitMb: 512 },
  { slug: 'noip2020-p7113', title: 'NOIP2020 Drainage System · 排水系統', level: 'NOIP', dataDirName: 'noip2020-p7113', statementFilename: 'noip2020-p7113.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'noip2020-p7114', title: 'NOIP2020 String Matching · 字串匹配', level: 'NOIP', dataDirName: 'noip2020-p7114', statementFilename: 'noip2020-p7114.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'noip2020-p7115', title: 'NOIP2020 Moving Balls · 移球遊戲', level: 'NOIP', dataDirName: 'noip2020-p7115', statementFilename: 'noip2020-p7115.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'noip2020-p7116', title: 'NOIP2020 WeChat Steps · 微信步數', level: 'NOIP', dataDirName: 'noip2020-p7116', statementFilename: 'noip2020-p7116.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'noip2021-p7960', title: 'NOIP2021 Counting Off · 報數', level: 'NOIP', dataDirName: 'noip2021-p7960', statementFilename: 'noip2021-p7960.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'noip2021-p7961', title: 'NOIP2021 Sequence · 數列', level: 'NOIP', dataDirName: 'noip2021-p7961', statementFilename: 'noip2021-p7961.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'noip2021-p7962', title: 'NOIP2021 Variance · 方差', level: 'NOIP', dataDirName: 'noip2021-p7962', statementFilename: 'noip2021-p7962.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'noip2021-p7963', title: 'NOIP2021 Chess Game · 棋局', level: 'NOIP', dataDirName: 'noip2021-p7963', statementFilename: 'noip2021-p7963.md', timeLimitMs: 6000, memoryLimitMb: 1024 },
  { slug: 'noip2022-p8865', title: 'NOIP2022 Planting Flowers · 種花', level: 'NOIP', dataDirName: 'noip2022-p8865', statementFilename: 'noip2022-p8865.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'noip2022-p8866', title: 'NOIP2022 Meow Meow · 喵了個喵', level: 'NOIP', dataDirName: 'noip2022-p8866', statementFilename: 'noip2022-p8866.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'noip2022-p8867', title: 'NOIP2022 Building Barracks · 建造軍營', level: 'NOIP', dataDirName: 'noip2022-p8867', statementFilename: 'noip2022-p8867.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'noip2022-p8868', title: 'NOIP2022 Matches · 比賽', level: 'NOIP', dataDirName: 'noip2022-p8868', statementFilename: 'noip2022-p8868.md', timeLimitMs: 2000, memoryLimitMb: 512 },
  { slug: 'noip2023-p9868', title: 'NOIP2023 Dictionary · 詞典', level: 'NOIP', dataDirName: 'noip2023-p9868', statementFilename: 'noip2023-p9868.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'noip2023-p9869', title: 'NOIP2023 Three-valued Logic · 三值邏輯', level: 'NOIP', dataDirName: 'noip2023-p9869', statementFilename: 'noip2023-p9869.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'noip2023-p9870', title: 'NOIP2023 Double Sequence Extension · 雙序列拓展', level: 'NOIP', dataDirName: 'noip2023-p9870', statementFilename: 'noip2023-p9870.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'noip2023-p9871', title: 'NOIP2023 Daily Check-in · 天天愛打卡', level: 'NOIP', dataDirName: 'noip2023-p9871', statementFilename: 'noip2023-p9871.md', timeLimitMs: 2000, memoryLimitMb: 512 },
  { slug: 'noip2024-p11361', title: 'NOIP2024 Editing Strings · 編輯字串', level: 'NOIP', dataDirName: 'noip2024-p11361', statementFilename: 'noip2024-p11361.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'noip2024-p11362', title: 'NOIP2024 Lost Assignments · 遺失的賦值', level: 'NOIP', dataDirName: 'noip2024-p11362', statementFilename: 'noip2024-p11362.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'noip2024-p11363', title: 'NOIP2024 Tree Traversal · 樹的遍歷', level: 'NOIP', dataDirName: 'noip2024-p11363', statementFilename: 'noip2024-p11363.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'noip2024-p11364', title: 'NOIP2024 Queries on a Tree · 樹上查詢', level: 'NOIP', dataDirName: 'noip2024-p11364', statementFilename: 'noip2024-p11364.md', timeLimitMs: 2000, memoryLimitMb: 1024 },
  { slug: 'noip2025-p14635', title: 'NOIP2025 Candy Shop · 糖果店', level: 'NOIP', dataDirName: 'noip2025-p14635', statementFilename: 'noip2025-p14635.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'noip2025-p14636', title: 'NOIP2025 Clearance Sale · 清倉甩賣', level: 'NOIP', dataDirName: 'noip2025-p14636', statementFilename: 'noip2025-p14636.md', timeLimitMs: 1500, memoryLimitMb: 512 },
  { slug: 'noip2025-p14637', title: 'NOIP2025 Value of a Tree · 樹的價值', level: 'NOIP', dataDirName: 'noip2025-p14637', statementFilename: 'noip2025-p14637.md', timeLimitMs: 2000, memoryLimitMb: 512 },
  { slug: 'noip2025-p14638', title: 'NOIP2025 Sequence Queries · 序列詢問', level: 'NOIP', dataDirName: 'noip2025-p14638', statementFilename: 'noip2025-p14638.md', timeLimitMs: 3000, memoryLimitMb: 512 },
  { slug: 'noi2024-p10785', title: 'NOI2024 Sets · 集合', level: 'NOI', dataDirName: 'noi2024-p10785', statementFilename: 'noi2024-p10785.md', timeLimitMs: 1000, memoryLimitMb: 512 },
  { slug: 'noi2024-p10786', title: 'NOI2024 Millionaire · 百萬富翁', level: 'NOI', dataDirName: 'noi2024-p10786', statementFilename: 'noi2024-p10786.md', timeLimitMs: 6000, memoryLimitMb: 512 },
  { slug: 'noi2024-p10787', title: 'NOI2024 Orienting a Tree · 樹的定向', level: 'NOI', dataDirName: 'noi2024-p10787', statementFilename: 'noi2024-p10787.md', timeLimitMs: 6000, memoryLimitMb: 2048 },
  { slug: 'noi2024-p10788', title: 'NOI2024 Fractions · 分數', level: 'NOI', dataDirName: 'noi2024-p10788', statementFilename: 'noi2024-p10788.md', timeLimitMs: 9000, memoryLimitMb: 512 },
  { slug: 'noi2024-p10789', title: 'NOI2024 Mountain Climbing · 登山', level: 'NOI', dataDirName: 'noi2024-p10789', statementFilename: 'noi2024-p10789.md', timeLimitMs: 2000, memoryLimitMb: 2048 },
  { slug: 'noi2024-p10790', title: 'NOI2024 Tree-shaped Graph · 樹形圖', level: 'NOI', dataDirName: 'noi2024-p10790', statementFilename: 'noi2024-p10790.md', timeLimitMs: 3000, memoryLimitMb: 512 },
  { slug: 'noi2025-p13271', title: 'NOI2025 Robot · 機器人', level: 'NOI', dataDirName: 'noi2025-p13271', statementFilename: 'noi2025-p13271.md', timeLimitMs: 1000, memoryLimitMb: 1024 },
  { slug: 'noi2025-p13272', title: 'NOI2025 Sequence Transformation · 序列變換', level: 'NOI', dataDirName: 'noi2025-p13272', statementFilename: 'noi2025-p13272.md', timeLimitMs: 6000, memoryLimitMb: 1024 },
  { slug: 'noi2025-p13273', title: 'NOI2025 Digit Tree · 數字樹', level: 'NOI', dataDirName: 'noi2025-p13273', statementFilename: 'noi2025-p13273.md', timeLimitMs: 4000, memoryLimitMb: 1024 },
  { slug: 'noi2025-p13274', title: 'NOI2025 Ternary Operator · 三目運算子', level: 'NOI', dataDirName: 'noi2025-p13274', statementFilename: 'noi2025-p13274.md', timeLimitMs: 2000, memoryLimitMb: 512 },
  { slug: 'noi2025-p13275', title: 'NOI2025 Sets · 集合', level: 'NOI', dataDirName: 'noi2025-p13275', statementFilename: 'noi2025-p13275.md', timeLimitMs: 2000, memoryLimitMb: 512 },
  { slug: 'noi2025-p13276', title: 'NOI2025 Absolute Defense · 絕對防禦', level: 'NOI', dataDirName: 'noi2025-p13276', statementFilename: 'noi2025-p13276.md', timeLimitMs: 4000, memoryLimitMb: 1024 },
  { slug: 'noi2026-segment', title: 'NOI2026 Segments · 線段', level: 'NOI', dataDirName: 'noi2026-segment', statementFilename: 'noi2026-segment.md', timeLimitMs: 2500, memoryLimitMb: 512 },
  { slug: 'noi2026-teleport', title: 'NOI2026 Teleport · 傳送', level: 'NOI', dataDirName: 'noi2026-teleport', statementFilename: 'noi2026-teleport.md', timeLimitMs: 3500, memoryLimitMb: 1024 },
  { slug: 'noi2026-pudding', title: 'NOI2026 Pudding · 布丁', level: 'NOI', dataDirName: 'noi2026-pudding', statementFilename: 'noi2026-pudding.md', timeLimitMs: 10000, memoryLimitMb: 1024 },
  { slug: 'noi2026-median', title: 'NOI2026 Median · 中位數', level: 'NOI', dataDirName: 'noi2026-median', statementFilename: 'noi2026-median.md', timeLimitMs: 1000, memoryLimitMb: 1024 },
  { slug: 'noi2026-kapok', title: 'NOI2026 Kapok · 木棉', level: 'NOI', dataDirName: 'noi2026-kapok', statementFilename: 'noi2026-kapok.md', timeLimitMs: 2000, memoryLimitMb: 1024 },
  { slug: 'noi2026-rainbow', title: 'NOI2026 Rainbow Tree · 彩虹樹', level: 'NOI', dataDirName: 'noi2026-rainbow', statementFilename: 'noi2026-rainbow.md', timeLimitMs: 1000, memoryLimitMb: 1024 },
];

export const PROBLEM_CATALOG: readonly ProblemCatalogEntry[] = [
  ...F5B_BEGINNER_PROBLEMS,
  ...GREEDY_ALGORITHM_PROBLEMS,
  ...DYNAMIC_PROGRAMMING_PROBLEMS,
  ...TRAINING_PROBLEMS,
  ...MOI_PRACTICE_PROBLEMS,
  ...CONTEST_PROBLEMS,
  ...IOI_PROBLEMS,
  { slug: 'p-gaps', title: 'Gaps · 差別', dataDirName: 'gaps', level: 'P', statementFilename: 'p-gaps.md', pdfFilename: 'P-gaps.pdf' },
  { slug: 'p-letters', title: 'Fill in the Letters · 填字遊戲', dataDirName: 'letters', level: 'P', statementFilename: 'p-letters.md', pdfFilename: 'P-letters.pdf' },
  { slug: 'p-round', title: 'Round and Round · 轉轉轉', dataDirName: 'round', level: 'P', statementFilename: 'p-round.md', pdfFilename: 'P-round.pdf' },
  { slug: 'p-sort', title: 'Sort · 排序', dataDirName: 'sort', level: 'P', statementFilename: 'p-sort.md', pdfFilename: 'P-sort.pdf' },
  { slug: 'p-stairs', title: 'Climbing Stairs · 爬樓梯', dataDirName: 'stairs', level: 'P', statementFilename: 'p-stairs.md', pdfFilename: 'P-stairs.pdf' },
  { slug: 'p-islands', title: 'Count Islands · 島嶼計數', dataDirName: 'islands', level: 'P', statementFilename: 'p-islands.md', pdfFilename: 'P-islands.pdf' },
  { slug: 'p-steps', title: 'Shortest Path in a Maze · 迷宮最短路', dataDirName: 'steps', level: 'P', statementFilename: 'p-steps.md', pdfFilename: 'P-steps.pdf' },
  { slug: 'p-grade', title: 'Sort by Grade · 成績排序', dataDirName: 'grade', level: 'P', statementFilename: 'p-grade.md', pdfFilename: 'P-grade.pdf' },
  { slug: 'p-coin', title: 'Minimum Coins · 最少硬幣', dataDirName: 'coin', level: 'P', statementFilename: 'p-coin.md', pdfFilename: 'P-coin.pdf' },
  { slug: 'j-partner', title: 'Perfect Partners · 神隊友', dataDirName: 'partner', level: 'J', statementFilename: 'j-partner.md', pdfFilename: 'J-partner.pdf' },
  { slug: 'j-parttime', title: 'Part-time Jobs · 兼職', dataDirName: 'parttime', level: 'J', statementFilename: 'j-parttime.md', pdfFilename: 'J-parttime.pdf' },
  { slug: 'j-exchange', title: 'Money Changers · 換錢黨', dataDirName: 'exchange', level: 'J', statementFilename: 'j-exchange.md', pdfFilename: 'J-exchange.pdf', pdfAliases: ['J-exchnage.pdf'] },
  { slug: 'j-sortrank', title: 'Ranking List · 排名榜', dataDirName: 'sortrank', level: 'J', statementFilename: 'j-sortrank.md', pdfFilename: 'J-sortrank.pdf' },
  { slug: 'j-lis', title: 'Longest Increasing Subsequence · 最長遞增子序列', dataDirName: 'lis', level: 'J', statementFilename: 'j-lis.md', pdfFilename: 'J-lis.pdf' },
  { slug: 'j-components', title: 'Connected Components · 連通分量', dataDirName: 'components', level: 'J', statementFilename: 'j-components.md', pdfFilename: 'J-components.pdf' },
  { slug: 'j-spread', title: 'Virus Spread · 病毒擴散', dataDirName: 'spread', level: 'J', statementFilename: 'j-spread.md', pdfFilename: 'J-spread.pdf' },
  { slug: 'j-inversions', title: 'Counting Inversions · 逆序對數', dataDirName: 'inversions', level: 'J', statementFilename: 'j-inversions.md', pdfFilename: 'J-inversions.pdf' },
  { slug: 'j-schedule', title: 'Interval Scheduling · 區間調度', dataDirName: 'schedule', level: 'J', statementFilename: 'j-schedule.md', pdfFilename: 'J-schedule.pdf' },
  { slug: 's-balls', title: 'Putting Away Balls · 收拾球子', dataDirName: 'balls', level: 'S', statementFilename: 's-balls.md', pdfFilename: 'S-balls.pdf' },
  { slug: 's-climb', title: 'Up and Down · 爬上爬落', dataDirName: 'climb', level: 'S', statementFilename: 's-climb.md', pdfFilename: 'S-climb.pdf' },
  { slug: 's-comm', title: 'Communities · 社群', dataDirName: 'comm', level: 'S', statementFilename: 's-comm.md', pdfFilename: 'S-comm.pdf' },
];

const catalogByPdfFilename = new Map<string, ProblemCatalogEntry>();
const catalogBySlug = new Map<string, ProblemCatalogEntry>();

for (const entry of PROBLEM_CATALOG) {
  catalogBySlug.set(entry.slug, entry);

  if (entry.pdfFilename) {
    catalogByPdfFilename.set(entry.pdfFilename, entry);
  }

  for (const alias of entry.pdfAliases ?? []) {
    catalogByPdfFilename.set(alias, entry);
  }
}

export function getProblemDataDirName(entry: ProblemCatalogEntry) {
  return entry.dataDirName ?? entry.title;
}

export function getProblemCatalogEntryByPdfFilename(pdfFilename: string) {
  return catalogByPdfFilename.get(pdfFilename) ?? null;
}

export function getProblemCatalogEntryBySlug(slug: string) {
  return catalogBySlug.get(slug) ?? null;
}
