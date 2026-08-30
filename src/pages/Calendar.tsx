import MainLayout from "../components/layout/MainLayout";
import PageHeader from "../components/layout/PageHeader";
import { EmptyState } from "../components/ui/empty-state";

export default function Calendar() {
  return (
    <MainLayout>
      <PageHeader
        icon="📅"
        title="Calendrier"
        subtitle="Vos rendez-vous et évènements à venir."
      />

      <EmptyState
        icon="🗓️"
        title="Aucun évènement planifié"
        description="Vos rendez-vous, mises bas et rappels apparaîtront ici."
      />
    </MainLayout>
  );
}
