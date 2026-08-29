import { Baby } from "lucide-react";

import MainLayout from "../components/layout/MainLayout";
import EmptyState from "../components/layout/EmptyState";

export default function Litters() {
  return (
    <MainLayout>
      <EmptyState
        icon={Baby}
        title="Aucune portée enregistrée"
        description="Retrouvez ici l'historique de vos portées, le nombre de chiots et leur suivi jusqu'au placement."
        actionLabel="Créer une portée"
      />
    </MainLayout>
  );
}
