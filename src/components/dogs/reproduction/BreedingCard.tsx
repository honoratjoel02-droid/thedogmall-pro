import { useState } from "react";

import type { Breeding } from "../../../types/models/breeding";
import type { Dog } from "../../../types/dog";

import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";

import { useDeleteBreeding } from "../../../hooks/useBreedings";

import BreedingPair from "./BreedingPair";
import BreedingDetailsDialog from "./BreedingDetailsDialog";
import GestationProgress from "./GestationProgress";

import ConfirmDialog from "../../ui/ConfirmDialog";

interface BreedingCardProps {
  breeding: Breeding;
  dogs: Dog[];
}

function getStatusVariant(
  status: Breeding["pregnancyStatus"],
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "Confirmée":
      return "default";

    case "Mise bas":
      return "secondary";

    case "Non gestante":
      return "destructive";

    case "Terminée":
      return "outline";

    default:
      return "secondary";
  }
}

export default function BreedingCard({ breeding, dogs }: BreedingCardProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const deleteBreeding = useDeleteBreeding();

  const female = dogs.find((dog) => dog.id === breeding.femaleId);
  const male = dogs.find((dog) => dog.id === breeding.maleId);

  const lastBreedingDate = breeding.breedingDates.at(-1);

  function handleDelete() {
    deleteBreeding.mutate(breeding.id);
  }

  return (
    <>
      <Card className="overflow-hidden transition-shadow hover:shadow-lg">
        <CardContent className="space-y-6 p-6">
          <BreedingPair female={female} male={male} />

          <div className="flex flex-wrap gap-2">
            <Badge>{breeding.method}</Badge>

            <Badge variant={getStatusVariant(breeding.pregnancyStatus)}>
              {breeding.pregnancyStatus}
            </Badge>
          </div>

          <div>
            <p className="mb-2 font-medium">Dates des saillies</p>

            <div className="space-y-1">
              {breeding.breedingDates.map((date) => (
                <p key={date} className="text-sm text-muted-foreground">
                  • {new Date(date).toLocaleDateString("fr-FR")}
                </p>
              ))}
            </div>
          </div>

          {lastBreedingDate && (
            <GestationProgress breedingDate={lastBreedingDate} />
          )}

          <div className="flex flex-wrap justify-end gap-2 border-t pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDetailsOpen(true)}
            >
              👁 Voir
            </Button>

            <Button variant="secondary" size="sm">
              ✏ Modifier
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => setConfirmOpen(true)}
            >
              🗑 Supprimer
            </Button>
          </div>
        </CardContent>
      </Card>

      <BreedingDetailsDialog
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        breeding={breeding}
        dogs={dogs}
      />

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Supprimer la saillie"
        description="Cette action est irréversible. Voulez-vous vraiment supprimer cette saillie ?"
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        onConfirm={handleDelete}
      />
    </>
  );
}
