import type { ReactNode } from "react";

type PageHeaderProps = {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  action?: ReactNode;
};

export default function PageHeader({
  icon,
  title,
  subtitle,
  action,
}: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-3xl">
          {icon}
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-1 text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}
