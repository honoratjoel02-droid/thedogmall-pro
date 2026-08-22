import { Dog as DogIcon } from "lucide-react";

import DogCard from "./DogCard";
import EmptyState from "../ui/empty-state";
import LoadingState from "../ui/loading-state";
import type { Dog } from "../../types/dog";

type DogGridProps = {
  dogs: Dog[];
  isLoading?: boolean;
};

export default function DogGrid({ dogs, isLoading = false }: DogGridProps) {
  if (isLoading) {
    return <LoadingState rows={3} />;
  }

  if (dogs.length === 0) {
    return <EmptyState icon={DogIcon} label="Aucun chien enregistré." />;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {dogs.map((dog) => (
        <DogCard key={dog.id} dog={dog} />
      ))}
    </div>
  );
}
