import { useNavigate, useParams } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import DogGeneralTab from "../components/dogs/profile/DogGeneralTab";

import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

import { useDog } from "../hooks/useDogs";

export default function DogProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: dog, isLoading } = useDog(id);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex h-96 items-center justify-center">
          Chargement...
        </div>
      </MainLayout>
    );
  }

  if (!dog) {
    return (
      <MainLayout>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Chien introuvable</h1>

          <Button onClick={() => navigate("/dogs")}>Retour</Button>
        </div>
      </MainLayout>
    );
  }

  const age = (() => {
    const birth = new Date(dog.birthDate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();

    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      years--;
    }

    return `${years} an${years > 1 ? "s" : ""}`;
  })();

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <Button variant="ghost" onClick={() => navigate("/dogs")}>
              ← Retour aux chiens
            </Button>

            <h1 className="mt-4 text-4xl font-bold">{dog.name}</h1>

            <p className="text-muted-foreground">{dog.breed}</p>
          </div>

          <Button>Modifier</Button>
        </div>

        <Card>
          <CardContent className="flex flex-col items-center gap-8 p-8 lg:flex-row">
            <div className="flex h-44 w-44 items-center justify-center rounded-full bg-muted text-8xl">
              🐶
            </div>

            <div>
              <h2 className="text-3xl font-bold">{dog.name}</h2>

              <div className="mt-4 flex flex-wrap gap-3">
                <Badge>{dog.sex}</Badge>

                <Badge variant="secondary">{dog.status}</Badge>
              </div>

              <div className="mt-6 space-y-2">
                <p>
                  <strong>Race :</strong> {dog.breed}
                </p>

                <p>
                  <strong>Couleur :</strong> {dog.color}
                </p>

                <p>
                  <strong>Poids :</strong> {dog.weight} kg
                </p>

                <p>
                  <strong>Âge :</strong> {age}
                </p>

                <p>
                  <strong>Date de naissance :</strong>{" "}
                  {new Date(dog.birthDate).toLocaleDateString("fr-FR")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">Informations</TabsTrigger>

            <TabsTrigger value="health">Santé</TabsTrigger>

            <TabsTrigger value="breeding">Reproduction</TabsTrigger>

            <TabsTrigger value="documents">Documents</TabsTrigger>

            <TabsTrigger value="photos">Photos</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <DogGeneralTab dog={dog} />
          </TabsContent>

          <TabsContent value="health">
            <Card>
              <CardContent className="p-8">
                Module Santé en cours de développement.
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="breeding">
            <Card>
              <CardContent className="p-8">
                Module Reproduction en cours de développement.
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardContent className="p-8">
                Module Documents en cours de développement.
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="photos">
            <Card>
              <CardContent className="p-8">
                Galerie photos en cours de développement.
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
