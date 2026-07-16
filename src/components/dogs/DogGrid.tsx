import DogCard from "./DogCard";
import { useDogs } from "../../hooks/useDogs";

export default function DogGrid() {
  const { data: dogs = [], isLoading } = useDogs();

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">Chargement...</div>
    );
  }

  if (dogs.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border border-dashed text-muted-foreground">
        Aucun chien enregistré.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {dogs.map((dog) => (
        <DogCard key={dog.id} dog={dog} />
      ))}
    </div>
  );
}
