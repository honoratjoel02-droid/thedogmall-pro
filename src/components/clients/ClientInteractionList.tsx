import type { ClientInteraction } from "../../types/models/clientInteraction";

import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

import EditClientInteractionDialog from "./EditClientInteractionDialog";
import DeleteClientInteractionDialog from "./DeleteClientInteractionDialog";

type Props = {
  interactions: ClientInteraction[];
  isLoading?: boolean;
};

export default function ClientInteractionList({
  interactions,
  isLoading = false,
}: Props) {
  if (isLoading) {
    return (
      <div className="flex h-24 items-center justify-center text-muted-foreground">
        Chargement...
      </div>
    );
  }

  if (interactions.length === 0) {
    return (
      <div className="flex h-24 items-center justify-center rounded-lg border border-dashed text-muted-foreground">
        Aucun échange enregistré pour ce client.
      </div>
    );
  }

  const sorted = [...interactions].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="space-y-3">
      {sorted.map((interaction) => (
        <Card key={interaction.id}>
          <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{interaction.type}</Badge>

                <span className="text-sm text-muted-foreground">
                  {new Date(interaction.date).toLocaleDateString("fr-FR")}
                </span>
              </div>

              <p>{interaction.summary}</p>
            </div>

            <div className="flex gap-2">
              <EditClientInteractionDialog interaction={interaction} />
              <DeleteClientInteractionDialog interaction={interaction} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
