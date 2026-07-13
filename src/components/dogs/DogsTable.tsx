import { mockDogs } from "../../data/mockDogs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function DogsTable() {
  return (
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
            <TableCell>{dog.name}</TableCell>
            <TableCell>{dog.sex}</TableCell>
            <TableCell>{dog.breed}</TableCell>
            <TableCell>{dog.weight} kg</TableCell>
            <TableCell>{dog.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}