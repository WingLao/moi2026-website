export type ProblemLevel = 'P' | 'J' | 'S';

export type ProblemCatalogEntry = {
  slug: string;
  title: string;
  level: ProblemLevel;
  statementFilename: string;
  pdfFilename: string;
  pdfAliases?: string[];
};

export const PROBLEM_CATALOG: readonly ProblemCatalogEntry[] = [
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
  catalogByPdfFilename.set(entry.pdfFilename, entry);

  for (const alias of entry.pdfAliases ?? []) {
    catalogByPdfFilename.set(alias, entry);
  }
}

export function getProblemCatalogEntryByPdfFilename(pdfFilename: string) {
  return catalogByPdfFilename.get(pdfFilename) ?? null;
}

export function getProblemCatalogEntryBySlug(slug: string) {
  return catalogBySlug.get(slug) ?? null;
}
