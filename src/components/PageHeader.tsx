'use client';

import Link from 'next/link';
import { PageHeaderPortal } from './PageHeaderPortal';

interface PageHeaderProps {
  title: string;
  excerpt?: string;
  type?: string;
  group?: string;
  num?: string;
  includeExpandButton?: boolean;
}

export default function PageHeader({ title, excerpt, type, group, num }: PageHeaderProps) {
  const className = '!border-transparent hover:border-b-2';
  const isAssignmentType = !!type && ['homework', 'lab', 'assignment', 'tutorial', 'project'].includes(type);
  const isExamType = !!type && ['exam', 'practice exam', 'assessment'].includes(type);

  return (
    <PageHeaderPortal>
      <div className="page-header-banner">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
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
          {group ? `${group}: ` : ''} {title}
        </h1>
        {excerpt && (
          <p className="text-gray-600 dark:text-gray-400 mt-2">{excerpt}</p>
        )}
      </div>
    </PageHeaderPortal>
  );
}
