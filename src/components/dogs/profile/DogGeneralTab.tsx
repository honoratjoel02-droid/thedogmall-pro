// src/components/dogs/profile/DogGeneralTab.tsx

import type { Dog } from "../../../types/dog";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

interface DogGeneralTabProps {
  dog: Dog;
}

export default function DogGeneralTab({ dog }: DogGeneralTabProps) {
  return (
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

            <p className="font-medium">{dog.weight} kg</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Statut</p>

            <p className="font-medium">{dog.status}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
