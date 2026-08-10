import type { Income } from "../../types/models/income";
import { useDogs } from "../../hooks/useDogs";
import { useLitters } from "../../hooks/useLitters";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";

import EditIncomeDialog from "./EditIncomeDialog";
import DeleteIncomeDialog from "./DeleteIncomeDialog";

type Props = {
  incomes: Income[];
  isLoading?: boolean;
};

export default function IncomesTable({ incomes, isLoading = false }: Props) {
  const { data: dogs = [] } = useDogs();
  const { data: litters = [] } = useLitters();

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center text-muted-foreground">
        Chargement...
      </div>
    );
  }

  if (incomes.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border border-dashed text-muted-foreground">
        Aucune recette enregistrée.
      </div>
    );
  }

  const sorted = [...incomes].sort((a, b) =>
    b.incomeDate.localeCompare(a.incomeDate),
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Titre</TableHead>
          <TableHead>Catégorie</TableHead>
          <TableHead>Lié à</TableHead>
          <TableHead>Montant</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {sorted.map((income) => {
          const dog = dogs.find((d) => d.id === income.dogId);

          const litter = litters.find((l) => l.id === income.litterId);

          return (
            <TableRow key={income.id}>
              <TableCell>
                {new Date(income.incomeDate).toLocaleDateString("fr-FR")}
              </TableCell>

              <TableCell>{income.title}</TableCell>

              <TableCell>
                <Badge variant="outline">{income.category}</Badge>
              </TableCell>

              <TableCell className="text-muted-foreground">
                {dog?.name ??
                  (litter
                    ? `Portée du ${new Date(litter.birthDate).toLocaleDateString("fr-FR")}`
                    : "Élevage")}
              </TableCell>

              <TableCell className="font-medium text-emerald-600 dark:text-emerald-400">
                +{income.amount.toLocaleString("fr-FR")} FCFA
              </TableCell>

              <TableCell>
                <div className="flex justify-end gap-2">
                  <EditIncomeDialog income={income} />
                  <DeleteIncomeDialog income={income} />
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
