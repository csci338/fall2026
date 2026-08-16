'use client';

import { useLayoutEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

/** Slot id for the full-bleed page header above content + TOC. */
export const PAGE_HEADER_SLOT_ID = 'page-header-slot';

/**
 * Portals the page title banner into #page-header-slot so it spans the full
 * width of the main column (including over the TOC) while remaining in the
 * same scroll container — so it scrolls with the page, and the TOC sits below.
 */
export function PageHeaderPortal({ children }: { children: ReactNode }) {
  const [slot, setSlot] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    setSlot(document.getElementById(PAGE_HEADER_SLOT_ID));
  }, []);

  if (slot) return createPortal(children, slot);
  // Before mount / if ContentLayout isn't present, keep the banner in flow
  return <>{children}</>;
}
