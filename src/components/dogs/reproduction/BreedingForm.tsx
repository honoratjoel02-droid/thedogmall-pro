import { useState } from "react";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

import DogSelect from "./DogSelect";

import type { Breeding, BreedingMethod } from "../../../types/models/breeding";

type Props = {
  onSubmit: (
    breeding: Omit<Breeding, "id" | "createdAt" | "updatedAt">,
  ) => void;
};

export default function BreedingForm({ onSubmit }: Props) {
  const [femaleId, setFemaleId] = useState("");

  const [maleId, setMaleId] = useState("");

  const [breedingDates, setBreedingDates] = useState([""]);

  const [method, setMethod] = useState<BreedingMethod>("Naturelle");

  const [notes, setNotes] = useState("");

  function updateDate(index: number, value: string) {
    const copy = [...breedingDates];

    copy[index] = value;

    setBreedingDates(copy);
  }

  function addDate() {
    setBreedingDates([...breedingDates, ""]);
  }

  function removeDate(index: number) {
    if (breedingDates.length === 1) return;

    setBreedingDates(breedingDates.filter((_, i) => i !== index));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!femaleId || !maleId) return;

    const dates = breedingDates.filter((d) => d !== "");

    if (dates.length === 0) return;

    onSubmit({
      femaleId,
      maleId,
      breedingDates: dates,
      method,
      pregnancyStatus: "En attente",
      notes,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label>Femelle</Label>

        <DogSelect sex="Femelle" value={femaleId} onChange={setFemaleId} />
      </div>

      <div>
        <Label>Mâle</Label>

        <DogSelect sex="Mâle" value={maleId} onChange={setMaleId} />
      </div>

      <div className="space-y-3">
        <Label>Dates des saillies</Label>

        {breedingDates.map((date, index) => (
          <div key={index} className="flex gap-2">
            <Input
              type="date"
              value={date}
              onChange={(e) => updateDate(index, e.target.value)}
            />

            {breedingDates.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => removeDate(index)}
              >
                ✕
              </Button>
            )}
          </div>
        ))}

        <Button type="button" variant="outline" onClick={addDate}>
          + Ajouter une date
        </Button>
      </div>

      <div>
        <Label>Mode</Label>

        <select
          className="w-full rounded-lg border p-2"
          value={method}
          onChange={(e) => setMethod(e.target.value as BreedingMethod)}
        >
          <option value="Naturelle">Naturelle</option>

          <option value="Insémination">Insémination</option>
        </select>
      </div>

      <div>
        <Label>Observations</Label>

        <textarea
          className="min-h-28 w-full rounded-lg border p-3"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <Button type="submit" className="w-full">
        Enregistrer la saillie
      </Button>
    </form>
  );
}
