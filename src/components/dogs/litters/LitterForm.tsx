import { useState } from "react";

import PregnancySelect from "./PregnancySelect";

import type { Litter } from "../../../types/models/litter";
import { useCreateLitter, useUpdateLitter } from "../../../hooks/useLitters";
import { usePregnancies } from "../../../hooks/usePregnancies";
import { useBreedings } from "../../../hooks/useBreedings";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

type LitterFormProps = {
  litter?: Litter;
  onSuccess?: () => void;
};

export default function LitterForm({ litter, onSuccess }: LitterFormProps) {
  const createLitter = useCreateLitter();
  const updateLitter = useUpdateLitter();
  const { data: pregnancies = [] } = usePregnancies();
  const { data: breedings = [] } = useBreedings();

  const [pregnancyId, setPregnancyId] = useState(litter?.pregnancyId ?? "");
  const [birthDate, setBirthDate] = useState(
    litter ? litter.birthDate.slice(0, 10) : new Date().toISOString().slice(0, 10),
  );
  const [malesCount, setMalesCount] = useState(
    litter ? String(litter.malesCount ?? 0) : "0",
  );
  const [femalesCount, setFemalesCount] = useState(
    litter ? String(litter.femalesCount ?? 0) : "0",
  );
  const [notes, setNotes] = useState(litter?.notes ?? "");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const males = Number(malesCount) || 0;
    const females = Number(femalesCount) || 0;

    if (litter) {
      await updateLitter.mutateAsync({
        id: litter.id,
        data: {
          birthDate: new Date(birthDate).toISOString(),
          puppiesCount: males + females,
          malesCount: males,
          femalesCount: females,
          notes: notes || undefined,
        },
      });

      onSuccess?.();
      return;
    }

    if (!pregnancyId) {
      setError("Veuillez sélectionner une gestation.");
      return;
    }

    const pregnancy = pregnancies.find((p) => p.id === pregnancyId);
    const breeding = pregnancy
      ? breedings.find((b) => b.id === pregnancy.breedingId)
      : undefined;

    if (!pregnancy || !breeding) {
      setError("Gestation introuvable.");
      return;
    }

    setError("");

    await createLitter.mutateAsync({
      pregnancyId,
      femaleId: pregnancy.femaleId,
      maleId: breeding.maleId,
      birthDate: new Date(birthDate).toISOString(),
      puppiesCount: males + females,
      malesCount: males,
      femalesCount: females,
      notes: notes || undefined,
    });

    onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {!litter && (
        <div className="space-y-2">
          <Label>Gestation</Label>

          <PregnancySelect value={pregnancyId} onChange={setPregnancyId} />

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="birthDate">Date de mise bas</Label>

        <Input
          id="birthDate"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="malesCount">Nombre de mâles</Label>

          <Input
            id="malesCount"
            type="number"
            min={0}
            value={malesCount}
            onChange={(e) => setMalesCount(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="femalesCount">Nombre de femelles</Label>

          <Input
            id="femalesCount"
            type="number"
            min={0}
            value={femalesCount}
            onChange={(e) => setFemalesCount(e.target.value)}
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
          placeholder="Observations sur la mise bas..."
        />
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={createLitter.isPending || updateLitter.isPending}
        >
          {createLitter.isPending || updateLitter.isPending
            ? "Enregistrement..."
            : litter
              ? "Enregistrer les modifications"
              : "Créer la portée"}
        </Button>
      </div>
    </form>
  );
}
