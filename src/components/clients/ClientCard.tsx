import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

import type { Client } from "../../types/models/client";

import EditClientDialog from "./EditClientDialog";
import DeleteClientDialog from "./DeleteClientDialog";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

type Props = {
  client: Client;
};

export default function ClientCard({ client }: Props) {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="p-6">
        <div className="mb-5 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User className="size-10" />
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-xl font-bold">
            {client.firstName} {client.lastName}
          </h3>

          {client.email && (
            <p className="text-sm text-muted-foreground">{client.email}</p>
          )}
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Téléphone</span>
            <span className="font-medium">{client.phone ?? "—"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Adresse</span>
            <span className="max-w-[60%] truncate text-right font-medium">
              {client.address ?? "—"}
            </span>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => navigate(`/clients/${client.id}`)}
          >
            Voir
          </Button>

          <EditClientDialog client={client} />

          <DeleteClientDialog client={client} />
        </div>
      </CardContent>
    </Card>
  );
}
