import { useState, type ReactNode } from "react";
import { Table2, BarChart3 } from "lucide-react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

type Props = {
  title: string;
  subtitle?: string;
  table: ReactNode;
  children: ReactNode;
};

export default function ChartCard({ title, subtitle, table, children }: Props) {
  const [showTable, setShowTable] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>

        {subtitle && <CardDescription>{subtitle}</CardDescription>}

        <CardAction>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setShowTable((v) => !v)}
            title={showTable ? "Voir le graphique" : "Voir en tableau"}
          >
            {showTable ? (
              <BarChart3 className="size-4" />
            ) : (
              <Table2 className="size-4" />
            )}

            <span className="sr-only">
              {showTable ? "Voir le graphique" : "Voir en tableau"}
            </span>
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>{showTable ? table : children}</CardContent>
    </Card>
  );
}
