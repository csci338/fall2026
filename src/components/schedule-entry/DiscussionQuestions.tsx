'use client'

import { useState } from 'react';
import clsx from 'clsx';
import { DiscussionQuestion } from './types';

interface DiscussionQuestionsProps {
  discussionQuestions?: DiscussionQuestion[];
  isDark?: boolean;
}

export default function DiscussionQuestions({
  discussionQuestions,
  isDark,
}: DiscussionQuestionsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!discussionQuestions || discussionQuestions.length === 0) {
    return null;
  }

  const textStyle = isDark ? { color: '#d1d5db' } : undefined;

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        className="flex items-center gap-2 text-left text-gray-700 dark:text-gray-300 hover:text-sky-700 dark:hover:text-gray-100"
        style={textStyle}
      >
        <svg
          className={clsx(
            'w-4 h-4 flex-shrink-0 transition-transform duration-200',
            isExpanded ? 'rotate-0' : '-rotate-90'
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M19 9l-7 7-7-7" />
        </svg>
        <strong>Study Questions</strong>
      </button>
      {isExpanded && (
        <ul className="list-disc !pl-8 mt-2">
          {discussionQuestions.map((dq, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300" style={textStyle}>
              {typeof dq.question === 'string' && dq.question.includes('<')
                ? <span dangerouslySetInnerHTML={{ __html: dq.question }} />
                : dq.question}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
