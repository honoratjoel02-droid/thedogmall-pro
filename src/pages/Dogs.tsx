import MainLayout from "../components/layout/MainLayout";
import DogGrid from "../components/dogs/DogGrid";
import DogStats from "../components/dogs/DogStats";
import AddDogDialog from "../components/dogs/AddDogDialog";

import { Input } from "../components/ui/input";

export default function Dogs() {
  return (
    <MainLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-4xl font-bold">
            🐶 Gestion des chiens
          </h1>

          <p className="text-muted-foreground">
            Gérez tous les chiens de votre élevage.
          </p>
        </div>

        <AddDogDialog />
      </div>

      <DogStats />

      <div className="mb-6">
        <Input placeholder="Rechercher un chien..." />
      </div>

      <DogGrid />
    </MainLayout>
  );
}
