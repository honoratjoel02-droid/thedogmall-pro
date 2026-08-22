import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { cn } from "../../lib/utils";
import { Card, CardContent } from "./card";

const TONE_CLASSES = {
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  danger: "bg-destructive/10 text-destructive",
  neutral: "bg-muted text-muted-foreground",
} as const;

type StatTileProps = {
  label: string;
  value: string | number;
  icon: LucideIcon;
  tone?: keyof typeof TONE_CLASSES;
  valueClassName?: string;
  to?: string;
};

export default function StatTile({
  label,
  value,
  icon: Icon,
  tone = "primary",
  valueClassName,
  to,
}: StatTileProps) {
  const card = (
    <Card variant={to ? "interactive" : "default"}>
      <CardContent className="flex items-center justify-between gap-4 p-6">
        <div className="min-w-0">
          <p className="truncate text-sm text-muted-foreground">{label}</p>

          <p className={cn("mt-2 text-3xl font-semibold tracking-tight", valueClassName)}>
            {value}
          </p>
        </div>

        <div
          className={cn(
            "flex size-12 shrink-0 items-center justify-center rounded-xl",
            TONE_CLASSES[tone],
          )}
        >
          <Icon className="size-6" />
        </div>
      </CardContent>
    </Card>
  );

  if (!to) return card;

  return (
    <Link to={to} className="block">
      {card}
    </Link>
  );
}
