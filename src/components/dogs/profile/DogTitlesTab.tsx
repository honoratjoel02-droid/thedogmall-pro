import type { Dog } from "../../../types/dog";
import { useDogTitlesByDog } from "../../../hooks/useDogTitles";

import DogTitleList from "../titles/DogTitleList";
import AddDogTitleDialog from "../titles/AddDogTitleDialog";

interface DogTitlesTabProps {
  dog: Dog;
}

export default function DogTitlesTab({ dog }: DogTitlesTabProps) {
  const { data: titles = [], isLoading } = useDogTitlesByDog(dog.id);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <AddDogTitleDialog dogId={dog.id} />
      </div>

      <DogTitleList titles={titles} isLoading={isLoading} />
    </div>
  );
}
