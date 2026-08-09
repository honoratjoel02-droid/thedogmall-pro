// src/components/dogs/form/DogHealthSection.tsx

import type { Dispatch, SetStateAction } from "react";

import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

import type { DogFormData } from "./types";

interface Props {
  value: DogFormData;
  onChange: Dispatch<SetStateAction<DogFormData>>;
}

export default function DogHealthSection({ value, onChange }: Props) {
  function updateField<K extends keyof DogFormData["health"]>(
    field: K,
    fieldValue: DogFormData["health"][K],
  ) {
    onChange((prev) => ({
      ...prev,
      health: {
        ...prev.health,
        [field]: fieldValue,
      },
    }));
  }

  return (
    <section className="space-y-6 rounded-xl border p-6">
      <div>
        <h2 className="text-xl font-semibold">❤️ Santé</h2>

        <p className="text-sm text-muted-foreground">
          Informations médicales et suivi du chien.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>Poids (kg)</Label>

          <Input
            type="number"
            step="0.1"
            value={value.health.weight}
            onChange={(e) => updateField("weight", Number(e.target.value))}
          />
        </div>

        <div>
          <Label>État corporel (1 à 9)</Label>

          <Input
            type="number"
            min={1}
            max={9}
            value={value.health.bodyConditionScore ?? ""}
            onChange={(e) =>
              updateField(
                "bodyConditionScore",
                e.target.value === "" ? undefined : Number(e.target.value),
              )
            }
          />
        </div>

        <div>
          <Label>Groupe sanguin</Label>

          <Input
            value={value.health.bloodType ?? ""}
            onChange={(e) => updateField("bloodType", e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <Label>Allergies (séparées par des virgules)</Label>

          <Input
            value={(value.health.allergies ?? []).join(", ")}
            onChange={(e) =>
              updateField(
                "allergies",
                e.target.value
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean),
              )
            }
          />
        </div>

        <div className="md:col-span-2">
          <Label>Notes vétérinaires</Label>

          <textarea
            className="min-h-32 w-full rounded-lg border p-3"
            value={value.health.notes ?? ""}
            onChange={(e) => updateField("notes", e.target.value)}
          />
        </div>
      </div>
    </section>
  );
}
