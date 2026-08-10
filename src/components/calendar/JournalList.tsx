import { Link } from "react-router-dom";

import type { JournalEntry } from "../../lib/journal";

type Props = {
  entries: JournalEntry[];
  isLoading?: boolean;
};

export default function JournalList({ entries, isLoading = false }: Props) {
  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center text-muted-foreground">
        Chargement...
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border border-dashed text-muted-foreground">
        Aucun événement enregistré pour l'instant.
      </div>
    );
  }

  return (
    <ol className="relative space-y-6 border-s border-border ps-6">
      {entries.map((entry) => (
        <li key={entry.id} className="relative">
          <span className="absolute -start-[27px] top-1.5 size-2.5 rounded-full bg-primary ring-4 ring-background" />

          <p className="text-xs text-muted-foreground">
            {new Date(entry.date).toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>

          {entry.link ? (
            <Link
              to={entry.link}
              className="font-medium hover:text-primary hover:underline"
            >
              {entry.message}
            </Link>
          ) : (
            <p className="font-medium">{entry.message}</p>
          )}
        </li>
      ))}
    </ol>
  );
}
