import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import highlight from 'remark-highlight.js';
import smartypants from 'remark-smartypants';
import { preprocessCheckboxes, postprocessCheckboxes } from './markdown-checkboxes';
import { preprocessMarkdownTags, parseCollapsibleHeadingsOption, injectAutoCollapsibleMarkers } from './markdown-tags';

const postsDirectory = path.join(process.cwd(), 'content');
const quizzesDirectory = path.join(process.cwd(), 'content', 'quizzes');

const DATE_FIELDS = ['date', 'start_date', 'assigned_date', 'due_date'] as const;

function coerceYamlDate(value: unknown): string | undefined {
  if (value == null || value === '') return undefined;
  if (value instanceof Date && !isNaN(value.getTime())) {
    const year = value.getUTCFullYear();
    const month = String(value.getUTCMonth() + 1).padStart(2, '0');
    const day = String(value.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  if (typeof value === 'string') {
    const match = value.match(/^(\d{4}-\d{2}-\d{2})/);
    return match ? match[1] : value;
  }
  return String(value);
}

function coerceFrontMatterDates<T extends Record<string, unknown>>(data: T): T {
  const coerced = { ...data };
  for (const field of DATE_FIELDS) {
    if (field in coerced) {
      (coerced as Record<string, unknown>)[field] = coerceYamlDate(coerced[field]);
    }
  }
  return coerced;
}

function splitPipeCells(line: string): string[] {
  let text = line.trim();
  if (text.startsWith('|')) text = text.slice(1);
  if (text.endsWith('|')) text = text.slice(0, -1);
  return text.split('|');
}

function isPipeTableRow(line: string): boolean {
  const trimmed = line.trim();
  return trimmed.startsWith('|') && trimmed.includes('|', 1);
}

function isPipeSeparator(line: string): boolean {
  if (!isPipeTableRow(line)) return false;
  const cells = splitPipeCells(line);
  return cells.length > 0 && cells.every((cell) => /^:?-{1,}:?$/.test(cell.trim()));
}

function delimiterRow(columnCount: number): string {
  return '|' + ' --- |'.repeat(columnCount);
}

function emptyHeaderRow(columnCount: number): string {
  return '|' + ' |'.repeat(columnCount);
}

/** Make Jekyll-style pipe tables valid GFM (delimiter row required). */
function ensureGfmTables(markdown: string): string {
  const lines = markdown.split('\n');
  const processed: string[] = [];
  let inFence = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      processed.push(line);
      continue;
    }
    if (inFence) {
      processed.push(line);
      continue;
    }

    if (isPipeSeparator(line) && (processed.length === 0 || !isPipeTableRow(processed[processed.length - 1]))) {
      processed.push(emptyHeaderRow(splitPipeCells(line).length));
      processed.push(line);
      continue;
    }

    if (isPipeTableRow(line) && !isPipeSeparator(line)) {
      const block = [line];
      while (i + 1 < lines.length && isPipeTableRow(lines[i + 1])) {
        i += 1;
        block.push(lines[i]);
      }
      if (block.length === 1 || !isPipeSeparator(block[1])) {
        processed.push(block[0], delimiterRow(splitPipeCells(block[0]).length), ...block.slice(1));
      } else {
        processed.push(...block);
      }
      continue;
    }

    processed.push(line);
  }

  return processed.join('\n');
}

export interface PostData {
  id: string;
  num?: string;
  title: string;
  group?: string;
  group_order?: number;
  order?: number;
  ordering?: number;
  description?: string;
  date: string;
  start_date?: string;
  assigned_date?: string;
  due_date?: string;
  content: string;
  excerpt?: string;
  type?: string;
  assigned?: string;
  readings?: string[];
  optionalReadings?: string[];
  activities?: string[];
  draft?: number;
  excluded?: boolean;
  notes?: string;
  toc?: boolean;
  heading_max_level?: number;
  quicklink?: number;
  quizzes?: string[];
  no_render?: number;
  hide_from_list?: number;
  collapsible_headings?: boolean | number | 'closed' | {
    enabled?: boolean;
    level?: number;
    expand_all?: boolean;
    expandAll?: boolean;
    closed?: boolean;
  };
}

