import fs from 'node:fs';
import path from 'node:path';

export function getDataRoot() {
  return process.env.JUDGE_DATA_ROOT || path.resolve(process.cwd(), '..');
}

export function toStoredPath(absolutePath: string, root = getDataRoot()) {
  const normalizedRoot = path.resolve(root);
  const normalizedPath = path.resolve(absolutePath);
  if (normalizedPath.startsWith(normalizedRoot + path.sep) || normalizedPath === normalizedRoot) {
    return path.relative(normalizedRoot, normalizedPath) || '.';
  }
  return absolutePath;
}

export function resolveStoredPath(storedPath: string, root = getDataRoot()) {
  if (path.isAbsolute(storedPath)) {
    return storedPath;
  }

  const rootCandidate = path.resolve(root, storedPath);
  if (fs.existsSync(rootCandidate)) {
    return rootCandidate;
  }

  const cwdCandidate = path.resolve(process.cwd(), storedPath);
  if (fs.existsSync(cwdCandidate)) {
    return cwdCandidate;
  }

  return rootCandidate;
}
