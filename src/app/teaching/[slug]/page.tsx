import Link from 'next/link';
import { notFound } from 'next/navigation';
import { auth } from '@/lib/auth';
import { renderStatementMarkdown } from '@/lib/statement-markdown';
import { getTeachingTopicBySlug, listTeachingTopics, readTeachingTopicMarkdown } from '@/lib/teaching-content';

export default async function TeachingTopicDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const session = await auth();

  const topic = getTeachingTopicBySlug(slug);
  const markdown = readTeachingTopicMarkdown(slug);

  if (!topic || !markdown) {
    return notFound();
  }

  const relatedTopics = listTeachingTopics().filter((item) => item.slug !== topic.slug);

  return (
    <main className="page">
      <section className="card hero">
        <div className="section-title">
          <div>
            <div className="eyebrow">Teaching Note · 教學教材</div>
            <h1>{topic.title}</h1>
            <p className="subtle" style={{ marginTop: 10 }}>
              {topic.description}
            </p>
          </div>
          <div className="status-stack">
            {session?.user ? <span className="badge success">已登入可提交與追蹤紀錄</span> : <span className="badge info">公開教材 · 未登入可閱讀</span>}
            <span className="badge info">{topic.subtitle}</span>
          </div>
        </div>

        <div className="pill-row" style={{ marginTop: 18 }}>
          {topic.tags.map((tag) => (
            <span key={tag} className="badge info">{tag}</span>
          ))}
        </div>
      </section>

      <section className="problem-layout">
        <div className="problem-main">
          <article className="card statement-card">
            <div className="statement-toolbar">
              <div>
                <h2 style={{ margin: 0 }}>教材內容</h2>
                <p className="subtle" style={{ marginTop: 8 }}>
                  內容直接整理自 `演算法教學教材/{topic.sourceFilename}`，方便後續持續擴充。
                </p>
              </div>
              <div className="action-links">
                <Link href="/teaching">返回教學列表</Link>
              </div>
            </div>
            <div className="statement-article">
              {renderStatementMarkdown(markdown)}
            </div>
          </article>
        </div>

        <div className="problem-side">
          <section className="card">
            <h2 style={{ marginTop: 0 }}>學習重點</h2>
            <ul className="list" style={{ marginTop: 14 }}>
              {topic.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </section>

          <section className="card">
            <h2 style={{ marginTop: 0 }}>其他主題</h2>
            <div className="dense-list" style={{ marginTop: 14 }}>
              {relatedTopics.map((item) => (
                <Link key={item.slug} href={`/teaching/${item.slug}`} className="inline-link">
                  {item.title} · {item.subtitle}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
