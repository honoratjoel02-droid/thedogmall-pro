import type { LucideIcon } from "lucide-react";

import { cn } from "../../lib/utils";
import { Card, CardContent } from "./card";

const TONE_CLASSES = {
  primary: "bg-primary/10 text-primary",
  success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  danger: "bg-destructive/10 text-destructive",
  neutral: "bg-muted text-muted-foreground",
} as const;

type StatTileProps = {
  label: string;
  value: string | number;
  icon: LucideIcon;
  tone?: keyof typeof TONE_CLASSES;
  valueClassName?: string;
};

export default function StatTile({
  label,
  value,
  icon: Icon,
  tone = "primary",
  valueClassName,
}: StatTileProps) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="flex items-center justify-between gap-4 p-6">
        <div className="min-w-0">
          <p className="truncate text-sm text-muted-foreground">{label}</p>

          <p className={cn("mt-2 text-3xl font-bold", valueClassName)}>
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
}
