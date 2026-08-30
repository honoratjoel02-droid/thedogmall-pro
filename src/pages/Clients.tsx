import MainLayout from "../components/layout/MainLayout";
import PageHeader from "../components/layout/PageHeader";
import { EmptyState } from "../components/ui/empty-state";

export default function Clients() {
  return (
    <MainLayout>
      <PageHeader
        icon="👥"
        title="Clients"
        subtitle="Retrouvez ici tous vos clients et acheteurs."
      />

      <EmptyState
        icon="📇"
        title="Aucun client pour le moment"
        description="Vos clients et leurs coordonnées apparaîtront ici."
      />
    </MainLayout>
  );
}
