// src/components/dogs/form/DogReproductionSection.tsx

import type { Dispatch, SetStateAction } from "react";

import { Label } from "../../ui/label";

import type { DogFormData } from "./types";

interface Props {
  value: DogFormData;
  onChange: Dispatch<SetStateAction<DogFormData>>;
}

export default function DogReproductionSection({ value, onChange }: Props) {
  function updateField<K extends keyof DogFormData["reproduction"]>(
    field: K,
    fieldValue: DogFormData["reproduction"][K],
  ) {
    onChange((prev) => ({
      ...prev,
      reproduction: {
        ...prev.reproduction,
        [field]: fieldValue,
      },
    }));
  }

  return (
    <section className="space-y-6 rounded-xl border p-6">
      <div>
        <h2 className="text-xl font-semibold">🧬 Reproduction</h2>

        <p className="text-sm text-muted-foreground">
          Définissez si ce chien participe au programme d'élevage.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Label>Reproducteur</Label>

          <select
            className="mt-2 w-full rounded-lg border p-2"
            value={value.reproduction.breeder ? "true" : "false"}
            onChange={(e) => updateField("breeder", e.target.value === "true")}
          >
            <option value="true">Oui</option>
            <option value="false">Non</option>
          </select>
        </div>

        <div>
          <Label>Fertile</Label>

          <select
            className="mt-2 w-full rounded-lg border p-2"
            value={value.reproduction.fertile ? "true" : "false"}
            onChange={(e) => updateField("fertile", e.target.value === "true")}
          >
            <option value="true">Oui</option>
            <option value="false">Non</option>
          </select>
        </div>
      </div>
    </section>
  );
}
