// Render every statement once (catches renderer hangs/crashes before deploying). Usage: npx tsx scripts/check-statements.tsx
import fs from 'node:fs';
import path from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import { renderStatementMarkdown } from '../src/lib/statement-markdown';

const dir = path.join(process.cwd(), 'statements');
let worst = 0;
let worstFile = '';
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.md'))) {
  const t0 = Date.now();
  const html = renderToStaticMarkup(<>{renderStatementMarkdown(fs.readFileSync(path.join(dir, f), 'utf8'))}</>);
  const ms = Date.now() - t0;
  if (ms > worst) { worst = ms; worstFile = f; }
  if (html.length > 3_000_000) console.log('HUGE', f, html.length);
}
console.log(`rendered ${fs.readdirSync(dir).length} statements; slowest ${worstFile} ${worst} ms`);
