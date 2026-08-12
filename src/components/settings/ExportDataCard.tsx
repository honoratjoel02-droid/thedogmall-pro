import { Download } from "lucide-react";

import { downloadBackup } from "../../lib/backup";
import { useLastBackupAt } from "../../hooks/useLastBackupAt";

import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

function formatLastBackup(lastBackupAt: string | null): string {
  if (!lastBackupAt) {
    return "Aucune sauvegarde n'a encore été effectuée.";
  }

  const days = Math.floor(
    (Date.now() - new Date(lastBackupAt).getTime()) / (24 * 60 * 60 * 1000),
  );

  const date = new Date(lastBackupAt).toLocaleDateString("fr-FR");

  if (days <= 0) return `Dernière sauvegarde : aujourd'hui (${date}).`;
  if (days === 1) return `Dernière sauvegarde : hier (${date}).`;

  return `Dernière sauvegarde : il y a ${days} jours (${date}).`;
}

export default function ExportDataCard() {
  const lastBackupAt = useLastBackupAt();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Sauvegarde
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Exportez toutes les données de TheDogMall Pro dans un fichier JSON.
        </p>

        <p className="text-sm text-muted-foreground">
          {formatLastBackup(lastBackupAt)}
        </p>

        <Button onClick={downloadBackup}>Exporter les données</Button>
      </CardContent>
    </Card>
  );
}
