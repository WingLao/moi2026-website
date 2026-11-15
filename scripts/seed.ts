import bcrypt from 'bcryptjs';
import { prisma } from '../src/lib/prisma';
// Runs on every container start (Dockerfile → db:bootstrap). Only ensures the admin account exists.
// Student accounts are managed with scripts/reset-students.ts or the admin user page.
async function main(){
 const adminHash = await bcrypt.hash('cdsj5it2008',10);
 await prisma.user.upsert({ where:{ username:'admin' }, update:{ passwordHash: adminHash }, create:{ username:'admin', passwordHash:adminHash, role:'ADMIN', mustChangePass:true } });
}
main().finally(async()=>prisma.$disconnect());
