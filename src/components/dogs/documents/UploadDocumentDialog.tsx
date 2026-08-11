import { useRef, useState } from "react";
import { FileUp } from "lucide-react";

import type { DogDocumentType } from "../../../types/models/dogDocument";
import { useCreateDogDocument } from "../../../hooks/useDogDocuments";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const TYPES: DogDocumentType[] = [
  "Pedigree",
  "Certificat vétérinaire",
  "Certificat de vaccination",
  "Contrat",
  "Autre",
];

type Props = {
  dogId: string;
};

export default function UploadDocumentDialog({ dogId }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const createDocument = useCreateDogDocument();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState<DogDocumentType>("Autre");
  const [file, setFile] = useState<{ name: string; dataUrl: string } | null>(
    null,
  );
  const [error, setError] = useState("");

  function reset() {
    setTitle("");
    setType("Autre");
    setFile(null);
    setError("");
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0];

    event.target.value = "";

    if (!selected) return;

    if (selected.size > MAX_FILE_SIZE) {
      setError("Le fichier dépasse la taille maximale autorisée (5 Mo).");
      return;
    }

    setError("");

    const reader = new FileReader();

    reader.onload = () => {
      setFile({ name: selected.name, dataUrl: reader.result as string });

      if (!title) setTitle(selected.name);
    };

    reader.readAsDataURL(selected);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!file) {
      setError("Choisissez d'abord un fichier.");
      return;
    }

    if (!title.trim()) {
      setError("Donnez un titre au document.");
      return;
    }

    await createDocument.mutateAsync({
      dogId,
      title: title.trim(),
      type,
      fileName: file.name,
      dataUrl: file.dataUrl,
    });

    reset();
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) reset();
      }}
    >
      <DialogTrigger
        render={(props) => <Button {...props}>+ Ajouter un document</Button>}
      />

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Ajouter un document</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf,image/*"
            hidden
            onChange={handleFileChange}
          />

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => inputRef.current?.click()}
          >
            <FileUp className="mr-1.5 size-4" />
            {file ? file.name : "Choisir un fichier (PDF ou image)"}
          </Button>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="space-y-2">
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex : Pedigree LOF, Certificat de bonne santé..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as DogDocumentType)}
              className="w-full rounded-md border bg-background px-3 py-2"
            >
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={createDocument.isPending}>
              {createDocument.isPending ? "Ajout..." : "Ajouter"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
