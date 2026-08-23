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
  onClick?: () => void;
  active?: boolean;
};

export default function StatTile({
  label,
  value,
  icon: Icon,
  tone = "primary",
  valueClassName,
  to,
  onClick,
  active = false,
}: StatTileProps) {
  const interactive = Boolean(to || onClick);

  const card = (
    <Card
      variant={interactive ? "interactive" : "default"}
      className={cn(active && "border-primary ring-1 ring-primary")}
    >
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

  if (to) {
    return (
      <Link to={to} className="block">
        {card}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className="block w-full text-left">
        {card}
      </button>
    );
  }

  return card;
}
