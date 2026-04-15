import type { ReactNode } from 'react';

function renderInline(text: string, keyPrefix: string) {
  const parts = text.split(/(`[^`]+`)/g);

  return parts.map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={`${keyPrefix}-${index}`}>{part.slice(1, -1)}</code>;
    }

    return part;
  });
}

function isTableSeparator(line: string) {
  return /^\|?(?:\s*:?-{3,}:?\s*\|)+\s*:?-{3,}:?\s*\|?$/.test(line.trim());
}

function parseTableRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());
}

export function renderStatementMarkdown(markdown: string): ReactNode[] {
  const lines = markdown.replace(/\r/g, '').split('\n');
  const nodes: ReactNode[] = [];

  for (let index = 0; index < lines.length;) {
    const line = lines[index].trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (line.startsWith('```')) {
      const codeLines: string[] = [];
      const language = line.slice(3).trim();
      index += 1;

      while (index < lines.length && !lines[index].trim().startsWith('```')) {
        codeLines.push(lines[index]);
        index += 1;
      }

      index += 1;
      nodes.push(
        <pre key={`code-${nodes.length}`} className="statement-code">
          <code data-language={language || undefined}>{codeLines.join('\n')}</code>
        </pre>,
      );
      continue;
    }

    const imageMatch = line.match(/^!\[(.*)\]\((.+)\)$/);
    if (imageMatch) {
      const alt = imageMatch[1].trim() || 'Teaching illustration';
      const src = imageMatch[2].trim();

      nodes.push(
        <figure key={`image-${nodes.length}`} className="statement-figure">
          <img src={src} alt={alt} className="statement-image" />
          <figcaption>{alt}</figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.*)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const content = headingMatch[2];
      const key = `heading-${nodes.length}`;

      if (level === 1) {
        nodes.push(<h1 key={key}>{renderInline(content, key)}</h1>);
      } else if (level === 2) {
        nodes.push(<h2 key={key}>{renderInline(content, key)}</h2>);
      } else {
        nodes.push(<h3 key={key}>{renderInline(content, key)}</h3>);
      }

      index += 1;
      continue;
    }

    if (line === '<hr>' || /^---+$/.test(line)) {
      nodes.push(<hr key={`hr-${nodes.length}`} />);
      index += 1;
      continue;
    }

    if (line.startsWith('|') && index + 1 < lines.length && isTableSeparator(lines[index + 1])) {
      const header = parseTableRow(lines[index]);
      const rows: string[][] = [];
      index += 2;

      while (index < lines.length && lines[index].trim().startsWith('|')) {
        rows.push(parseTableRow(lines[index]));
        index += 1;
      }

      nodes.push(
        <div key={`table-${nodes.length}`} className="statement-table-wrap">
          <table className="statement-table">
            <thead>
              <tr>
                {header.map((cell, cellIndex) => (
                  <th key={`head-${cellIndex}`}>{renderInline(cell, `th-${cellIndex}`)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={`row-${rowIndex}`}>
                  {row.map((cell, cellIndex) => (
                    <td key={`cell-${rowIndex}-${cellIndex}`}>{renderInline(cell, `td-${rowIndex}-${cellIndex}`)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    if (line.startsWith('- ')) {
      const items: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith('- ')) {
        items.push(lines[index].trim().slice(2));
        index += 1;
      }

      nodes.push(
        <ul key={`list-${nodes.length}`} className="statement-list">
          {items.map((item, itemIndex) => (
            <li key={`item-${itemIndex}`}>{renderInline(item, `li-${itemIndex}`)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    if (line.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith('> ')) {
        quoteLines.push(lines[index].trim().slice(2));
        index += 1;
      }

      nodes.push(
        <blockquote key={`quote-${nodes.length}`} className="statement-quote">
          {quoteLines.map((quoteLine, quoteIndex) => (
            <p key={`quote-line-${quoteIndex}`}>{renderInline(quoteLine, `quote-${quoteIndex}`)}</p>
          ))}
        </blockquote>,
      );
      continue;
    }

    const paragraphLines: string[] = [];
    while (index < lines.length) {
      const candidate = lines[index].trim();
      if (
        !candidate ||
        candidate.startsWith('```') ||
        candidate.startsWith('|') ||
        candidate.startsWith('- ') ||
        candidate.startsWith('> ') ||
        candidate === '<hr>' ||
        /^---+$/.test(candidate) ||
        /^(#{1,3})\s+/.test(candidate)
      ) {
        break;
      }
      paragraphLines.push(candidate);
      index += 1;
    }

    nodes.push(
      <p key={`paragraph-${nodes.length}`}>
        {paragraphLines.map((paragraphLine, paragraphIndex) => (
          <span key={`paragraph-line-${paragraphIndex}`}>
            {paragraphIndex > 0 ? <br /> : null}
            {renderInline(paragraphLine, `p-${nodes.length}-${paragraphIndex}`)}
          </span>
        ))}
      </p>,
    );
  }

  return nodes;
}
