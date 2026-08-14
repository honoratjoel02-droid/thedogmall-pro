// src/components/dogs/profile/DogGeneralTab.tsx

import type { Dog } from "../../../types/dog";
import { useDogs } from "../../../hooks/useDogs";
import { getCurrentWeightKg } from "../../../lib/weight";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

import DogWeightTracking from "./DogWeightTracking";

interface DogGeneralTabProps {
  dog: Dog;
}

export default function DogGeneralTab({ dog }: DogGeneralTabProps) {
  const { data: dogs = [] } = useDogs();

  const sire = dogs.find((candidate) => candidate.id === dog.sireId);
  const dam = dogs.find((candidate) => candidate.id === dog.damId);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informations générales</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Nom</p>

              <p className="font-medium">{dog.name}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Race</p>

              <p className="font-medium">{dog.breed}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Sexe</p>

              <p className="font-medium">{dog.sex}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Couleur</p>

              <p className="font-medium">{dog.color}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Date de naissance</p>

              <p className="font-medium">
                {new Date(dog.birthDate).toLocaleDateString("fr-FR")}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Poids</p>

              <p className="font-medium">{getCurrentWeightKg(dog)} kg</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Statut</p>

              <p className="font-medium">{dog.status}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Père</p>

              <p className="font-medium">{sire?.name ?? "Inconnu"}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Mère</p>

              <p className="font-medium">{dam?.name ?? "Inconnue"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <DogWeightTracking dog={dog} />
    </div>
  );
}
