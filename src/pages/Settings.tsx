import { Settings as SettingsIcon } from "lucide-react";

import MainLayout from "../components/layout/MainLayout";
import KennelSettingsCard from "../components/settings/KennelSettingsCard";
import ExportDataCard from "../components/settings/ExportDataCard";
import ImportDataCard from "../components/settings/ImportDataCard";
import SecurityCard from "../components/settings/SecurityCard";

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

      <div className="space-y-6">
        <KennelSettingsCard />

        <SecurityCard />

        <div className="grid gap-6 sm:grid-cols-2">
          <ExportDataCard />
          <ImportDataCard />
        </div>
      </div>
    </MainLayout>
  );
}
