import { useRef } from "react";
import { ImagePlus } from "lucide-react";

import { Button } from "../ui/button";

type DogPhotoUploadProps = {
  value?: string;
  onChange: (photo: string) => void;
};

export default function DogPhotoUpload({
  value,
  onChange,
}: DogPhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function openFilePicker() {
    inputRef.current?.click();
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Veuillez sélectionner une image.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      onChange(reader.result as string);
    };

    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />

      <div className="flex h-56 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed bg-muted">
        {value ? (
          <img
            src={value}
            alt="Prévisualisation"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="text-center">
            <ImagePlus className="mx-auto mb-2 size-10 text-muted-foreground" />

            <p className="text-sm text-muted-foreground">
              Aucune photo sélectionnée
            </p>
          </div>
        )}
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={openFilePicker}
      >
        Choisir une photo
      </Button>
    </div>
  );
}
