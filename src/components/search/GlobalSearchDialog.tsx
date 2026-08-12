import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";

import { useGlobalSearch } from "../../hooks/useGlobalSearch";
import type { SearchResult, SearchResultCategory } from "../../lib/search";

const CATEGORY_ORDER: SearchResultCategory[] = [
  "Chiens",
  "Clients",
  "Portées",
  "Saillies",
];

export default function GlobalSearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const results = useGlobalSearch(query);

  function handleQueryChange(value: string) {
    setQuery(value);
    setActiveIndex(0);
  }

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
    }

    window.addEventListener("keydown", handleShortcut);

    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  function goTo(result: SearchResult) {
    navigate(result.link);
    setOpen(false);
    setQuery("");
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter" && results[activeIndex]) {
      event.preventDefault();
      goTo(results[activeIndex]);
    }
  }

  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    items: results.filter((result) => result.category === category),
  })).filter((group) => group.items.length > 0);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-input px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <Search size={16} />
        <span className="hidden sm:inline">Rechercher…</span>
        <kbd className="hidden rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium sm:inline">
          Ctrl K
        </kbd>
      </button>

      <Dialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) setQuery("");
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="top-24 max-w-[calc(100%-2rem)] -translate-y-0 gap-0 p-0 sm:max-w-lg"
        >
          <DialogHeader className="hidden">
            <DialogTitle>Recherche</DialogTitle>
          </DialogHeader>

          <div className="flex items-center gap-2 border-b border-border px-3">
            <Search size={16} className="shrink-0 text-muted-foreground" />

            <Input
              autoFocus
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Rechercher un chien, un client, une portée…"
              className="h-11 border-0 shadow-none focus-visible:ring-0"
            />
          </div>

          <div className="max-h-80 overflow-y-auto p-2">
            {query.trim() === "" && (
              <p className="p-4 text-center text-sm text-muted-foreground">
                Commencez à taper pour rechercher.
              </p>
            )}

            {query.trim() !== "" && results.length === 0 && (
              <p className="p-4 text-center text-sm text-muted-foreground">
                Aucun résultat pour « {query} ».
              </p>
            )}

            {grouped.map((group) => (
              <div key={group.category} className="mb-2 last:mb-0">
                <p className="px-2 py-1 text-xs font-medium text-muted-foreground">
                  {group.category}
                </p>

                {group.items.map((result) => {
                  const index = results.indexOf(result);

                  return (
                    <button
                      key={result.id}
                      onClick={() => goTo(result)}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={`flex w-full flex-col items-start rounded-lg px-2 py-2 text-left transition-colors ${
                        index === activeIndex
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-accent/50"
                      }`}
                    >
                      <span className="text-sm font-medium">{result.title}</span>

                      {result.subtitle && (
                        <span className="text-xs text-muted-foreground">
                          {result.subtitle}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
