import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || process.cwd());
const statementsRoot = path.join(root, 'statements');
const dataRoot = path.join(root, 'data', 'GA');

function lines(values) {
  return `${values.join('\n')}\n`;
}

const problems = [
  {
    slug: 'ga-01-lemonade-change',
    dataName: 'ga-01-lemonade-change',
    title: '01 · Lemonade Change',
    difficulty: 'Easy',
    source: 'LeetCode 860, rewritten as a contest-style problem',
    story: 'A lemonade stand sells each cup for 5 dollars. Customers pay in order using 5, 10, or 20 dollar bills. You start with no change. Decide whether every customer can receive the correct change.',
    inputFormat: ['The first line contains an integer `n`.', 'The second line contains `n` integers, each equal to `5`, `10`, or `20`, representing the bills paid in order.'],
    outputFormat: ['Print `true` if all customers can be served with correct change; otherwise print `false`.'],
    constraints: ['1 <= n <= 100000', 'Each bill is 5, 10, or 20.'],
    greedy: 'Keep counts of 5-dollar and 10-dollar bills. For a 20-dollar bill, prefer giving 10+5 as change, preserving more 5-dollar bills for future customers.',
    input: lines(['5', '5 5 10 10 20']),
    output: lines(['false']),
  },
  {
    slug: 'ga-02-maximum-units-truck',
    dataName: 'ga-02-maximum-units-truck',
    title: '02 · Maximum Units on a Truck',
    difficulty: 'Easy',
    source: 'LeetCode 1710, rewritten as a contest-style problem',
    story: 'A truck can carry at most `k` boxes. There are several box types. For each type, you know how many boxes exist and how many units each box contains. Maximize the total units loaded onto the truck.',
    inputFormat: ['The first line contains two integers `m` and `k`.', 'The next `m` lines each contain two integers `count` and `units`, describing one box type.'],
    outputFormat: ['Print the maximum total number of units that can be loaded.'],
    constraints: ['1 <= m <= 100000', '1 <= k <= 1000000000', '1 <= count, units <= 100000'],
    greedy: 'Sort box types by `units` descending. Load the highest-value boxes first until the truck is full.',
    input: lines(['3 4', '1 3', '2 2', '3 1']),
    output: lines(['8']),
  },
  {
    slug: 'ga-03-non-overlapping-intervals',
    dataName: 'ga-03-non-overlapping-intervals',
    title: '03 · Non-overlapping Intervals',
    difficulty: 'Medium',
    source: 'LeetCode 435, rewritten as a contest-style problem',
    story: 'You are given `n` half-open intervals `[l, r)`. Remove as few intervals as possible so that the remaining intervals do not overlap.',
    inputFormat: ['The first line contains an integer `n`.', 'The next `n` lines each contain two integers `l` and `r`.'],
    outputFormat: ['Print the minimum number of intervals that must be removed.'],
    constraints: ['1 <= n <= 100000', '-1000000000 <= l < r <= 1000000000'],
    greedy: 'Sort by ending time ascending. Always keep the interval that ends earliest, because it leaves the most room for future intervals.',
    input: lines(['4', '1 2', '2 3', '3 4', '1 3']),
    output: lines(['1']),
  },
  {
    slug: 'ga-04-task-scheduler',
    dataName: 'ga-04-task-scheduler',
    title: '04 · Task Scheduler',
    difficulty: 'Medium',
    source: 'LeetCode 621, rewritten as a contest-style problem',
    story: 'A CPU must finish a sequence of tasks. Each task has an uppercase letter type. The same task type must be separated by at least `cooldown` time units. The CPU may be idle. Find the shortest total time.',
    inputFormat: ['The first line contains two integers `n` and `cooldown`.', 'The second line contains a string of length `n` using uppercase letters `A` to `Z`. Each character is one task.'],
    outputFormat: ['Print the minimum total time needed to complete all tasks.'],
    constraints: ['1 <= n <= 100000', '0 <= cooldown <= 100000', 'Tasks are uppercase English letters.'],
    greedy: 'Let `max_freq` be the largest task frequency and `max_count` be the number of task types with that frequency. A lower bound is `(max_freq - 1) * (cooldown + 1) + max_count`; the answer is the maximum of this value and `n`.',
    input: lines(['6 2', 'AAABBB']),
    output: lines(['8']),
  },
  {
    slug: 'ga-05-item-stacking',
    dataName: 'ga-05-item-stacking',
    title: '05 · Item Stacking',
    difficulty: 'Hard',
    source: 'APCS-style greedy exchange argument problem',
    story: 'There are `n` items stacked vertically. To access an item, all items above it must be lifted. Item `i` has weight `w_i` and will be accessed `f_i` times. Arrange the stack from top to bottom to minimize total lifting energy.',
    inputFormat: ['The first line contains an integer `n`.', 'The next `n` lines each contain two integers `w_i` and `f_i`.'],
    outputFormat: ['Print the minimum total energy.'],
    constraints: ['1 <= n <= 200000', '1 <= w_i, f_i <= 1000000', 'The answer fits in a signed 64-bit integer.'],
    greedy: 'For two items `A` above `B`, the pair cost is `w_A * f_B`; after swapping, it is `w_B * f_A`. Put `A` above `B` when `w_A * f_B < w_B * f_A`, equivalent to sorting by increasing `w / f` without floating-point division.',
    input: lines(['3', '2 3', '4 1', '1 5']),
    output: lines(['6']),
  },
];

function statementFor(problem) {
  return `# ${problem.title}

> Greedy Algorithm 練習題。此題已整理成 Problems 比賽題格式，可直接修改本 Markdown 題面和 \`data/GA/${problem.dataName}\` 測資。

|項目|內容|
|---|---|
|任務名稱|\`${problem.dataName}\`|
|組別|\`GA\`|
|難度|\`${problem.difficulty}\`|
|測資目錄|\`data/GA/${problem.dataName}\`|
|來源|\`${problem.source}\`|
|對齊範例|\`${problem.dataName}-0.in\` / \`${problem.dataName}-0.out\`|

## 題目說明

${problem.story}

## 輸入格式

${problem.inputFormat.map((line) => `- ${line}`).join('\n')}

## 輸出格式

${problem.outputFormat.map((line) => `- ${line}`).join('\n')}

## 範例輸入

\`\`\`text
${problem.input.trimEnd()}
\`\`\`

## 範例輸出

\`\`\`text
${problem.output.trimEnd()}
\`\`\`

## 貪婪提示

${problem.greedy}

## 限制

${problem.constraints.map((line) => `- ${line}`).join('\n')}
`;
}

fs.mkdirSync(statementsRoot, { recursive: true });
fs.mkdirSync(dataRoot, { recursive: true });

for (const problem of problems) {
  fs.writeFileSync(path.join(statementsRoot, `${problem.slug}.md`), statementFor(problem));

  const problemDataDir = path.join(dataRoot, problem.dataName);
  fs.mkdirSync(problemDataDir, { recursive: true });
  fs.writeFileSync(path.join(problemDataDir, `${problem.dataName}-0.in`), problem.input);
  fs.writeFileSync(path.join(problemDataDir, `${problem.dataName}-0.out`), problem.output);
}

console.log(`Generated ${problems.length} GA greedy problems.`);
