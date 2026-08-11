import type { Dog } from "../../../types/dog";
import { useDogPhotosByDog } from "../../../hooks/useDogPhotos";

import DogPhotoGallery from "../photos/DogPhotoGallery";
import AddPhotoDialog from "../photos/AddPhotoDialog";

interface DogPhotosTabProps {
  dog: Dog;
}

export default function DogPhotosTab({ dog }: DogPhotosTabProps) {
  const { data: photos = [], isLoading } = useDogPhotosByDog(dog.id);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <AddPhotoDialog dogId={dog.id} />
      </div>

      <DogPhotoGallery photos={photos} isLoading={isLoading} />
    </div>
  );
}
