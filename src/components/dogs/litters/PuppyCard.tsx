import { useState } from "react";

import type { Puppy, PuppyStatus } from "../../../types/models/puppy";
import { useUpdatePuppy, useDeletePuppy } from "../../../hooks/usePuppies";

import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

import PuppyTrackingDialog from "./PuppyTrackingDialog";
import EditPuppyDialog from "./EditPuppyDialog";

type Props = {
  puppy: Puppy;
};

const STATUS_VARIANT: Record<
  PuppyStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  Disponible: "default",
  Réservé: "secondary",
  Vendu: "outline",
  Conservé: "outline",
};

export default function PuppyCard({ puppy }: Props) {
  const updatePuppy = useUpdatePuppy();
  const deletePuppy = useDeletePuppy();

  const [reservedFor, setReservedFor] = useState(puppy.reservedFor ?? "");

  const latestWeight =
    puppy.weightHistory.length > 0
      ? puppy.weightHistory[puppy.weightHistory.length - 1].weightGrams
      : puppy.birthWeightGrams;

  function handleStatusChange(status: PuppyStatus) {
    updatePuppy.mutate({
      id: puppy.id,
      data: {
        status,
        reservedFor: status === "Réservé" ? reservedFor : undefined,
      },
    });
  }

  function handleReservedForBlur() {
    if (puppy.status === "Réservé" && reservedFor !== (puppy.reservedFor ?? "")) {
      updatePuppy.mutate({ id: puppy.id, data: { reservedFor } });
    }
  }

  return (
    <Card>
      <CardContent className="space-y-4 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{puppy.identifier}</h3>

            <p className="text-sm text-muted-foreground">
              {puppy.sex}
              {puppy.color ? ` · ${puppy.color}` : ""}
              {latestWeight ? ` · ${latestWeight} g` : ""}
            </p>
          </div>

          <Badge variant={STATUS_VARIANT[puppy.status]}>{puppy.status}</Badge>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={puppy.status}
            onChange={(e) =>
              handleStatusChange(e.target.value as PuppyStatus)
            }
            className="rounded-md border bg-background px-2 py-1 text-sm"
          >
            <option value="Disponible">Disponible</option>
            <option value="Réservé">Réservé</option>
            <option value="Vendu">Vendu</option>
            <option value="Conservé">Conservé</option>
          </select>

          {puppy.status === "Réservé" && (
            <Input
              value={reservedFor}
              onChange={(e) => setReservedFor(e.target.value)}
              onBlur={handleReservedForBlur}
              placeholder="Nom / contact du client"
              className="w-48"
            />
          )}

          <PuppyTrackingDialog puppy={puppy} />

          <EditPuppyDialog puppy={puppy} />

          <Button
            variant="ghost"
            onClick={() =>
              deletePuppy.mutate({ id: puppy.id, litterId: puppy.litterId })
            }
          >
            Supprimer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
