import MainLayout from "../components/layout/MainLayout";
import AddClientDialog from "../components/clients/AddClientDialog";
import ClientGrid from "../components/clients/ClientGrid";

import { useClients } from "../hooks/useClients";

export default function Clients() {
  const { data: clients = [], isLoading } = useClients();

  return (
    <MainLayout>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold sm:text-4xl">🧑‍🤝‍🧑 Clients</h1>

          <p className="text-muted-foreground">
            Gérez les clients de votre élevage.
          </p>
        </div>

        <AddClientDialog />
      </div>

      <ClientGrid clients={clients} isLoading={isLoading} />
    </MainLayout>
  );
}
