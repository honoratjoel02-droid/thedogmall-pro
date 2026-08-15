import { useState } from "react";

import type { AnnualGoal } from "../../types/models/annualGoal";
import {
  useCreateAnnualGoal,
  useUpdateAnnualGoal,
} from "../../hooks/useAnnualGoals";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type Props = {
  goal?: AnnualGoal;
  onSuccess?: () => void;
};

export default function AnnualGoalForm({ goal, onSuccess }: Props) {
  const createGoal = useCreateAnnualGoal();
  const updateGoal = useUpdateAnnualGoal();

  const [year, setYear] = useState(
    goal ? String(goal.year) : String(new Date().getFullYear()),
  );
  const [targetLitters, setTargetLitters] = useState(
    goal?.targetLitters ? String(goal.targetLitters) : "",
  );
  const [targetRevenue, setTargetRevenue] = useState(
    goal?.targetRevenue ? String(goal.targetRevenue) : "",
  );
  const [targetReservations, setTargetReservations] = useState(
    goal?.targetReservations ? String(goal.targetReservations) : "",
  );
  const [notes, setNotes] = useState(goal?.notes ?? "");
  const [error, setError] = useState("");

  const isPending = createGoal.isPending || updateGoal.isPending;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!year || Number(year) < 2000) {
      setError("Indiquez une année valide.");
      return;
    }

    setError("");

    const data = {
      year: Number(year),
      targetLitters: targetLitters ? Number(targetLitters) : undefined,
      targetRevenue: targetRevenue ? Number(targetRevenue) : undefined,
      targetReservations: targetReservations
        ? Number(targetReservations)
        : undefined,
      notes: notes || undefined,
    };

    if (goal) {
      await updateGoal.mutateAsync({ id: goal.id, data });
    } else {
      await createGoal.mutateAsync(data);
    }

    onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="year">Année</Label>

        <Input
          id="year"
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          disabled={!!goal}
        />

        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="targetLitters">Portées visées</Label>

          <Input
            id="targetLitters"
            type="number"
            min={0}
            value={targetLitters}
            onChange={(e) => setTargetLitters(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="targetRevenue">Chiffre d'affaires visé (FCFA)</Label>

          <Input
            id="targetRevenue"
            type="number"
            min={0}
            value={targetRevenue}
            onChange={(e) => setTargetRevenue(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="targetReservations">Réservations visées</Label>

          <Input
            id="targetReservations"
            type="number"
            min={0}
            value={targetReservations}
            onChange={(e) => setTargetReservations(e.target.value)}
          />
        </div>
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
            : goal
              ? "Enregistrer les modifications"
              : "Ajouter"}
        </Button>
      </div>
    </form>
  );
}
