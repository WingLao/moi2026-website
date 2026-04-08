import fs from 'node:fs';
import path from 'node:path';
import { getDataRoot } from './data-root';
import { type ProblemCatalogEntry, getProblemCatalogEntryBySlug } from './problem-catalog';

export function getStatementsRoot(root = getDataRoot()) {
  return path.join(root, 'statements');
}

export function getProblemStatementPath(entry: ProblemCatalogEntry, root = getDataRoot()) {
  return path.join(getStatementsRoot(root), entry.statementFilename);
}

export function resolveProblemStatementBySlug(slug: string, root = getDataRoot()) {
  const entry = getProblemCatalogEntryBySlug(slug);
  if (!entry) {
    return null;
  }

  const statementPath = getProblemStatementPath(entry, root);

  return {
    entry,
    statementPath,
    exists: fs.existsSync(statementPath),
  };
}

export function readProblemStatementBySlug(slug: string, root = getDataRoot()) {
  const resolved = resolveProblemStatementBySlug(slug, root);
  if (!resolved?.exists) {
    return null;
  }

  return fs.readFileSync(resolved.statementPath, 'utf8');
}
