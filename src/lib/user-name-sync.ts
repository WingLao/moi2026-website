import { prisma } from './prisma';

export type UserNameSyncRow = {
  name: string;
  email: string;
};

export type UserNameSyncResult = {
  totalRows: number;
  updatedUsers: number;
  missingEmails: string[];
  invalidRows: string[];
};

function normalizeHeader(value: string) {
  return value.replace(/^\uFEFF/, '').trim().toLowerCase();
}

function splitCsvLine(line: string) {
  const cells: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];

    if (char === '"') {
      if (inQuotes && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      cells.push(current.trim());
      current = '';
      continue;
    }

    current += char;
  }

  cells.push(current.trim());
  return cells.map((cell) => cell.replace(/^"(.*)"$/, '$1').trim());
}

export function parseUserNameCsv(content: string) {
  const lines = content
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return [] as UserNameSyncRow[];
  }

  const headers = splitCsvLine(lines[0]).map(normalizeHeader);
  const nameIndex = headers.findIndex((header) => header === 'name');
  const emailIndex = headers.findIndex((header) => header === 'e-mail' || header === 'email');

  if (nameIndex === -1 || emailIndex === -1) {
    throw new Error('CSV must contain `Name` and `E-mail` headers.');
  }

  return lines.slice(1).map((line) => {
    const cells = splitCsvLine(line);
    return {
      name: cells[nameIndex] ?? '',
      email: cells[emailIndex] ?? '',
    };
  });
}

export async function syncUserNames(rows: UserNameSyncRow[]): Promise<UserNameSyncResult> {
  const missingEmails: string[] = [];
  const invalidRows: string[] = [];
  let updatedUsers = 0;

  for (const row of rows) {
    const name = row.name.trim();
    const email = row.email.trim().toLowerCase();

    if (!name || !email) {
      invalidRows.push(`${row.name || '(empty name)'} / ${row.email || '(empty email)'}`);
      continue;
    }

    const result = await prisma.user.updateMany({
      where: { username: email },
      data: { name },
    });

    if (result.count > 0) {
      updatedUsers += result.count;
    } else {
      missingEmails.push(email);
    }
  }

  const detailLines = [
    `Rows: ${rows.length}`,
    `Updated users: ${updatedUsers}`,
    `Missing emails: ${missingEmails.length}`,
    `Invalid rows: ${invalidRows.length}`,
    ...(missingEmails.length ? ['', 'Missing emails:', ...missingEmails] : []),
    ...(invalidRows.length ? ['', 'Invalid rows:', ...invalidRows] : []),
  ];

  await prisma.importReport.create({
    data: {
      summary: 'user name import',
      detail: detailLines.join('\n'),
    },
  });

  return {
    totalRows: rows.length,
    updatedUsers,
    missingEmails,
    invalidRows,
  };
}
