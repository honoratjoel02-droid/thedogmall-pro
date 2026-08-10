// src/components/dogs/DogForm.tsx
import { useState } from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { useCreateDog, useUpdateDog } from "../../hooks/useDogs";
import type { Dog } from "../../types/dog";

type DogFormProps = {
  dog?: Dog;
  onSuccess?: () => void;
};

type FormData = Omit<Dog, "id">;

const DEFAULT_VALUES: FormData = {
  name: "",
  sex: "Femelle",
  breed: "",
  color: "",
  birthDate: "",
  weight: 0,
  status: "Disponible",
  photo: "",
};

export default function DogForm({ dog, onSuccess }: DogFormProps) {
  const createDog = useCreateDog();
  const updateDog = useUpdateDog();

  const [form, setForm] = useState<FormData>(() => {
    if (!dog) return DEFAULT_VALUES;

    const { id: _id, ...rest } = dog;
    return rest;
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "weight" ? Number(value) : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.name.trim() || !form.breed.trim()) return;

    if (dog) {
      await updateDog.mutateAsync({
        id: dog.id,
        data: form,
      });
    } else {
      await createDog.mutateAsync(form);
      setForm(DEFAULT_VALUES);
    }

    onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Nom</Label>
        <Input name="name" value={form.name} onChange={handleChange} />
      </div>

      <div>
        <Label>Sexe</Label>
        <select
          className="w-full rounded-lg border p-2"
          name="sex"
          value={form.sex}
          onChange={handleChange}
        >
          <option value="Mâle">Mâle</option>
          <option value="Femelle">Femelle</option>
        </select>
      </div>

      <div>
        <Label>Race</Label>
        <Input name="breed" value={form.breed} onChange={handleChange} />
      </div>

      <div>
        <Label>Couleur</Label>
        <Input name="color" value={form.color} onChange={handleChange} />
      </div>

      <div>
        <Label>Date de naissance</Label>
        <Input
          type="date"
          name="birthDate"
          value={form.birthDate}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label>Poids (kg)</Label>
        <Input
          type="number"
          step="0.1"
          name="weight"
          value={form.weight}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label>Statut</Label>
        <select
          className="w-full rounded-lg border p-2"
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="Disponible">Disponible</option>
          <option value="Réservé">Réservé</option>
          <option value="Gestante">Gestante</option>
          <option value="Retraité">Retraité</option>
        </select>
      </div>

      <div>
        <Label>Photo (URL)</Label>
        <Input name="photo" value={form.photo ?? ""} onChange={handleChange} />
      </div>

      <Button type="submit" className="w-full">
        {dog ? "Enregistrer les modifications" : "Ajouter le chien"}
      </Button>
    </form>
  );
}
