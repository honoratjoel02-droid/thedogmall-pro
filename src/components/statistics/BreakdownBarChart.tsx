import type { Breakdown } from "../../lib/statistics";

import ChartCard from "../charts/ChartCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type Props = {
  title: string;
  subtitle?: string;
  data: Breakdown[];
  emptyMessage: string;
  countLabel: string;
  formatCount?: (count: number) => string;
};

export default function BreakdownBarChart({
  title,
  subtitle,
  data,
  emptyMessage,
  countLabel,
  formatCount = (count) => String(count),
}: Props) {
  const tableView = (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{countLabel}</TableHead>
          <TableHead>Total</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((item) => (
          <TableRow key={item.label}>
            <TableCell>{item.label}</TableCell>
            <TableCell>{formatCount(item.count)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  if (data.length === 0) {
    return (
      <ChartCard title={title} subtitle={subtitle} table={tableView}>
        <div className="flex h-32 items-center justify-center text-muted-foreground">
          {emptyMessage}
        </div>
      </ChartCard>
    );
  }

  const maxValue = Math.max(...data.map((d) => d.count));

  return (
    <ChartCard title={title} subtitle={subtitle} table={tableView}>
      <div className="space-y-3">
        {data.map((item) => {
          const pct = maxValue > 0 ? (item.count / maxValue) * 100 : 0;

          return (
            <div key={item.label}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-foreground">{item.label}</span>
                <span className="font-medium text-foreground">
                  {formatCount(item.count)}
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
