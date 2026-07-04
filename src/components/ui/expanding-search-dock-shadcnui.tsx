"use client";

// Adapted from 21st.dev "Expanding Search Dock". Two changes for this codebase:
//   1. Icons come from the site's Phosphor barrel (@/components/icons), not
//      lucide-react, to match the rest of the site and avoid a second icon dep.
//   2. Expansion + query can be controlled by a parent (header search wiring),
//      with a `results` slot and an `alwaysOpen` mode for the mobile menu.
// Used standalone (no props) it still behaves like the original registry demo.

import { AnimatePresence, motion } from "framer-motion";
import { MagnifyingGlass, X } from "@/components/icons";
import { useState, type KeyboardEvent, type ReactNode, type Ref } from "react";

type ExpandingSearchDockProps = {
  /** Live value (controlled). Falls back to internal state if omitted. */
  query?: string;
  onQueryChange?: (query: string) => void;
  /** Fired on form submit (Enter with no result selected). */
  onSearch?: (query: string) => void;
  onInputKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  /** Expanded state (controlled). Falls back to internal state if omitted. */
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  /** Render an always-open full-width field (mobile menu) with no collapse. */
  alwaysOpen?: boolean;
  /** Dropdown content rendered under the field while expanded. */
  results?: ReactNode;
  placeholder?: string;
  inputRef?: Ref<HTMLInputElement>;
};

export function ExpandingSearchDock({
  query: queryProp,
  onQueryChange,
  onSearch,
  onInputKeyDown,
  expanded: expandedProp,
  onExpandedChange,
  alwaysOpen = false,
  results,
  placeholder = "Search...",
  inputRef,
}: ExpandingSearchDockProps) {
  const [internalExpanded, setInternalExpanded] = useState(false);
  const [internalQuery, setInternalQuery] = useState("");

  const expanded = alwaysOpen || (expandedProp ?? internalExpanded);
  const query = queryProp ?? internalQuery;

  const setExpanded = (v: boolean) => {
    onExpandedChange?.(v);
    if (expandedProp === undefined) setInternalExpanded(v);
  };
  const setQuery = (v: string) => {
    onQueryChange?.(v);
    if (queryProp === undefined) setInternalQuery(v);
  };

  const handleCollapse = () => {
    setExpanded(false);
    setQuery("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) onSearch?.(query);
  };

  // ── Mobile: always-open full-width field, results listed inline below ──────
  if (alwaysOpen) {
    return (
      <form onSubmit={handleSubmit} className="relative w-full">
        <div className="flex items-center gap-2 overflow-hidden rounded-full border border-border bg-card">
          <div className="ml-4">
            <MagnifyingGlass className="h-4 w-4 text-muted-foreground" weight="bold" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder={placeholder}
            className="h-12 flex-1 bg-transparent pr-4 text-sm outline-none placeholder:text-muted-foreground"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="mr-2 flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted"
            >
              <X className="h-4 w-4" weight="bold" />
            </button>
          )}
        </div>
        {results}
      </form>
    );
  }

  // ── Desktop: collapsible dock. Expanded field overlays right-anchored so it
  //    doesn't push the nav links around. ─────────────────────────────────────
  return (
    <div className="relative h-12 w-12">
      <AnimatePresence mode="wait">
        {!expanded ? (
          <motion.button
            key="icon"
            type="button"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setExpanded(true)}
            aria-label="Open search"
            className="absolute right-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card transition-colors hover:bg-muted"
          >
            <MagnifyingGlass className="h-5 w-5" weight="bold" />
          </motion.button>
        ) : (
          <motion.form
            key="input"
            initial={{ width: 48, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 48, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onSubmit={handleSubmit}
            className="absolute right-0 top-0"
          >
            <motion.div
              initial={{ backdropFilter: "blur(0px)" }}
              animate={{ backdropFilter: "blur(12px)" }}
              className="relative flex items-center gap-2 overflow-hidden rounded-full border border-border bg-card/80 backdrop-blur-md"
            >
              <div className="ml-4">
                <MagnifyingGlass className="h-4 w-4 text-muted-foreground" weight="bold" />
              </div>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder={placeholder}
                autoFocus
                className="h-12 flex-1 bg-transparent pr-4 text-sm outline-none placeholder:text-muted-foreground"
              />
              <motion.button
                type="button"
                onClick={handleCollapse}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close search"
                className="mr-2 flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted"
              >
                <X className="h-4 w-4" weight="bold" />
              </motion.button>
            </motion.div>
            {results}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
