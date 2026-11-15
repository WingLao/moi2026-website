import { NextRequest, NextResponse } from 'next/server';
import { loadQuiz } from '@/lib/quiz';

// POST { answers: { [questionId]: "A" | "B" | "C" | "D" | "" } } → which are right, and the correct keys
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null) as { answers?: Record<string, unknown> } | null;
  const answers = body?.answers;
  if (!answers || typeof answers !== 'object') {
    return NextResponse.json({ ok: false, error: 'answers are required' }, { status: 400 });
  }
  const ids = Object.keys(answers).slice(0, 20);
  const bank = new Map(loadQuiz().map((q) => [q.id, q]));
  const results = ids
    .filter((id) => bank.has(id))
    .map((id) => {
      const correct = bank.get(id)!.answer;
      const chosen = typeof answers[id] === 'string' ? (answers[id] as string) : '';
      return { id, chosen, correct, isCorrect: chosen === correct };
    });
  const right = results.filter((r) => r.isCorrect).length;
  return NextResponse.json({ ok: true, right, wrong: results.length - right, results });
}
