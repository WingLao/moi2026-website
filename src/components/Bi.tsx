// Bilingual label: English first, Traditional Chinese after (site-wide convention).
export default function Bi({ en, zh, block = false }: { en: React.ReactNode; zh: React.ReactNode; block?: boolean }) {
  return (
    <span className={block ? 'bi bi-block' : 'bi'}>
      <span lang="en">{en}</span>
      <span lang="zh-Hant" className="bi-zh">{zh}</span>
    </span>
  );
}
