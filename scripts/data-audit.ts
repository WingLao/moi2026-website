import fs from 'node:fs'; import path from 'node:path';
const root = process.argv[2] || path.resolve(process.cwd(), '..');
const warnings:string[]=[];
for (const level of ['P','J','S']) { const dir=path.join(root,'data',level); if(!fs.existsSync(dir)) continue; for (const prob of fs.readdirSync(dir).filter(n=>!n.startsWith('.'))) { const p=path.join(dir,prob); const files=fs.readdirSync(p).filter(n=>!n.startsWith('.')); const ins=files.filter(f=>f.endsWith('.in')); const outs=new Set(files.filter(f=>f.endsWith('.out')).map(f=>f.replace(/\.out$/,''))); for (const f of ins) if(!outs.has(f.replace(/\.in$/,''))) warnings.push(`${level}/${prob}: missing output for ${f}`); } }
console.log(JSON.stringify({root,warnings}, null, 2));
