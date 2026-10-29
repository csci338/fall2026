'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ExpandableSectionHeading from './ExpandableSectionHeading';
import { PageHeaderPortal } from './PageHeaderPortal';

// Section-level collapsibles ({% collapsible %}); excludes answer reveals like "Show the answer"
const COLLAPSIBLE_SECTIONS = '.assignment-page details[class*="collapsible-h"]';

function getCollapsibleSections(): HTMLDetailsElement[] {
  return Array.from(document.querySelectorAll<HTMLDetailsElement>(COLLAPSIBLE_SECTIONS));
}

interface PageHeaderProps {
  title: string;
  excerpt?: string;
  type?: string;
  group?: string;
  num?: string;
  includeExpandButton?: boolean;
}

export default function PageHeader({ title, excerpt, type, group, num, includeExpandButton }: PageHeaderProps) {
  const [isExpandedAll, setIsExpandedAll] = useState(false);

  // Keep the button in sync with the sections, including when the user opens/closes them
  // individually or their saved open/closed state is restored after load
  useEffect(() => {
    if (!includeExpandButton) return;
    const sync = () => {
      const sections = getCollapsibleSections();
      setIsExpandedAll(sections.length > 0 && sections.every((details) => details.open));
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['open'],
    });
    return () => observer.disconnect();
  }, [includeExpandButton]);

  const handleToggleAll = () => {
    const sections = getCollapsibleSections();
    const shouldExpand = !sections.every((details) => details.open);
    sections.forEach((details) => {
      details.open = shouldExpand;
    });
  };

  const className = '!border-transparent hover:border-b-2';
  const isAssignmentType = !!type && ['homework', 'lab', 'assignment', 'tutorial', 'project'].includes(type);
  const isExamType = !!type && ['exam', 'practice exam', 'assessment'].includes(type);

  const headingPrefix = (
    <>
      {type && type === 'activity' ? (<><Link href="/" className={className}>Schedule</Link> &gt; </>) : ''}
      {isAssignmentType ? (<><Link href="/assignments" className={className}>Assignments</Link> &gt; </>) : ''}
      {isExamType ? (<><Link href="/exams" className={className}>Exams</Link> &gt; </>) : ''}
      {num
        ? (type === 'tutorial'
            ? `Tutorial ${num}: `
            : type === 'lab'
              ? `Lab ${num}: `
              : type === 'project'
                ? `Project ${num}: `
                : type === 'practice exam'
                  ? `Practice Exam ${num}: `
                  : isExamType
                    ? `Exam ${num}: `
                  : ['homework', 'assignment'].includes(type || '')
                    ? `HW${num}: `
                    : ''
          )
        : ''}
    </>
  );

  return (
    <PageHeaderPortal>
      <div className="page-header-banner">
        {includeExpandButton ? (
          <ExpandableSectionHeading
            title={`${group ? `${group}: ` : ''} ${title}`}
            titlePrefix={headingPrefix}
            isExpanded={isExpandedAll}
            onToggle={handleToggleAll}
            ariaLabelExpand="Expand all sections"
            ariaLabelCollapse="Collapse all sections"
            headingLevel={1}
          />
        ) : (
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
            {headingPrefix}
            {group ? `${group}: ` : ''} {title}
          </h1>
        )}
        {excerpt && (
          <p className="text-gray-600 dark:text-gray-400 mt-2">{excerpt}</p>
        )}
      </div>
    </PageHeaderPortal>
  );
}
