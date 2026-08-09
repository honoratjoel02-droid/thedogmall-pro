import { useRef } from "react";
import { Upload } from "lucide-react";

import type { BackupData } from "../../types/backup";

import { restoreBackup } from "../../lib/backup";

import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function ImportDataCard() {
  const inputRef = useRef<HTMLInputElement>(null);

  function openPicker() {
    inputRef.current?.click();
  }

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      const text = await file.text();

      const backup = JSON.parse(text) as BackupData;

      const confirmImport = window.confirm(
        "Cette opération remplacera toutes les données actuelles.\n\nContinuer ?",
      );

      if (!confirmImport) {
        return;
      }

      restoreBackup(backup);
    } catch {
      alert("Le fichier sélectionné est invalide.");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Restaurer
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Importez une sauvegarde précédemment exportée.
        </p>

        <input
          ref={inputRef}
          type="file"
          accept=".json"
          hidden
          onChange={handleFile}
        />

        <Button variant="outline" onClick={openPicker}>
          Importer une sauvegarde
        </Button>
      </CardContent>
    </Card>
  );
}
