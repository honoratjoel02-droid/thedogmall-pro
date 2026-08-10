import MainLayout from "../components/layout/MainLayout";
import { Card, CardContent } from "../components/ui/card";

export default function Calendar() {
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">📅 Calendrier</h1>

        <p className="text-muted-foreground">
          Tâches, rappels et journal d'élevage.
        </p>
      </div>

      <Card>
        <CardContent className="p-8 text-center text-muted-foreground">
          Module en cours de développement.
        </CardContent>
      </Card>
    </MainLayout>
  );
}
