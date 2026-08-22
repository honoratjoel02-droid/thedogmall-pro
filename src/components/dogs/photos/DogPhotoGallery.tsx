import { Image as ImageIcon, Trash2 } from "lucide-react";

import type { DogPhoto } from "../../../types/models/dogPhoto";
import { useDeleteDogPhoto } from "../../../hooks/useDogPhotos";

import { Button } from "../../ui/button";
import EmptyState from "../../ui/empty-state";
import LoadingState from "../../ui/loading-state";

type Props = {
  photos: DogPhoto[];
  isLoading?: boolean;
};

export default function DogPhotoGallery({ photos, isLoading = false }: Props) {
  const deletePhoto = useDeleteDogPhoto();

  if (isLoading) {
    return <LoadingState rows={3} />;
  }

  if (photos.length === 0) {
    return <EmptyState icon={ImageIcon} label="Aucune photo enregistrée." />;
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
            alt={photo.caption ?? "Photo du chien"}
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
              deletePhoto.mutate({ id: photo.id, dogId: photo.dogId })
            }
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
