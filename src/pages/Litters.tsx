import MainLayout from "../components/layout/MainLayout";
import PageHeader from "../components/layout/PageHeader";
import { EmptyState } from "../components/ui/empty-state";

export default function Litters() {
  return (
    <MainLayout>
      <PageHeader
        icon="🐾"
        title="Portées"
        subtitle="Suivez les portées et leurs chiots."
      />

      <EmptyState
        icon="🐕‍🦺"
        title="Aucune portée enregistrée"
        description="Vos portées et leurs chiots apparaîtront ici."
      />
    </MainLayout>
  );
}
