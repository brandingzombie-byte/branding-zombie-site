"use client";

// Header search: wires the ExpandingSearchDock to the in-memory site index
// (src/lib/search.ts). Owns query + result selection + keyboard nav and renders
// a results dropdown. Two variants: a collapsible dock for the desktop navbar
// and an always-open field for the mobile menu.

import { useEffect, useMemo, useRef, useState } from "react";
import { ExpandingSearchDock } from "@/components/ui/expanding-search-dock-shadcnui";
import { search, type SearchDoc, type SearchType } from "@/lib/search";
import { cn } from "@/lib/utils";

const TYPE_LABEL: Record<SearchType, string> = {
  Service: "Service",
  Industry: "Industry",
  Article: "Blog",
  Work: "Work",
  Page: "Page",
};

function navigate(href: string) {
  window.location.href = href;
}

function Results({
  query,
  results,
  selected,
  onHover,
  variant,
}: {
  query: string;
  results: SearchDoc[];
  selected: number;
  onHover: (i: number) => void;
  variant: "desktop" | "mobile";
}) {
  if (!query.trim()) return null;

  return (
    <div
      className={cn(
        "z-50 overflow-hidden rounded-2xl border border-border bg-card/95 shadow-xl backdrop-blur-md",
        variant === "desktop"
          ? "absolute right-0 top-14 w-[340px]"
          : "mt-3 w-full",
      )}
      role="listbox"
    >
      {results.length === 0 ? (
        <p className="px-4 py-6 text-center text-sm text-muted-foreground">
          No results for &ldquo;{query.trim()}&rdquo;
        </p>
      ) : (
        <ul className="max-h-[60vh] overflow-y-auto py-2">
          {results.map((r, i) => (
            <li key={`${r.type}-${r.href}-${i}`}>
              <a
                href={r.href}
                role="option"
                aria-selected={i === selected}
                onMouseEnter={() => onHover(i)}
                className={cn(
                  "flex items-center justify-between gap-3 px-4 py-2.5 transition-colors",
                  i === selected ? "bg-muted" : "hover:bg-muted/60",
                )}
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-foreground">
                    {r.title}
                  </span>
                  {r.subtitle && (
                    <span className="block truncate text-xs text-muted-foreground">
                      {r.subtitle}
                    </span>
                  )}
                </span>
                <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                  {TYPE_LABEL[r.type]}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function HeaderSearch({
  variant = "desktop",
}: {
  variant?: "desktop" | "mobile";
}) {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => search(query), [query]);

  // Reset highlight whenever the result set changes.
  useEffect(() => setSelected(0), [query]);

  // ⌘K / Ctrl+K opens the desktop dock and focuses the field.
  useEffect(() => {
    if (variant !== "desktop") return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setExpanded(true);
        requestAnimationFrame(() => inputRef.current?.focus());
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [variant]);

  // Click outside collapses the desktop dock.
  useEffect(() => {
    if (variant !== "desktop" || !expanded) return;
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setExpanded(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [variant, expanded]);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      const target = results[selected];
      if (target) {
        e.preventDefault();
        navigate(target.href);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      if (query) {
        setQuery("");
      } else {
        setExpanded(false);
        inputRef.current?.blur();
      }
    }
  };

  const dock = (
    <ExpandingSearchDock
      query={query}
      onQueryChange={setQuery}
      onSearch={() => results[0] && navigate(results[0].href)}
      onInputKeyDown={handleInputKeyDown}
      expanded={variant === "desktop" ? expanded : undefined}
      onExpandedChange={setExpanded}
      alwaysOpen={variant === "mobile"}
      inputRef={inputRef}
      placeholder={variant === "desktop" ? "Search the site…  (⌘K)" : "Search services, work, blog…"}
      results={
        <Results
          query={query}
          results={results}
          selected={selected}
          onHover={setSelected}
          variant={variant}
        />
      }
    />
  );

  if (variant === "mobile") return dock;

  return (
    <div ref={containerRef} className="relative">
      {dock}
    </div>
  );
}
