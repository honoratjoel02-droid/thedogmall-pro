import { Link } from "react-router-dom";
import { Printer } from "lucide-react";

import type { Dog } from "../../../types/dog";
import { useHealthRecordsByDog } from "../../../hooks/useHealthRecords";

import { Button } from "../../ui/button";

import HealthRecordList from "../health/HealthRecordList";
import AddHealthRecordDialog from "../health/AddHealthRecordDialog";

interface DogHealthTabProps {
  dog: Dog;
}

export default function DogHealthTab({ dog }: DogHealthTabProps) {
  const { data: records = [], isLoading } = useHealthRecordsByDog(dog.id);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          render={(props) => (
            <Link {...props} to={`/health-record/${dog.id}`} target="_blank">
              <Printer className="size-3.5" />
              Imprimer le carnet de santé
            </Link>
          )}
        />

        <AddHealthRecordDialog dogId={dog.id} />
      </div>

      <HealthRecordList records={records} isLoading={isLoading} />
    </div>
  );
}
