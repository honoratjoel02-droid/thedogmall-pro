import { useDogs } from "../../../hooks/useDogs";

interface DogSelectProps {
  label: string;
  sex: "Mâle" | "Femelle";
  value: string;
  onChange: (value: string) => void;
}

export default function DogSelect({
  label,
  sex,
  value,
  onChange,
}: DogSelectProps) {
  const { data: dogs = [], isLoading } = useDogs();

  const filteredDogs = dogs.filter((dog) => dog.sex === sex);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isLoading}
        className="w-full rounded-md border bg-background px-3 py-2"
      >
        <option value="">
          {isLoading ? "Chargement..." : "Sélectionner..."}
        </option>

        {filteredDogs.map((dog) => (
          <option key={dog.id} value={dog.id}>
            {dog.name}
          </option>
        ))}
      </select>
    </div>
  );
}
