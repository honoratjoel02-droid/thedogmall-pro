import { useMemo, useState } from "react";
import { Dog as DogIcon } from "lucide-react";

import MainLayout from "../components/layout/MainLayout";
import PageHeader from "../components/layout/PageHeader";
import DogGrid from "../components/dogs/DogGrid";
import DogStats from "../components/dogs/DogStats";
import AddDogDialog from "../components/dogs/AddDogDialog";
import DogFilters from "../components/dogs/DogFilters";

import { useDogs } from "../hooks/useDogs";

export default function Dogs() {
  const { data: dogs = [], isLoading } = useDogs();

  const [search, setSearch] = useState("");
  const [breed, setBreed] = useState("");
  const [sex, setSex] = useState("");
  const [status, setStatus] = useState("");
  const [tag, setTag] = useState("");

  const breeds = useMemo(() => {
    return [...new Set(dogs.map((dog) => dog.breed))].sort();
  }, [dogs]);

  const tags = useMemo(() => {
    return [...new Set(dogs.flatMap((dog) => dog.tags ?? []))].sort();
  }, [dogs]);

  const filteredDogs = useMemo(() => {
    return dogs.filter((dog) => {
      const matchesSearch = (dog.name ?? "")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesBreed = breed === "" || dog.breed === breed;

      const matchesSex = sex === "" || dog.sex === sex;

      const matchesStatus = status === "" || dog.status === status;

      const matchesTag = tag === "" || (dog.tags ?? []).includes(tag);

      return matchesSearch && matchesBreed && matchesSex && matchesStatus && matchesTag;
    });
  }, [dogs, search, breed, sex, status, tag]);

  function resetFilters() {
    setSearch("");
    setBreed("");
    setSex("");
    setStatus("");
    setTag("");
  }

  return (
    <MainLayout>
      <div className="mb-8">
        <PageHeader
          icon={DogIcon}
          title="Gestion des chiens"
          description="Gérez tous les chiens de votre élevage."
          actions={<AddDogDialog />}
        />
      </div>

      <DogStats />

      <DogFilters
        search={search}
        onSearchChange={setSearch}
        breed={breed}
        onBreedChange={setBreed}
        sex={sex}
        onSexChange={setSex}
        status={status}
        onStatusChange={setStatus}
        tag={tag}
        onTagChange={setTag}
        breeds={breeds}
        tags={tags}
        resultsCount={filteredDogs.length}
        onReset={resetFilters}
      />

      <DogGrid dogs={filteredDogs} isLoading={isLoading} />
    </MainLayout>
  );
}
