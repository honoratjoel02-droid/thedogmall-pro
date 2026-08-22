import { useNavigate, useParams } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import EditClientDialog from "../components/clients/EditClientDialog";
import DeleteClientDialog from "../components/clients/DeleteClientDialog";
import ClientPurchases from "../components/clients/ClientPurchases";
import AddClientInteractionDialog from "../components/clients/AddClientInteractionDialog";
import ClientInteractionList from "../components/clients/ClientInteractionList";

import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import LoadingState from "../components/ui/loading-state";

import { useClient } from "../hooks/useClients";
import { useClientInteractionsByClient } from "../hooks/useClientInteractions";

export default function ClientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: client, isLoading } = useClient(id);
  const { data: interactions = [], isLoading: loadingInteractions } =
    useClientInteractionsByClient(id);

  if (isLoading) {
    return (
      <MainLayout>
        <LoadingState rows={4} />
      </MainLayout>
    );
  }

  if (!client) {
    return (
      <MainLayout>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Client introuvable</h1>
          <Button onClick={() => navigate("/clients")}>Retour</Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Button variant="ghost" onClick={() => navigate("/clients")}>
            ← Retour
          </Button>

          <div className="flex gap-2">
            <EditClientDialog client={client} />
            <DeleteClientDialog client={client} redirectAfterDelete />
          </div>
        </div>

        <Card>
          <CardContent className="space-y-4 p-6">
            <h1 className="text-3xl font-bold">
              {client.firstName} {client.lastName}
            </h1>

            {client.tags && client.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {client.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <div className="grid gap-2 md:grid-cols-2">
              <p>
                <strong>Email :</strong> {client.email ?? "—"}
              </p>
              <p>
                <strong>Téléphone :</strong> {client.phone ?? "—"}
              </p>
              <p className="md:col-span-2">
                <strong>Adresse :</strong> {client.address ?? "—"}
              </p>
            </div>

            {client.notes && (
              <p>
                <strong>Notes :</strong> {client.notes}
              </p>
            )}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-2xl font-semibold">Historique des échanges</h2>

            <AddClientInteractionDialog clientId={client.id} />
          </div>

          <ClientInteractionList
            interactions={interactions}
            isLoading={loadingInteractions}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Achats</h2>

          <ClientPurchases clientId={client.id} />
        </div>
      </div>
    </MainLayout>
  );
}
