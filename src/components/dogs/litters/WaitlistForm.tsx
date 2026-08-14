import { useState } from "react";

import type { WaitlistEntry } from "../../../types/models/waitlistEntry";
import {
  useCreateWaitlistEntry,
  useUpdateWaitlistEntry,
} from "../../../hooks/useWaitlist";

import { Button } from "../../ui/button";
import { Label } from "../../ui/label";

import ClientSelect from "./ClientSelect";

type Props = {
  litterId: string;
  nextPosition: number;
  entry?: WaitlistEntry;
  onSuccess?: () => void;
};

export default function WaitlistForm({
  litterId,
  nextPosition,
  entry,
  onSuccess,
}: Props) {
  const createEntry = useCreateWaitlistEntry();
  const updateEntry = useUpdateWaitlistEntry();

  const [clientId, setClientId] = useState(entry?.clientId ?? "");
  const [notes, setNotes] = useState(entry?.notes ?? "");
  const [error, setError] = useState("");

  const isPending = createEntry.isPending || updateEntry.isPending;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!clientId) {
      setError("Sélectionnez le client intéressé.");
      return;
    }

    setError("");

    if (entry) {
      await updateEntry.mutateAsync({
        id: entry.id,
        data: { clientId, notes: notes || undefined },
      });
    } else {
      await createEntry.mutateAsync({
        litterId,
        clientId,
        position: nextPosition,
        status: "En attente",
        notes: notes || undefined,
      });

      setClientId("");
      setNotes("");
    }

    onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="waitlistClient">Client intéressé</Label>

        <ClientSelect value={clientId} onChange={setClientId} />

        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="waitlistNotes">Notes</Label>

        <textarea
          id="waitlistNotes"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full rounded-md border bg-background px-3 py-2"
          placeholder="Préférences (sexe, couleur...), acompte versé..."
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending
            ? "Enregistrement..."
            : entry
              ? "Enregistrer les modifications"
              : "Ajouter à la liste d'attente"}
        </Button>
      </div>
    </form>
  );
}
