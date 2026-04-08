export function getProblemPdfUrl(pdfFilename: string | null | undefined) {
  if (!pdfFilename) return null;
  return `/api/problem-pdfs/${encodeURIComponent(pdfFilename)}`;
}
