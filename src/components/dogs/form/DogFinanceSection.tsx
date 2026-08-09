// src/components/dogs/form/DogFinanceSection.tsx

import type { Dispatch, SetStateAction } from "react";

import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

import type { DogFormData } from "./types";

interface Props {
  value: DogFormData;
  onChange: Dispatch<SetStateAction<DogFormData>>;
}

export default function DogFinanceSection({ value, onChange }: Props) {
  function updateField<K extends keyof DogFormData["finance"]>(
    field: K,
    fieldValue: DogFormData["finance"][K],
  ) {
    onChange((prev) => ({
      ...prev,
      finance: {
        ...prev.finance,
        [field]: fieldValue,
      },
    }));
  }

  return (
    <section className="space-y-6 rounded-xl border p-6">
      <div>
        <h2 className="text-xl font-semibold">💰 Finances</h2>

        <p className="text-sm text-muted-foreground">
          Informations financières relatives au chien.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>Prix d'achat</Label>

          <Input
            type="number"
            min={0}
            step="1000"
            value={value.finance.purchasePrice ?? ""}
            onChange={(e) =>
              updateField(
                "purchasePrice",
                e.target.value === "" ? undefined : Number(e.target.value),
              )
            }
          />
        </div>

        <div>
          <Label>Valeur actuelle</Label>

          <Input
            type="number"
            min={0}
            step="1000"
            value={value.finance.currentValue ?? ""}
            onChange={(e) =>
              updateField(
                "currentValue",
                e.target.value === "" ? undefined : Number(e.target.value),
              )
            }
          />
        </div>
      </div>
    </section>
  );
}
