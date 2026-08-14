import { useState } from "react";

import DogSelect from "./DogSelect";
import InbreedingEstimate from "./InbreedingEstimate";

import { useCreateBreeding } from "../../../hooks/useBreedings";
import { breedingSchema } from "../../../schemas/breeding";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

type BreedingFormProps = {
  onSuccess?: () => void;
};

export default function BreedingForm({ onSuccess }: BreedingFormProps) {
  const createBreeding = useCreateBreeding();

  const [femaleId, setFemaleId] = useState("");
  const [maleId, setMaleId] = useState("");
  const [breedingDate, setBreedingDate] = useState("");
  const [method, setMethod] = useState<"Naturelle" | "Insémination">(
    "Naturelle",
  );
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = breedingSchema.safeParse({
      femaleId,
      maleId,
      breedingDate,
      method,
      notes,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};

      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0] as string] = issue.message;
      }

      setErrors(fieldErrors);

      return;
    }

    if (femaleId === maleId) {
      setErrors({ maleId: "La femelle et le mâle doivent être différents." });

      return;
    }

    setErrors({});

    await createBreeding.mutateAsync({
      ...result.data,
      status: "En cours",
    });

    setFemaleId("");
    setMaleId("");
    setBreedingDate("");
    setMethod("Naturelle");
    setNotes("");

    onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <DogSelect
          label="Femelle"
          sex="Femelle"
          value={femaleId}
          onChange={setFemaleId}
        />

        {errors.femaleId && (
          <p className="text-sm text-destructive">{errors.femaleId}</p>
        )}
      </div>

      <div className="space-y-2">
        <DogSelect
          label="Mâle"
          sex="Mâle"
          value={maleId}
          onChange={setMaleId}
        />

        {errors.maleId && (
          <p className="text-sm text-destructive">{errors.maleId}</p>
        )}
      </div>

      {femaleId && maleId && femaleId !== maleId && (
        <InbreedingEstimate sireId={maleId} damId={femaleId} />
      )}

      <div className="space-y-2">
        <Label htmlFor="breedingDate">Date de la saillie</Label>

        <Input
          id="breedingDate"
          type="date"
          value={breedingDate}
          onChange={(e) => setBreedingDate(e.target.value)}
        />

        {errors.breedingDate && (
          <p className="text-sm text-destructive">{errors.breedingDate}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="method">Méthode</Label>

        <select
          id="method"
          value={method}
          onChange={(e) =>
            setMethod(e.target.value as "Naturelle" | "Insémination")
          }
          className="w-full rounded-md border bg-background px-3 py-2"
        >
          <option value="Naturelle">Naturelle</option>

          <option value="Insémination">Insémination</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>

        <textarea
          id="notes"
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full rounded-md border bg-background px-3 py-2"
          placeholder="Observations concernant la saillie..."
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={createBreeding.isPending}>
          {createBreeding.isPending
            ? "Enregistrement..."
            : "Enregistrer la saillie"}
        </Button>
      </div>
    </form>
  );
}
