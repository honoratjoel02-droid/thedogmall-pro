import type { CategoryTotal } from "../../lib/financeStats";

import ChartCard from "./ChartCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type Props = {
  data: CategoryTotal[];
};

function formatFCFA(value: number): string {
  return `${value.toLocaleString("fr-FR")} FCFA`;
}

export default function CategoryBreakdownChart({ data }: Props) {
  const tableView = (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Catégorie</TableHead>
          <TableHead>Montant</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((item) => (
          <TableRow key={item.category}>
            <TableCell>{item.category}</TableCell>
            <TableCell>{formatFCFA(item.amount)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  if (data.length === 0) {
    return (
      <ChartCard
        title="Dépenses par catégorie"
        subtitle="Toutes périodes confondues"
        table={tableView}
      >
        <div className="flex h-32 items-center justify-center text-muted-foreground">
          Aucune dépense enregistrée.
        </div>
      </ChartCard>
    );
  }

  const maxValue = Math.max(...data.map((d) => d.amount));

  return (
    <ChartCard
      title="Dépenses par catégorie"
      subtitle="Toutes périodes confondues"
      table={tableView}
    >
      <div className="space-y-3">
        {data.map((item) => {
          const pct = maxValue > 0 ? (item.amount / maxValue) * 100 : 0;

          return (
            <div key={item.category}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-foreground">{item.category}</span>
                <span className="font-medium text-foreground">
                  {formatFCFA(item.amount)}
                </span>
              </div>

              <div className="h-5 overflow-hidden rounded-sm bg-muted">
                <div
                  className="h-full rounded-r-sm bg-[var(--chart-category)] transition-[filter] hover:brightness-110"
                  style={{ width: `${Math.max(pct, 2)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </ChartCard>
  );
}
