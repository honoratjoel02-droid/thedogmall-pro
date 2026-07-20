import type { Breeding } from "../../../types/models/breeding";
import type { Dog } from "../../../types/dog";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Badge } from "../../ui/badge";

import BreedingPair from "./BreedingPair";
import GestationProgress from "./GestationProgress";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  breeding: Breeding;
  dogs: Dog[];
}

export default function BreedingDetailsDialog({
  open,
  onOpenChange,
  breeding,
  dogs,
}: Props) {
  const female = dogs.find((dog) => dog.id === breeding.femaleId);
  const male = dogs.find((dog) => dog.id === breeding.maleId);

  const lastBreedingDate = breeding.breedingDates.at(-1);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Détails de la gestation</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <BreedingPair female={female} male={male} />

          <div className="flex gap-2">
            <Badge>{breeding.method}</Badge>
            <Badge>{breeding.pregnancyStatus}</Badge>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Dates des saillies</h3>

            {breeding.breedingDates.map((date) => (
              <p key={date}>• {new Date(date).toLocaleDateString("fr-FR")}</p>
            ))}
          </div>

          {lastBreedingDate && (
            <GestationProgress breedingDate={lastBreedingDate} />
          )}

          {breeding.notes && (
            <div>
              <h3 className="mb-2 font-semibold">Observations</h3>
              <p className="text-muted-foreground">{breeding.notes}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
