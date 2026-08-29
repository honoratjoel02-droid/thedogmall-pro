import { Settings as SettingsIcon } from "lucide-react";

import MainLayout from "../components/layout/MainLayout";
import EmptyState from "../components/layout/EmptyState";

export default function Settings() {
  return (
    <MainLayout>
      <EmptyState
        icon={SettingsIcon}
        title="Paramètres à venir"
        description="Le profil de l'élevage, les préférences de notification et la gestion des accès arrivent bientôt ici."
      />
    </MainLayout>
  );
}
