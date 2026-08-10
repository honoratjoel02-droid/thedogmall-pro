import type { Dog } from "../../../types/dog";
import { useExpenses } from "../../../hooks/useExpenses";
import { useIncomes } from "../../../hooks/useIncomes";

import FinanceSummary from "../../finances/FinanceSummary";
import ExpensesTable from "../../finances/ExpensesTable";
import IncomesTable from "../../finances/IncomesTable";
import AddExpenseDialog from "../../finances/AddExpenseDialog";
import AddIncomeDialog from "../../finances/AddIncomeDialog";

import { Card, CardContent } from "../../ui/card";

interface DogFinanceTabProps {
  dog: Dog;
}

export default function DogFinanceTab({ dog }: DogFinanceTabProps) {
  const { data: expenses = [], isLoading: loadingExpenses } = useExpenses();
  const { data: incomes = [], isLoading: loadingIncomes } = useIncomes();

  if (loadingExpenses || loadingIncomes) {
    return (
      <Card>
        <CardContent className="p-8 text-muted-foreground">
          Chargement...
        </CardContent>
      </Card>
    );
  }

  const dogExpenses = expenses.filter((e) => e.dogId === dog.id);
  const dogIncomes = incomes.filter((i) => i.dogId === dog.id);

  return (
    <div className="space-y-6">
      <FinanceSummary expenses={dogExpenses} incomes={dogIncomes} />

      <div className="flex justify-end gap-2">
        <AddExpenseDialog
          defaultDogId={dog.id}
          label="+ Dépense pour ce chien"
        />

        <AddIncomeDialog
          defaultDogId={dog.id}
          label="+ Recette pour ce chien"
        />
      </div>

      <div>
        <h3 className="mb-2 font-semibold">Dépenses</h3>
        <ExpensesTable expenses={dogExpenses} />
      </div>

      <div>
        <h3 className="mb-2 font-semibold">Recettes</h3>
        <IncomesTable incomes={dogIncomes} />
      </div>
    </div>
  );
}
