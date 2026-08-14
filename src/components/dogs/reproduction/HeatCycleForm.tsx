import { useState } from "react";

import type { HeatCycle } from "../../../types/models/heatCycle";
import {
  useCreateHeatCycle,
  useUpdateHeatCycle,
} from "../../../hooks/useHeatCycles";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

type Props = {
  dogId: string;
  cycle?: HeatCycle;
  onSuccess?: () => void;
};

export default function HeatCycleForm({ dogId, cycle, onSuccess }: Props) {
  const createCycle = useCreateHeatCycle();
  const updateCycle = useUpdateHeatCycle();

  const [startDate, setStartDate] = useState(
    cycle ? cycle.startDate.slice(0, 10) : new Date().toISOString().slice(0, 10),
  );
  const [notes, setNotes] = useState(cycle?.notes ?? "");
  const [error, setError] = useState("");

  const isPending = createCycle.isPending || updateCycle.isPending;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!startDate) {
      setError("La date est obligatoire.");
      return;
    }

    setError("");

    const data = {
      dogId,
      startDate: new Date(startDate).toISOString(),
      notes: notes || undefined,
    };

    if (cycle) {
      await updateCycle.mutateAsync({ id: cycle.id, data });
    } else {
      await createCycle.mutateAsync(data);

      setNotes("");
    }

    onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="startDate">Date de début</Label>

        <Input
          id="startDate"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>

        <textarea
          id="notes"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full rounded-md border bg-background px-3 py-2"
          placeholder="Signes observés, durée, comportement..."
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending
            ? "Enregistrement..."
            : cycle
              ? "Enregistrer les modifications"
              : "Ajouter"}
        </Button>
      </div>
    </form>
  );
}
