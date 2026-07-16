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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">❤️ Reproduction</h1>

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
