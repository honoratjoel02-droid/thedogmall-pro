import { NotebookPen } from "lucide-react";

import type { KennelNote } from "../../types/models/kennelNote";

import EmptyState from "../ui/empty-state";
import LoadingState from "../ui/loading-state";

import EditKennelNoteDialog from "./EditKennelNoteDialog";
import DeleteKennelNoteDialog from "./DeleteKennelNoteDialog";

type Props = {
  notes: KennelNote[];
  isLoading?: boolean;
};

export default function KennelNoteList({ notes, isLoading = false }: Props) {
  if (isLoading) {
    return <LoadingState rows={3} />;
  }

  if (notes.length === 0) {
    return <EmptyState icon={NotebookPen} label="Aucune note d'élevage enregistrée." />;
  }

  const sorted = [...notes].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <ol className="relative space-y-6 border-s border-border ps-6">
      {sorted.map((note) => (
        <li key={note.id} className="relative">
          <span className="absolute -start-[27px] top-1.5 size-2.5 rounded-full bg-primary ring-4 ring-background" />

          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">
                {new Date(note.date).toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>

              <p className="font-medium">{note.title}</p>

              {note.content && (
                <p className="whitespace-pre-wrap text-sm text-muted-foreground">
                  {note.content}
                </p>
              )}
            </div>

            <div className="flex shrink-0 gap-2">
              <EditKennelNoteDialog note={note} />
              <DeleteKennelNoteDialog note={note} />
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