export function getAllPostIds(subdirectory?: string) {
  const directory = subdirectory 
    ? path.join(postsDirectory, subdirectory)
    : postsDirectory;
    
  if (!fs.existsSync(directory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(directory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      return {
        params: {
          id: fileName.replace(/\.md$/, '')
        }
      };
    });
}

export async function getPostData(id: string, subdirectory?: string): Promise<PostData> {
  const directory = subdirectory 
    ? path.join(postsDirectory, subdirectory)
    : postsDirectory;
  const fullPath = path.join(directory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  
  // remark-gfm only parses tables that have a delimiter row (| --- | --- |).
  // Jekyll/Kramdown accepted pipe rows without one; insert the delimiter when missing.
  // Also, if a table starts with a delimiter and no header, add an empty header row.
  let markdownContent = ensureGfmTables(matterResult.content);

  // Pre-process custom markdown tags (e.g. {% no-copy %}, {% collapsible %})
  // This rewrites them into HTML comments that the HTML post-processors understand
  markdownContent = preprocessMarkdownTags(markdownContent);
  
  // Pre-process checkboxes: replace [ ] patterns with placeholders
  // This prevents GFM from converting them into disabled task list items
  const { processedMarkdown: markdownWithCheckboxPlaceholders } = preprocessCheckboxes(markdownContent);
  markdownContent = markdownWithCheckboxPlaceholders;

  // Pre-process HTML code blocks: protect them from remark processing
  // Replace <pre><code> blocks with placeholders to prevent remark from injecting <p> tags
  const codeBlockPlaceholders: string[] = [];
  markdownContent = markdownContent.replace(
    /<pre><code[^>]*>[\s\S]*?<\/code><\/pre>/g,
    (match) => {
      const placeholder = `__CODE_BLOCK_PLACEHOLDER_${codeBlockPlaceholders.length}__`;
      codeBlockPlaceholders.push(match);
      return placeholder;
    }
  );

  // Use remark to convert markdown into HTML string with GFM support and syntax highlighting
  const processedContent = await remark()
    .use(gfm)  // Add GitHub Flavored Markdown support
    // @ts-expect-error - remark-highlight.js has type conflicts but works correctly at runtime
    .use(highlight)  // Add syntax highlighting
    .use(smartypants, { dashes: 'oldschool' })  // Convert -- to en-dash (–) and --- to em-dash (—)
    .use(html, { sanitize: false })  // Allow HTML without sanitization
    .process(markdownContent);
  let contentHtml = processedContent.toString();

  // Restore the protected code blocks
  codeBlockPlaceholders.forEach((originalCodeBlock, index) => {
    const placeholder = `__CODE_BLOCK_PLACEHOLDER_${index}__`;
    contentHtml = contentHtml.replace(placeholder, originalCodeBlock);
  });

  // Post-process HTML to preserve whitespace in code blocks inside table cells
  // Store original code content in data attribute before any processing
  // Also decode HTML entities in code blocks (remark/highlight.js may escape them)
  // IMPORTANT: We decode entities carefully to avoid breaking highlight.js span structure
  contentHtml = contentHtml.replace(
    /(<pre><code[^>]*>)([\s\S]*?)(<\/code><\/pre>)/g,
    (match, openTag, codeContent, closeTag) => {
      // Extract the original code text by removing highlight.js markup
      // This gives us the clean code without any HTML entities
      const originalCode = codeContent
        .replace(/<span[^>]*>/g, '')  // Remove opening span tags
        .replace(/<\/span>/g, '')     // Remove closing span tags
        .replace(/&#x3C;/gi, '<')      // Decode hex entities
        .replace(/&#x3c;/gi, '<')
        .replace(/&#60;/g, '<')        // Decode decimal entities
        .replace(/&lt;/g, '<')         // Decode named entities
        .replace(/&#x3E;/gi, '>')
        .replace(/&#x3e;/gi, '>')
        .replace(/&#62;/g, '>')
        .replace(/&gt;/g, '>')
        .replace(/&#x26;/gi, '&')
        .replace(/&#38;/g, '&')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
      
      // Store the original code content in a data attribute, preserving all whitespace
      const encodedCode = encodeURIComponent(originalCode);
      // Add data attribute to preserve original code
      const openTagWithData = openTag.replace(/(<code[^>]*)(>)/, `$1 data-original-code="${encodedCode}"$2`);
      
      // For HTML code blocks, we need to re-highlight with decoded entities
      // But we'll let the client-side handle this to avoid breaking the structure here
      // Just return the content as-is for now - the client will decode properly
      return openTagWithData + codeContent + closeTag;
    }
  );

  // Post-process HTML to handle <!-- no-copy-button --> comments
  // Find all <!-- no-copy-button --> comments and add data-no-copy="true" to the following code block
  const noCopyButtonCommentRegex = /<!--\s*no-copy-button\s*-->/gi;
  const noCopyButtonMatches: Array<{ index: number; length: number }> = [];
  let noCopyButtonMatch;
  
  // First pass: collect all no-copy-button comment positions
  while ((noCopyButtonMatch = noCopyButtonCommentRegex.exec(contentHtml)) !== null) {
    noCopyButtonMatches.push({
      index: noCopyButtonMatch.index,
      length: noCopyButtonMatch[0].length
    });
  }
  
  // Second pass: process in reverse order to avoid index shifting
  for (let i = noCopyButtonMatches.length - 1; i >= 0; i--) {
    const { index: commentIndex, length: commentLength } = noCopyButtonMatches[i];
    
    // Find the next <pre><code> block after this comment
    const afterComment = contentHtml.substring(commentIndex + commentLength);
    const codeBlockMatch = afterComment.match(/<pre><code([^>]*)>/);
    
    if (codeBlockMatch && codeBlockMatch.index !== undefined) {
      const codeBlockIndex = commentIndex + commentLength + codeBlockMatch.index;
      const codeBlockTag = codeBlockMatch[0];
      const existingAttrs = codeBlockMatch[1] || '';
      
      // Check if data-no-copy already exists
      if (!existingAttrs.includes('data-no-copy')) {
        // Add data-no-copy="true" to the code tag
        let newCodeBlockTag: string;
        const trimmedAttrs = existingAttrs.trim();
        if (trimmedAttrs) {
          // If attributes exist, add data-no-copy to them (ensure space before data-no-copy)
          newCodeBlockTag = `<pre><code${existingAttrs} data-no-copy="true">`;
        } else {
          // If no attributes, just add data-no-copy
          newCodeBlockTag = `<pre><code data-no-copy="true">`;
        }
        
        // Replace the code block tag
        contentHtml = contentHtml.substring(0, codeBlockIndex) + newCodeBlockTag + contentHtml.substring(codeBlockIndex + codeBlockTag.length);
      }
      
      // Remove the comment
      contentHtml = contentHtml.substring(0, commentIndex) + contentHtml.substring(commentIndex + commentLength);
    }
  }

  // Post-process HTML to convert checkbox placeholders to stateful checkboxes
  // The placeholders were inserted before GFM processing to avoid disabled checkboxes
  contentHtml = await postprocessCheckboxes(contentHtml, id);

  // Post-process HTML to add ids from <!-- ID name --> comments (Kramdown {:#id})
  const idCommentRegex = /<!--\s*ID\s+([a-zA-Z0-9_-]+)\s*-->/gi;
  const idMatches: Array<{ index: number; id: string; length: number }> = [];
  let idCommentMatch;
  while ((idCommentMatch = idCommentRegex.exec(contentHtml)) !== null) {
    idMatches.push({
      index: idCommentMatch.index,
      id: idCommentMatch[1],
      length: idCommentMatch[0].length
    });
  }
  for (let i = idMatches.length - 1; i >= 0; i--) {
    const { index: commentIndex, id, length: commentLength } = idMatches[i];
    const afterComment = contentHtml.substring(commentIndex + commentLength);
    const elementMatch = afterComment.match(/<([a-zA-Z][a-zA-Z0-9]*)[^>]*>/);
    if (elementMatch && elementMatch.index !== undefined) {
      const elementIndex = commentIndex + commentLength + elementMatch.index;
      const elementTag = elementMatch[0];
      const newElementTag = elementTag.includes('id=')
        ? elementTag.replace(/id="[^"]*"/, `id="${id}"`)
        : elementTag.replace(/(<[a-zA-Z][a-zA-Z0-9]*)/, `$1 id="${id}"`);
      contentHtml = contentHtml.substring(0, elementIndex) + newElementTag + contentHtml.substring(elementIndex + elementTag.length);
      contentHtml = contentHtml.substring(0, commentIndex) + contentHtml.substring(commentIndex + commentLength);
    }
  }

  // Post-process HTML to add classes to elements based on markdown comments
  // Generic handler: any comment like <!-- .class-name --> (with dot prefix) will add that class to the next HTML element
  // Examples: <!-- .list-tight -->, <!-- .list-spaced -->, <!-- .info -->, etc.
  // Matches valid CSS class names (alphanumeric, hyphens, underscores) with required dot prefix
  // Excludes "collapsible" which is handled separately
  const classCommentRegex = /<!--\s*\.([a-zA-Z0-9_-]+)\s*-->/gi;
  const classMatches: Array<{ index: number; className: string; length: number }> = [];
  let classCommentMatch;
  
  // Collect all matches first
  while ((classCommentMatch = classCommentRegex.exec(contentHtml)) !== null) {
    classMatches.push({
      index: classCommentMatch.index,
      className: classCommentMatch[1],
      length: classCommentMatch[0].length
    });
  }
  
  // Process matches in reverse order to avoid index shifting
  for (let i = classMatches.length - 1; i >= 0; i--) {
    const { index: commentIndex, className, length: commentLength } = classMatches[i];
    
    // Find the next HTML element after this comment (any tag)
    // Skip over whitespace, <p> tags, and other inline elements
    const afterComment = contentHtml.substring(commentIndex + commentLength);
    const elementMatch = afterComment.match(/<([a-zA-Z][a-zA-Z0-9]*)[^>]*>/);
    
    if (elementMatch && elementMatch.index !== undefined) {
      const elementIndex = commentIndex + commentLength + elementMatch.index;
      const elementTag = elementMatch[0];
      
      // Add the class to the element
      let newElementTag: string;
      if (elementTag.includes('class=')) {
        // If class already exists, append to it (avoid duplicates)
        newElementTag = elementTag.replace(/class="([^"]*)"/, (match, existingClasses) => {
          const classes = existingClasses.split(/\s+/);
          if (classes.includes(className)) {
            return match; // Class already exists, don't add it again
          }
          return `class="${existingClasses} ${className}"`;
        });
      } else {
        // If no class exists, add it
        newElementTag = elementTag.replace(/(<[a-zA-Z][a-zA-Z0-9]*)([^>]*>)/, `$1 class="${className}"$2`);
      }
      
      // Replace the element tag in the HTML
      contentHtml = contentHtml.substring(0, elementIndex) + newElementTag + contentHtml.substring(elementIndex + elementTag.length);
      
      // Remove the comment
      contentHtml = contentHtml.substring(0, commentIndex) + contentHtml.substring(commentIndex + commentLength);
    }
  }

  // Optionally auto-mark headings as collapsible / expand-all from frontmatter
  const autoCollapsible = parseCollapsibleHeadingsOption(
    (matterResult.data as Record<string, unknown>).collapsible_headings
  );
  if (autoCollapsible) {
    contentHtml = injectAutoCollapsibleMarkers(contentHtml, autoCollapsible);
  }

  // Post-process HTML to make headings collapsible based on <!-- collapsible --> comments
  // Find all <!-- collapsible --> comments and their associated heading positions (h1-h5)
  // Support <!-- collapsible --> (open by default) and <!-- collapsible closed --> (closed by default)
  const collapsibleCommentRegex = /<!--\s*collapsible(\s+closed)?\s*-->/gi;
  const collapsibleSections: Array<{ 
    commentIndex: number; 
    commentLength: number;
    headingStart: number;
    headingEnd: number;
    headingContent: string;
    headingLevel: number;
    isClosed: boolean;
  }> = [];
  let collapsibleMatch;
  
  // First pass: collect all collapsible sections with their heading positions
  while ((collapsibleMatch = collapsibleCommentRegex.exec(contentHtml)) !== null) {
    const commentIndex = collapsibleMatch.index;
    const commentLength = collapsibleMatch[0].length;
    const isClosed = collapsibleMatch[1] !== undefined; // Check if "closed" was in the comment
    
    // Find the next heading (h1-h5) after this comment
    const afterComment = contentHtml.substring(commentIndex + commentLength);
    const headingMatch = afterComment.match(/<(h[1-5])[^>]*>[\s\S]*?<\/h[1-5]>/);
    
    if (headingMatch && headingMatch.index !== undefined) {
      const headingStart = commentIndex + commentLength + headingMatch.index;
      const headingEnd = headingStart + headingMatch[0].length;
      
      // Extract the heading level and content
      const headingFullMatch = headingMatch[0];
      const headingTag = headingMatch[1]; // e.g., "h1", "h2", etc.
      const headingLevel = parseInt(headingTag.substring(1)); // Extract number (1-5)
      const headingContentMatch = headingFullMatch.match(/<h[1-5][^>]*>([\s\S]*?)<\/h[1-5]>/);
      const headingContent = headingContentMatch ? headingContentMatch[1] : '';
      
      collapsibleSections.push({
        commentIndex,
        commentLength,
        headingStart,
        headingEnd,
        headingContent,
        headingLevel,
        isClosed
      });
    }
  }
  
  // Second pass: process in reverse order to avoid index shifting
  for (let i = collapsibleSections.length - 1; i >= 0; i--) {
    const { commentIndex, headingEnd, headingContent, headingLevel, isClosed } = collapsibleSections[i];
    
    // Find the boundary: either the next collapsible section's comment OR the next heading of equal or greater level
    const afterHeading = contentHtml.substring(headingEnd);
    
    // Look for next collapsible comment position (from original positions)
    let nextCollapsibleIndex: number | undefined = undefined;
    for (let j = i + 1; j < collapsibleSections.length; j++) {
      const nextSection = collapsibleSections[j];
      if (nextSection.commentIndex > headingEnd) {
        // Only use as boundary if it's at same or higher level (lower or equal number)
        // Lower level headings (higher numbers) should be nested inside
        if (nextSection.headingLevel <= headingLevel) {
          nextCollapsibleIndex = nextSection.commentIndex - headingEnd;
          break;
        }
        // If it's a lower level (higher number), skip it - it should be nested
      }
    }
    
    // Look for next heading of equal or greater level (h1-h5)
    const nextHeadingMatch = afterHeading.match(/<(h[1-5])[^>]*>/);
    let nextHeadingIndex: number | undefined = undefined;
    if (nextHeadingMatch && nextHeadingMatch.index !== undefined) {
      const nextHeadingTag = nextHeadingMatch[1];
      const nextHeadingLevel = parseInt(nextHeadingTag.substring(1));
      // Only consider if it's at same or higher level (lower or equal number)
      if (nextHeadingLevel <= headingLevel) {
        nextHeadingIndex = nextHeadingMatch.index;
      }
    }
    
    // Use whichever comes first (or the end of document if neither exists)
    let sectionEnd: number;
    if (nextCollapsibleIndex !== undefined && nextHeadingIndex !== undefined) {
      // Use whichever is earlier
      sectionEnd = headingEnd + Math.min(nextCollapsibleIndex, nextHeadingIndex);
    } else if (nextCollapsibleIndex !== undefined) {
      sectionEnd = headingEnd + nextCollapsibleIndex;
    } else if (nextHeadingIndex !== undefined) {
      sectionEnd = headingEnd + nextHeadingIndex;
    } else {
      sectionEnd = contentHtml.length;
    }
    
    // Extract the section content (everything after the heading until the boundary)
    const sectionContent = contentHtml.substring(headingEnd, sectionEnd);
    
      // Create the collapsible details structure
      // Convert heading to summary and wrap everything in details
      // Add mb-4 class for when it's closed (CSS will handle the conditional styling)
      // Add collapsible-h{level} class to match heading level for styling
      // Use "open" attribute only if not closed by default
      const openAttr = isClosed ? '' : ' open';
      const detailsContent = `<details${openAttr} class="mb-4 collapsible-h${headingLevel}">
  <summary>${headingContent}</summary>
  ${sectionContent}
</details>`;
    
    // Replace the comment, heading, and section content with the details structure
    contentHtml = contentHtml.substring(0, commentIndex) + detailsContent + contentHtml.substring(sectionEnd);
  }

  // Post-process HTML for {% expand-all %} headings.
  // These remote-control collapsible details one heading level below within the section.
  // Must run AFTER collapsible processing so child headings are already <details>.
  const expandAllCommentRegex = /<!--\s*expand-all(\s+closed)?\s*-->/gi;
  const expandAllSections: Array<{
    commentIndex: number;
    commentLength: number;
    headingStart: number;
    headingEnd: number;
    headingFull: string;
    headingLevel: number;
    isClosed: boolean;
  }> = [];
  let expandAllMatch;

  while ((expandAllMatch = expandAllCommentRegex.exec(contentHtml)) !== null) {
    const commentIndex = expandAllMatch.index;
    const commentLength = expandAllMatch[0].length;
    const isClosed = expandAllMatch[1] !== undefined;

    const afterComment = contentHtml.substring(commentIndex + commentLength);
    const headingMatch = afterComment.match(/<(h[1-5])([^>]*)>([\s\S]*?)<\/h[1-5]>/);

    if (headingMatch && headingMatch.index !== undefined) {
      const headingStart = commentIndex + commentLength + headingMatch.index;
      const headingEnd = headingStart + headingMatch[0].length;
      const headingLevel = parseInt(headingMatch[1].substring(1));

      expandAllSections.push({
        commentIndex,
        commentLength,
        headingStart,
        headingEnd,
        headingFull: headingMatch[0],
        headingLevel,
        isClosed,
      });
    }
  }

  for (let i = expandAllSections.length - 1; i >= 0; i--) {
    const { commentIndex, headingEnd, headingFull, headingLevel, isClosed } = expandAllSections[i];
    const afterHeading = contentHtml.substring(headingEnd);
    const childLevel = headingLevel + 1;

    // Section ends at the next top-level heading of equal or higher priority
    // (ignore headings nested inside already-processed <details> blocks)
    const findNextTopLevelHeadingIndex = (html: string, maxLevel: number): number | undefined => {
      let depth = 0;
      const tokenRegex = /<\/?details\b[^>]*>|<(h[1-5])\b[^>]*>/gi;
      let tokenMatch;
      while ((tokenMatch = tokenRegex.exec(html)) !== null) {
        const token = tokenMatch[0].toLowerCase();
        if (token.startsWith('<details')) {
          depth++;
        } else if (token.startsWith('</details')) {
          depth = Math.max(0, depth - 1);
        } else if (depth === 0 && tokenMatch[1]) {
          const level = parseInt(tokenMatch[1].substring(1));
          if (level <= maxLevel) {
            return tokenMatch.index;
          }
        }
      }
      return undefined;
    };

    let sectionEnd = contentHtml.length;
    const nextHeadingIndex = findNextTopLevelHeadingIndex(afterHeading, headingLevel);
    if (nextHeadingIndex !== undefined) {
      sectionEnd = headingEnd + nextHeadingIndex;
    }

    // If a later expand-all section starts sooner, stop there
    for (let j = i + 1; j < expandAllSections.length; j++) {
      const nextSection = expandAllSections[j];
      if (nextSection.commentIndex > headingEnd && nextSection.commentIndex < sectionEnd) {
        if (nextSection.headingLevel <= headingLevel) {
          sectionEnd = nextSection.commentIndex;
          break;
        }
      }
    }

    let sectionContent = contentHtml.substring(headingEnd, sectionEnd);

    // Optionally force one-level-down collapsibles closed on load
    if (isClosed) {
      sectionContent = sectionContent.replace(/<details([^>]*)>/gi, (full, attrs: string) => {
        if (attrs.includes(`collapsible-h${childLevel}`)) {
          return `<details${attrs.replace(/\s+open\b/gi, '')}>`;
        }
        return full;
      });
    }

    const openAttr = isClosed ? '' : ' data-expanded="true"';
    const expandAllContent = `<section class="expand-all-section expand-all-h${headingLevel}" data-heading-level="${headingLevel}" data-child-level="${childLevel}"${openAttr}>
  <div class="expand-all-heading">
    ${headingFull}
    <button type="button" class="expand-all-toggle" aria-expanded="${isClosed ? 'false' : 'true'}" aria-label="Expand or collapse all sections">
      <span class="expand-all-toggle-icon" aria-hidden="true">
        <i class="fa-solid fa-chevron-up"></i>
        <i class="fa-solid fa-chevron-down"></i>
      </span>
    </button>
  </div>
  ${sectionContent}
</section>`;

    contentHtml = contentHtml.substring(0, commentIndex) + expandAllContent + contentHtml.substring(sectionEnd);
  }

  // Wrap each instructor notes section with data attribute for conditional rendering
  // Find all "## Instructor Notes" headings and wrap each section individually
  // Each section includes the heading and everything until the next h2 heading (or end of document)
  const instructorNotesRegex = /<h2[^>]*>Instructor Notes<\/h2>/g;
  const instructorNotesMatches: Array<number> = [];
  let match;
  
  // Find all "Instructor Notes" heading positions
  while ((match = instructorNotesRegex.exec(contentHtml)) !== null) {
    instructorNotesMatches.push(match.index);
  }
  
  if (instructorNotesMatches.length > 0) {
    // Process from end to beginning to avoid index shifting issues
    for (let i = instructorNotesMatches.length - 1; i >= 0; i--) {
      const sectionStart = instructorNotesMatches[i];
      
      // Find the next h2 heading after this one (or end of document)
      const afterStart = contentHtml.substring(sectionStart);
      const nextH2Match = afterStart.substring(afterStart.indexOf('</h2>') + 5).match(/<h2[^>]*>/);
      
      let sectionEnd: number;
      if (nextH2Match && nextH2Match.index !== undefined) {
        sectionEnd = sectionStart + afterStart.indexOf('</h2>') + 5 + nextH2Match.index;
      } else {
        sectionEnd = contentHtml.length;
      }
      
      // Extract and wrap this instructor notes section
      const sectionContent = contentHtml.substring(sectionStart, sectionEnd);
      const wrappedContent = `<div data-instructor-notes="true">${sectionContent}</div>`;
      contentHtml = contentHtml.substring(0, sectionStart) + wrappedContent + contentHtml.substring(sectionEnd);
    }
  }

  // Prefix site-root paths so markdown href/src work with Next.js basePath
  contentHtml = contentHtml.replace(
    /\b(href|src)="\/(?!fall2026\/)([^"]*)"/g,
    '$1="/fall2026/$2"',
  );

  // Combine the data with the id and contentHtml
  return {
    id,
    content: contentHtml,
    ...coerceFrontMatterDates(matterResult.data as Record<string, unknown>),
  } as PostData;
}

export function getAllPosts(subdirectory?: string): PostData[] {
  const directory = subdirectory 
    ? path.join(postsDirectory, subdirectory)
    : postsDirectory;
    
  if (!fs.existsSync(directory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(directory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(directory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      return {
        id,
        ...coerceFrontMatterDates(matterResult.data as Record<string, unknown>),
      } as PostData;
    });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export interface QuizQuestionVariant {
  question: string;
  options?: string[];
  correct?: number | number[];
  explanation?: string;
}

export interface QuizQuestion {
  id: string;
  question?: string;
  strand?: string;
  options?: string[];
  correct?: number | number[];
  explanation?: string;
  variants?: Record<string, QuizQuestionVariant>;
}

export interface QuizData {
  quizName?: string;
  showStrandResults?: boolean;
  strandThreshold?: number;
  strandLabels?: Record<string, string>;
  languages?: string[];
  defaultLanguage?: string;
  start_date?: string;
  notes?: string;
  draft?: number;
  folder?: string;
  cheatsheet?: string;
  questions: QuizQuestion[];
}

export interface QuizMetadata {
  slug: string;
  quizName: string;
  start_date?: string;
  notes?: string;
  draft?: number;
}

/**
 * Load a template file for a question if it exists
 */
function loadQuestionTemplate(quizSlug: string, questionId: string, templateFileName: string): string | undefined {
  const templatePath = path.join(quizzesDirectory, quizSlug, questionId, templateFileName);
  if (fs.existsSync(templatePath)) {
    try {
      return fs.readFileSync(templatePath, 'utf8');
    } catch (error) {
      console.error(`Error reading template file ${templatePath}:`, error);
      return undefined;
    }
  }
  return undefined;
}

export function getQuizCheatsheet(quizData: QuizData | null, slug: string): string | null {
  // First, check if quiz has a cheatsheet key pointing to the new cheatsheets folder
  if (quizData?.cheatsheet) {
    const cheatsheetPath = path.join(quizzesDirectory, 'cheatsheets', quizData.cheatsheet);
    if (fs.existsSync(cheatsheetPath)) {
      try {
        return fs.readFileSync(cheatsheetPath, 'utf8');
      } catch (error) {
        console.error(`Error reading cheatsheet file ${cheatsheetPath}:`, error);
        return null;
      }
    }
  }
  
  // Fall back to old folder-based method for backward compatibility
  const folderName = quizData?.folder || slug;
  const cheatsheetPath = path.join(quizzesDirectory, folderName, 'cheatsheet.html');
  
  if (fs.existsSync(cheatsheetPath)) {
    try {
      return fs.readFileSync(cheatsheetPath, 'utf8');
    } catch (error) {
      console.error(`Error reading cheatsheet file ${cheatsheetPath}:`, error);
      return null;
    }
  }
  
  return null;
}

export function getAllMatchingQuizzes(slug: string): string[] {
  // First try exact slug match
  const exactQuizPath = path.join(quizzesDirectory, `${slug}.json`);
  
  if (fs.existsSync(exactQuizPath)) {
    // Exact match found, return it
    return [slug];
  }
  
  // If exact match not found, try pattern matching
  // For example: "css-07-flexbox" should match "css-07a-flexbox.json" or "css-07b-flexbox.json"
  if (!fs.existsSync(quizzesDirectory)) {
    return [];
  }
  
  const files = fs.readdirSync(quizzesDirectory);
  const match = slug.match(/^([a-z]+-\d+)([a-z]?)-(.+)$/);
  
  if (!match) {
    return [];
  }
  
  const [, base, , topic] = match;
  // Match pattern: base + optional letter + topic
  // e.g., "css-07a-flexbox.json", "css-07b-flexbox.json" when slug is "css-07-flexbox"
  const pattern = new RegExp(`^${base}[a-z]?-${topic}\\.json$`);
  const matchingQuizzes = files.filter((file: string) => pattern.test(file));
  
  if (matchingQuizzes.length === 0) {
    return [];
  }
  
  // Return all matching quiz slugs (remove .json extension)
  return matchingQuizzes.map((file: string) => file.replace(/\.json$/, ''));
}

export function getQuizData(slug: string): QuizData | null {
  // First try exact slug match
  let quizPath = path.join(quizzesDirectory, `${slug}.json`);
  let actualQuizSlug = slug;
  
  if (!fs.existsSync(quizPath)) {
    // If exact match not found, try pattern matching
    // For example: "css-07-flexbox" should match "css-07a-flexbox.json" or "css-07b-flexbox.json"
    if (fs.existsSync(quizzesDirectory)) {
      const files = fs.readdirSync(quizzesDirectory);
      const match = slug.match(/^([a-z]+-\d+)([a-z]?)-(.+)$/);
      
      if (match) {
        const [, base, , topic] = match;
        // Match pattern: base + optional letter + topic
        // e.g., "css-07a-flexbox.json", "css-07b-flexbox.json" when slug is "css-07-flexbox"
        const pattern = new RegExp(`^${base}[a-z]?-${topic}\\.json$`);
        const matchingQuizzes = files.filter((file: string) => pattern.test(file));
        
        if (matchingQuizzes.length > 0) {
          // Prefer quizzes that have a folder property (they have supplementary files)
          let selectedQuiz = matchingQuizzes[0];
          
          for (const quizFile of matchingQuizzes) {
            try {
              const quizFilePath = path.join(quizzesDirectory, quizFile);
              const quizContent = fs.readFileSync(quizFilePath, 'utf8');
              const quizData: QuizData = JSON.parse(quizContent);
              if (quizData.folder) {
                selectedQuiz = quizFile;
                break; // Found one with folder property, use it
              }
            } catch {
              // Continue to next file if this one can't be read
            }
          }
          
          actualQuizSlug = selectedQuiz.replace(/\.json$/, '');
          quizPath = path.join(quizzesDirectory, selectedQuiz);
        } else {
          return null;
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  
  try {
    const fileContents = fs.readFileSync(quizPath, 'utf8');
    const quizData: QuizData = JSON.parse(fileContents);
    
    // Load template files from question directories if they exist
    // Use actualQuizSlug (the quiz file name) for loading templates, not the resource slug
    if (quizData.questions && Array.isArray(quizData.questions)) {
      quizData.questions = quizData.questions.map((question: QuizQuestion) => {
        if (question.id && 'type' in question && question.type === 'javascript-dom') {
          const questionDir = path.join(quizzesDirectory, actualQuizSlug, question.id);
          
          // Only load from files if the directory exists
          if (fs.existsSync(questionDir)) {
            // Load template files (override JSON values if files exist)
            const htmlTemplate = loadQuestionTemplate(actualQuizSlug, question.id, 'html.html');
            const cssTemplate = loadQuestionTemplate(actualQuizSlug, question.id, 'css.css');
            const jsTemplate = loadQuestionTemplate(actualQuizSlug, question.id, 'js.js');
            // Load target files from answers directory
            const targetHtml = loadQuestionTemplate(actualQuizSlug, question.id, 'answers/html.html');
            const targetCss = loadQuestionTemplate(actualQuizSlug, question.id, 'answers/css.css');
            const targetJs = loadQuestionTemplate(actualQuizSlug, question.id, 'answers/js.js');
            
            // Override with file contents if they exist
            // Type assertion needed because we know this is a javascript-dom question
            const jsQuestion = question as QuizQuestion & { 
              htmlTemplate?: string; 
              cssTemplate?: string; 
              codeTemplate?: string; 
              targetHtml?: string; 
              targetCss?: string; 
              targetJs?: string; 
              testCode?: string;
            };
            if (htmlTemplate !== undefined) jsQuestion.htmlTemplate = htmlTemplate;
            if (cssTemplate !== undefined) jsQuestion.cssTemplate = cssTemplate;
            if (jsTemplate !== undefined) jsQuestion.codeTemplate = jsTemplate;
            if (targetHtml !== undefined) jsQuestion.targetHtml = targetHtml;
            if (targetCss !== undefined) jsQuestion.targetCss = targetCss;
            if (targetJs !== undefined) jsQuestion.targetJs = targetJs;
            
            // Load JavaScript test file
            const testCode = loadQuestionTemplate(actualQuizSlug, question.id, 'tests.js');
            if (testCode !== undefined) jsQuestion.testCode = testCode;
          }
        }
        return question;
      });
    }
    
    return quizData;
  } catch (error) {
    console.error(`Error reading quiz data for ${slug}:`, error);
    return null;
  }
}

export function getAllQuizMetadata(): QuizMetadata[] {
  if (!fs.existsSync(quizzesDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(quizzesDirectory);
  const allQuizzes: QuizMetadata[] = [];
  
  fileNames
    .filter(fileName => fileName.endsWith('.json'))
    .forEach(fileName => {
      // Remove ".json" from file name to get slug
      const slug = fileName.replace(/\.json$/, '');
      
      try {
        // Read quiz file
        const fullPath = path.join(quizzesDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const quizData: QuizData = JSON.parse(fileContents);
        
        allQuizzes.push({
          slug,
          quizName: quizData.quizName || slug,
          start_date: quizData.start_date,
          notes: quizData.notes,
          draft: quizData.draft,
        });
      } catch (error) {
        console.error(`Error reading quiz metadata for ${fileName}:`, error);
      }
    });
  
  return allQuizzes;
} 