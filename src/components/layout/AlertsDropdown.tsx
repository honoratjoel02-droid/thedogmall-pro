import { Bell, AlertTriangle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { useTasks } from "../../hooks/useTasks";
import { usePregnancies } from "../../hooks/usePregnancies";
import { usePuppies } from "../../hooks/usePuppies";
import { useDogs } from "../../hooks/useDogs";
import { useHealthRecords } from "../../hooks/useHealthRecords";
import { useHeatCycles } from "../../hooks/useHeatCycles";
import { useRenewalReminders } from "../../hooks/useRenewalReminders";
import { useRecurringExpenses } from "../../hooks/useRecurringExpenses";
import { useLastBackupAt } from "../../hooks/useLastBackupAt";

import { computeAlerts } from "../../lib/alerts";

const SEVERITY_STYLES = {
  overdue: {
    icon: AlertTriangle,
    badge: "bg-destructive/10 text-destructive",
  },
  soon: {
    icon: Clock,
    badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  info: {
    icon: Clock,
    badge: "bg-muted text-muted-foreground",
  },
} as const;

const MAX_VISIBLE_ALERTS = 6;

export default function AlertsDropdown() {
  const navigate = useNavigate();

  const { data: tasks = [] } = useTasks();
  const { data: pregnancies = [] } = usePregnancies();
  const { data: puppies = [] } = usePuppies();
  const { data: dogs = [] } = useDogs();
  const { data: healthRecords = [] } = useHealthRecords();
  const { data: heatCycles = [] } = useHeatCycles();
  const { data: renewalReminders = [] } = useRenewalReminders();
  const { data: recurringExpenses = [] } = useRecurringExpenses();
  const lastBackupAt = useLastBackupAt();

  const alerts = computeAlerts({
    tasks,
    pregnancies,
    puppies,
    dogs,
    healthRecords,
    heatCycles,
    renewalReminders,
    recurringExpenses,
    lastBackupAt,
  });
  const visibleAlerts = alerts.slice(0, MAX_VISIBLE_ALERTS);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={(props) => (
          <button {...props} className="relative outline-none">
            <Bell
              className="text-primary-foreground transition-opacity hover:opacity-80"
              strokeWidth={2.25}
              size={20}
            />

            {alerts.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                {alerts.length > 9 ? "9+" : alerts.length}
              </span>
            )}
          </button>
        )}
      />

      <DropdownMenuContent align="end" className="w-80 max-w-[calc(100vw-2rem)]">
        <p className="px-1.5 py-1 text-xs font-medium text-muted-foreground">
          Alertes
        </p>

        {alerts.length === 0 && (
          <p className="px-1.5 py-4 text-center text-sm text-muted-foreground">
            Aucune alerte pour le moment. Tout est à jour !
          </p>
        )}

        {visibleAlerts.map((alert) => {
          const style = SEVERITY_STYLES[alert.severity];
          const Icon = style.icon;

          return (
            <DropdownMenuItem
              key={alert.id}
              className="items-start gap-2 whitespace-normal"
              onClick={() => alert.link && navigate(alert.link)}
            >
              <div
                className={`flex size-7 shrink-0 items-center justify-center rounded-full ${style.badge}`}
              >
                <Icon className="size-3.5" />
              </div>

              <div className="flex flex-col">
                <span className="text-sm">{alert.message}</span>

                <span className="text-xs text-muted-foreground">
                  {new Date(alert.date).toLocaleDateString("fr-FR")}
                </span>
              </div>
            </DropdownMenuItem>
          );
        })}

        {alerts.length > 0 && (
          <>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => navigate("/calendar")}>
              Voir toutes les alertes
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
