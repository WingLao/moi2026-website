export type ProblemLevel = 'P' | 'J' | 'S';

export type ProblemCatalogEntry = {
  slug: string;
  title: string;
  level: ProblemLevel;
  pdfFilename: string;
  pdfAliases?: string[];
};

export const PROBLEM_CATALOG: readonly ProblemCatalogEntry[] = [
  { slug: 'p-gaps', title: 'gaps', level: 'P', pdfFilename: 'P-gaps.pdf' },
  { slug: 'p-letters', title: 'letters', level: 'P', pdfFilename: 'P-letters.pdf' },
  { slug: 'p-round', title: 'round', level: 'P', pdfFilename: 'P-round.pdf' },
  { slug: 'p-sort', title: 'sort', level: 'P', pdfFilename: 'P-sort.pdf' },
  { slug: 'p-stairs', title: 'stairs', level: 'P', pdfFilename: 'P-stairs.pdf' },
  { slug: 'p-islands', title: 'islands', level: 'P', pdfFilename: 'P-islands.pdf' },
  { slug: 'p-steps', title: 'steps', level: 'P', pdfFilename: 'P-steps.pdf' },
  { slug: 'p-grade', title: 'grade', level: 'P', pdfFilename: 'P-grade.pdf' },
  { slug: 'p-coin', title: 'coin', level: 'P', pdfFilename: 'P-coin.pdf' },
  { slug: 'j-partner', title: 'partner', level: 'J', pdfFilename: 'J-partner.pdf' },
  { slug: 'j-parttime', title: 'parttime', level: 'J', pdfFilename: 'J-parttime.pdf' },
  { slug: 'j-exchange', title: 'exchange', level: 'J', pdfFilename: 'J-exchange.pdf', pdfAliases: ['J-exchnage.pdf'] },
  { slug: 'j-sortrank', title: 'sortrank', level: 'J', pdfFilename: 'J-sortrank.pdf' },
  { slug: 'j-lis', title: 'lis', level: 'J', pdfFilename: 'J-lis.pdf' },
  { slug: 'j-components', title: 'components', level: 'J', pdfFilename: 'J-components.pdf' },
  { slug: 'j-spread', title: 'spread', level: 'J', pdfFilename: 'J-spread.pdf' },
  { slug: 'j-inversions', title: 'inversions', level: 'J', pdfFilename: 'J-inversions.pdf' },
  { slug: 'j-schedule', title: 'schedule', level: 'J', pdfFilename: 'J-schedule.pdf' },
  { slug: 's-balls', title: 'balls', level: 'S', pdfFilename: 'S-balls.pdf' },
  { slug: 's-climb', title: 'climb', level: 'S', pdfFilename: 'S-climb.pdf' },
  { slug: 's-comm', title: 'comm', level: 'S', pdfFilename: 'S-comm.pdf' },
];

const catalogByPdfFilename = new Map<string, ProblemCatalogEntry>();

for (const entry of PROBLEM_CATALOG) {
  catalogByPdfFilename.set(entry.pdfFilename, entry);

  for (const alias of entry.pdfAliases ?? []) {
    catalogByPdfFilename.set(alias, entry);
  }
}

export function getProblemCatalogEntryByPdfFilename(pdfFilename: string) {
  return catalogByPdfFilename.get(pdfFilename) ?? null;
}
