import type { Expense } from "../../types/models/expense";
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

import EditExpenseDialog from "./EditExpenseDialog";
import DeleteExpenseDialog from "./DeleteExpenseDialog";

type Props = {
  expenses: Expense[];
  isLoading?: boolean;
};

export default function ExpensesTable({ expenses, isLoading = false }: Props) {
  const { data: dogs = [] } = useDogs();
  const { data: litters = [] } = useLitters();

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center text-muted-foreground">
        Chargement...
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border border-dashed text-muted-foreground">
        Aucune dépense enregistrée.
      </div>
    );
  }

  const sorted = [...expenses].sort((a, b) =>
    b.expenseDate.localeCompare(a.expenseDate),
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
        {sorted.map((expense) => {
          const dog = dogs.find((d) => d.id === expense.dogId);

          const litter = litters.find((l) => l.id === expense.litterId);

          return (
            <TableRow key={expense.id}>
              <TableCell>
                {new Date(expense.expenseDate).toLocaleDateString("fr-FR")}
              </TableCell>

              <TableCell>{expense.title}</TableCell>

              <TableCell>
                <Badge variant="outline">{expense.category}</Badge>
              </TableCell>

              <TableCell className="text-muted-foreground">
                {dog?.name ??
                  (litter
                    ? `Portée du ${new Date(litter.birthDate).toLocaleDateString("fr-FR")}`
                    : "Élevage")}
              </TableCell>

              <TableCell className="font-medium text-destructive">
                -{expense.amount.toLocaleString("fr-FR")} FCFA
              </TableCell>

              <TableCell>
                <div className="flex justify-end gap-2">
                  <EditExpenseDialog expense={expense} />
                  <DeleteExpenseDialog expense={expense} />
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
