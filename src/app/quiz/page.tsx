import Bi from '@/components/Bi';
import { loadQuiz } from '@/lib/quiz';
import QuizRunner from './QuizRunner';

export const dynamic = 'force-dynamic';

export default function QuizPage() {
  const bank = loadQuiz();
  const counts = {
    basic: bank.filter((q) => q.level === 'basic').length,
    medium: bank.filter((q) => q.level === 'medium').length,
    hard: bank.filter((q) => q.level === 'hard').length,
  };
  return (
    <main className="page">
      <section className="card hero">
        <h1><Bi block en="CSP Multiple-Choice Practice" zh="CSP 選擇題練習" /></h1>
        <p className="subtle" style={{ marginTop: 10 }}>
          <Bi
            block
            en={`Pick a level and get 10 random questions from a bank of ${bank.length}. Submit to see your score and the correct answers. Questions come from past CSP-J/S first-round papers and practice tests.`}
            zh={`揀難度後，從 ${bank.length} 題題庫隨機抽 10 題。提交後會顯示分數和正確答案。題目來自歷屆 CSP-J/S 初賽及模擬試題。`}
          />
        </p>
      </section>
      <QuizRunner counts={counts} />
    </main>
  );
}
