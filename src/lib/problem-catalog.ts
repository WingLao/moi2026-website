export type ProblemLevel = 'Beginner' | 'P' | 'J' | 'S';

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
  { slug: 'beginner-f5b-01-number-sequences', title: '01 · Number Sequences with range()', level: 'Beginner', dataDirName: 'f5b-01-number-sequences', statementFilename: 'beginner-f5b-01-number-sequences.md' },
  { slug: 'beginner-f5b-02-even-squares', title: '02 · Square of Even Numbers', level: 'Beginner', dataDirName: 'f5b-02-even-squares', statementFilename: 'beginner-f5b-02-even-squares.md' },
  { slug: 'beginner-f5b-03-factorial-5', title: '03 · Factorial of 5', level: 'Beginner', dataDirName: 'f5b-03-factorial-5', statementFilename: 'beginner-f5b-03-factorial-5.md' },
  { slug: 'beginner-f5b-04-even-sum', title: '04 · Sum of Even Numbers (1-10)', level: 'Beginner', dataDirName: 'f5b-04-even-sum', statementFilename: 'beginner-f5b-04-even-sum.md' },
  { slug: 'beginner-f5b-05-divisible-by-13', title: '05 · Divisible by 13 (1-500)', level: 'Beginner', dataDirName: 'f5b-05-divisible-by-13', statementFilename: 'beginner-f5b-05-divisible-by-13.md' },
  { slug: 'beginner-f5b-06-reverse-multiplication-table', title: '06 · Multiplication Table in Reverse Order', level: 'Beginner', dataDirName: 'f5b-06-reverse-multiplication-table', statementFilename: 'beginner-f5b-06-reverse-multiplication-table.md' },
  { slug: 'beginner-f5b-07-append-list', title: '07 · Create a List with append()', level: 'Beginner', dataDirName: 'f5b-07-append-list', statementFilename: 'beginner-f5b-07-append-list.md' },
  { slug: 'beginner-f5b-08-list-statistics', title: '08 · List Statistics with NumPy', level: 'Beginner', dataDirName: 'f5b-08-list-statistics', statementFilename: 'beginner-f5b-08-list-statistics.md' },
  { slug: 'beginner-f5b-09-filter-transform', title: '09 · Filter and Transform with NumPy', level: 'Beginner', dataDirName: 'f5b-09-filter-transform', statementFilename: 'beginner-f5b-09-filter-transform.md' },
  { slug: 'beginner-f5b-10-even-above-average', title: '10 · Filter Even Numbers Above Average', level: 'Beginner', dataDirName: 'f5b-10-even-above-average', statementFilename: 'beginner-f5b-10-even-above-average.md' },
  { slug: 'beginner-f5b-11-count-average', title: '11 · Count Above and Below Average', level: 'Beginner', dataDirName: 'f5b-11-count-average', statementFilename: 'beginner-f5b-11-count-average.md' },
  { slug: 'beginner-f5b-12-replace-below-average', title: '12 · Replace Values Below Average', level: 'Beginner', dataDirName: 'f5b-12-replace-below-average', statementFilename: 'beginner-f5b-12-replace-below-average.md' },
  { slug: 'beginner-f5b-13-standard-deviation', title: '13 · Standard Deviation Challenge', level: 'Beginner', dataDirName: 'f5b-13-standard-deviation', statementFilename: 'beginner-f5b-13-standard-deviation.md' },
  { slug: 'beginner-f5b-14-cumulative-sum', title: '14 · Cumulative Sum', level: 'Beginner', dataDirName: 'f5b-14-cumulative-sum', statementFilename: 'beginner-f5b-14-cumulative-sum.md' },
  { slug: 'beginner-f5b-15-normalize-data', title: '15 · Normalize Data', level: 'Beginner', dataDirName: 'f5b-15-normalize-data', statementFilename: 'beginner-f5b-15-normalize-data.md' },
  { slug: 'beginner-f5b-16-character-frequency', title: '16 · Character Frequency', level: 'Beginner', dataDirName: 'f5b-16-character-frequency', statementFilename: 'beginner-f5b-16-character-frequency.md' },
  { slug: 'beginner-f5b-17-two-sum', title: '17 · Two Sum', level: 'Beginner', dataDirName: 'f5b-17-two-sum', statementFilename: 'beginner-f5b-17-two-sum.md' },
  { slug: 'beginner-f5b-18-first-unique-character', title: '18 · First Unique Character', level: 'Beginner', dataDirName: 'f5b-18-first-unique-character', statementFilename: 'beginner-f5b-18-first-unique-character.md' },
  { slug: 'beginner-f5b-19-most-frequent-word', title: '19 · Most Frequent Word', level: 'Beginner', dataDirName: 'f5b-19-most-frequent-word', statementFilename: 'beginner-f5b-19-most-frequent-word.md' },
  { slug: 'beginner-f5b-20-inventory-valuation', title: '20 · Inventory Valuation', level: 'Beginner', dataDirName: 'f5b-20-inventory-valuation', statementFilename: 'beginner-f5b-20-inventory-valuation.md' },
  { slug: 'beginner-f5b-21-roman-to-integer', title: '21 · Roman to Integer', level: 'Beginner', dataDirName: 'f5b-21-roman-to-integer', statementFilename: 'beginner-f5b-21-roman-to-integer.md' },
  { slug: 'beginner-f5b-22-minimum-coins', title: '22 · Minimum Coins', level: 'Beginner', dataDirName: 'f5b-22-minimum-coins', statementFilename: 'beginner-f5b-22-minimum-coins.md' },
  { slug: 'beginner-f5b-23-alternating-series', title: '23 · Alternating Series Value', level: 'Beginner', dataDirName: 'f5b-23-alternating-series', statementFilename: 'beginner-f5b-23-alternating-series.md' },
  { slug: 'beginner-f5b-24-match-equipment', title: '24 · Match Players with Equipment', level: 'Beginner', dataDirName: 'f5b-24-match-equipment', statementFilename: 'beginner-f5b-24-match-equipment.md' },
  { slug: 'beginner-f5b-25-audit', title: '25 · Audit', level: 'Beginner', dataDirName: 'f5b-25-audit', statementFilename: 'beginner-f5b-25-audit.md' },
  { slug: 'beginner-f5b-26-alternating-reciprocal-sum', title: '26 · Alternating Reciprocal Sum', level: 'Beginner', dataDirName: 'f5b-26-alternating-reciprocal-sum', statementFilename: 'beginner-f5b-26-alternating-reciprocal-sum.md' },
  { slug: 'beginner-f5b-27-pair-sum-finder', title: '27 · Pair Sum Finder', level: 'Beginner', dataDirName: 'f5b-27-pair-sum-finder', statementFilename: 'beginner-f5b-27-pair-sum-finder.md' },
  { slug: 'beginner-f5b-28-selection-sort-median', title: '28 · Selection Sort + Median', level: 'Beginner', dataDirName: 'f5b-28-selection-sort-median', statementFilename: 'beginner-f5b-28-selection-sort-median.md' },
  { slug: 'beginner-f5b-29-row-sum-champion', title: '29 · Row Sum Champion', level: 'Beginner', dataDirName: 'f5b-29-row-sum-champion', statementFilename: 'beginner-f5b-29-row-sum-champion.md' },
  { slug: 'beginner-f5b-30-closest-pair-difference', title: '30 · Closest Pair Difference', level: 'Beginner', dataDirName: 'f5b-30-closest-pair-difference', statementFilename: 'beginner-f5b-30-closest-pair-difference.md' },
  { slug: 'beginner-f5b-31-matrix-transpose', title: '31 · Matrix Transpose', level: 'Beginner', dataDirName: 'f5b-31-matrix-transpose', statementFilename: 'beginner-f5b-31-matrix-transpose.md' },
];

