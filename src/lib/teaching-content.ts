import fs from 'node:fs';
import path from 'node:path';

export type TeachingTopic = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  sourceFilename: string;
  contentFilename: string;
  level: '入門' | '核心';
  tags: string[];
  highlights: string[];
};

const teachingTopics: TeachingTopic[] = [
  {
    slug: 'dynamic-programming',
    title: '動態規劃',
    subtitle: 'Dynamic Programming · DP',
    description: '從狀態定義、轉移公式到經典題型，幫學生建立 DP 的基礎思路。',
    sourceFilename: '動態規劃整理.md',
    contentFilename: 'dynamic-programming.md',
    level: '核心',
    tags: ['DP', '狀態轉移', '表格法', '記憶化搜尋'],
    highlights: ['做 DP 題的標準流程', '爬樓梯 / Coin Change / LIS 範例', '常見錯誤與延伸題目'],
  },
  {
    slug: 'josephus',
    title: 'Josephus',
    subtitle: 'Josephus Problem · 約瑟夫問題',
    description: '整理環狀淘汰問題的模擬與遞推寫法，適合建立取模與圈狀思維。',
    sourceFilename: 'Josephus整理.md',
    contentFilename: 'josephus.md',
    level: '入門',
    tags: ['模擬', '遞推', '取模', '環狀結構'],
    highlights: ['完整出圈順序與最後存活者', '模擬版與遞推版公式', '典型錯誤整理'],
  },
];

function getTeachingContentRoot() {
  return path.resolve(process.cwd(), 'src', 'content', 'teaching');
}

export function listTeachingTopics() {
  return teachingTopics;
}

export function getTeachingTopicBySlug(slug: string) {
  return teachingTopics.find((topic) => topic.slug === slug) ?? null;
}

export function readTeachingTopicMarkdown(slug: string) {
  const topic = getTeachingTopicBySlug(slug);

  if (!topic) {
    return null;
  }

  const fullPath = path.join(getTeachingContentRoot(), topic.contentFilename);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  return fs.readFileSync(fullPath, 'utf8');
}
