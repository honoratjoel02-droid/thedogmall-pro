import { CalendarDays } from "lucide-react";

import MainLayout from "../components/layout/MainLayout";
import EmptyState from "../components/layout/EmptyState";

export default function Calendar() {
  return (
    <MainLayout>
      <EmptyState
        icon={CalendarDays}
        title="Aucun évènement planifié"
        description="Visualisez vos rendez-vous vétérinaires, saillies et visites clients dans un calendrier unique."
        actionLabel="Ajouter un évènement"
      />
    </MainLayout>
  );
}
