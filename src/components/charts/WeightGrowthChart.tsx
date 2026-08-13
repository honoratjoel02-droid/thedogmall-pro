import { useState } from "react";

import type { WeightEntry } from "../../types/models/puppy";

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
  entries: WeightEntry[];
};

type Hover = {
  index: number;
  x: number;
  y: number;
};

const HEIGHT = 180;
const AXIS_BAND = 22;
const PADDING_X = 8;
const POINT_GAP = 56;

function niceMax(value: number): number {
  if (value <= 0) return 100;

  const magnitude = 10 ** Math.floor(Math.log10(value));
  const normalized = value / magnitude;

  const step = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;

  return step * magnitude;
}

function formatWeight(grams: number): string {
  return grams >= 1000
    ? `${(grams / 1000).toLocaleString("fr-FR", { maximumFractionDigits: 2 })} kg`
    : `${grams} g`;
}

function formatShortDate(date: string): string {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
  });
}

export default function WeightGrowthChart({ entries }: Props) {
  const [hover, setHover] = useState<Hover | null>(null);

  const tableView = (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Poids</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {entries.map((entry, index) => (
          <TableRow key={index}>
            <TableCell>{new Date(entry.date).toLocaleDateString("fr-FR")}</TableCell>
            <TableCell>{formatWeight(entry.weightGrams)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  if (entries.length < 2) {
    return (
      <ChartCard title="Courbe de croissance" table={tableView}>
        <div className="flex h-24 items-center justify-center text-center text-sm text-muted-foreground">
          Ajoutez au moins deux pesées pour afficher la courbe.
        </div>
      </ChartCard>
    );
  }

  const maxValue = Math.max(...entries.map((e) => e.weightGrams));
  const yMax = niceMax(maxValue);
  const plotHeight = HEIGHT - AXIS_BAND;
  const plotWidth = Math.max(240, (entries.length - 1) * POINT_GAP);
  const width = plotWidth + PADDING_X * 2;

  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(yMax * f));

  function x(index: number) {
    return entries.length === 1
      ? PADDING_X + plotWidth / 2
      : PADDING_X + (index / (entries.length - 1)) * plotWidth;
  }

  function y(value: number) {
    return plotHeight - (value / yMax) * plotHeight;
  }

  const linePath = entries
    .map((e, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(e.weightGrams)}`)
    .join(" ");

  const areaPath = `${linePath} L ${x(entries.length - 1)} ${plotHeight} L ${x(0)} ${plotHeight} Z`;

  const hitBandWidth = plotWidth / (entries.length - 1 || 1);

  return (
    <ChartCard title="Courbe de croissance" table={tableView}>
      <div className="relative overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${HEIGHT}`}
          width="100%"
          height={HEIGHT}
          role="img"
          aria-label="Courbe de croissance du chiot"
          style={{ minWidth: width }}
        >
          {ticks.map((tick) => {
            const ty = y(tick);

            return (
              <g key={tick}>
                <line
                  x1={0}
                  x2={width}
                  y1={ty}
                  y2={ty}
                  stroke="var(--border)"
                  strokeWidth={1}
                />

                <text x={0} y={ty - 4} fontSize={10} fill="var(--muted-foreground)">
                  {formatWeight(tick)}
                </text>
              </g>
            );
          })}

          <path d={areaPath} fill="var(--chart-category)" opacity={0.12} stroke="none" />

          <path
            d={linePath}
            fill="none"
            stroke="var(--chart-category)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {hover && (
            <line
              x1={x(hover.index)}
              x2={x(hover.index)}
              y1={0}
              y2={plotHeight}
              stroke="var(--muted-foreground)"
              strokeWidth={1}
              strokeDasharray="3 3"
            />
          )}

          {entries.map((entry, i) => {
            const px = x(i);
            const py = y(entry.weightGrams);
            const isEdge = i === 0 || i === entries.length - 1;

            return (
              <g key={i}>
                <circle
                  cx={px}
                  cy={py}
                  r={hover?.index === i ? 5 : 4}
                  fill="var(--card)"
                  stroke="var(--chart-category)"
                  strokeWidth={2}
                />

                {isEdge && (
                  <text
                    x={px}
                    y={i === 0 ? py - 10 : py - 10}
                    fontSize={10}
                    fontWeight={600}
                    textAnchor={i === 0 ? "start" : "end"}
                    fill="var(--foreground)"
                  >
                    {formatWeight(entry.weightGrams)}
                  </text>
                )}

                <rect
                  x={px - hitBandWidth / 2}
                  y={0}
                  width={hitBandWidth}
                  height={plotHeight}
                  fill="transparent"
                  style={{ pointerEvents: "all" }}
                  onMouseEnter={(e) => setHover({ index: i, x: e.clientX, y: e.clientY })}
                  onMouseMove={(e) => setHover({ index: i, x: e.clientX, y: e.clientY })}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover({ index: i, x: 0, y: 0 })}
                  onBlur={() => setHover(null)}
                  tabIndex={0}
                />
              </g>
            );
          })}

          {entries.map((entry, i) => (
            <text
              key={i}
              x={x(i)}
              y={HEIGHT - 6}
              fontSize={10}
              textAnchor="middle"
              fill="var(--muted-foreground)"
            >
              {formatShortDate(entry.date)}
            </text>
          ))}
        </svg>

        {hover && (
          <div
            className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full rounded-md bg-popover px-2.5 py-1.5 text-xs shadow-md ring-1 ring-foreground/10"
            style={{ left: hover.x, top: hover.y - 8 }}
          >
            <p className="text-muted-foreground">
              {new Date(entries[hover.index].date).toLocaleDateString("fr-FR")}
            </p>
            <p className="font-semibold text-popover-foreground">
              {formatWeight(entries[hover.index].weightGrams)}
            </p>
          </div>
        )}
      </div>
    </ChartCard>
  );
}
