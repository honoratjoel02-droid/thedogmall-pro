import { Heart } from "lucide-react";

import MainLayout from "../components/layout/MainLayout";

import AddBreedingDialog from "../components/dogs/reproduction/AddBreedingDialog";
import BreedingList from "../components/dogs/reproduction/BreedingList";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export default function Breeding() {
  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-3xl font-bold sm:text-4xl">
              <Heart className="size-8 text-primary" />
              Reproduction
            </h1>

            <p className="text-muted-foreground">
              Gérez les saillies, les gestations et les mises bas.
            </p>
          </div>

          <AddBreedingDialog />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Saillies</CardTitle>
          </CardHeader>

          <CardContent>
            <BreedingList />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
