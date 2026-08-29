import { Users } from "lucide-react";

import MainLayout from "../components/layout/MainLayout";
import EmptyState from "../components/layout/EmptyState";

export default function Clients() {
  return (
    <MainLayout>
      <EmptyState
        icon={Users}
        title="Aucun client enregistré"
        description="Centralisez les coordonnées de vos clients et adoptants, ainsi que l'historique de leurs réservations."
        actionLabel="Ajouter un client"
      />
    </MainLayout>
  );
}
