export function getProblemPdfUrl(pdfFilename: string | null | undefined) {
  if (!pdfFilename) return null;
  return `/problem-pdfs/${encodeURIComponent(pdfFilename)}`;
}
