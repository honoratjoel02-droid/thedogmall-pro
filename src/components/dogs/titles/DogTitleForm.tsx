import { useState } from "react";

import type { DogTitle, DogTitleCategory } from "../../../types/models/dogTitle";
import { useCreateDogTitle, useUpdateDogTitle } from "../../../hooks/useDogTitles";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

const CATEGORIES: DogTitleCategory[] = [
  "Titre",
  "Résultat d'exposition",
  "Autre récompense",
];

type Props = {
  dogId: string;
  title?: DogTitle;
  onSuccess?: () => void;
};

export default function DogTitleForm({ dogId, title, onSuccess }: Props) {
  const createTitle = useCreateDogTitle();
  const updateTitle = useUpdateDogTitle();

  const [name, setName] = useState(title?.name ?? "");
  const [category, setCategory] = useState<DogTitleCategory>(
    title?.category ?? "Titre",
  );
  const [eventDate, setEventDate] = useState(
    title ? title.eventDate.slice(0, 10) : new Date().toISOString().slice(0, 10),
  );
  const [organization, setOrganization] = useState(title?.organization ?? "");
  const [notes, setNotes] = useState(title?.notes ?? "");
  const [error, setError] = useState("");

  const isPending = createTitle.isPending || updateTitle.isPending;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.trim()) {
      setError("Le nom est obligatoire.");
      return;
    }

    setError("");

    const data = {
      dogId,
      name: name.trim(),
      category,
      eventDate: new Date(eventDate).toISOString(),
      organization: organization || undefined,
      notes: notes || undefined,
    };

    if (title) {
      await updateTitle.mutateAsync({ id: title.id, data });
    } else {
      await createTitle.mutateAsync(data);

      setName("");
      setOrganization("");
      setNotes("");
    }

    onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nom</Label>

        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex : Champion de France, CACIB, Excellent 1..."
        />

        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="eventDate">Date</Label>

          <Input
            id="eventDate"
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Catégorie</Label>

          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as DogTitleCategory)}
            className="w-full rounded-md border bg-background px-3 py-2"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="organization">Organisme / Club (optionnel)</Label>

        <Input
          id="organization"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          placeholder="Ex : Société Centrale Canine, FCI..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>

        <textarea
          id="notes"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full rounded-md border bg-background px-3 py-2"
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending
            ? "Enregistrement..."
            : title
              ? "Enregistrer les modifications"
              : "Ajouter"}
        </Button>
      </div>
    </form>
  );
}
