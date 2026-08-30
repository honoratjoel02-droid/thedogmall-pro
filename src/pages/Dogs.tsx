import MainLayout from "../components/layout/MainLayout";
import PageHeader from "../components/layout/PageHeader";
import DogsTable from "../components/dogs/DogsTable";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function Dogs() {
  return (
    <MainLayout>
      <PageHeader
        icon="🐶"
        title="Gestion des chiens"
        subtitle="Gérez tous les chiens de votre élevage."
        action={<Button>+ Ajouter un chien</Button>}
      />

      <div className="mb-6">
        <Input
          placeholder="Rechercher un chien..."
          className="h-10 max-w-sm bg-card"
        />
      </div>

      <DogsTable />
    </MainLayout>
  );
}
