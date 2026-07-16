import DogCard from "./DogCard";
import { dogsService } from "../../services/dogs";

export default function DogGrid() {
  const dogs = dogsService.getAll();

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {dogs.map((dog) => (
        <DogCard key={dog.id} dog={dog} />
      ))}
    </div>
  );
}
