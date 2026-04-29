import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || process.cwd());
const statementsRoot = path.join(root, 'statements');
const dataRoot = path.join(root, 'data', 'Beginner');

function lines(values) {
  return `${values.join('\n')}\n`;
}

function range(start, end, step = 1) {
  const values = [];
  for (let value = start; value <= end; value += step) {
    values.push(value);
  }
  return values;
}

function reverseMultiplicationTable() {
  const output = [];
  for (let i = 10; i >= 1; i -= 1) {
    const row = [];
    for (let j = 1; j <= i; j += 1) {
      row.push(`${i}*${j}=${i * j}`);
    }
    output.push(row.join(' '));
  }
  return lines(output);
}

const problems = [
  {
    slug: 'beginner-f5b-01-number-sequences',
    dataName: 'f5b-01-number-sequences',
    title: 'F5B 01 · Number Sequences with range()',
    task: 'Print numbers from 1 to 100, then print numbers from 1 to 100 with a step of 3.',
    input: '',
    output: lines([range(1, 100).join(' '), range(1, 100, 3).join(' ')]),
    notes: ['Use `range(1, 101)` and `range(1, 101, 3)`.'],
  },
  {
    slug: 'beginner-f5b-02-even-squares',
    dataName: 'f5b-02-even-squares',
    title: 'F5B 02 · Square of Even Numbers',
    task: 'Use the fixed list `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`. Print the square of each even number.',
    input: '',
    output: lines(['Even squares: 4 16 36 64 100']),
    notes: ['Check `i % 2 == 0`, then compute `i * i`.'],
  },
  {
    slug: 'beginner-f5b-03-factorial-5',
    dataName: 'f5b-03-factorial-5',
    title: 'F5B 03 · Factorial of 5',
    task: 'Use a for loop to compute the factorial of 5.',
    input: '',
    output: lines(['Factorial of 5: 120']),
    notes: ['Start with `ans = 1`, then multiply by every `i` from 1 to 5.'],
  },
  {
    slug: 'beginner-f5b-04-even-sum',
    dataName: 'f5b-04-even-sum',
    title: 'F5B 04 · Sum of Even Numbers (1-10)',
    task: 'Print the even numbers from 1 to 10, then print their sum.',
    input: '',
    output: lines(['2 4 6 8 10', 'Sum: 30']),
    notes: ['Loop from 1 to 10 and use `i % 2 == 0`.'],
  },
  {
    slug: 'beginner-f5b-05-divisible-by-13',
    dataName: 'f5b-05-divisible-by-13',
    title: 'F5B 05 · Divisible by 13 (1-500)',
    task: 'Print all numbers from 1 to 500 divisible by 13, then print the count and sum.',
    input: '',
    output: lines([range(13, 494, 13).join(' '), 'Total: 38', 'Sum: 9633']),
    notes: ['Use `i % 13 == 0`, a counter, and an accumulator.'],
  },
  {
    slug: 'beginner-f5b-06-reverse-multiplication-table',
    dataName: 'f5b-06-reverse-multiplication-table',
    title: 'F5B 06 · Multiplication Table in Reverse Order',
    task: 'Display the multiplication table from 10 down to 1. Row `i` should show products from `i*1` to `i*i`.',
    input: '',
    output: reverseMultiplicationTable(),
    notes: ['Use a nested loop: outer loop from 10 down to 1, inner loop from 1 to `i`.'],
  },
  {
    slug: 'beginner-f5b-07-append-list',
    dataName: 'f5b-07-append-list',
    title: 'F5B 07 · Create a List with append()',
    task: 'Generate numbers from 1 to 20, append only numbers divisible by 3 into a list, then print the list.',
    input: '',
    output: lines(['[3, 6, 9, 12, 15, 18]']),
    notes: ['Create `l = []`, then call `l.append(i)` inside the condition.'],
  },
  {
    slug: 'beginner-f5b-08-list-statistics',
    dataName: 'f5b-08-list-statistics',
    title: 'F5B 08 · List Statistics with NumPy',
    task: 'Input 5 integers and display the maximum, minimum, and average.',
    input: '10 20 30 40 50\n',
    output: lines(['Max: 50', 'Min: 10', 'Average: 30.00']),
    notes: ['Format the average to 2 decimal places.'],
  },
  {
    slug: 'beginner-f5b-09-filter-transform',
    dataName: 'f5b-09-filter-transform',
    title: 'F5B 09 · Filter and Transform with NumPy',
    task: 'Input 8 integers. Compute the average, square every number greater than the average, and store those squares in a new list.',
    input: '2 4 6 8 10 12 14 16\n',
    output: lines(['Original: [2, 4, 6, 8, 10, 12, 14, 16]', 'Average: 9.00', 'New list: [100, 144, 196, 256]']),
    notes: ['Create the new list before the loop. Append `i ** 2`, not `i`.'],
  },
  {
    slug: 'beginner-f5b-10-even-above-average',
    dataName: 'f5b-10-even-above-average',
    title: 'F5B 10 · Filter Even Numbers Above Average',
    task: 'Input integers, print the average to 2 decimal places, then print numbers that are both even and greater than the average.',
    input: '5 8 12 15 20 7 18 9 14 6\n',
    output: lines(['11.40', '[12, 20, 18, 14]']),
    notes: ['Both conditions must be true: even and greater than average.'],
  },
  {
    slug: 'beginner-f5b-11-count-average',
    dataName: 'f5b-11-count-average',
    title: 'F5B 11 · Count Above and Below Average',
    task: 'Input integers. Print the average, the count greater than the average, and the count not greater than the average.',
    input: '1 2 3 4 5 9 100 10\n',
    output: lines(['16.75', '1', '7']),
    notes: ['Numbers equal to the average should be counted in the not-greater group.'],
  },
  {
    slug: 'beginner-f5b-12-replace-below-average',
    dataName: 'f5b-12-replace-below-average',
    title: 'F5B 12 · Replace Values Below Average',
    task: 'Input comma-space separated integers. Print the original list and a new list where values below average are replaced by 0.',
    input: '5, 10, 15, 20, 25, 30\n',
    output: lines(['[5, 10, 15, 20, 25, 30]', '[0, 0, 15, 20, 25, 30]']),
    notes: ['Only values strictly less than the average become 0.'],
  },
  {
    slug: 'beginner-f5b-13-standard-deviation',
    dataName: 'f5b-13-standard-deviation',
    title: 'F5B 13 · Standard Deviation Challenge',
    task: 'Input integers. Print the mean, standard deviation, and the list of values greater than `mean + std`.',
    input: '10 12 15 18 20 22 25 30 5 8\n',
    output: lines(['16.5', '7.54', '[25, 30]']),
    notes: ['Use population standard deviation, as returned by `numpy.std`.'],
  },
  {
    slug: 'beginner-f5b-14-cumulative-sum',
    dataName: 'f5b-14-cumulative-sum',
    title: 'F5B 14 · Cumulative Sum',
    task: 'Input integers and print a list containing the cumulative sum at each position.',
    input: '1 2 3 4\n',
    output: lines(['[1, 3, 6, 10]']),
    notes: ['Keep a running total and append the total after each number.'],
  },
  {
    slug: 'beginner-f5b-15-normalize-data',
    dataName: 'f5b-15-normalize-data',
    title: 'F5B 15 · Normalize Data',
    task: 'Input integers. Normalize each number using `(x - min) / (max - min)`, round to 2 decimal places, and print the list.',
    input: '10 20 30 40 50\n',
    output: lines(['[0.0, 0.25, 0.5, 0.75, 1.0]']),
    notes: ['Compute the minimum and maximum once before the loop.'],
  },
  {
    slug: 'beginner-f5b-16-character-frequency',
    dataName: 'f5b-16-character-frequency',
    title: 'F5B 16 · Character Frequency',
    task: 'Input a string and print a dictionary that counts the frequency of each character.',
    input: 'google\n',
    output: lines(["{'g': 2, 'o': 2, 'l': 1, 'e': 1}"]),
    notes: ['Build the dictionary by incrementing the count for each character.'],
  },
  {
    slug: 'beginner-f5b-17-two-sum',
    dataName: 'f5b-17-two-sum',
    title: 'F5B 17 · Two Sum',
    task: 'Input a list of integers and a target. Print two indices such that the two numbers add up to the target.',
    input: '2 7 11 15\n9\n',
    output: lines(['[0, 1]']),
    notes: ['Use zero-based indices.'],
  },
  {
    slug: 'beginner-f5b-18-first-unique-character',
    dataName: 'f5b-18-first-unique-character',
    title: 'F5B 18 · First Unique Character',
    task: 'Input a string and print the index of the first non-repeating character.',
    input: 'leetcode\n',
    output: lines(['0']),
    notes: ['First count characters, then scan the string by index.'],
  },
  {
    slug: 'beginner-f5b-19-most-frequent-word',
    dataName: 'f5b-19-most-frequent-word',
    title: 'F5B 19 · Most Frequent Word',
    task: 'Input a sentence and print the word that appears most frequently.',
    input: 'apple banana apple cherry apple banana\n',
    output: lines(['apple']),
    notes: ['Split the sentence by spaces and count words with a dictionary.'],
  },
  {
    slug: 'beginner-f5b-20-inventory-valuation',
    dataName: 'f5b-20-inventory-valuation',
    title: 'F5B 20 · Inventory Valuation',
    task: 'Use the fixed dictionaries shown below to calculate and print the total inventory value.',
    input: '',
    output: lines(['630']),
    notes: ['Use `prices = {"pen": 10, "pencil": 5, "eraser": 8}` and `stock = {"pen": 20, "pencil": 50, "eraser": 10}`.'],
  },
  {
    slug: 'beginner-f5b-21-roman-to-integer',
    dataName: 'f5b-21-roman-to-integer',
    title: 'F5B 21 · Roman to Integer',
    task: 'Input a Roman numeral string and print its integer value. This beginner version only needs additive Roman numerals.',
    input: 'XVI\n',
    output: lines(['16']),
    notes: ['Use a mapping such as `I: 1`, `V: 5`, `X: 10`, `L: 50`, `C: 100`, `D: 500`, `M: 1000`.'],
  },
  {
    slug: 'beginner-f5b-22-minimum-coins',
    dataName: 'f5b-22-minimum-coins',
    title: 'F5B 22 · Minimum Coins',
    task: 'Input coin denominations and an amount. Use a greedy algorithm to print the minimum number of coins.',
    input: '1 5 10 25\n63\n',
    output: lines(['6']),
    notes: ['Sort denominations from largest to smallest, then use as many as possible.'],
  },
  {
    slug: 'beginner-f5b-23-alternating-series',
    dataName: 'f5b-23-alternating-series',
    title: 'F5B 23 · Alternating Series Value',
    task: 'Input an even integer `n`. Compute `1/2^2 - 2/3^2 + 3/4^2 - ... + (n-1)/n^2` and print the answer to 2 decimal places.',
    input: '10\n',
    output: lines(['Answer: 0.09']),
    notes: ['The `k`-th denominator starts at `k = 2`. Positive when `k` is even, negative when `k` is odd.'],
  },
  {
    slug: 'beginner-f5b-24-match-equipment',
    dataName: 'f5b-24-match-equipment',
    title: 'F5B 24 · Match Players with Equipment',
    task: 'Input player requirements and equipment strengths. Print the maximum number of matched players.',
    input: '1 2\n2 3 4\n',
    output: lines(['2']),
    notes: ['Sort both lists and use two pointers. Each equipment item can be used once.'],
  },
  {
    slug: 'beginner-f5b-25-audit',
    dataName: 'f5b-25-audit',
    title: 'F5B 25 · Audit',
    task: 'Input two lists. Sort both, then use two pointers to count how many values appear in both lists. Count duplicates separately.',
    input: '2 3 3 5 1 2 3 4 5 8 9\n3 0 7 4 5 6 3\n',
    output: lines(['4']),
    notes: ['Move both pointers when a match is found.'],
  },
  {
    slug: 'beginner-f5b-26-alternating-reciprocal-sum',
    dataName: 'f5b-26-alternating-reciprocal-sum',
    title: 'F5B 26 · Alternating Reciprocal Sum',
    task: 'Input `n`. Compute `1/1^2 - 2/2^2 + 3/3^2 - 4/4^2 + ... ± n/n^2` and print the answer to 2 decimal places.',
    input: '8\n',
    output: lines(['Answer: 0.63']),
    notes: ['Each term simplifies to `1/i`. Positive when `i` is odd and negative when `i` is even.'],
  },
  {
    slug: 'beginner-f5b-27-pair-sum-finder',
    dataName: 'f5b-27-pair-sum-finder',
    title: 'F5B 27 · Pair Sum Finder',
    task: 'Input numbers and a target. Print all pairs that add up to the target, using each number at most once, then print the total count.',
    input: '1 4 6 7 9 10\n11\n',
    output: lines(['(1, 10)', '(4, 7)', 'Total: 2']),
    notes: ['Sort the list first or use a dictionary/set carefully.'],
  },
  {
    slug: 'beginner-f5b-28-selection-sort-median',
    dataName: 'f5b-28-selection-sort-median',
    title: 'F5B 28 · Selection Sort + Median',
    task: 'Input integers. Sort them using selection sort, then print the sorted list and median.',
    input: '8 3 5 1 9\n',
    output: lines(['Sorted: [1, 3, 5, 8, 9]', 'Median: 5']),
    notes: ['Do not use `.sort()` for the sorting step.'],
  },
  {
    slug: 'beginner-f5b-29-row-sum-champion',
    dataName: 'f5b-29-row-sum-champion',
    title: 'F5B 29 · Row Sum Champion',
    task: 'Input a matrix. Compute each row sum and print the row with the largest sum.',
    input: '3 3\n10 20 30\n25 15 10\n18 18 18\n',
    output: lines(['Row 0 sum: 60', 'Row 1 sum: 50', 'Row 2 sum: 54', 'Best row: 0', 'Largest sum: 60']),
    notes: ['The first input line contains row count and column count.'],
  },
  {
    slug: 'beginner-f5b-30-closest-pair-difference',
    dataName: 'f5b-30-closest-pair-difference',
    title: 'F5B 30 · Closest Pair Difference',
    task: 'Input integers. Print the pair with the smallest absolute difference and the difference.',
    input: '8 3 15 10 12\n',
    output: lines(['Pair: (10, 12)', 'Difference: 2']),
    notes: ['After sorting, the closest pair will be adjacent.'],
  },
  {
    slug: 'beginner-f5b-31-matrix-transpose',
    dataName: 'f5b-31-matrix-transpose',
    title: 'F5B 31 · Matrix Transpose',
    task: 'Input a matrix. Print the original matrix, then print its transpose.',
    input: '2 3\n1 2 3\n4 5 6\n',
    output: lines(['Original:', '[1, 2, 3]', '[4, 5, 6]', 'Transpose:', '[1, 4]', '[2, 5]', '[3, 6]']),
    notes: ['The first input line contains row count and column count.'],
  },
];

