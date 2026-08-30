import MainLayout from "../components/layout/MainLayout";
import PageHeader from "../components/layout/PageHeader";
import { EmptyState } from "../components/ui/empty-state";

export default function Breeding() {
  return (
    <MainLayout>
      <PageHeader
        icon="❤️"
        title="Gestations"
        subtitle="Suivi des gestations de l'élevage."
      />

      <EmptyState
        icon="🤰"
        title="Aucune gestation en cours"
        description="Les gestations en cours et à venir apparaîtront ici."
      />
    </MainLayout>
  );
}
