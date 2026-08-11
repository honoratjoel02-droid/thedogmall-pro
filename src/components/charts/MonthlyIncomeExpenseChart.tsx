import { useState } from "react";

import type { MonthlyTotal } from "../../lib/financeStats";

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
  data: MonthlyTotal[];
};

type Hover = {
  monthIndex: number;
  series: "income" | "expense";
  x: number;
  y: number;
};

const HEIGHT = 220;
const AXIS_BAND = 28;
const BAR_WIDTH = 18;
const BAR_GAP = 2;
const GROUP_GAP = 24;

function niceMax(value: number): number {
  if (value <= 0) return 100;

  const magnitude = 10 ** Math.floor(Math.log10(value));
  const normalized = value / magnitude;

  const step = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;

  return step * magnitude;
}

function formatFCFA(value: number): string {
  return `${value.toLocaleString("fr-FR")} FCFA`;
}

export default function MonthlyIncomeExpenseChart({ data }: Props) {
  const [hover, setHover] = useState<Hover | null>(null);

  const maxValue = Math.max(1, ...data.map((m) => Math.max(m.income, m.expense)));
  const yMax = niceMax(maxValue);
  const plotHeight = HEIGHT - AXIS_BAND;

  const groupWidth = BAR_WIDTH * 2 + BAR_GAP;
  const width = data.length * (groupWidth + GROUP_GAP);

  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(yMax * f));

  function barHeight(value: number) {
    return (value / yMax) * plotHeight;
  }

  const tableView = (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Mois</TableHead>
          <TableHead>Recettes</TableHead>
          <TableHead>Dépenses</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((m) => (
          <TableRow key={m.key}>
            <TableCell className="capitalize">{m.label}</TableCell>
            <TableCell>{formatFCFA(m.income)}</TableCell>
            <TableCell>{formatFCFA(m.expense)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <ChartCard
      title="Recettes vs Dépenses"
      subtitle="6 derniers mois"
      table={tableView}
    >
      <div className="mb-3 flex items-center gap-4 text-sm">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[var(--chart-income)]" />
          Recettes
        </span>

        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[var(--chart-expense)]" />
          Dépenses
        </span>
      </div>

      <div className="relative overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${HEIGHT}`}
          width="100%"
          height={HEIGHT}
          role="img"
          aria-label="Recettes et dépenses des 6 derniers mois"
          style={{ minWidth: width }}
        >
          {ticks.map((tick) => {
            const y = plotHeight - (tick / yMax) * plotHeight;

            return (
              <g key={tick}>
                <line
                  x1={0}
                  x2={width}
                  y1={y}
                  y2={y}
                  stroke="var(--border)"
                  strokeWidth={1}
                />

                <text
                  x={0}
                  y={y - 4}
                  fontSize={10}
                  fill="var(--muted-foreground)"
                >
                  {tick.toLocaleString("fr-FR")}
                </text>
              </g>
            );
          })}

          <line
            x1={0}
            x2={width}
            y1={plotHeight}
            y2={plotHeight}
            stroke="var(--muted-foreground)"
            strokeWidth={1}
          />

          {data.map((m, i) => {
            const groupX = i * (groupWidth + GROUP_GAP);
            const incomeH = barHeight(m.income);
            const expenseH = barHeight(m.expense);

            return (
              <g key={m.key}>
                <rect
                  x={groupX}
                  y={plotHeight - incomeH}
                  width={BAR_WIDTH}
                  height={Math.max(incomeH, 1)}
                  rx={4}
                  fill="var(--chart-income)"
                  opacity={
                    hover && hover.monthIndex === i && hover.series !== "income"
                      ? 0.6
                      : 1
                  }
                  onMouseEnter={(e) =>
                    setHover({
                      monthIndex: i,
                      series: "income",
                      x: e.clientX,
                      y: e.clientY,
                    })
                  }
                  onMouseLeave={() => setHover(null)}
                  onFocus={() =>
                    setHover({ monthIndex: i, series: "income", x: 0, y: 0 })
                  }
                  onBlur={() => setHover(null)}
                  tabIndex={0}
                >
                  <title>
                    {m.label} — Recettes : {formatFCFA(m.income)}
                  </title>
                </rect>

                <rect
                  x={groupX + BAR_WIDTH + BAR_GAP}
                  y={plotHeight - expenseH}
                  width={BAR_WIDTH}
                  height={Math.max(expenseH, 1)}
                  rx={4}
                  fill="var(--chart-expense)"
                  opacity={
                    hover && hover.monthIndex === i && hover.series !== "expense"
                      ? 0.6
                      : 1
                  }
                  onMouseEnter={(e) =>
                    setHover({
                      monthIndex: i,
                      series: "expense",
                      x: e.clientX,
                      y: e.clientY,
                    })
                  }
                  onMouseLeave={() => setHover(null)}
                  onFocus={() =>
                    setHover({ monthIndex: i, series: "expense", x: 0, y: 0 })
                  }
                  onBlur={() => setHover(null)}
                  tabIndex={0}
                >
                  <title>
                    {m.label} — Dépenses : {formatFCFA(m.expense)}
                  </title>
                </rect>

                <text
                  x={groupX + groupWidth / 2}
                  y={HEIGHT - 8}
                  fontSize={11}
                  textAnchor="middle"
                  fill="var(--muted-foreground)"
                  className="capitalize"
                >
                  {m.label}
                </text>
              </g>
            );
          })}
        </svg>

        {hover && (
          <div
            className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full rounded-md bg-popover px-2.5 py-1.5 text-xs shadow-md ring-1 ring-foreground/10"
            style={{ left: hover.x, top: hover.y - 8 }}
          >
            <p className="text-muted-foreground">
              {data[hover.monthIndex].label}
            </p>
            <p className="font-semibold text-popover-foreground">
              {hover.series === "income" ? "Recettes : " : "Dépenses : "}
              {formatFCFA(
                hover.series === "income"
                  ? data[hover.monthIndex].income
                  : data[hover.monthIndex].expense,
              )}
            </p>
          </div>
        )}
      </div>
    </ChartCard>
  );
}
