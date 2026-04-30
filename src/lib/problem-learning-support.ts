import { type ProblemLevel } from './problem-catalog';

type LearningSupport = {
  shortDescriptionZh: string;
  inputHintZh: string;
  rawDescription: string | null;
  rawInputSpec: string | null;
};

function extractSection(markdown: string, heading: string) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = markdown.match(new RegExp(`## ${escaped}\\n\\n([\\s\\S]*?)(?=\\n## |$)`));
  return match?.[1]?.trim() ?? null;
}

function stripMarkdown(value: string | null) {
  if (!value) return null;

  return value
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^\s*[-*]\s+/gm, '')
    .replace(/\|/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function takeFirstSentence(value: string | null) {
  if (!value) return null;
  const sentence = value.match(/.+?[。！？.!?](?=\s|$)/)?.[0] ?? value;
  return sentence.trim();
}

function buildShortDescription(level: ProblemLevel, title: string, rawDescription: string | null) {
  const cleaned = takeFirstSentence(stripMarkdown(rawDescription));
  if (cleaned && /[\u3400-\u9fff]/.test(cleaned)) {
    return cleaned;
  }

  if (level === 'Beginner') {
    return `這題是 Beginner 練習，請依照 ${title} 的要求完成指定輸出或基礎計算。`;
  }

  if (level === 'DP') {
    return `這題是 DP 練習，請根據 ${title} 的條件建立合適的狀態轉移並輸出答案。`;
  }

  return `這題是 GA 練習，請根據 ${title} 的規則讀入資料，運用合適的貪心想法輸出答案。`;
}

function buildInputHint(rawInputSpec: string | null) {
  const cleaned = stripMarkdown(rawInputSpec);
  if (!cleaned) {
    return '本題請先查看題面輸入格式，再從標準輸入讀入資料並輸出答案。';
  }

  if (/[\u3400-\u9fff]/.test(cleaned)) {
    return takeFirstSentence(cleaned) ?? cleaned;
  }

  if (/does not require standard input|no standard input/i.test(cleaned)) {
    return '本題不需要標準輸入，直接依照題目要求輸出結果即可。';
  }

  if (/first line contains/i.test(cleaned)) {
    return '本題需要從標準輸入依序讀入資料；建議先讀第一行的控制數值，再按題目格式處理後續輸入。';
  }

  return '本題需要從標準輸入讀入資料，請特別留意每一行的欄位順序與資料型別。';
}

export function getProblemLearningSupport(
  problem: { level: ProblemLevel; title: string },
  statementMarkdown: string | null,
) {
  if (!statementMarkdown || (problem.level !== 'Beginner' && problem.level !== 'GA' && problem.level !== 'DP')) {
    return null;
  }

  const rawDescription = extractSection(statementMarkdown, '題目說明');
  const rawInputSpec = extractSection(statementMarkdown, '輸入格式');

  return {
    shortDescriptionZh: buildShortDescription(problem.level, problem.title, rawDescription),
    inputHintZh: buildInputHint(rawInputSpec),
    rawDescription: stripMarkdown(rawDescription),
    rawInputSpec: stripMarkdown(rawInputSpec),
  } satisfies LearningSupport;
}
