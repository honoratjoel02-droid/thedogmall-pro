import type { Dog } from "../../../types/dog";
import { useGeneticTestsByDog } from "../../../hooks/useGeneticTests";

import GeneticTestList from "../genetics/GeneticTestList";
import AddGeneticTestDialog from "../genetics/AddGeneticTestDialog";

interface DogGeneticTestsTabProps {
  dog: Dog;
}

export default function DogGeneticTestsTab({ dog }: DogGeneticTestsTabProps) {
  const { data: tests = [], isLoading } = useGeneticTestsByDog(dog.id);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <AddGeneticTestDialog dogId={dog.id} />
      </div>

      <GeneticTestList tests={tests} isLoading={isLoading} />
    </div>
  );
}
