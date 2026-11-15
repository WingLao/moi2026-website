export type ProblemLevel = 'Beginner' | 'GA' | 'DP' | 'P' | 'J' | 'S';

export type ProblemCatalogEntry = {
  slug: string;
  title: string;
  level: ProblemLevel;
  statementFilename: string;
  pdfFilename?: string;
  pdfAliases?: string[];
  dataDirName?: string;
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
];
// <<< TRAINING_PROBLEMS

export const PROBLEM_CATALOG: readonly ProblemCatalogEntry[] = [
  ...F5B_BEGINNER_PROBLEMS,
  ...GREEDY_ALGORITHM_PROBLEMS,
  ...DYNAMIC_PROGRAMMING_PROBLEMS,
  ...TRAINING_PROBLEMS,
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
