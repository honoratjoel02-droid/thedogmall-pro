import { useNavigate, useParams } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import EditClientDialog from "../components/clients/EditClientDialog";
import DeleteClientDialog from "../components/clients/DeleteClientDialog";

import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

import { useClient } from "../hooks/useClients";

export default function ClientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: client, isLoading } = useClient(id);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex h-96 items-center justify-center">
          Chargement...
        </div>
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
        <div className="flex items-center justify-between">
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
      </div>
    </MainLayout>
  );
}
