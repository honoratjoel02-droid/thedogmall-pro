import type { ReactNode } from "react";

type EmptyStateProps = {
  icon?: ReactNode;
  title: string;
  description?: string;
};

export function EmptyState({
  icon = "🚧",
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 px-6 py-20 text-center">
      <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted text-3xl">
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-foreground">
        {title}
      </h3>

      {description && (
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
