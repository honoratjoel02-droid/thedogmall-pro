import { Link } from "react-router-dom";
import { ArrowDown, ArrowUp } from "lucide-react";

import type { WaitlistEntry } from "../../../types/models/waitlistEntry";
import { useClients } from "../../../hooks/useClients";
import { useUpdateWaitlistEntry } from "../../../hooks/useWaitlist";

import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";

import EditWaitlistEntryDialog from "./EditWaitlistEntryDialog";
import DeleteWaitlistEntryDialog from "./DeleteWaitlistEntryDialog";
import ConvertWaitlistEntryDialog from "./ConvertWaitlistEntryDialog";

type Props = {
  entries: WaitlistEntry[];
  isLoading?: boolean;
};

const STATUS_VARIANT: Record<
  WaitlistEntry["status"],
  "default" | "secondary" | "outline"
> = {
  "En attente": "default",
  Converti: "secondary",
  Annulé: "outline",
};

export default function WaitlistList({ entries, isLoading = false }: Props) {
  const { data: clients = [] } = useClients();
  const updateEntry = useUpdateWaitlistEntry();

  if (isLoading) {
    return (
      <div className="flex h-24 items-center justify-center text-muted-foreground">
        Chargement...
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="flex h-24 items-center justify-center rounded-lg border border-dashed text-muted-foreground">
        Aucun client en liste d'attente pour cette portée.
      </div>
    );
  }

  const waiting = [...entries]
    .filter((entry) => entry.status === "En attente")
    .sort((a, b) => a.position - b.position);

  const others = [...entries]
    .filter((entry) => entry.status !== "En attente")
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  const sorted = [...waiting, ...others];

  function swap(a: WaitlistEntry, b: WaitlistEntry) {
    updateEntry.mutate({ id: a.id, data: { position: b.position } });
    updateEntry.mutate({ id: b.id, data: { position: a.position } });
  }

  return (
    <div className="space-y-3">
      {sorted.map((entry) => {
        const client = clients.find((c) => c.id === entry.clientId);
        const rank = waiting.findIndex((e) => e.id === entry.id);
        const isWaiting = entry.status === "En attente";

        return (
          <Card key={entry.id}>
            <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                {isWaiting && (
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                    {rank + 1}
                  </span>
                )}

                <div className="space-y-1">
                  <p className="font-medium">
                    {client ? (
                      <Link
                        to={`/clients/${client.id}`}
                        className="underline-offset-2 hover:underline"
                      >
                        {client.firstName} {client.lastName}
                      </Link>
                    ) : (
                      "Client inconnu"
                    )}
                  </p>

                  {entry.notes && (
                    <p className="text-sm text-muted-foreground">{entry.notes}</p>
                  )}

                  <Badge variant={STATUS_VARIANT[entry.status]}>
                    {entry.status}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {isWaiting && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      disabled={rank === 0}
                      onClick={() => swap(entry, waiting[rank - 1])}
                    >
                      <ArrowUp className="size-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon-sm"
                      disabled={rank === waiting.length - 1}
                      onClick={() => swap(entry, waiting[rank + 1])}
                    >
                      <ArrowDown className="size-4" />
                    </Button>

                    <ConvertWaitlistEntryDialog entry={entry} />
                    <EditWaitlistEntryDialog entry={entry} />
                  </>
                )}

                <DeleteWaitlistEntryDialog entry={entry} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
