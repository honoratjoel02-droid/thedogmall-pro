import { useRef, useState } from "react";
import { Upload } from "lucide-react";

import type { BackupData } from "../../types/backup";

import { restoreBackup } from "../../lib/backup";

import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import ConfirmDialog from "../ui/ConfirmDialog";

export default function ImportDataCard() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [pendingBackup, setPendingBackup] = useState<BackupData | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [error, setError] = useState("");

  function openPicker() {
    inputRef.current?.click();
  }

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    event.target.value = "";

    if (!file) return;

    try {
      const text = await file.text();

      const backup = JSON.parse(text) as BackupData;

      setError("");
      setPendingBackup(backup);
      setConfirmOpen(true);
    } catch {
      setError("Le fichier sélectionné est invalide.");
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

        {error && <p className="text-sm text-destructive">{error}</p>}

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

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Restaurer cette sauvegarde ?"
        description="Cette opération remplacera toutes les données actuelles par celles du fichier importé."
        confirmLabel="Restaurer"
        onConfirm={() => {
          if (pendingBackup) restoreBackup(pendingBackup);
        }}
      />
    </Card>
  );
}
