import { NextRequest, NextResponse } from 'next/server';
import { drawQuiz, isQuizLevel } from '@/lib/quiz';

// GET /api/quiz?level=basic|medium|hard → 10 random questions (no answers)
export async function GET(request: NextRequest) {
  const level = request.nextUrl.searchParams.get('level');
  if (!isQuizLevel(level)) {
    return NextResponse.json({ ok: false, error: 'level must be basic, medium or hard' }, { status: 400 });
  }
  return NextResponse.json({ ok: true, questions: drawQuiz(level) }, { headers: { 'Cache-Control': 'no-store' } });
}
