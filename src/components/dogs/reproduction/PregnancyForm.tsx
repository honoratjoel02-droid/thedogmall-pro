import { useState } from "react";

import type { Pregnancy, PregnancyStatus } from "../../../types/models/pregnancy";
import { useUpdatePregnancy } from "../../../hooks/usePregnancies";
import { useUpdateBreeding } from "../../../hooks/useBreedings";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

type PregnancyFormProps = {
  pregnancy: Pregnancy;
  onSuccess?: () => void;
};

export default function PregnancyForm({
  pregnancy,
  onSuccess,
}: PregnancyFormProps) {
  const updatePregnancy = useUpdatePregnancy();
  const updateBreeding = useUpdateBreeding();

  const [expectedBirthDate, setExpectedBirthDate] = useState(
    pregnancy.expectedBirthDate.slice(0, 10),
  );
  const [ultrasoundDate, setUltrasoundDate] = useState(
    pregnancy.ultrasoundDate?.slice(0, 10) ?? "",
  );
  const [ultrasoundResult, setUltrasoundResult] = useState(
    pregnancy.ultrasoundResult ?? "",
  );
  const [xrayDate, setXrayDate] = useState(
    pregnancy.xrayDate?.slice(0, 10) ?? "",
  );
  const [xrayResult, setXrayResult] = useState(pregnancy.xrayResult ?? "");
  const [puppyCountEstimate, setPuppyCountEstimate] = useState(
    pregnancy.puppyCountEstimate?.toString() ?? "",
  );
  const [status, setStatus] = useState<PregnancyStatus>(pregnancy.status);
  const [notes, setNotes] = useState(pregnancy.notes ?? "");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await updatePregnancy.mutateAsync({
      id: pregnancy.id,
      data: {
        expectedBirthDate: new Date(expectedBirthDate).toISOString(),
        ultrasoundDate: ultrasoundDate
          ? new Date(ultrasoundDate).toISOString()
          : undefined,
        ultrasoundResult: ultrasoundResult || undefined,
        xrayDate: xrayDate ? new Date(xrayDate).toISOString() : undefined,
        xrayResult: xrayResult || undefined,
        puppyCountEstimate: puppyCountEstimate
          ? Number(puppyCountEstimate)
          : undefined,
        status,
        notes: notes || undefined,
      },
    });

    if (status === "Terminée" || status === "Interrompue") {
      await updateBreeding.mutateAsync({
        id: pregnancy.breedingId,
        data: { status: status === "Terminée" ? "Terminée" : "Échec" },
      });
    }

    onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="expectedBirthDate">Date prévue de mise bas</Label>

        <Input
          id="expectedBirthDate"
          type="date"
          value={expectedBirthDate}
          onChange={(e) => setExpectedBirthDate(e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="ultrasoundDate">Échographie</Label>

          <Input
            id="ultrasoundDate"
            type="date"
            value={ultrasoundDate}
            onChange={(e) => setUltrasoundDate(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ultrasoundResult">Résultat échographie</Label>

          <Input
            id="ultrasoundResult"
            value={ultrasoundResult}
            onChange={(e) => setUltrasoundResult(e.target.value)}
            placeholder="Ex : gestation confirmée"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="xrayDate">Radiographie</Label>

          <Input
            id="xrayDate"
            type="date"
            value={xrayDate}
            onChange={(e) => setXrayDate(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="puppyCountEstimate">Nombre de chiots estimé</Label>

          <Input
            id="puppyCountEstimate"
            type="number"
            min={0}
            value={puppyCountEstimate}
            onChange={(e) => setPuppyCountEstimate(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="xrayResult">Résultat radiographie</Label>

        <Input
          id="xrayResult"
          value={xrayResult}
          onChange={(e) => setXrayResult(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Statut de la gestation</Label>

        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as PregnancyStatus)}
          className="w-full rounded-md border bg-background px-3 py-2"
        >
          <option value="En cours">En cours</option>
          <option value="Confirmée">Confirmée</option>
          <option value="Terminée">Terminée (mise bas)</option>
          <option value="Interrompue">Interrompue</option>
        </select>
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
        <Button type="submit" disabled={updatePregnancy.isPending}>
          {updatePregnancy.isPending ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </div>
    </form>
  );
}
