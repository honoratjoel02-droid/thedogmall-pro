import { cn } from "../../lib/utils";
import { Skeleton } from "./skeleton";

type LoadingStateProps = {
  rows?: number;
  className?: string;
  rowClassName?: string;
};

export default function LoadingState({
  rows = 3,
  className,
  rowClassName,
}: LoadingStateProps) {
  return (
    <div className={cn("space-y-3", className)} aria-hidden="true">
      {Array.from({ length: rows }).map((_, index) => (
        <Skeleton key={index} className={cn("h-16 w-full rounded-xl", rowClassName)} />
      ))}
    </div>
  );
}
