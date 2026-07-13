import MainLayout from "../components/layout/MainLayout";
import DogsTable from "../components/dogs/DogsTable";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function Dogs() {
  return (
    <MainLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            🐶 Gestion des chiens
          </h1>

          <p className="text-muted-foreground">
            Gérez tous les chiens de votre élevage.
          </p>
        </div>

        <Button>
          + Ajouter un chien
        </Button>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Rechercher un chien..."
        />
      </div>

      <DogsTable />
    </MainLayout>
  );
}