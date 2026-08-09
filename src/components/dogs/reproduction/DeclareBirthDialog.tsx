import { useState } from "react";

import type { Breeding } from "../../../types/models/breeding";
import type { Dog } from "../../../types/dog";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

import { useCreateLitter } from "../../../hooks/useLitters";
import { useUpdateBreeding } from "../../../hooks/useBreedings";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  breeding: Breeding;
  dogs: Dog[];
}

export default function DeclareBirthDialog({
  open,
  onOpenChange,
  breeding,
}: Props) {
  const createLitter = useCreateLitter();
  const updateBreeding = useUpdateBreeding();

  const [birthDate, setBirthDate] = useState(
    new Date().toISOString().slice(0, 10),
  );

  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [notes, setNotes] = useState("");

  async function handleSubmit() {
    const total = maleCount + femaleCount;

    await createLitter.mutateAsync({
      breedingId: breeding.id,
      femaleId: breeding.femaleId,
      maleId: breeding.maleId,
      birthDate,
      maleCount,
      femaleCount,
      notes,
      status: "En cours",
    });

    await updateBreeding.mutateAsync({
      id: breeding.id,
      data: {
        pregnancyStatus: "Mise bas",
        birthDate,
        puppiesCount: total,
      },
    });

    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Déclarer une mise bas</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Date de mise bas</Label>

            <Input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>

          <div>
            <Label>Nombre de mâles</Label>

            <Input
              type="number"
              min={0}
              value={maleCount}
              onChange={(e) => setMaleCount(Number(e.target.value))}
            />
          </div>

          <div>
            <Label>Nombre de femelles</Label>

            <Input
              type="number"
              min={0}
              value={femaleCount}
              onChange={(e) => setFemaleCount(Number(e.target.value))}
            />
          </div>

          <div>
            <Label>Observations</Label>

            <Input value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={createLitter.isPending || updateBreeding.isPending}
            >
              {createLitter.isPending ? "Création..." : "Créer la portée"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
