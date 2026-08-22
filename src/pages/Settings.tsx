import { Settings as SettingsIcon } from "lucide-react";

import MainLayout from "../components/layout/MainLayout";
import PageHeader from "../components/layout/PageHeader";
import KennelSettingsCard from "../components/settings/KennelSettingsCard";
import ContractTemplatesCard from "../components/settings/ContractTemplatesCard";
import ExportDataCard from "../components/settings/ExportDataCard";
import ImportDataCard from "../components/settings/ImportDataCard";
import SecurityCard from "../components/settings/SecurityCard";

export default function Settings() {
  return (
    <MainLayout>
      <div className="mb-8">
        <PageHeader
          icon={SettingsIcon}
          title="Paramètres"
          description="Configuration de l'application."
        />
      </div>

      <div className="space-y-6">
        <KennelSettingsCard />

        <ContractTemplatesCard />

        <SecurityCard />

        <div className="grid gap-6 sm:grid-cols-2">
          <ExportDataCard />
          <ImportDataCard />
        </div>
      </div>
    </MainLayout>
  );
}
