import type { Dog } from "../../../types/dog";
import { useDogDocumentsByDog } from "../../../hooks/useDogDocuments";

import DogDocumentList from "../documents/DogDocumentList";
import UploadDocumentDialog from "../documents/UploadDocumentDialog";

interface DogDocumentsTabProps {
  dog: Dog;
}

export default function DogDocumentsTab({ dog }: DogDocumentsTabProps) {
  const { data: documents = [], isLoading } = useDogDocumentsByDog(dog.id);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <UploadDocumentDialog dogId={dog.id} />
      </div>

      <DogDocumentList documents={documents} isLoading={isLoading} />
    </div>
  );
}
