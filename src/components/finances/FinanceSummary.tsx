import type { Expense } from "../../types/models/expense";
import type { Income } from "../../types/models/income";

import { Card, CardContent } from "../ui/card";

type Props = {
  expenses: Expense[];
  incomes: Income[];
};

export default function FinanceSummary({ expenses, incomes }: Props) {
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalIncomes = incomes.reduce((sum, i) => sum + i.amount, 0);
  const balance = totalIncomes - totalExpenses;

  const stats = [
    {
      title: "Recettes",
      value: `+${totalIncomes.toLocaleString("fr-FR")} €`,
      emoji: "💰",
      valueClassName: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Dépenses",
      value: `-${totalExpenses.toLocaleString("fr-FR")} €`,
      emoji: "💸",
      valueClassName: "text-destructive",
    },
    {
      title: "Solde",
      value: `${balance >= 0 ? "+" : ""}${balance.toLocaleString("fr-FR")} €`,
      emoji: balance >= 0 ? "📈" : "📉",
      valueClassName:
        balance >= 0
          ? "text-emerald-600 dark:text-emerald-400"
          : "text-destructive",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">{stat.title}</p>

              <p className={`mt-2 text-2xl font-bold ${stat.valueClassName}`}>
                {stat.value}
              </p>
            </div>

            <div className="text-4xl">{stat.emoji}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
