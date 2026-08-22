'use client';

import Link from 'next/link';
import ExpandableSectionHeading from './ExpandableSectionHeading';
import { PageHeaderPortal } from './PageHeaderPortal';

interface PageHeaderProps {
  title: string;
  excerpt?: string;
  type?: string;
  group?: string;
  isExpandedAll: boolean;
  onToggleAll: () => void;
  isDark?: boolean;
}

export default function PageHeader({
  title,
  excerpt,
  type,
  group,
  isExpandedAll,
  onToggleAll,
  isDark,
}: PageHeaderProps) {
  const className = '!border-transparent hover:border-b-2';
  const displayTitle = `${group ? `${group} ` : ''}${title}`.trim();
  const prefix =
    type === 'activity' ? (
      <><Link href="/" className={className}>Schedule</Link> &gt; </>
    ) : type && ['homework', 'lab', 'assignment'].includes(type) ? (
      <><Link href="/assignments" className={className}>Assignments</Link> &gt; </>
    ) : null;

  return (
    <PageHeaderPortal>
      <div className="page-header-banner">
        <ExpandableSectionHeading
          title={displayTitle}
          titlePrefix={prefix}
          isExpanded={isExpandedAll}
          onToggle={onToggleAll}
          ariaLabelExpand="Expand all topics"
          ariaLabelCollapse="Collapse all topics"
          headingLevel={1}
          isDark={isDark}
        />
        {excerpt && (
          <p className="text-gray-600 dark:text-gray-400 mt-2">{excerpt}</p>
        )}
      </div>
    </PageHeaderPortal>
  );
}
