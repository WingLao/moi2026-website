// Clear all submissions, delete all STUDENT accounts, and recreate students from a JSON list.
// Usage: npx tsx scripts/reset-students.ts <students.json> <backup-dir> [--apply]
//   students.json: [{ "name": "陳大文", "password": "20120315" }, ...]  (username = name)
//   Without --apply it only backs up and prints what would change.
import fs from 'node:fs';
import path from 'node:path';
import bcrypt from 'bcryptjs';
import { prisma } from '../src/lib/prisma';

async function main() {
  const [studentsPath, backupDir] = process.argv.slice(2);
  const apply = process.argv.includes('--apply');
  if (!studentsPath || !backupDir) throw new Error('Usage: reset-students.ts <students.json> <backup-dir> [--apply]');

  const students: { name: string; password: string }[] = JSON.parse(fs.readFileSync(studentsPath, 'utf8'));
  const names = new Set<string>();
  for (const s of students) {
    if (!s.name?.trim() || !/^\d{8}$/.test(s.password)) throw new Error(`Bad row: ${s.name}`);
    if (names.has(s.name)) throw new Error(`Duplicate name: ${s.name}`);
    names.add(s.name);
  }

  const [submissions, results, users, whiteboards] = await Promise.all([
    prisma.submission.findMany(),
    prisma.testCaseResult.findMany(),
    prisma.user.findMany(),
    prisma.whiteboardVersion.findMany().catch(() => []),
  ]);
  fs.mkdirSync(backupDir, { recursive: true });
  const backupFile = path.join(backupDir, `moi2026_backup_${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
  fs.writeFileSync(backupFile, JSON.stringify({ submissions, results, users, whiteboards }));
  console.log(`Backup: ${backupFile}`);
  console.log(`Current: ${submissions.length} submissions, ${results.length} testcase results, ${users.filter((u) => u.role === 'STUDENT').length} students, ${users.filter((u) => u.role === 'ADMIN').length} admins`);
  const clash = users.filter((u) => u.role === 'ADMIN' && names.has(u.username));
  if (clash.length) throw new Error(`Name clashes with admin username: ${clash.map((u) => u.username).join(', ')}`);

  if (!apply) {
    console.log(`Dry run. Would delete all submissions + students and create ${students.length} students. Re-run with --apply.`);
    return;
  }

  const rows = await Promise.all(
    students.map(async (s) => ({ username: s.name, name: s.name, passwordHash: await bcrypt.hash(s.password, 10), role: 'STUDENT' as const, mustChangePass: false })),
  );
  await prisma.$transaction([
    prisma.submission.deleteMany({}),
    prisma.user.deleteMany({ where: { role: 'STUDENT' } }),
    prisma.user.createMany({ data: rows }),
  ]);
  const after = await prisma.user.groupBy({ by: ['role'], _count: { _all: true } });
  console.log('Done. Users by role:', after.map((g) => `${g.role}=${g._count._all}`).join(', '), '| submissions =', await prisma.submission.count());
}

main().finally(() => prisma.$disconnect());
