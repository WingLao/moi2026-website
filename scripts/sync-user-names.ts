import fs from 'node:fs/promises';
import path from 'node:path';
import { prisma } from '../src/lib/prisma';
import { parseUserNameCsv, syncUserNames } from '../src/lib/user-name-sync';

async function main() {
  const csvPath = process.argv[2] ?? '/Users/macbook/Downloads/Name.csv';
  const absolutePath = path.resolve(csvPath);
  const content = await fs.readFile(absolutePath, 'utf8');
  const rows = parseUserNameCsv(content);
  const result = await syncUserNames(rows);
  console.log(`Synced ${result.updatedUsers} user name(s) from ${absolutePath}. Missing matches: ${result.missingEmails.length}. Invalid rows: ${result.invalidRows.length}.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
