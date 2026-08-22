import type { LucideIcon } from "lucide-react";

import { cn } from "../../lib/utils";

type EmptyStateProps = {
  icon?: LucideIcon;
  label: string;
  className?: string;
};

export default function EmptyState({ icon: Icon, label, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border py-12 text-center",
        className,
      )}
    >
      {Icon && <Icon className="size-6 text-muted-foreground/50" />}

      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
