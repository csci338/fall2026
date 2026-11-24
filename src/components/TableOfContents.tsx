'use client';

import React, { useEffect, useState } from 'react';
import { scrollToAnchor, SCROLL_OFFSET_PX } from '@/lib/utils';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  maxLevel?: number;
}

export default function TableOfContents({ maxLevel = 2 }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const resolvedMaxLevel = Number(maxLevel) || 2;

  useEffect(() => {
    let intersectionObserver: IntersectionObserver | null = null;
    let lastItemsHash = '';
    
    const performScan = () => {
      const headingSelectors = ['details.mb-4 > summary'];
      for (let i = 2; i <= resolvedMaxLevel; i++) {
        headingSelectors.push(`h${i}`);
      }
      const selector = headingSelectors.join(', ');
      
      // Prefer the article column so the TOC's own title and the page banner
      // are never treated as in-page headings.
      const scrollContainer = document.getElementById('main-content-scroll');
      const contentMain = document.querySelector('[data-content-main]');
      const resourcesLayout = document.querySelector('[data-resources-layout]');
      const searchRoot = contentMain || scrollContainer || resourcesLayout || document;
      
      const headings: Array<{ element: Element; level: number }> = [];
      searchRoot.querySelectorAll(selector).forEach((heading) => {
        if (heading.closest('[data-toc="true"], [data-instructor-notes="true"]')) return;

        const level = heading.tagName === 'SUMMARY'
          ? Number(heading.parentElement?.className.match(/\bcollapsible-h([1-5])\b/)?.[1] ?? 3)
          : Number(heading.tagName.charAt(1));
        if (level >= 2 && level <= resolvedMaxLevel) {
          headings.push({ element: heading, level });
        }
      });
      
      const items: TocItem[] = [];
      const usedIds = new Set<string>();

      headings.forEach((headingData, index) => {
        const heading = headingData.element;
        const level = headingData.level;
        let id = heading.id;
        
        if (!id) {
          const baseId = heading.textContent?.toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '-') || `heading-${index}`;
          
          id = baseId;
          let counter = 1;
          while (usedIds.has(id)) {
            id = `${baseId}-${counter}`;
            counter++;
          }
          
          heading.id = id;
        }
        
        usedIds.add(id);

        if (level <= resolvedMaxLevel) {
          items.push({
            id: heading.id,
            // Leave badges (e.g., "Required for submission") out of the nav label
            text: Array.from(heading.childNodes)
              .filter((node) => !(node instanceof HTMLElement && node.classList.contains('badge')))
              .map((node) => node.textContent || '')
              .join('')
              .trim(),
            level: level
          });
        }
      });

      // Only update if items actually changed (use hash to avoid expensive JSON.stringify)
      const itemsHash = items.map(item => `${item.id}:${item.text}`).join('|');
      if (itemsHash !== lastItemsHash) {
        lastItemsHash = itemsHash;
        setTocItems(items);
      }

      // Clean up old observer
      if (intersectionObserver) {
        intersectionObserver.disconnect();
      }

      // Set up new intersection observer
      // Use scroll container as root if it exists and is scrollable, otherwise use viewport
      const isContainerScrollable = scrollContainer && 
        (getComputedStyle(scrollContainer).overflowY === 'auto' || 
         getComputedStyle(scrollContainer).overflowY === 'scroll') &&
        scrollContainer.scrollHeight > scrollContainer.clientHeight + 1;
      
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        {
          root: isContainerScrollable ? scrollContainer : null,
          // rootMargin top should match SCROLL_OFFSET_PX from utils.ts
          // This ensures TOC highlighting aligns with anchor scroll position
          rootMargin: `-${SCROLL_OFFSET_PX}px 0px -80% 0px`,
          threshold: 0.1
        }
      );

      headings.forEach((headingData) => intersectionObserver!.observe(headingData.element));
    };
    
    // Initial scan
    performScan();
    
    // Do an early scan after a short delay to catch quiz that loads quickly
    const earlyScan = setTimeout(performScan, 500);
    
    // Re-scan periodically to catch dynamically added headings (like quiz)
    // Use a shorter interval for faster detection
    const interval = setInterval(performScan, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(earlyScan);
      intersectionObserver?.disconnect();
    };
  }, [resolvedMaxLevel]);

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <nav data-toc="true" className="">
      <div 
        className="pl-4">
        <div className="mb-2 text-lg font-normal text-gray-900 dark:text-gray-100">On This Page</div>
        <ul className="!list-none !p-0 !m-0 space-y-0.5">
          {tocItems.map((item) => {
            // Calculate indentation based on level (h2 = 0, h3 = 4, h4 = 8, etc.)
            const indentClass = item.level === 3 ? 'ml-4' : 
                               item.level === 4 ? 'ml-8' : 
                               item.level === 5 ? 'ml-12' : 
                               item.level === 6 ? 'ml-16' : '';
            
            return (
            <li 
              key={item.id}
              className={indentClass}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToAnchor(item.id);
                }}
                className={`block py-0.5 px-2 text-sm font-normal transition-colors whitespace-nowrap overflow-hidden !border-0 text-ellipsis toc-link ${
                  activeId === item.id
                    ? 'toc-active !font-extrabold'
                    : ''
                }`}
                title={item.text}
              >
                {item.text}
              </a>
            </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
