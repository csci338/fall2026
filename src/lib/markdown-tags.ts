/**
 * Lightweight helpers to handle Jekyll-style custom tags in markdown.
 *
 * We currently support:
 *   - {% collapsible %} / {% collapsible closed %}
 *   - {% expand-all %} / {% expand-all closed %}
 *   - {% no-copy %}
 *   - {: .class #id } (Kramdown-style inline attribute lists)
 *
 * Frontmatter can also enable auto-collapsible headings:
 *   collapsible_headings: true
 *   collapsible_headings: closed
 *   collapsible_headings:
 *     level: 3
 *     expand_all: true
 *     closed: false
 *
 * For now, we implement tags as a pre-processing step that rewrites them
 * into HTML comments, which are then consumed by the existing HTML
 * post-processors in `markdown.ts`.
 *
 * This keeps the implementation small while giving you Jekyll-like
 * authoring syntax in your markdown.
 */

export interface CollapsibleHeadingsOptions {
  enabled: boolean;
  /** Heading level that becomes collapsible (default 3). */
  level: number;
  /** Whether parent headings (level - 1) get expand-all controls (default true). */
  expandAll: boolean;
  /** Whether auto-collapsibles start closed (default false). */
  closed: boolean;
}

/**
 * Parse frontmatter `collapsible_headings` into normalized options.
 * Supports `true`, `closed`, a level number, or an options object.
 */
export function parseCollapsibleHeadingsOption(
  value: unknown,
): CollapsibleHeadingsOptions | null {
  if (value === true || value === 1 || value === 'true') {
    return { enabled: true, level: 3, expandAll: true, closed: false };
  }
  if (value === 'closed') {
    return { enabled: true, level: 3, expandAll: true, closed: true };
  }
  if (typeof value === 'number' && value >= 1 && value <= 5) {
    return { enabled: true, level: value, expandAll: true, closed: false };
  }
  if (value && typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    if (obj.enabled === false) return null;
    const level =
      typeof obj.level === 'number' && obj.level >= 1 && obj.level <= 5
        ? obj.level
        : 3;
    return {
      enabled: true,
      level,
      expandAll: obj.expand_all !== false && obj.expandAll !== false,
      closed: !!(obj.closed),
    };
  }
  return null;
}

/**
 * Inject <!-- collapsible --> / <!-- expand-all --> markers before headings
 * when frontmatter requests auto-collapsible behavior.
 * Skips headings that already have an explicit marker.
 */
export function injectAutoCollapsibleMarkers(
  html: string,
  options: CollapsibleHeadingsOptions,
): string {
  if (!options.enabled) return html;

  const collapsibleLevel = options.level;
  const parentLevel = collapsibleLevel - 1;
  const collapsibleComment = options.closed
    ? '<!-- collapsible closed -->'
    : '<!-- collapsible -->';
  const expandAllComment = options.closed
    ? '<!-- expand-all closed -->'
    : '<!-- expand-all -->';

  type HeadingHit = {
    index: number;
    length: number;
    level: number;
  };

  const collectHeadings = (source: string): HeadingHit[] => {
    const headings: HeadingHit[] = [];
    const headingRegex = /<(h[1-5])\b[^>]*>[\s\S]*?<\/\1>/gi;
    let headingMatch;
    while ((headingMatch = headingRegex.exec(source)) !== null) {
      headings.push({
        index: headingMatch.index,
        length: headingMatch[0].length,
        level: parseInt(headingMatch[1].substring(1)),
      });
    }
    return headings;
  };

  let result = html;
  const headings = collectHeadings(result);

  // Insert collapsible markers in reverse order so indexes stay valid
  for (let i = headings.length - 1; i >= 0; i--) {
    const heading = headings[i];
    if (heading.level !== collapsibleLevel) continue;

    const prefix = result.slice(Math.max(0, heading.index - 80), heading.index);
    if (/<!--\s*collapsible(\s+closed)?\s*-->\s*$/i.test(prefix)) continue;

    result =
      result.slice(0, heading.index) +
      `${collapsibleComment}\n` +
      result.slice(heading.index);
  }

  // Second pass for expand-all on the updated HTML
  if (options.expandAll && parentLevel >= 1) {
    const updatedHeadings = collectHeadings(result);

    for (let i = updatedHeadings.length - 1; i >= 0; i--) {
      const heading = updatedHeadings[i];
      if (heading.level !== parentLevel) continue;

      const prefix = result.slice(Math.max(0, heading.index - 80), heading.index);
      if (/<!--\s*expand-all(\s+closed)?\s*-->\s*$/i.test(prefix)) continue;

      let hasChild = false;
      for (let j = i + 1; j < updatedHeadings.length; j++) {
        const next = updatedHeadings[j];
        if (next.level <= parentLevel) break;
        if (next.level === collapsibleLevel) {
          hasChild = true;
          break;
        }
      }
      if (!hasChild) continue;

      result =
        result.slice(0, heading.index) +
        `${expandAllComment}\n` +
        result.slice(heading.index);
    }
  }

  return result;
}

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

  // {% expand-all closed %} -> <!-- expand-all closed -->
  result = result.replace(
    /{%\s*expand-all\s+closed\s*%}/gi,
    '<!-- expand-all closed -->',
  );

  // {% expand-all %} -> <!-- expand-all -->
  result = result.replace(
    /{%\s*expand-all\s*%}/gi,
    '<!-- expand-all -->',
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
