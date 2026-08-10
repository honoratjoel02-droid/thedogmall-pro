import { Settings as SettingsIcon } from "lucide-react";

import MainLayout from "../components/layout/MainLayout";

export default function Settings() {
  return (
    <MainLayout>
      <h1 className="mb-8 flex items-center gap-2 text-3xl font-bold sm:text-4xl">
        <SettingsIcon className="size-8 text-primary" />
        Paramètres
      </h1>

      <p className="text-muted-foreground">Configuration de l'application.</p>
    </MainLayout>
  );
}
