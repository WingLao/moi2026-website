import bcrypt from 'bcryptjs';
import { prisma } from '../src/lib/prisma';
async function main(){
 const adminHash = await bcrypt.hash('cdsj5it2008',10);
 await prisma.user.upsert({ where:{ username:'admin' }, update:{ passwordHash: adminHash }, create:{ username:'admin', passwordHash:adminHash, role:'ADMIN', mustChangePass:true } });
 for(let i=1;i<=30;i++){ const username=`moi${String(i).padStart(2,'0')}`; const passwordHash=await bcrypt.hash(`MOI2026-${String(i).padStart(2,'0')}`,10); await prisma.user.upsert({ where:{ username }, update:{}, create:{ username, passwordHash, role:'STUDENT', mustChangePass:true } }); }

 const bobStudents = [
  { username: 'kurtischicken@gmail.com', password: '20120202' },
  { username: 'maxw3016@gmail.com', password: '20120323' },
  { username: 'louis2012c@gmail.com', password: '20121223' },
  { username: 'jaspertselt@gmail.com', password: '20110817' },
  { username: 'thatdeprao@gmail.com', password: '20111112' },
  { username: 'chenxiaoyong9380@gmail.com', password: '20111003' },
  { username: 'limhouin@gmail.com', password: '20101216' },
  { username: 'chankahin2011@gmail.com', password: '20110830' },
  { username: 'cdsj5pes.tonghouhei0402@gmail.com', password: '20100402' },
  { username: 'benwong20100120@gmail.com', password: '20100120' },
  { username: 'cyruslikesschool0606@gmail.com', password: '20090606' },
  { username: 'tamsengtin@gmail.com', password: '20090604' },
  { username: 'cheangjerry@gmail.com', password: '20080708' },
  { username: 'tom66576668@gmail.com', password: '20080203' },
  { username: 'owen03240324@gmail.com', password: '20080324' },
  { username: 'zhaoj0096@gmail.com', password: '20120801' },
  { username: 'moksengian116@gmail.com', password: '20110906' },
  { username: 'jaydonlei0724@gmail.com', password: '20110724' },
 ];
 for(const { username, password } of bobStudents){
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.upsert({ where:{ username }, update:{ passwordHash }, create:{ username, passwordHash, role:'STUDENT', mustChangePass:true } });
 }
}
main().finally(async()=>prisma.$disconnect());
