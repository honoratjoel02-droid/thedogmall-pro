import { Settings as SettingsIcon } from "lucide-react";

import MainLayout from "../components/layout/MainLayout";
import ExportDataCard from "../components/settings/ExportDataCard";
import ImportDataCard from "../components/settings/ImportDataCard";

export default function Settings() {
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="flex items-center gap-2 text-3xl font-bold sm:text-4xl">
          <SettingsIcon className="size-8 text-primary" />
          Paramètres
        </h1>

        <p className="text-muted-foreground">
          Configuration de l'application.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <ExportDataCard />
        <ImportDataCard />
      </div>
    </MainLayout>
  );
}
