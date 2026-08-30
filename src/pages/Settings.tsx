import MainLayout from "../components/layout/MainLayout";
import PageHeader from "../components/layout/PageHeader";
import { EmptyState } from "../components/ui/empty-state";

export default function Settings() {
  return (
    <MainLayout>
      <PageHeader
        icon="⚙️"
        title="Paramètres"
        subtitle="Configuration de l'application."
      />

      <EmptyState
        icon="🛠️"
        title="Rien à configurer pour le moment"
        description="Les options de votre élevage et de votre compte apparaîtront ici."
      />
    </MainLayout>
  );
}
