import fs from 'node:fs';
import path from 'node:path';
import { type ProblemCatalogEntry, getProblemCatalogEntryByPdfFilename } from './problem-catalog';
import { getProblemStatementPath } from './problem-statements';

const DUPLICATE_COPY_RE = / \d+\.(in|out)$/;

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function parseCaseIndex(filename: string) {
  const match = filename.match(/-(\d+)\.(in|out)$/);
  return match ? Number.parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
}

function sortByCaseIndex(left: string, right: string) {
  return parseCaseIndex(left) - parseCaseIndex(right) || left.localeCompare(right);
}

function unique<T>(values: T[]) {
  return Array.from(new Set(values));
}

export type AuditedTestCase = {
  index: number;
  stem: string;
  inputFile: string;
  outputFile: string | null;
  isValid: boolean;
  warning: string | null;
};

export type ProblemAssetAudit = {
  dataDir: string;
  hasDataDir: boolean;
  statementFilename: string;
  statementPath: string | null;
  pdfFilename: string;
  pdfPath: string | null;
  duplicateFiles: string[];
  extraOutputs: string[];
  cases: AuditedTestCase[];
  warnings: string[];
  isJudgeable: boolean;
};

export function resolveProblemPdf(root: string, requestedFilename: string) {
  const entry = getProblemCatalogEntryByPdfFilename(requestedFilename);
  if (!entry) {
    return null;
  }

  const candidates = unique([requestedFilename, entry.pdfFilename, ...(entry.pdfAliases ?? [])]);

  for (const candidate of candidates) {
    const pdfPath = path.join(root, candidate);
    if (fs.existsSync(pdfPath)) {
      return {
        entry,
        canonicalFilename: entry.pdfFilename,
        matchedFilename: candidate,
        pdfPath,
      };
    }
  }

  return {
    entry,
    canonicalFilename: entry.pdfFilename,
    matchedFilename: null,
    pdfPath: null,
  };
}

export function auditProblemAssets(root: string, entry: ProblemCatalogEntry): ProblemAssetAudit {
  const dataDir = path.join(root, 'data', entry.level, entry.title);
  const statementPath = getProblemStatementPath(entry, root);
  const pdf = resolveProblemPdf(root, entry.pdfFilename);
  const warnings: string[] = [];

  if (!fs.existsSync(statementPath)) {
    warnings.push(`Missing statement: ${entry.statementFilename}`);
  } else {
    const statement = fs.readFileSync(statementPath, 'utf8');
    const expectedDataDir = `data/${entry.level}/${entry.title}`;

    if (!statement.includes(expectedDataDir)) {
      warnings.push(`Statement data dir mismatch: expected ${expectedDataDir}`);
    }

    if (!statement.includes(entry.pdfFilename)) {
      warnings.push(`Statement source mismatch: expected ${entry.pdfFilename}`);
    }

    if (!statement.includes('## 輸入格式') || !statement.includes('## 輸出格式')) {
      warnings.push(`Statement structure incomplete: ${entry.statementFilename}`);
    }
  }

  if (!pdf?.pdfPath) {
    warnings.push(`Missing PDF: ${entry.pdfFilename}`);
  } else if (pdf.matchedFilename !== entry.pdfFilename) {
    warnings.push(`Legacy PDF filename in use: ${pdf.matchedFilename} -> ${entry.pdfFilename}`);
  }

  if (!fs.existsSync(dataDir)) {
    warnings.push('Missing data dir');
    return {
      dataDir,
      hasDataDir: false,
      statementFilename: entry.statementFilename,
      statementPath: fs.existsSync(statementPath) ? statementPath : null,
      pdfFilename: entry.pdfFilename,
      pdfPath: pdf?.pdfPath ?? null,
      duplicateFiles: [],
      extraOutputs: [],
      cases: [],
      warnings,
      isJudgeable: false,
    };
  }

  const files = fs.readdirSync(dataDir).filter((file) => !file.startsWith('.'));
  const duplicateFiles = files.filter((file) => DUPLICATE_COPY_RE.test(file)).sort(sortByCaseIndex);
  if (duplicateFiles.length > 0) {
    warnings.push(`Duplicate testcase copies: ${duplicateFiles.length}`);
  }

  const testcasePattern = new RegExp(`^${escapeRegExp(entry.title)}-\\d+\\.(in|out)$`);
  const canonicalFiles = files.filter((file) => testcasePattern.test(file)).sort(sortByCaseIndex);
  const inputFiles = canonicalFiles.filter((file) => file.endsWith('.in'));
  const outputFiles = canonicalFiles.filter((file) => file.endsWith('.out'));
  const outputSet = new Set(outputFiles.map((file) => file.replace(/\.out$/, '')));
  const inputStems = new Set(inputFiles.map((file) => file.replace(/\.in$/, '')));
  const extraOutputs = outputFiles
    .filter((file) => !inputStems.has(file.replace(/\.out$/, '')))
    .sort(sortByCaseIndex);

  if (inputFiles.length === 0) {
    warnings.push('Missing testcase inputs');
  }

  if (extraOutputs.length > 0) {
    warnings.push(`Orphan outputs: ${extraOutputs.length}`);
  }

  const cases = inputFiles.map<AuditedTestCase>((inputFile) => {
    const stem = inputFile.replace(/\.in$/, '');
    const outputFile = outputSet.has(stem) ? `${stem}.out` : null;

    if (!outputFile) {
      warnings.push(`Missing .out for ${inputFile}`);
    }

    return {
      index: parseCaseIndex(inputFile),
      stem,
      inputFile,
      outputFile,
      isValid: Boolean(outputFile),
      warning: outputFile ? null : `Missing .out for ${inputFile}`,
    };
  });

  return {
    dataDir,
    hasDataDir: true,
    statementFilename: entry.statementFilename,
    statementPath: fs.existsSync(statementPath) ? statementPath : null,
    pdfFilename: entry.pdfFilename,
    pdfPath: pdf?.pdfPath ?? null,
    duplicateFiles,
    extraOutputs,
    cases,
    warnings,
    isJudgeable: inputFiles.length > 0 && cases.every((testCase) => testCase.isValid),
  };
}
