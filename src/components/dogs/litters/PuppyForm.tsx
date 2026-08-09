import { useState } from "react";

import { useCreatePuppy } from "../../../hooks/usePuppies";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

type PuppyFormProps = {
  litterId: string;
  onSuccess?: () => void;
};

export default function PuppyForm({ litterId, onSuccess }: PuppyFormProps) {
  const createPuppy = useCreatePuppy();

  const [identifier, setIdentifier] = useState("");
  const [sex, setSex] = useState<"Mâle" | "Femelle">("Mâle");
  const [color, setColor] = useState("");
  const [birthWeightGrams, setBirthWeightGrams] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!identifier.trim()) {
      setError("Donnez un identifiant au chiot (ex : Collier bleu).");
      return;
    }

    setError("");

    await createPuppy.mutateAsync({
      litterId,
      identifier: identifier.trim(),
      sex,
      color: color || undefined,
      birthWeightGrams: birthWeightGrams ? Number(birthWeightGrams) : undefined,
      status: "Disponible",
      weightHistory: [],
      vaccinations: [],
      dewormings: [],
      notes: notes || undefined,
    });

    setIdentifier("");
    setColor("");
    setBirthWeightGrams("");
    setNotes("");

    onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="identifier">Identifiant</Label>

        <Input
          id="identifier"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder="Ex : Collier bleu, Chiot n°1..."
        />

        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="sex">Sexe</Label>

        <select
          id="sex"
          value={sex}
          onChange={(e) => setSex(e.target.value as "Mâle" | "Femelle")}
          className="w-full rounded-md border bg-background px-3 py-2"
        >
          <option value="Mâle">Mâle</option>
          <option value="Femelle">Femelle</option>
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="color">Couleur</Label>

          <Input
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="birthWeightGrams">Poids de naissance (g)</Label>

          <Input
            id="birthWeightGrams"
            type="number"
            min={0}
            value={birthWeightGrams}
            onChange={(e) => setBirthWeightGrams(e.target.value)}
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
        <Button type="submit" disabled={createPuppy.isPending}>
          {createPuppy.isPending ? "Enregistrement..." : "Ajouter le chiot"}
        </Button>
      </div>
    </form>
  );
}
