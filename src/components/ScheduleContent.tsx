'use client'

import { useState, useEffect, useLayoutEffect, useMemo } from 'react';
import PageHeader from '@/components/PageHeaderExpandable';
import Meeting from '@/components/schedule-entry/Meeting';
import DiscussionQuestions from '@/components/schedule-entry/DiscussionQuestions';
import ExpandableSectionHeading from '@/components/ExpandableSectionHeading';
import { useExpandedSet } from '@/hooks/useExpandedSet';

import { Topic } from '@/lib/topics';

interface ScheduleContentProps {
  topics: Topic[];
}

function meetingKeyFor(meeting: { date: string; topic: string }) {
  return `meeting-${meeting.date}-${meeting.topic.replace(/\s+/g, '-').toLowerCase()}`;
}

export default function ScheduleContent({ topics }: ScheduleContentProps) {
  // Start with empty state to match server render (prevents hydration mismatch)
  const [meetingStates, setMeetingStates] = useState<Record<string, boolean>>({});
  const [studyQuestionStates, setStudyQuestionStates] = useState<Record<string, boolean>>({});

  const topicKeys = useMemo(
    () => topics.map((topic) => String(topic.id)),
    [topics]
  );

  const {
    expanded: expandedTopics,
    toggle: toggleTopic,
    expandAll: expandAllTopics,
    collapseAll: collapseAllTopics,
  } = useExpandedSet();

  const [isExpandedAll, setIsExpandedAll] = useState(false);
  
  // Load saved states from localStorage synchronously before paint
  // This ensures meeting states are restored BEFORE scroll position restoration
  // We use useLayoutEffect to run before paint, but only on client
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    
    const savedStates: Record<string, boolean> = {};
    const topicsWithExpandedMeetings: string[] = [];

    topics.forEach(topic => {
      let topicHasExpandedMeeting = false;
      topic.meetings.forEach((meeting) => {
        const meetingKey = meetingKeyFor(meeting);
        const savedState = localStorage.getItem(meetingKey);
        if (savedState !== null) {
          const expanded = JSON.parse(savedState);
          savedStates[meetingKey] = expanded;
          if (expanded) topicHasExpandedMeeting = true;
        }
      });
      if (topicHasExpandedMeeting) {
        topicsWithExpandedMeetings.push(String(topic.id));
      }
    });
    setMeetingStates(savedStates);
    expandAllTopics(topicsWithExpandedMeetings);
    setStudyQuestionStates(
      Object.fromEntries(topicsWithExpandedMeetings.map((id) => [id, true]))
    );
    setIsExpandedAll(
      topics.length > 0 && topicsWithExpandedMeetings.length === topics.length
    );
    
    // Signal that meeting states are ready for scroll restoration
    // Dispatch a custom event that ContentLayout can listen for
    // Use a small delay to ensure state update has been processed
    requestAnimationFrame(() => {
      window.dispatchEvent(new CustomEvent('meeting-states-restored'));
    });
  }, [topics, expandAllTopics]);
  
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if dark mode is active
    setIsDark(document.documentElement.classList.contains('dark'));
    
    // Watch for dark mode changes
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  const setMeetingState = (meetingKey: string, show: boolean) => {
    setMeetingStates(prev => ({
      ...prev,
      [meetingKey]: show
    }));
    if (typeof window !== 'undefined') {
      localStorage.setItem(meetingKey, JSON.stringify(show));
    }
  };

  const setTopicMeetingStates = (topic: Topic, expanded: boolean) => {
    setMeetingStates((prev) => {
      const next = { ...prev };
      topic.meetings.forEach((meeting) => {
        const meetingKey = meetingKeyFor(meeting);
        next[meetingKey] = expanded;
        localStorage.setItem(meetingKey, JSON.stringify(expanded));
      });
      return next;
    });
  };

  const setAllMeetingStates = (expanded: boolean) => {
    const newStates: Record<string, boolean> = {};
    topics.forEach((topic) => {
      topic.meetings.forEach((meeting) => {
        const meetingKey = meetingKeyFor(meeting);
        newStates[meetingKey] = expanded;
        localStorage.setItem(meetingKey, JSON.stringify(expanded));
      });
    });
    setMeetingStates(newStates);
  };

  const setAllStudyQuestionStates = (expanded: boolean) => {
    setStudyQuestionStates(
      Object.fromEntries(topicKeys.map((key) => [key, expanded]))
    );
  };

  const handleToggleTopic = (topic: Topic) => {
    const topicKey = String(topic.id);
    const nextExpanded = !expandedTopics.has(topicKey);
    toggleTopic(topicKey);
    setTopicMeetingStates(topic, nextExpanded);
    setStudyQuestionStates((prev) => ({
      ...prev,
      [topicKey]: nextExpanded,
    }));

    const nextExpandedTopics = new Set(expandedTopics);
    if (nextExpanded) nextExpandedTopics.add(topicKey);
    else nextExpandedTopics.delete(topicKey);
    setIsExpandedAll(
      topicKeys.length > 0 && topicKeys.every((key) => nextExpandedTopics.has(key))
    );
  };

  const handleToggleAll = () => {
    const nextExpanded = !isExpandedAll;
    setIsExpandedAll(nextExpanded);
    if (nextExpanded) {
      expandAllTopics(topicKeys);
    } else {
      collapseAllTopics();
    }
    setAllMeetingStates(nextExpanded);
    setAllStudyQuestionStates(nextExpanded);
  };

  const handleToggleStudyQuestions = (topicKey: string) => {
    setStudyQuestionStates((prev) => ({
      ...prev,
      [topicKey]: !prev[topicKey],
    }));
  };

  return (
    <div className="space-y-6 schedule-content" suppressHydrationWarning>
      <PageHeader
        title="Course Schedule"
        excerpt="This schedule will definitely change over the course of the semester. Please continue to check back for updates."
        isExpandedAll={isExpandedAll}
        onToggleAll={handleToggleAll}
        isDark={isDark}
      />
      {topics.map((topic) => {
        const topicKey = String(topic.id);
        const isTopicExpanded = expandedTopics.has(topicKey);
        const title = `${topic.id}. ${topic.title}`;

        return (
          <div key={topic.id} id={`topic-${topic.id}`} className="pt-12 mb-16 first:pt-8">
            <ExpandableSectionHeading
              title={title}
              isExpanded={isTopicExpanded}
              onToggle={() => handleToggleTopic(topic)}
              ariaLabelExpand={`Expand meetings in ${title}`}
              ariaLabelCollapse={`Collapse meetings in ${title}`}
              isDark={isDark}
            />
            <div className="mt-4">
              <div
                className="pb-6 !mb-0 border-b border-black dark:border-gray-800 text-gray-700 dark:text-gray-300"
                style={isDark ? { borderColor: '#1f2937', color: '#d1d5db' } : undefined}
              >
                {topic.description && (
                  typeof topic.description === 'string'
                    ? <p className="!mb-0">{topic.description}</p>
                    : topic.description
                )}
                <DiscussionQuestions
                  discussionQuestions={topic.discussionQuestions}
                  isDark={isDark}
                  isExpanded={!!studyQuestionStates[topicKey]}
                  onToggle={() => handleToggleStudyQuestions(topicKey)}
                />
              </div>
              
              {topic.meetings.map((meeting, index) => {
                const meetingKey = meetingKeyFor(meeting);
                return (
                  <Meeting 
                    meeting={meeting} 
                    key={`${topic.id}-${index}`}
                    showDetails={meetingStates[meetingKey] || false}
                    setShowDetails={(show) => setMeetingState(meetingKey, show)}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
