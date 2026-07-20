// src/components/dogs/DogForm.tsx

import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import DogPhotoUpload from "./DogPhotoUpload";

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

  const [form, setForm] = useState<FormData>(DEFAULT_VALUES);

  useEffect(() => {
    if (dog) {
      const { id, ...rest } = dog;
      setForm(rest);
    } else {
      setForm(DEFAULT_VALUES);
    }
  }, [dog]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "weight" ? Number(value) : value,
    }));
  }

  function handlePhotoChange(photo: string) {
    setForm((prev) => ({
      ...prev,
      photo,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.name.trim()) return;

    if (!form.breed.trim()) return;

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
    <form onSubmit={handleSubmit} className="space-y-6">
      <DogPhotoUpload value={form.photo} onChange={handlePhotoChange} />

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

      <Button type="submit" className="w-full">
        {dog ? "Enregistrer les modifications" : "Ajouter le chien"}
      </Button>
    </form>
  );
}
