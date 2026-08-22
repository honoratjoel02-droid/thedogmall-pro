import { Link } from "react-router-dom";
import { AlertTriangle, Clock, CheckCircle2 } from "lucide-react";

import type { Alert } from "../../lib/alerts";

import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import EmptyState from "../ui/empty-state";
import LoadingState from "../ui/loading-state";

type Props = {
  alerts: Alert[];
  isLoading?: boolean;
};

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

export default function AlertsList({ alerts, isLoading = false }: Props) {
  if (isLoading) {
    return <LoadingState rows={3} />;
  }

  if (alerts.length === 0) {
    return <EmptyState icon={CheckCircle2} label="Aucune alerte pour le moment. Tout est à jour !" />;
  }

  return (
    <div className="space-y-3">
      {alerts.map((alert) => {
        const style = SEVERITY_STYLES[alert.severity];
        const Icon = style.icon;

        return (
          <Card key={alert.id}>
            <CardContent className="flex items-center justify-between gap-4 p-4">
              <div className="flex items-center gap-3">
                <div
                  className={`flex size-9 shrink-0 items-center justify-center rounded-full ${style.badge}`}
                >
                  <Icon className="size-4" />
                </div>

                <div>
                  <p className="font-medium">{alert.message}</p>

                  <p className="text-sm text-muted-foreground">
                    {new Date(alert.date).toLocaleDateString("fr-FR")}
                  </p>
                </div>
              </div>

              {alert.link && (
                <Button
                  variant="outline"
                  size="sm"
                  render={(props) => (
                    <Link {...props} to={alert.link!}>
                      Voir
                    </Link>
                  )}
                />
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
