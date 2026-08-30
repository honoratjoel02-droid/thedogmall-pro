import { mockDogs } from "../../data/mockDogs";
import type { Dog } from "../../types/dog";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const statusVariant: Record<
  Dog["status"],
  "default" | "secondary" | "outline" | "destructive"
> = {
  Disponible: "default",
  Réservé: "secondary",
  Gestante: "destructive",
  Retraité: "outline",
};

export default function DogsTable() {
  return (
    <Card className="border-none px-4 shadow-sm ring-1 ring-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Sexe</TableHead>
            <TableHead>Race</TableHead>
            <TableHead>Poids</TableHead>
            <TableHead>Statut</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {mockDogs.map((dog) => (
            <TableRow key={dog.id}>
              <TableCell className="font-medium text-foreground">
                {dog.name}
              </TableCell>
              <TableCell>{dog.sex}</TableCell>
              <TableCell>{dog.breed}</TableCell>
              <TableCell>{dog.weight} kg</TableCell>
              <TableCell>
                <Badge variant={statusVariant[dog.status]}>
                  {dog.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
