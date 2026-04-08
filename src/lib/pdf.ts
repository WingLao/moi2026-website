function buildPdfUrl(pdfFilename: string, params?: URLSearchParams) {
  const query = params?.toString();
  return `/api/problem-pdfs/${encodeURIComponent(pdfFilename)}${query ? `?${query}` : ''}`;
}

export function getProblemPdfUrl(pdfFilename: string | null | undefined) {
  if (!pdfFilename) return null;
  return buildPdfUrl(pdfFilename);
}

export function getProblemPdfDownloadUrl(pdfFilename: string | null | undefined) {
  if (!pdfFilename) return null;
  const params = new URLSearchParams({ download: '1' });
  return buildPdfUrl(pdfFilename, params);
}

export function getProblemPdfEmbedUrl(pdfFilename: string | null | undefined) {
  if (!pdfFilename) return null;
  return `${buildPdfUrl(pdfFilename)}#toolbar=1&navpanes=0&view=FitH`;
}
