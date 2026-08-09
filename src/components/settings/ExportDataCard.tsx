import { Download } from "lucide-react";

import { downloadBackup } from "../../lib/backup";

import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function ExportDataCard() {
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

        <Button onClick={downloadBackup}>Exporter les données</Button>
      </CardContent>
    </Card>
  );
}