function statementFor(problem) {
  const inputText = problem.input.trimEnd() || '(no standard input)';
  const outputText = problem.output.trimEnd();
  const notes = problem.notes.map((note) => `- ${note}`).join('\n');

  return `# ${problem.title}

> F5B Python 課堂練習。此題已整理成 Problems 題目範本，可直接修改本 Markdown 題面和 \`data/Beginner/${problem.dataName}\` 測資。

|項目|內容|
|---|---|
|任務名稱|\`${problem.dataName}\`|
|組別|\`Beginner\`|
|測資目錄|\`data/Beginner/${problem.dataName}\`|
|來源|\`F5B_2025_2026_20260416.ipynb\`|
|對齊範例|\`${problem.dataName}-0.in\` / \`${problem.dataName}-0.out\`|

## 題目說明

${problem.task}

## 輸入格式

${problem.input.trim() ? 'Standard input follows the sample format below.' : 'This problem does not require standard input.'}

## 輸出格式

Print exactly the required result for the given task.

## 範例輸入

\`\`\`text
${inputText}
\`\`\`

## 範例輸出

\`\`\`text
${outputText}
\`\`\`

## 提示

${notes}

## 限制

- Language: Python 3 or C++17.
- Follow the output format exactly, including labels such as \`Total:\`, \`Sum:\`, or \`Answer:\` where shown.
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

console.log(`Generated ${problems.length} Beginner F5B problems.`);
