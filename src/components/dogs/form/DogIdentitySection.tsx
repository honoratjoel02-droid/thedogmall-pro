// src/components/dogs/form/DogIdentitySection.tsx

import type { Dispatch, SetStateAction } from "react";

import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

import type { DogFormData } from "./types";

interface Props {
  value: DogFormData;
  onChange: Dispatch<SetStateAction<DogFormData>>;
}

export default function DogIdentitySection({ value, onChange }: Props) {
  function updateField<K extends keyof DogFormData["identity"]>(
    field: K,
    fieldValue: DogFormData["identity"][K],
  ) {
    onChange((prev) => ({
      ...prev,
      identity: {
        ...prev.identity,
        [field]: fieldValue,
      },
    }));
  }

  return (
    <section className="space-y-6 rounded-xl border p-6">
      <div>
        <h2 className="text-xl font-semibold">🐶 Identité</h2>

        <p className="text-sm text-muted-foreground">
          Informations générales du chien.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>Nom</Label>

          <Input
            value={value.identity.name}
            onChange={(e) => updateField("name", e.target.value)}
          />
        </div>

        <div>
          <Label>Race</Label>

          <Input
            value={value.identity.breed}
            onChange={(e) => updateField("breed", e.target.value)}
          />
        </div>

        <div>
          <Label>Sexe</Label>

          <select
            className="w-full rounded-lg border p-2"
            value={value.identity.sex}
            onChange={(e) =>
              updateField("sex", e.target.value as "Mâle" | "Femelle")
            }
          >
            <option value="Mâle">Mâle</option>
            <option value="Femelle">Femelle</option>
          </select>
        </div>

        <div>
          <Label>Couleur</Label>

          <Input
            value={value.identity.color}
            onChange={(e) => updateField("color", e.target.value)}
          />
        </div>

        <div>
          <Label>Date de naissance</Label>

          <Input
            type="date"
            value={value.identity.birthDate}
            onChange={(e) => updateField("birthDate", e.target.value)}
          />
        </div>

        <div>
          <Label>N° de puce</Label>

          <Input
            value={value.identity.microchip ?? ""}
            onChange={(e) => updateField("microchip", e.target.value)}
          />
        </div>

        <div>
          <Label>Tatouage</Label>

          <Input
            value={value.identity.tattoo ?? ""}
            onChange={(e) => updateField("tattoo", e.target.value)}
          />
        </div>

        <div>
          <Label>N° d'enregistrement</Label>

          <Input
            value={value.identity.registrationNumber ?? ""}
            onChange={(e) => updateField("registrationNumber", e.target.value)}
          />
        </div>
      </div>
    </section>
  );
}
