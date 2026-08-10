import { useState } from "react";
import { Link } from "react-router-dom";

import type { Puppy, PuppyStatus } from "../../../types/models/puppy";
import { useUpdatePuppy, useDeletePuppy } from "../../../hooks/usePuppies";
import { useClients } from "../../../hooks/useClients";

import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";

import PuppyTrackingDialog from "./PuppyTrackingDialog";
import EditPuppyDialog from "./EditPuppyDialog";
import ClientSelect from "./ClientSelect";

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
  const { data: clients = [] } = useClients();

  const [reservedForClientId, setReservedForClientId] = useState(
    puppy.reservedForClientId ?? "",
  );

  const reservedClient = clients.find(
    (client) => client.id === puppy.reservedForClientId,
  );

  const latestWeight =
    puppy.weightHistory.length > 0
      ? puppy.weightHistory[puppy.weightHistory.length - 1].weightGrams
      : puppy.birthWeightGrams;

  function handleStatusChange(status: PuppyStatus) {
    updatePuppy.mutate({
      id: puppy.id,
      data: {
        status,
        reservedForClientId:
          status === "Réservé" ? reservedForClientId || undefined : undefined,
      },
    });
  }

  function handleClientChange(clientId: string) {
    setReservedForClientId(clientId);

    updatePuppy.mutate({
      id: puppy.id,
      data: { reservedForClientId: clientId || undefined },
    });
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

        {puppy.status === "Réservé" && reservedClient && (
          <p className="text-sm text-muted-foreground">
            Réservé pour{" "}
            <Link
              to={`/clients/${reservedClient.id}`}
              className="font-medium text-foreground underline-offset-2 hover:underline"
            >
              {reservedClient.firstName} {reservedClient.lastName}
            </Link>
          </p>
        )}

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
            <ClientSelect
              value={reservedForClientId}
              onChange={handleClientChange}
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
