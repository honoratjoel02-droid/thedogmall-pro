import { Input } from "../ui/input";

type DogFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;

  breed: string;
  onBreedChange: (value: string) => void;

  sex: string;
  onSexChange: (value: string) => void;

  status: string;
  onStatusChange: (value: string) => void;

  breeds: string[];

  resultsCount: number;

  onReset: () => void;
};

export default function DogFilters({
  search,
  onSearchChange,
  breed,
  onBreedChange,
  sex,
  onSexChange,
  status,
  onStatusChange,
  breeds,
  resultsCount,
  onReset,
}: DogFiltersProps) {
  return (
    <div className="mb-6 space-y-4 rounded-lg border p-4">
      <Input
        placeholder="🔍 Rechercher un chien..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <select
          className="rounded-md border bg-background px-3 py-2"
          value={breed}
          onChange={(e) => onBreedChange(e.target.value)}
        >
          <option value="">Toutes les races</option>

          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>

        <select
          className="rounded-md border bg-background px-3 py-2"
          value={sex}
          onChange={(e) => onSexChange(e.target.value)}
        >
          <option value="">Tous les sexes</option>
          <option value="Mâle">Mâle</option>
          <option value="Femelle">Femelle</option>
        </select>

        <select
          className="rounded-md border bg-background px-3 py-2"
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="">Tous les statuts</option>
          <option value="Disponible">Disponible</option>
          <option value="Réservé">Réservé</option>
          <option value="Gestante">Gestante</option>
          <option value="Retraité">Retraité</option>
        </select>
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        <span className="text-sm text-muted-foreground">
          {resultsCount} chien{resultsCount > 1 ? "s" : ""} trouvé
          {resultsCount > 1 ? "s" : ""}
        </span>

        <button
          type="button"
          onClick={onReset}
          className="rounded-md border px-4 py-2 text-sm transition hover:bg-muted"
        >
          Réinitialiser les filtres
        </button>
      </div>
    </div>
  );
}
