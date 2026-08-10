import type { Dog } from "../../../types/dog";
import { useHealthRecordsByDog } from "../../../hooks/useHealthRecords";

import HealthRecordList from "../health/HealthRecordList";
import AddHealthRecordDialog from "../health/AddHealthRecordDialog";

interface DogHealthTabProps {
  dog: Dog;
}

export default function DogHealthTab({ dog }: DogHealthTabProps) {
  const { data: records = [], isLoading } = useHealthRecordsByDog(dog.id);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <AddHealthRecordDialog dogId={dog.id} />
      </div>

      <HealthRecordList records={records} isLoading={isLoading} />
    </div>
  );
}
