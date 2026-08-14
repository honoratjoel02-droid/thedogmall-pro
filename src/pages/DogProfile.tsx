import { useNavigate, useParams } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import DogGeneralTab from "../components/dogs/profile/DogGeneralTab";
import DogBreedingTab from "../components/dogs/profile/DogBreedingTab";
import DogFinanceTab from "../components/dogs/profile/DogFinanceTab";
import DogHealthTab from "../components/dogs/profile/DogHealthTab";
import DogPedigreeTab from "../components/dogs/profile/DogPedigreeTab";
import DogPhotosTab from "../components/dogs/profile/DogPhotosTab";
import DogDocumentsTab from "../components/dogs/profile/DogDocumentsTab";
import EditDogDialog from "../components/dogs/EditDogDialog";
import DeleteDogDialog from "../components/dogs/DeleteDogDialog";
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
import { useDogPhotosByDog } from "../hooks/useDogPhotos";
import { getCurrentWeightKg } from "../lib/weight";

export default function DogProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: dog, isLoading } = useDog(id);
  const { data: photos = [] } = useDogPhotosByDog(dog?.id);
  const primaryPhoto = photos[0];

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

  const birth = new Date(dog.birthDate);
  const today = new Date();
  let years = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    years--;
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Button variant="ghost" onClick={() => navigate("/dogs")}>
            ← Retour
          </Button>

          <div className="flex gap-2">
            <EditDogDialog dog={dog} />
            <DeleteDogDialog dog={dog} redirectAfterDelete />
          </div>
        </div>

        <Card>
          <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start">
            {primaryPhoto && (
              <img
                src={primaryPhoto.dataUrl}
                alt={dog.name}
                className="size-24 shrink-0 rounded-xl object-cover ring-1 ring-foreground/[0.06]"
              />
            )}

            <div className="space-y-4">
              <h1 className="text-3xl font-bold">{dog.name}</h1>

              <div className="flex flex-wrap gap-2">
                <Badge>{dog.sex}</Badge>
                <Badge variant="secondary">{dog.status}</Badge>

                {dog.tags?.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="grid gap-2 md:grid-cols-2">
                <p>
                  <strong>Race :</strong> {dog.breed}
                </p>
                <p>
                  <strong>Couleur :</strong> {dog.color}
                </p>
                <p>
                  <strong>Poids :</strong> {getCurrentWeightKg(dog)} kg
                </p>
                <p>
                  <strong>Âge :</strong> {years} an{years > 1 ? "s" : ""}
                </p>
                <p>
                  <strong>Date de naissance :</strong>{" "}
                  {birth.toLocaleDateString("fr-FR")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="general">
          <div className="overflow-x-auto">
            <TabsList>
              <TabsTrigger value="general">Informations</TabsTrigger>
              <TabsTrigger value="health">Santé</TabsTrigger>
              <TabsTrigger value="pedigree">Pedigree</TabsTrigger>
              <TabsTrigger value="breeding">Reproduction</TabsTrigger>
              <TabsTrigger value="finances">Finances</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="general">
            <DogGeneralTab dog={dog} />
          </TabsContent>

          <TabsContent value="health">
            <DogHealthTab dog={dog} />
          </TabsContent>

          <TabsContent value="pedigree">
            <DogPedigreeTab dog={dog} />
          </TabsContent>

          <TabsContent value="breeding">
            <DogBreedingTab dog={dog} />
          </TabsContent>

          <TabsContent value="finances">
            <DogFinanceTab dog={dog} />
          </TabsContent>

          <TabsContent value="documents">
            <DogDocumentsTab dog={dog} />
          </TabsContent>

          <TabsContent value="photos">
            <DogPhotosTab dog={dog} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
