import { useState } from "react";

import type {
  ClientInteraction,
  InteractionType,
} from "../../types/models/clientInteraction";
import {
  useCreateClientInteraction,
  useUpdateClientInteraction,
} from "../../hooks/useClientInteractions";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type Props = {
  clientId: string;
  interaction?: ClientInteraction;
  onSuccess?: () => void;
};

const TYPES: InteractionType[] = ["Appel", "Message", "Visite", "Email", "Autre"];

export default function ClientInteractionForm({
  clientId,
  interaction,
  onSuccess,
}: Props) {
  const createInteraction = useCreateClientInteraction();
  const updateInteraction = useUpdateClientInteraction();

  const [type, setType] = useState<InteractionType>(interaction?.type ?? "Appel");
  const [date, setDate] = useState(
    interaction ? interaction.date.slice(0, 10) : new Date().toISOString().slice(0, 10),
  );
  const [summary, setSummary] = useState(interaction?.summary ?? "");
  const [error, setError] = useState("");

  const isPending = createInteraction.isPending || updateInteraction.isPending;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!summary.trim()) {
      setError("Décrivez brièvement cet échange.");
      return;
    }

    setError("");

    const data = {
      clientId,
      type,
      date: new Date(date).toISOString(),
      summary: summary.trim(),
    };

    if (interaction) {
      await updateInteraction.mutateAsync({ id: interaction.id, data });
    } else {
      await createInteraction.mutateAsync(data);

      setSummary("");
    }

    onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="interactionType">Type</Label>

          <select
            id="interactionType"
            value={type}
            onChange={(e) => setType(e.target.value as InteractionType)}
            className="w-full rounded-md border bg-background px-3 py-2"
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="interactionDate">Date</Label>

          <Input
            id="interactionDate"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="interactionSummary">Résumé</Label>

        <textarea
          id="interactionSummary"
          rows={3}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="w-full rounded-md border bg-background px-3 py-2"
          placeholder="Objet de l'échange, décisions prises..."
        />

        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending
            ? "Enregistrement..."
            : interaction
              ? "Enregistrer les modifications"
              : "Ajouter"}
        </Button>
      </div>
    </form>
  );
}
