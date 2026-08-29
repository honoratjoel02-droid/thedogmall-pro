import { useMemo, useState } from "react";

import MainLayout from "../components/layout/MainLayout";
import DogsTable from "../components/dogs/DogsTable";
import DogCard from "../components/dogs/DogCard";
import DogFilters, { type DogViewMode } from "../components/dogs/DogFilters";
import AddDogDialog from "../components/dogs/AddDogDialog";
import type { DogFormValues } from "../components/dogs/DogForm";
import { mockDogs } from "../data/mockDogs";
import type { Dog } from "../types/dog";

export default function Dogs() {
  const [dogs, setDogs] = useState<Dog[]>(mockDogs);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [view, setView] = useState<DogViewMode>("grid");

  const filteredDogs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return dogs.filter((dog) => {
      const matchesQuery =
        query.length === 0 ||
        dog.name.toLowerCase().includes(query) ||
        dog.breed.toLowerCase().includes(query);
      const matchesStatus = status === "all" || dog.status === status;

      return matchesQuery && matchesStatus;
    });
  }, [dogs, search, status]);

  function handleAddDog(values: DogFormValues) {
    setDogs((prev) => [
      { ...values, id: crypto.randomUUID() },
      ...prev,
    ]);
  }

  return (
    <MainLayout>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredDogs.length} chien{filteredDogs.length > 1 ? "s" : ""}{" "}
          {status !== "all" || search ? "trouvé" + (filteredDogs.length > 1 ? "s" : "") : "au total"}
        </p>

        <AddDogDialog onAddDog={handleAddDog} />
      </div>

      <div className="mb-5">
        <DogFilters
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
          view={view}
          onViewChange={setView}
        />
      </div>

      {view === "grid" ? (
        filteredDogs.length === 0 ? (
          <DogsTable dogs={filteredDogs} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredDogs.map((dog) => (
              <DogCard key={dog.id} dog={dog} />
            ))}
          </div>
        )
      ) : (
        <DogsTable dogs={filteredDogs} />
      )}
    </MainLayout>
  );
}
