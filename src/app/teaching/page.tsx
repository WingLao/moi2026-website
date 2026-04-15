import Link from 'next/link';
import { requireUser } from '@/lib/require-auth';
import { listTeachingTopics } from '@/lib/teaching-content';

export default async function TeachingPage() {
  const session = await requireUser('/teaching');
  const topics = listTeachingTopics();

  return (
    <main className="page">
      <section className="card hero">
        <div className="section-title">
          <div>
            <div className="eyebrow">Teaching Hub · 教學專區</div>
            <h1>演算法教學</h1>
            <p className="subtle" style={{ marginTop: 10 }}>
              這裡整理登入後可查看的演算法教材，先從動態規劃與 Josephus 開始。適合課堂講解、課後複習，以及比賽前快速回顧重點。
            </p>
          </div>
          <div className="inline-actions">
            <span className="badge success">已登入：{session.user.username}</span>
            <span className="badge info">主題數量：{topics.length}</span>
          </div>
        </div>
      </section>

      <section className="topic-grid">
        {topics.map((topic) => (
          <article key={topic.slug} className="card topic-card">
            <div className="dense-list">
              <div className="eyebrow">{topic.level} · {topic.subtitle}</div>
              <div>
                <h2 style={{ margin: 0 }}>{topic.title}</h2>
                <p className="subtle" style={{ marginTop: 10 }}>{topic.description}</p>
              </div>
              <div className="pill-row">
                {topic.tags.map((tag) => (
                  <span key={tag} className="badge info">{tag}</span>
                ))}
              </div>
            </div>

            <div className="notice" style={{ marginTop: 18 }}>
              <div style={{ fontWeight: 700 }}>本篇內容</div>
              <ul className="list" style={{ marginTop: 10 }}>
                {topic.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>

            <div className="inline-actions" style={{ marginTop: 18 }}>
              <Link href={`/teaching/${topic.slug}`} className="button-link">開始閱讀</Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
