export default async (request: Request, context: any) => {
  const response = await context.next();
  const contentType = response.headers.get('content-type') || '';

  if (!contentType.includes('text/html')) {
    return response;
  }

  const html = await response.text();
  const cleaned = html
    .replace(/<script\s+async\s+src=["']https:\/\/scripts\.simpleanalyticscdn\.com\/latest\.js["']\s*><\/script>/gi, '')
    .replace(/<script\s+async\s+src=["']https:\/\/scripts\.simpleanalyticscdn\.com\/auto-events\.js["']\s*><\/script>/gi, '')
    .replace(/\s{2,}<\/body>/i, '</body>');

  const headers = new Headers(response.headers);
  headers.delete('content-length');

  return new Response(cleaned, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};
