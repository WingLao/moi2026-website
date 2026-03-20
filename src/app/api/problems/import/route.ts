import { NextResponse } from 'next/server';
import { importProblems } from '@/lib/problem-import';
export async function POST(){ const warnings = await importProblems(process.cwd() + '/..'); return NextResponse.json({ ok:true, warnings }); }