export const PROBLEM_CATALOG: readonly ProblemCatalogEntry[] = [
  ...F5B_BEGINNER_PROBLEMS,
  { slug: 'p-gaps', title: 'gaps', level: 'P', statementFilename: 'p-gaps.md', pdfFilename: 'P-gaps.pdf' },
  { slug: 'p-letters', title: 'letters', level: 'P', statementFilename: 'p-letters.md', pdfFilename: 'P-letters.pdf' },
  { slug: 'p-round', title: 'round', level: 'P', statementFilename: 'p-round.md', pdfFilename: 'P-round.pdf' },
  { slug: 'p-sort', title: 'sort', level: 'P', statementFilename: 'p-sort.md', pdfFilename: 'P-sort.pdf' },
  { slug: 'p-stairs', title: 'stairs', level: 'P', statementFilename: 'p-stairs.md', pdfFilename: 'P-stairs.pdf' },
  { slug: 'p-islands', title: 'islands', level: 'P', statementFilename: 'p-islands.md', pdfFilename: 'P-islands.pdf' },
  { slug: 'p-steps', title: 'steps', level: 'P', statementFilename: 'p-steps.md', pdfFilename: 'P-steps.pdf' },
  { slug: 'p-grade', title: 'grade', level: 'P', statementFilename: 'p-grade.md', pdfFilename: 'P-grade.pdf' },
  { slug: 'p-coin', title: 'coin', level: 'P', statementFilename: 'p-coin.md', pdfFilename: 'P-coin.pdf' },
  { slug: 'j-partner', title: 'partner', level: 'J', statementFilename: 'j-partner.md', pdfFilename: 'J-partner.pdf' },
  { slug: 'j-parttime', title: 'parttime', level: 'J', statementFilename: 'j-parttime.md', pdfFilename: 'J-parttime.pdf' },
  { slug: 'j-exchange', title: 'exchange', level: 'J', statementFilename: 'j-exchange.md', pdfFilename: 'J-exchange.pdf', pdfAliases: ['J-exchnage.pdf'] },
  { slug: 'j-sortrank', title: 'sortrank', level: 'J', statementFilename: 'j-sortrank.md', pdfFilename: 'J-sortrank.pdf' },
  { slug: 'j-lis', title: 'lis', level: 'J', statementFilename: 'j-lis.md', pdfFilename: 'J-lis.pdf' },
  { slug: 'j-components', title: 'components', level: 'J', statementFilename: 'j-components.md', pdfFilename: 'J-components.pdf' },
  { slug: 'j-spread', title: 'spread', level: 'J', statementFilename: 'j-spread.md', pdfFilename: 'J-spread.pdf' },
  { slug: 'j-inversions', title: 'inversions', level: 'J', statementFilename: 'j-inversions.md', pdfFilename: 'J-inversions.pdf' },
  { slug: 'j-schedule', title: 'schedule', level: 'J', statementFilename: 'j-schedule.md', pdfFilename: 'J-schedule.pdf' },
  { slug: 's-balls', title: 'balls', level: 'S', statementFilename: 's-balls.md', pdfFilename: 'S-balls.pdf' },
  { slug: 's-climb', title: 'climb', level: 'S', statementFilename: 's-climb.md', pdfFilename: 'S-climb.pdf' },
  { slug: 's-comm', title: 'comm', level: 'S', statementFilename: 's-comm.md', pdfFilename: 'S-comm.pdf' },
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
