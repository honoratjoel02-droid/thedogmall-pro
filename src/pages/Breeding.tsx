import { Heart } from "lucide-react";

import MainLayout from "../components/layout/MainLayout";
import PageHeader from "../components/layout/PageHeader";

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
        <PageHeader
          icon={Heart}
          title="Reproduction"
          description="Gérez les saillies, les gestations et les mises bas."
          actions={<AddBreedingDialog />}
        />

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
