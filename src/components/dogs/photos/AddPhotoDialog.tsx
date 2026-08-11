import { useState } from "react";

import { useCreateDogPhoto } from "../../../hooks/useDogPhotos";

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
  dogId: string;
};

export default function AddPhotoDialog({ dogId }: Props) {
  const [open, setOpen] = useState(false);
  const [dataUrl, setDataUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [error, setError] = useState("");

  const createPhoto = useCreateDogPhoto();

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
      dogId,
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
          <DialogTitle>Ajouter une photo</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <DogPhotoUpload value={dataUrl} onChange={setDataUrl} />

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="space-y-2">
            <Label htmlFor="caption">Légende (optionnel)</Label>
            <Input
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Ex : Exposition régionale 2026"
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
