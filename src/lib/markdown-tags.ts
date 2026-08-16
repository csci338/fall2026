/**
 * Lightweight helpers to handle Jekyll-style custom tags in markdown.
 *
 * We currently support:
 *   - {% collapsible %} / {% collapsible closed %}
 *   - {% no-copy %}
 *   - {: .class #id } (Kramdown-style inline attribute lists)
 *
 * For now, we implement these as a pre-processing step that rewrites tags
 * into HTML comments, which are then consumed by the existing HTML
 * post-processors in `markdown.ts`.
 *
 * This keeps the implementation small while giving you Jekyll-like
 * authoring syntax in your markdown.
 */

/**
 * Replace custom tag syntax in raw markdown with internal HTML comments
 * that the existing HTML post-processors already understand.
 */
export function preprocessMarkdownTags(markdown: string): string {
  let result = markdown;

  // {% collapsible closed %} -> <!-- collapsible closed -->
  result = result.replace(
    /{%\s*collapsible\s+closed\s*%}/gi,
    '<!-- collapsible closed -->',
  );

  // {% collapsible %} -> <!-- collapsible -->
  result = result.replace(
    /{%\s*collapsible\s*%}/gi,
    '<!-- collapsible -->',
  );

  // {% no-copy %} -> <!-- no-copy-button -->
  result = result.replace(
    /{%\s*no-copy\s*%}/gi,
    '<!-- no-copy-button -->',
  );

  // Kramdown IALs: {:.info}, {:#setup}, {: .new.info}, {:#takeaways :.info}
  // Also allow blockquote-prefixed lines like >{:.checkbox-list}
  // Convert to HTML comments that markdown.ts already understands (<!-- .class -->)
  // plus <!-- ID name --> for heading/anchor ids.
  result = result.replace(
    /^(\s*(?:>\s*)*)\{:\s*([^}]+)\}\s*$/gm,
    (_match, quotePrefix: string, attrs: string) => {
      const comments: string[] = [];
      const tokenRe = /#([A-Za-z0-9_-]+)|\.([A-Za-z0-9_-]+)/g;
      let token;
      while ((token = tokenRe.exec(attrs)) !== null) {
        if (token[1]) {
          comments.push(`<!-- ID ${token[1]} -->`);
        } else if (token[2]) {
          comments.push(`<!-- .${token[2]} -->`);
        }
      }
      if (comments.length === 0) {
        return _match;
      }
      return quotePrefix
        ? comments.map((comment) => `${quotePrefix}${comment}`).join('\n')
        : comments.join('\n');
    }
  );

  // Strip leftover Kramdown link attributes such as {:target="_blank"}
  result = result.replace(/\{:\s*target="_blank"\s*\}/gi, '');

  // Normalize fenced-code language tags (trim trailing space; remap typos)
  const fenceAliases: Record<string, string> = {
    shg: 'bash',
  };
  result = result.replace(/^```([^\n`]*)/gm, (_match, lang: string) => {
    const trimmed = lang.trim();
    if (!trimmed) return '```';
    return '```' + (fenceAliases[trimmed] || trimmed);
  });

  return result;
}

