import bcrypt from 'bcryptjs';
import { prisma } from '../src/lib/prisma';
async function main(){
 const adminHash = await bcrypt.hash('cdsj5it2008',10);
 await prisma.user.upsert({ where:{ username:'admin' }, update:{ passwordHash: adminHash }, create:{ username:'admin', passwordHash:adminHash, role:'ADMIN', mustChangePass:true } });
 for(let i=1;i<=30;i++){ const username=`moi${String(i).padStart(2,'0')}`; const passwordHash=await bcrypt.hash(`MOI2026-${String(i).padStart(2,'0')}`,10); await prisma.user.upsert({ where:{ username }, update:{}, create:{ username, passwordHash, role:'STUDENT', mustChangePass:true } }); }

 const bobStudents = [
  { name: '趙昱熙', username: 'kurtischicken@gmail.com', password: '20120202' },
  { name: '黃錦暉', username: 'maxw3016@gmail.com', password: '20120323' },
  { name: '陳羽軒', username: 'louis2012c@gmail.com', password: '20121223' },
  { name: '謝朗天', username: 'jaspertselt@gmail.com', password: '20110817' },
  { name: '劉俊逸', username: 'thatdeprao@gmail.com', password: '20111112' },
  { name: '陳毅', username: 'chenxiaoyong9380@gmail.com', password: '20111003' },
  { name: '林浩賢', username: 'limhouin@gmail.com', password: '20101216' },
  { name: '陳嘉軒', username: 'chankahin2011@gmail.com', password: '20110830' },
  { name: '湯浩希', username: 'cdsj5pes.tonghouhei0402@gmail.com', password: '20100402' },
  { name: '黃煒彬', username: 'benwong20100120@gmail.com', password: '20100120' },
  { name: '黃偉鈞', username: 'cyruslikesschool0606@gmail.com', password: '20090606' },
  { name: '譚承天', username: 'tamsengtin@gmail.com', password: '20090604' },
  { name: '鄭杰銳', username: 'cheangjerry@gmail.com', password: '20080708' },
  { name: '柯彬淼', username: 'tom66576668@gmail.com', password: '20080203' },
  { name: '李承峰', username: 'owen03240324@gmail.com', password: '20080324' },
  { name: '趙俊濠', username: 'zhaoj0096@gmail.com', password: '20120801' },
  { name: '莫丞恩', username: 'moksengian116@gmail.com', password: '20110906' },
  { name: '李永達', username: 'jaydonlei0724@gmail.com', password: '20110724' },
 ];
 for(const { name, username, password } of bobStudents){
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.upsert({ where:{ username }, update:{ passwordHash, name }, create:{ username, name, passwordHash, role:'STUDENT', mustChangePass:true } });
 }
}
main().finally(async()=>prisma.$disconnect());
