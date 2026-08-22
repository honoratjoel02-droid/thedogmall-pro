import { PiggyBank, CreditCard, TrendingUp, TrendingDown } from "lucide-react";

import type { Expense } from "../../types/models/expense";
import type { Income } from "../../types/models/income";

import StatTile from "../ui/stat-tile";

type Props = {
  expenses: Expense[];
  incomes: Income[];
};

export default function FinanceSummary({ expenses, incomes }: Props) {
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalIncomes = incomes.reduce((sum, i) => sum + i.amount, 0);
  const balance = totalIncomes - totalExpenses;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <StatTile
        label="Recettes"
        value={`+${totalIncomes.toLocaleString("fr-FR")} FCFA`}
        icon={PiggyBank}
        tone="success"
        valueClassName="text-success"
      />

      <StatTile
        label="Dépenses"
        value={`-${totalExpenses.toLocaleString("fr-FR")} FCFA`}
        icon={CreditCard}
        tone="danger"
        valueClassName="text-destructive"
      />

      <StatTile
        label="Solde"
        value={`${balance >= 0 ? "+" : ""}${balance.toLocaleString("fr-FR")} FCFA`}
        icon={balance >= 0 ? TrendingUp : TrendingDown}
        tone={balance >= 0 ? "success" : "danger"}
        valueClassName={balance >= 0 ? "text-success" : "text-destructive"}
      />
    </div>
  );
}
