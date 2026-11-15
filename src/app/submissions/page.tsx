import Link from 'next/link';
import Bi from '@/components/Bi';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { SUBMISSION_STATUS_LABELS } from '@/lib/status-labels';
import { splitTitle } from '@/lib/title';
import { getUserDisplayName } from '@/lib/user-display';

export default async function SubmissionsPage() {
  const session = await auth();
  const isAdmin = session?.user?.role === 'ADMIN';
  const submissions = session?.user
    ? await prisma.submission.findMany({
        where: isAdmin ? {} : { userId: session.user.id },
        take: 50,
        orderBy: { queuedAt: 'desc' },
        include: { problem: true, user: true },
      }).catch(() => [])
    : [];

  return (
    <main className="page">
      <section className="card hero">
        <h1><Bi block en="Submissions" zh="提交紀錄" /></h1>
        <p className="subtle" style={{ marginTop: 10 }}>
          {!session?.user ? (
            <Link href="/login?callbackUrl=/submissions" className="inline-link"><Bi en="Log in to see your submissions." zh="登入後查看你的提交。" /></Link>
          ) : isAdmin ? (
            <Bi block en="All students' latest 50 submissions." zh="全部學生最近 50 次提交。" />
          ) : (
            <Bi block en="Your latest 50 submissions. Only you (and your teacher) can see them." zh="你最近 50 次提交，只有你（和老師）看得到。" />
          )}
        </p>
      </section>

      {session?.user ? (
        submissions.length ? (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th><Bi en="Time" zh="時間" /></th>
                  {isAdmin ? <th><Bi en="Student" zh="學生" /></th> : null}
                  <th><Bi en="Problem" zh="題目" /></th>
                  <th><Bi en="Language" zh="語言" /></th>
                  <th><Bi en="Result" zh="結果" /></th>
                  <th><Bi en="Score" zh="分數" /></th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => {
                  const status = SUBMISSION_STATUS_LABELS[submission.status];
                  const title = splitTitle(submission.problem.title);
                  return (
                    <tr key={submission.id}>
                      <td>
                        <Link href={`/submissions/${submission.id}`} className="inline-link">
                          {submission.queuedAt.toLocaleString('zh-Hant')}
                        </Link>
                      </td>
                      {isAdmin ? <td>{getUserDisplayName(submission.user)}</td> : null}
                      <td>
                        <Link href={`/problems/${submission.problem.slug}`} className="inline-link">
                          <Bi block en={title.en} zh={title.zh} />
                        </Link>
                      </td>
                      <td>{submission.language === 'python' ? 'Python 3' : 'C++17'}</td>
                      <td>{status ? <Bi block en={status.en} zh={status.zh} /> : submission.status}</td>
                      <td>{submission.score}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty"><Bi block en="No submissions yet." zh="還沒有提交。" /></div>
        )
      ) : null}
    </main>
  );
}
