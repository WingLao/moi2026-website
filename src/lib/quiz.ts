import fs from 'node:fs';
import path from 'node:path';

// CSP-J/S multiple-choice question bank (src/content/csp-quiz.json).
// Built from the nbdp CSP first-round papers + CSP_Quiz_1/2; English translated, Chinese converted to Traditional.
export type QuizLevel = 'basic' | 'medium' | 'hard';
export type QuizOption = { key: string; en: string; zh: string };
export type QuizQuestion = {
  id: string;
  level: QuizLevel;
  group: string;
  source: string;
  q: { en: string; zh: string };
  options: QuizOption[];
  answer: string;
};

export const QUIZ_LEVELS: Record<QuizLevel, { en: string; zh: string; from: string }> = {
  basic: { en: 'Basic', zh: '基本', from: 'Primary / junior-secondary contests and CSP quizzes · 小學組、初中組比賽及 CSP 模擬題' },
  medium: { en: 'Medium', zh: '中等', from: 'CSP-J first round · CSP-J 初賽' },
  hard: { en: 'Hard', zh: '困難', from: 'CSP-S first round · CSP-S 初賽' },
};

let cache: QuizQuestion[] | null = null;
export function loadQuiz(): QuizQuestion[] {
  if (!cache) {
    cache = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src', 'content', 'csp-quiz.json'), 'utf8')) as QuizQuestion[];
  }
  return cache;
}

export function isQuizLevel(value: unknown): value is QuizLevel {
  return value === 'basic' || value === 'medium' || value === 'hard';
}

function shuffle<T>(items: T[]) {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** 10 random questions of a level, options shuffled, answers removed. */
export function drawQuiz(level: QuizLevel, count = 10) {
  return shuffle(loadQuiz().filter((q) => q.level === level))
    .slice(0, count)
    .map((q) => ({ id: q.id, level: q.level, group: q.group, source: q.source, q: q.q, options: shuffle(q.options) }));
}
