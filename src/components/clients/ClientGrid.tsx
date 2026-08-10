import ClientCard from "./ClientCard";
import type { Client } from "../../types/models/client";

type Props = {
  clients: Client[];
  isLoading?: boolean;
};

export default function ClientGrid({ clients, isLoading = false }: Props) {
  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        Chargement...
      </div>
    );
  }

  if (clients.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border border-dashed text-muted-foreground">
        Aucun client enregistré.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {clients.map((client) => (
        <ClientCard key={client.id} client={client} />
      ))}
    </div>
  );
}
