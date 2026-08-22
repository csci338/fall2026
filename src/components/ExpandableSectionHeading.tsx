'use client';

import { ReactNode } from 'react';

interface ExpandableSectionHeadingProps {
  title: string;
  titlePrefix?: ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  ariaLabelExpand?: string;
  ariaLabelCollapse?: string;
  headingLevel?: 1 | 2;
  id?: string | null;
  isDark?: boolean;
}

export default function ExpandableSectionHeading({
  title,
  titlePrefix,
  isExpanded,
  onToggle,
  ariaLabelExpand = `Expand ${title}`,
  ariaLabelCollapse = `Collapse ${title}`,
  headingLevel = 2,
  id = null,
  isDark,
}: ExpandableSectionHeadingProps) {
  const HeadingTag = headingLevel === 1 ? 'h1' : 'h2';
  const headingClassName =
    headingLevel === 1
      ? '!mt-0 !mb-0 text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100'
      : '!mt-0 !mb-0';
  const rowClassName =
    headingLevel === 1
      ? 'flex gap-x-2 items-center w-full'
      : 'flex gap-x-2 items-center w-full border-b-4 border-gray-900 dark:border-gray-300 pb-2';

  return (
    <div
      className={rowClassName}
      id={id ?? undefined}
      style={
        headingLevel === 2 && isDark
          ? { borderColor: '#d1d5db' }
          : undefined
      }
    >
      <HeadingTag className={`${headingClassName} flex-1 min-w-0`}>
        {titlePrefix}
        {title}
      </HeadingTag>
      <button
        type="button"
        onClick={onToggle}
        className="p-2 text-black dark:text-gray-200 hover:text-sky-700 dark:hover:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full w-9 h-9 transition-all duration-200 flex items-center justify-center shrink-0 ml-auto"
        style={isDark ? { color: '#e5e7eb' } : undefined}
        aria-expanded={isExpanded}
        aria-label={isExpanded ? ariaLabelCollapse : ariaLabelExpand}
      >
        <span className="relative inline-flex flex-col items-center justify-center">
          <i
            className={`fa-solid text-[0.8rem] leading-none transition-transform duration-300 ${isExpanded ? 'fa-chevron-down' : 'fa-chevron-up'}`}
          />
          <i
            className={`fa-solid text-[0.8rem] leading-none -mt-0.5 transition-transform duration-300 ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`}
          />
        </span>
      </button>
    </div>
  );
}
