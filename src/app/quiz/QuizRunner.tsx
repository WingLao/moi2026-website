'use client';

import { useState } from 'react';
import Bi from '@/components/Bi';

type Level = 'basic' | 'medium' | 'hard';
type Option = { key: string; en: string; zh: string };
type Question = { id: string; source: string; q: { en: string; zh: string }; options: Option[] };
type Result = { id: string; chosen: string; correct: string; isCorrect: boolean };

const LEVELS: { value: Level; en: string; zh: string; noteEn: string; noteZh: string }[] = [
  { value: 'basic', en: 'Basic', zh: '基本', noteEn: 'Primary / junior contests and CSP quizzes', noteZh: '小學組、初中組比賽及 CSP 模擬題' },
  { value: 'medium', en: 'Medium', zh: '中等', noteEn: 'CSP-J first round', noteZh: 'CSP-J 初賽' },
  { value: 'hard', en: 'Hard', zh: '困難', noteEn: 'CSP-S first round', noteZh: 'CSP-S 初賽' },
];

const isCode = (text: string) => /[;{}]|\bcout\b|\bcin\b|\breturn\b/.test(text) && text.includes('\n');

function Text({ value, lang }: { value: string; lang: 'en' | 'zh-Hant' }) {
  return isCode(value) ? <pre className="quiz-code" lang={lang}>{value}</pre> : <span lang={lang} style={{ whiteSpace: 'pre-line' }}>{value}</span>;
}

export default function QuizRunner({ counts }: { counts: Record<Level, number> }) {
  const [level, setLevel] = useState<Level>('basic');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [chosen, setChosen] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, Result> | null>(null);
  const [score, setScore] = useState<{ right: number; wrong: number } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function start() {
    setBusy(true);
    setError('');
    setResults(null);
    setScore(null);
    setChosen({});
    try {
      const res = await fetch(`/api/quiz?level=${level}`, { cache: 'no-store' });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error);
      setQuestions(json.questions);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setError('Could not load questions. 讀取題目失敗。');
    } finally {
      setBusy(false);
    }
  }

  async function submit() {
    const unanswered = questions.filter((q) => !chosen[q.id]).length;
    if (unanswered && !window.confirm(`${unanswered} question(s) not answered. Submit anyway?\n還有 ${unanswered} 題未作答，確定提交？`)) return;
    setBusy(true);
    try {
      const answers = Object.fromEntries(questions.map((q) => [q.id, chosen[q.id] ?? '']));
      const res = await fetch('/api/quiz/check', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ answers }) });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error);
      setResults(Object.fromEntries((json.results as Result[]).map((r) => [r.id, r])));
      setScore({ right: json.right, wrong: json.wrong });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setError('Could not check answers. 核對答案失敗。');
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <section className="card">
        <h2 style={{ marginTop: 0 }}><Bi en="Choose a level" zh="選擇難度" /></h2>
        <div className="quiz-levels">
          {LEVELS.map((l) => (
            <label key={l.value} className={`quiz-level${level === l.value ? ' active' : ''}`}>
              <input type="radio" name="level" value={l.value} checked={level === l.value} onChange={() => setLevel(l.value)} />
              <span>
                <strong><Bi en={l.en} zh={l.zh} /></strong>
                <span className="small-text"><Bi block en={`${l.noteEn} · ${counts[l.value]} questions`} zh={`${l.noteZh} · 共 ${counts[l.value]} 題`} /></span>
              </span>
            </label>
          ))}
        </div>
        <button type="button" onClick={start} disabled={busy} style={{ marginTop: 16 }}>
          {questions.length ? <Bi en="New 10 questions" zh="重新抽 10 題" /> : <Bi en="Start: 10 random questions" zh="開始：隨機抽 10 題" />}
        </button>
        {error ? <p style={{ color: 'var(--danger)' }}>{error}</p> : null}
      </section>

      {score ? (
        <section className={`card quiz-score ${score.right >= 6 ? 'good' : 'bad'}`}>
          <div className="tile-number">{score.right} / {score.right + score.wrong}</div>
          <Bi block en={`Correct: ${score.right} · Wrong: ${score.wrong}. The correct answers are marked below.`} zh={`答對 ${score.right} 題 · 答錯 ${score.wrong} 題。正確答案已在下面標示。`} />
        </section>
      ) : null}

      {questions.map((question, index) => {
        const result = results?.[question.id];
        return (
          <section key={question.id} className="card quiz-question">
            <div className="small-text subtle">
              <Bi en={`Question ${index + 1}`} zh={`第 ${index + 1} 題`} /> · {question.source}
            </div>
            <div className="lang-block lang-en"><span className="lang-tag">EN</span><div className="lang-body"><Text value={question.q.en} lang="en" /></div></div>
            <div className="lang-block lang-zh"><span className="lang-tag">中</span><div className="lang-body"><Text value={question.q.zh} lang="zh-Hant" /></div></div>
            <div className="quiz-options">
              {question.options.map((option, optionIndex) => {
                const letter = 'ABCD'[optionIndex];
                const picked = chosen[question.id] === option.key;
                const mark = result ? (option.key === result.correct ? ' correct' : picked ? ' wrong' : '') : '';
                return (
                  <label key={option.key} className={`quiz-option${picked ? ' picked' : ''}${mark}`}>
                    <input
                      type="radio"
                      name={question.id}
                      checked={picked}
                      disabled={Boolean(results)}
                      onChange={() => setChosen((c) => ({ ...c, [question.id]: option.key }))}
                    />
                    <span className="quiz-letter">{letter}</span>
                    <span className="quiz-option-text">
                      <Text value={option.en} lang="en" />
                      {option.zh !== option.en ? <span className="bi-zh"><Text value={option.zh} lang="zh-Hant" /></span> : null}
                    </span>
                    {result && option.key === result.correct ? <span className="badge success">✓</span> : null}
                    {result && picked && !result.isCorrect ? <span className="badge danger">✗</span> : null}
                  </label>
                );
              })}
            </div>
            {result && !result.chosen ? <p className="small-text" style={{ color: 'var(--warning)' }}><Bi en="Not answered" zh="未作答" /></p> : null}
          </section>
        );
      })}

      {questions.length && !results ? (
        <button type="button" onClick={submit} disabled={busy} className="quiz-submit">
          <Bi en="Submit answers" zh="提交答案" />
        </button>
      ) : null}
      {results ? (
        <button type="button" onClick={start} disabled={busy} className="quiz-submit">
          <Bi en="Try another 10" zh="再抽 10 題" />
        </button>
      ) : null}
    </>
  );
}
