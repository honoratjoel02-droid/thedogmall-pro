import { Trash2 } from "lucide-react";

import type { LitterPhoto } from "../../../types/models/litterPhoto";
import { useDeleteLitterPhoto } from "../../../hooks/useLitterPhotos";

import { Button } from "../../ui/button";

type Props = {
  photos: LitterPhoto[];
  isLoading?: boolean;
};

export default function LitterPhotoGallery({ photos, isLoading = false }: Props) {
  const deletePhoto = useDeleteLitterPhoto();

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center text-muted-foreground">
        Chargement...
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border border-dashed text-muted-foreground">
        Aucune photo enregistrée pour cette portée.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="group relative overflow-hidden rounded-xl ring-1 ring-foreground/[0.06]"
        >
          <img
            src={photo.dataUrl}
            alt={photo.caption ?? "Photo de la portée"}
            className="aspect-square w-full object-cover"
          />

          {photo.caption && (
            <p className="truncate bg-black/50 px-2 py-1 text-xs text-white">
              {photo.caption}
            </p>
          )}

          <Button
            variant="destructive"
            size="icon-sm"
            className="absolute top-2 right-2 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100"
            onClick={() =>
              deletePhoto.mutate({ id: photo.id, litterId: photo.litterId })
            }
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
