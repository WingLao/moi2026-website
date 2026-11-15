// Problem titles are stored as "English · 中文"; split them for two-line display.
export function splitTitle(title: string) {
  const at = title.lastIndexOf(' · ');
  if (at < 0) return { en: title, zh: '' };
  return { en: title.slice(0, at), zh: title.slice(at + 3) };
}
