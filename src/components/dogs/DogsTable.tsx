import { Mars, Venus, PawPrint } from "lucide-react";

import type { Dog } from "../../types/dog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { getAgeLabel, getInitials } from "../../lib/utils";

const statusVariant: Record<Dog["status"], "default" | "secondary" | "outline" | "destructive"> = {
  Disponible: "secondary",
  Réservé: "outline",
  Gestante: "default",
  Retraité: "outline",
};

type DogsTableProps = {
  dogs: Dog[];
};

export default function DogsTable({ dogs }: DogsTableProps) {
  if (dogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border py-16 text-center">
        <PawPrint className="size-8 text-muted-foreground/50" />
        <p className="text-sm font-medium text-foreground">
          Aucun chien trouvé
        </p>
        <p className="text-sm text-muted-foreground">
          Essayez d'ajuster votre recherche ou vos filtres.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Nom</TableHead>
            <TableHead>Sexe</TableHead>
            <TableHead>Race</TableHead>
            <TableHead>Âge</TableHead>
            <TableHead>Poids</TableHead>
            <TableHead>Statut</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {dogs.map((dog) => {
            const SexIcon = dog.sex === "Mâle" ? Mars : Venus;

            return (
              <TableRow key={dog.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(dog.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-foreground">
                      {dog.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center gap-1 ${
                      dog.sex === "Mâle"
                        ? "text-sky-600 dark:text-sky-400"
                        : "text-rose-600 dark:text-rose-400"
                    }`}
                  >
                    <SexIcon className="size-3.5" />
                    {dog.sex}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {dog.breed}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {getAgeLabel(dog.birthDate)}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {dog.weight} kg
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariant[dog.status]}>
                    {dog.status}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
