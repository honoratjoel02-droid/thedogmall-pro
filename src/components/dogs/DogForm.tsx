import { useId, useState } from "react";
import type { FormEvent } from "react";

import type { Dog } from "../../types/dog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

const selectClassName = cn(
  "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
);

export type DogFormValues = Omit<Dog, "id">;

type DogFormProps = {
  onSubmit: (values: DogFormValues) => void;
  onCancel: () => void;
};

export default function DogForm({ onSubmit, onCancel }: DogFormProps) {
  const formId = useId();
  const [name, setName] = useState("");
  const [sex, setSex] = useState<Dog["sex"]>("Mâle");
  const [breed, setBreed] = useState("");
  const [color, setColor] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [weight, setWeight] = useState("");
  const [status, setStatus] = useState<Dog["status"]>("Disponible");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSubmit({
      name: name.trim(),
      sex,
      breed: breed.trim(),
      color: color.trim(),
      birthDate,
      weight: Number(weight) || 0,
      status,
    });
  }

  return (
    <form
      id={formId}
      onSubmit={handleSubmit}
      className="grid gap-4"
    >
      <div className="grid gap-1.5">
        <Label htmlFor={`${formId}-name`}>Nom</Label>
        <Input
          id={`${formId}-name`}
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Ex: Maya"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="grid gap-1.5">
          <Label htmlFor={`${formId}-sex`}>Sexe</Label>
          <select
            id={`${formId}-sex`}
            value={sex}
            onChange={(event) => setSex(event.target.value as Dog["sex"])}
            className={selectClassName}
          >
            <option value="Mâle">Mâle</option>
            <option value="Femelle">Femelle</option>
          </select>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor={`${formId}-status`}>Statut</Label>
          <select
            id={`${formId}-status`}
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as Dog["status"])
            }
            className={selectClassName}
          >
            <option value="Disponible">Disponible</option>
            <option value="Réservé">Réservé</option>
            <option value="Gestante">Gestante</option>
            <option value="Retraité">Retraité</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="grid gap-1.5">
          <Label htmlFor={`${formId}-breed`}>Race</Label>
          <Input
            id={`${formId}-breed`}
            value={breed}
            onChange={(event) => setBreed(event.target.value)}
            placeholder="Ex: Chow Chow"
            required
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor={`${formId}-color`}>Couleur</Label>
          <Input
            id={`${formId}-color`}
            value={color}
            onChange={(event) => setColor(event.target.value)}
            placeholder="Ex: Crème"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="grid gap-1.5">
          <Label htmlFor={`${formId}-birthDate`}>Date de naissance</Label>
          <Input
            id={`${formId}-birthDate`}
            type="date"
            value={birthDate}
            onChange={(event) => setBirthDate(event.target.value)}
            required
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor={`${formId}-weight`}>Poids (kg)</Label>
          <Input
            id={`${formId}-weight`}
            type="number"
            min={0}
            step="0.1"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
            placeholder="Ex: 24"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-1">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit">Ajouter le chien</Button>
      </div>
    </form>
  );
}
