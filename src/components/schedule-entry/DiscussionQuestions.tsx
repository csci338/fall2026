'use client'

import { DiscussionQuestion } from './types';

interface DiscussionQuestionsProps {
  discussionQuestions?: DiscussionQuestion[];
  isDark?: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function DiscussionQuestions({
  discussionQuestions,
  isDark,
  isExpanded,
  onToggle,
}: DiscussionQuestionsProps) {
  if (!discussionQuestions || discussionQuestions.length === 0) {
    return null;
  }

  const textStyle = isDark ? { color: '#d1d5db' } : undefined;

  return (
    <div className="mt-4">
      <div className="flex items-center gap-1 sm:gap-2">
        <button
          type="button"
          onClick={onToggle}
          aria-label="Toggle study questions"
          aria-expanded={isExpanded}
          className="text-black dark:text-gray-200 hover:text-sky-700 dark:hover:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800 flex justify-center items-center rounded-full w-7 h-7 transition-colors flex-shrink-0"
          style={isDark ? { color: '#e5e7eb' } : undefined}
        >
          {isExpanded ? (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </button>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isExpanded}
          className="text-left text-gray-700 dark:text-gray-300 hover:text-sky-700 dark:hover:text-gray-100"
          style={textStyle}
        >
          <strong>Study Questions</strong>
        </button>
      </div>
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
