import { Search, LayoutGrid, List, SlidersHorizontal } from "lucide-react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "../../lib/utils";
import type { Dog } from "../../types/dog";

const statusOptions: Dog["status"][] = [
  "Disponible",
  "Réservé",
  "Gestante",
  "Retraité",
];

export type DogViewMode = "grid" | "table";

type DogFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  view: DogViewMode;
  onViewChange: (value: DogViewMode) => void;
};

export default function DogFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  view,
  onViewChange,
}: DogFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1 sm:max-w-xs">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Rechercher un chien..."
          className="h-9 pl-8"
        />
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
            <SlidersHorizontal data-icon="inline-start" />
            {status === "all" ? "Tous les statuts" : status}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Filtrer par statut</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={status}
              onValueChange={(value) => onStatusChange(value as string)}
            >
              <DropdownMenuRadioItem value="all">
                Tous les statuts
              </DropdownMenuRadioItem>
              {statusOptions.map((option) => (
                <DropdownMenuRadioItem key={option} value={option}>
                  {option}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-0.5 rounded-lg bg-muted p-0.5">
          <button
            type="button"
            onClick={() => onViewChange("grid")}
            aria-label="Affichage en grille"
            className={cn(
              "flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors",
              view === "grid" && "bg-background text-foreground shadow-sm"
            )}
          >
            <LayoutGrid className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => onViewChange("table")}
            aria-label="Affichage en tableau"
            className={cn(
              "flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors",
              view === "table" && "bg-background text-foreground shadow-sm"
            )}
          >
            <List className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
