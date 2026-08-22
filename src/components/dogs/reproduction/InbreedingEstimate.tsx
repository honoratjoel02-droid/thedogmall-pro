import { useMemo } from "react";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";

import { useDogs } from "../../../hooks/useDogs";
import { computeInbreedingCoefficient } from "../../../lib/coi";

type Props = {
  sireId: string;
  damId: string;
};

function formatPercent(value: number): string {
  return `${(value * 100).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} %`;
}

export default function InbreedingEstimate({ sireId, damId }: Props) {
  const { data: dogs = [] } = useDogs();

  const dogsById = useMemo(() => new Map(dogs.map((d) => [d.id, d])), [dogs]);

  const sire = dogsById.get(sireId);
  const dam = dogsById.get(damId);

  const result = useMemo(() => {
    if (!sire || !dam) return null;

    return computeInbreedingCoefficient(sireId, damId, dogsById);
  }, [sire, dam, sireId, damId, dogsById]);

  if (!sire || !dam) return null;

  const hasPedigreeData = Boolean(
    sire.sireId || sire.damId || dam.sireId || dam.damId,
  );

  if (!hasPedigreeData || !result) {
    return (
      <div className="flex items-start gap-2 rounded-md border border-border bg-muted/30 px-3 py-2.5 text-sm text-muted-foreground">
        <Info className="mt-0.5 size-4 shrink-0" />
        <p>
          Ascendance inconnue pour ces deux chiens : le coefficient de
          consanguinité ne peut pas être estimé. Renseignez leurs parents
          dans leur fiche pour activer le calcul.
        </p>
      </div>
    );
  }

  const { coefficient, commonAncestors } = result;

  const tone =
    coefficient >= 0.0625
      ? {
          icon: AlertTriangle,
          text: "text-destructive",
          bg: "bg-destructive/10 border-destructive/30",
          label: "Élevé",
        }
      : coefficient >= 0.03
        ? {
            icon: AlertTriangle,
            text: "text-amber-600 dark:text-amber-400",
            bg: "bg-amber-500/10 border-amber-500/30",
            label: "Modéré",
          }
        : {
            icon: CheckCircle2,
            text: "text-success",
            bg: "bg-success/10 border-success/30",
            label: "Faible",
          };

  const Icon = tone.icon;

  return (
    <div className={`space-y-2 rounded-md border px-3 py-2.5 ${tone.bg}`}>
      <div className="flex items-center gap-2">
        <Icon className={`size-4 shrink-0 ${tone.text}`} />

        <p className="text-sm">
          Coefficient de consanguinité estimé :{" "}
          <span className={`font-semibold ${tone.text}`}>
            {formatPercent(coefficient)}
          </span>{" "}
          <span className={`text-xs ${tone.text}`}>({tone.label})</span>
        </p>
      </div>

      {commonAncestors.length > 0 && (
        <p className="pl-6 text-xs text-muted-foreground">
          Ancêtre{commonAncestors.length > 1 ? "s" : ""} commun
          {commonAncestors.length > 1 ? "s" : ""} :{" "}
          {commonAncestors.map((c) => c.dog.name).join(", ")}
        </p>
      )}
    </div>
  );
}
