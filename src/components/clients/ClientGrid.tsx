import { Users } from "lucide-react";

import ClientCard from "./ClientCard";
import EmptyState from "../ui/empty-state";
import LoadingState from "../ui/loading-state";
import type { Client } from "../../types/models/client";

type Props = {
  clients: Client[];
  isLoading?: boolean;
};

export default function ClientGrid({ clients, isLoading = false }: Props) {
  if (isLoading) {
    return <LoadingState rows={3} />;
  }

  if (clients.length === 0) {
    return <EmptyState icon={Users} label="Aucun client enregistré." />;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {clients.map((client) => (
        <ClientCard key={client.id} client={client} />
      ))}
    </div>
  );
}
