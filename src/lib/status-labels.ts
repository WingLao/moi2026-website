// English / Chinese names for judge statuses.
export const SUBMISSION_STATUS_LABELS: Record<string, { en: string; zh: string; tone: string }> = {
  PENDING: { en: 'Waiting', zh: '等候判題', tone: 'info' },
  JUDGING: { en: 'Judging', zh: '判題中', tone: 'info' },
  FINISHED: { en: 'Finished', zh: '已完成', tone: 'success' },
  COMPILE_ERROR: { en: 'Compile Error', zh: '編譯錯誤', tone: 'danger' },
  FAILED: { en: 'System Error', zh: '系統錯誤', tone: 'danger' },
};

export const TESTCASE_STATUS_LABELS: Record<string, { en: string; zh: string; tone: string }> = {
  PENDING: { en: 'Waiting', zh: '等候', tone: 'info' },
  AC: { en: 'Accepted', zh: '答案正確', tone: 'success' },
  WA: { en: 'Wrong Answer', zh: '答案錯誤', tone: 'danger' },
  TLE: { en: 'Time Limit Exceeded', zh: '超出時限', tone: 'warning' },
  RE: { en: 'Runtime Error', zh: '執行錯誤', tone: 'danger' },
  CE: { en: 'Compile Error', zh: '編譯錯誤', tone: 'danger' },
  SKIPPED: { en: 'Skipped', zh: '略過', tone: 'info' },
  INVALID: { en: 'Invalid testcase', zh: '測資無效', tone: 'warning' },
};

export const LEVEL_LABELS: Record<string, { en: string; zh: string }> = {
  Beginner: { en: 'Beginner', zh: '入門' },
  GA: { en: 'Greedy', zh: '貪心' },
  DP: { en: 'Dynamic Programming', zh: '動態規劃' },
  P: { en: 'MOI Group P', zh: 'MOI P 組' },
  J: { en: 'MOI Group J', zh: 'MOI J 組' },
  S: { en: 'MOI Group S', zh: 'MOI S 組' },
  IOI: { en: 'IOI', zh: 'IOI 國際賽' },
};
