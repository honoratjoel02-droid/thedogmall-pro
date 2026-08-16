import { useState } from "react";

import type { KennelNote } from "../../types/models/kennelNote";
import {
  useCreateKennelNote,
  useUpdateKennelNote,
} from "../../hooks/useKennelNotes";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type Props = {
  note?: KennelNote;
  onSuccess?: () => void;
};

export default function KennelNoteForm({ note, onSuccess }: Props) {
  const createNote = useCreateKennelNote();
  const updateNote = useUpdateKennelNote();

  const [date, setDate] = useState(
    note ? note.date.slice(0, 10) : new Date().toISOString().slice(0, 10),
  );
  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.content ?? "");
  const [error, setError] = useState("");

  const isPending = createNote.isPending || updateNote.isPending;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim()) {
      setError("Le titre est obligatoire.");
      return;
    }

    setError("");

    const data = {
      date: new Date(date).toISOString(),
      title: title.trim(),
      content: content.trim(),
    };

    if (note) {
      await updateNote.mutateAsync({ id: note.id, data });
    } else {
      await createNote.mutateAsync(data);

      setTitle("");
      setContent("");
    }

    onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>

          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Titre</Label>

          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex : Bilan de la saison, Observation générale..."
          />

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Contenu</Label>

        <textarea
          id="content"
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-md border bg-background px-3 py-2"
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending
            ? "Enregistrement..."
            : note
              ? "Enregistrer les modifications"
              : "Ajouter la note"}
        </Button>
      </div>
    </form>
  );
}
