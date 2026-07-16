import { useState } from "react";

import DogSelect from "./DogSelect";

import { useCreateBreeding } from "../../../hooks/useBreedings";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

export default function BreedingForm() {
  const createBreeding = useCreateBreeding();

  const [femaleId, setFemaleId] = useState("");
  const [maleId, setMaleId] = useState("");
  const [breedingDate, setBreedingDate] = useState("");
  const [method, setMethod] = useState<"Naturelle" | "Insémination">(
    "Naturelle",
  );
  const [notes, setNotes] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    createBreeding.mutate({
      femaleId,
      maleId,
      breedingDate,
      method,
      notes,
      status: "En cours",
    });

    setFemaleId("");
    setMaleId("");
    setBreedingDate("");
    setMethod("Naturelle");
    setNotes("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <DogSelect
        label="Femelle"
        sex="Femelle"
        value={femaleId}
        onChange={setFemaleId}
      />

      <DogSelect label="Mâle" sex="Mâle" value={maleId} onChange={setMaleId} />

      <div className="space-y-2">
        <Label htmlFor="breedingDate">Date de la saillie</Label>

        <Input
          id="breedingDate"
          type="date"
          value={breedingDate}
          onChange={(e) => setBreedingDate(e.target.value)}
        />
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
