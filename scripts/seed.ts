import bcrypt from 'bcryptjs';
import { prisma } from '../src/lib/prisma';
async function main(){
 const adminHash = await bcrypt.hash('Admin@MOI2026',10);
 await prisma.user.upsert({ where:{ username:'admin' }, update:{}, create:{ username:'admin', passwordHash:adminHash, role:'ADMIN', mustChangePass:true } });
 for(let i=1;i<=30;i++){ const username=`moi${String(i).padStart(2,'0')}`; const passwordHash=await bcrypt.hash(`MOI2026-${String(i).padStart(2,'0')}`,10); await prisma.user.upsert({ where:{ username }, update:{}, create:{ username, passwordHash, role:'STUDENT', mustChangePass:true } }); }
}
main().finally(async()=>prisma.$disconnect());
