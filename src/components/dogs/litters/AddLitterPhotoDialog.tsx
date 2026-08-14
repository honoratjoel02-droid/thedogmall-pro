import { useState } from "react";

import { useCreateLitterPhoto } from "../../../hooks/useLitterPhotos";

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

import DogPhotoUpload from "../DogPhotoUpload";

type Props = {
  litterId: string;
};

export default function AddLitterPhotoDialog({ litterId }: Props) {
  const [open, setOpen] = useState(false);
  const [dataUrl, setDataUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [error, setError] = useState("");

  const createPhoto = useCreateLitterPhoto();

  function reset() {
    setDataUrl("");
    setCaption("");
    setError("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!dataUrl) {
      setError("Choisissez d'abord une photo.");
      return;
    }

    await createPhoto.mutateAsync({
      litterId,
      dataUrl,
      caption: caption || undefined,
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
        render={(props) => <Button {...props}>+ Ajouter une photo</Button>}
      />

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Ajouter une photo à la portée</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <DogPhotoUpload value={dataUrl} onChange={setDataUrl} />

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="space-y-2">
            <Label htmlFor="litter-photo-caption">Légende (optionnel)</Label>
            <Input
              id="litter-photo-caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Ex : Les chiots à 3 semaines"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={createPhoto.isPending}>
              {createPhoto.isPending ? "Ajout..." : "Ajouter à la galerie"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
