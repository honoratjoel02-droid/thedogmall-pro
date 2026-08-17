import { useState } from "react";

import type { FeedingLog } from "../../../types/models/feedingLog";
import {
  useCreateFeedingLog,
  useUpdateFeedingLog,
} from "../../../hooks/useFeedingLogs";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

type Props = {
  dogId: string;
  log?: FeedingLog;
  onSuccess?: () => void;
};

export default function FeedingLogForm({ dogId, log, onSuccess }: Props) {
  const createLog = useCreateFeedingLog();
  const updateLog = useUpdateFeedingLog();

  const [date, setDate] = useState(
    log ? log.date.slice(0, 10) : new Date().toISOString().slice(0, 10),
  );
  const [foodBrand, setFoodBrand] = useState(log?.foodBrand ?? "");
  const [dailyQuantityGrams, setDailyQuantityGrams] = useState(
    log ? String(log.dailyQuantityGrams) : "",
  );
  const [mealsPerDay, setMealsPerDay] = useState(
    log ? String(log.mealsPerDay) : "2",
  );
  const [notes, setNotes] = useState(log?.notes ?? "");
  const [error, setError] = useState("");

  const isPending = createLog.isPending || updateLog.isPending;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!foodBrand.trim()) {
      setError("La marque ou le type d'aliment est obligatoire.");
      return;
    }

    if (!dailyQuantityGrams || Number(dailyQuantityGrams) <= 0) {
      setError("La quantité journalière doit être supérieure à 0.");
      return;
    }

    setError("");

    const data = {
      dogId,
      date: new Date(date).toISOString(),
      foodBrand: foodBrand.trim(),
      dailyQuantityGrams: Number(dailyQuantityGrams),
      mealsPerDay: Number(mealsPerDay) || 1,
      notes: notes || undefined,
    };

    if (log) {
      await updateLog.mutateAsync({ id: log.id, data });
    } else {
      await createLog.mutateAsync(data);

      setFoodBrand("");
      setDailyQuantityGrams("");
      setMealsPerDay("2");
      setNotes("");
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
          <Label htmlFor="foodBrand">Marque / type d'aliment</Label>

          <Input
            id="foodBrand"
            value={foodBrand}
            onChange={(e) => setFoodBrand(e.target.value)}
            placeholder="Ex : Royal Canin Medium Adult..."
          />
        </div>

        {error && (
          <p className="text-sm text-destructive sm:col-span-2">{error}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="dailyQuantityGrams">Quantité journalière (g)</Label>

          <Input
            id="dailyQuantityGrams"
            type="number"
            min={0}
            step="1"
            value={dailyQuantityGrams}
            onChange={(e) => setDailyQuantityGrams(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mealsPerDay">Repas par jour</Label>

          <Input
            id="mealsPerDay"
            type="number"
            min={1}
            step="1"
            value={mealsPerDay}
            onChange={(e) => setMealsPerDay(e.target.value)}
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
          placeholder="Ex : transition progressive, sensibilité digestive..."
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending
            ? "Enregistrement..."
            : log
              ? "Enregistrer les modifications"
              : "Ajouter"}
        </Button>
      </div>
    </form>
  );
}
