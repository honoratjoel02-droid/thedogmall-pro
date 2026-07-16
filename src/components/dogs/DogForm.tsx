import { useState } from "react";

import { useCreateDog } from "../../hooks/useDogs";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface DogFormProps {
  onSuccess?: () => void;
}

export default function DogForm({ onSuccess }: DogFormProps) {
  const createDog = useCreateDog();

  const [name, setName] = useState("");
  const [sex, setSex] = useState<"Mâle" | "Femelle">("Femelle");
  const [breed, setBreed] = useState("");
  const [color, setColor] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [weight, setWeight] = useState(0);

  const [status, setStatus] = useState<
    "Disponible" | "Réservé" | "Gestante" | "Retraité"
  >("Disponible");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    createDog.mutate(
      {
        name,
        sex,
        breed,
        color,
        birthDate,
        weight,
        status,
      },
      {
        onSuccess: () => {
          setName("");
          setBreed("");
          setColor("");
          setBirthDate("");
          setWeight(0);
          setStatus("Disponible");

          onSuccess?.();
        },
      },
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Nom</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Sexe</Label>

        <select
          value={sex}
          onChange={(e) => setSex(e.target.value as "Mâle" | "Femelle")}
          className="w-full rounded-md border px-3 py-2"
        >
          <option value="Femelle">Femelle</option>
          <option value="Mâle">Mâle</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label>Race</Label>

        <Input
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Couleur</Label>

        <Input value={color} onChange={(e) => setColor(e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label>Date de naissance</Label>

        <Input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Poids (kg)</Label>

        <Input
          type="number"
          min={0}
          step="0.1"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
        />
      </div>

      <div className="space-y-2">
        <Label>Statut</Label>

        <select
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value as
                | "Disponible"
                | "Réservé"
                | "Gestante"
                | "Retraité",
            )
          }
          className="w-full rounded-md border px-3 py-2"
        >
          <option value="Disponible">Disponible</option>
          <option value="Réservé">Réservé</option>
          <option value="Gestante">Gestante</option>
          <option value="Retraité">Retraité</option>
        </select>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={createDog.isPending}>
          {createDog.isPending ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </div>
    </form>
  );
}
