type ProblemLevel = 'Beginner' | 'GA' | 'DP' | 'P' | 'J' | 'S';

const LEVEL_MULTIPLIER: Record<ProblemLevel, number> = {
  Beginner: 0.1,
  GA: 0.5,
  DP: 1,
  P: 1,
  J: 2,
  S: 3,
};

export function getLevelMultiplier(level: ProblemLevel) {
  return LEVEL_MULTIPLIER[level] ?? 1;
}

export function getWeightedScore(score: number, level: ProblemLevel) {
  return score * getLevelMultiplier(level);
}

export function formatWeightedScore(score: number) {
  const rounded = Math.round(score * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}
