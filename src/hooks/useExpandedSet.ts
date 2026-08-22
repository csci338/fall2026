import { useState, useCallback } from 'react';

export interface UseExpandedSetResult {
  expanded: Set<string>;
  toggle: (key: string) => void;
  /** Replace expanded set with exactly these keys (one state update). */
  expandAll: (keys: string[]) => void;
  /** Clear the set (one state update). */
  collapseAll: () => void;
}

export function useExpandedSet(initial?: Set<string>): UseExpandedSetResult {
  const [expanded, setExpanded] = useState<Set<string>>(initial ?? new Set());

  const toggle = useCallback((key: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const expandAll = useCallback((keys: string[]) => {
    setExpanded(new Set(keys));
  }, []);

  const collapseAll = useCallback(() => {
    setExpanded(new Set());
  }, []);

  return { expanded, toggle, expandAll, collapseAll };
}
