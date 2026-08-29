import { HeartPulse } from "lucide-react";

import MainLayout from "../components/layout/MainLayout";
import EmptyState from "../components/layout/EmptyState";

export default function Breeding() {
  return (
    <MainLayout>
      <EmptyState
        icon={HeartPulse}
        title="Aucune gestation en cours"
        description="Suivez ici les gestations de votre élevage : dates de saillie, échographies et mise bas prévue."
        actionLabel="Déclarer une gestation"
      />
    </MainLayout>
  );
}
