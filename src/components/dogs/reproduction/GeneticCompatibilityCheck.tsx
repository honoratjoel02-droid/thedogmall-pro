import { useMemo } from "react";
import { AlertTriangle, CheckCircle2, HelpCircle, Info } from "lucide-react";

import { useGeneticTestsByDog } from "../../../hooks/useGeneticTests";
import {
  computeGeneticCompatibility,
  type CompatibilityRisk,
} from "../../../lib/geneticCompatibility";

type Props = {
  sireId: string;
  damId: string;
};

const RISK_LABEL: Record<CompatibilityRisk, string> = {
  high: "Risque élevé",
  moderate: "À surveiller",
  clear: "Sans risque connu",
  unknown: "Résultat en attente",
};

export default function GeneticCompatibilityCheck({ sireId, damId }: Props) {
  const { data: sireTests = [] } = useGeneticTestsByDog(sireId);
  const { data: damTests = [] } = useGeneticTestsByDog(damId);

  const comparisons = useMemo(
    () => computeGeneticCompatibility(sireTests, damTests),
    [sireTests, damTests],
  );

  if (sireTests.length === 0 || damTests.length === 0) {
    return (
      <div className="flex items-start gap-2 rounded-md border border-border bg-muted/30 px-3 py-2.5 text-sm text-muted-foreground">
        <Info className="mt-0.5 size-4 shrink-0" />
        <p>
          Aucun test génétique enregistré pour{" "}
          {sireTests.length === 0 && damTests.length === 0
            ? "ces deux chiens"
            : "l'un de ces deux chiens"}{" "}
          : la compatibilité génétique ne peut pas être évaluée. Ajoutez leurs
          résultats dans l'onglet « Tests génétiques » de chaque fiche.
        </p>
      </div>
    );
  }

  if (comparisons.length === 0) {
    return (
      <div className="flex items-start gap-2 rounded-md border border-border bg-muted/30 px-3 py-2.5 text-sm text-muted-foreground">
        <Info className="mt-0.5 size-4 shrink-0" />
        <p>
          Aucun test génétique commun entre ces deux chiens : leurs résultats
          ne peuvent pas être comparés.
        </p>
      </div>
    );
  }

  const worstRisk = comparisons[0].risk;

  const tone =
    worstRisk === "high"
      ? {
          icon: AlertTriangle,
          text: "text-destructive",
          bg: "bg-destructive/10 border-destructive/30",
        }
      : worstRisk === "moderate"
        ? {
            icon: AlertTriangle,
            text: "text-amber-600 dark:text-amber-400",
            bg: "bg-amber-500/10 border-amber-500/30",
          }
        : worstRisk === "unknown"
          ? {
              icon: HelpCircle,
              text: "text-muted-foreground",
              bg: "bg-muted/30 border-border",
            }
          : {
              icon: CheckCircle2,
              text: "text-emerald-600 dark:text-emerald-400",
              bg: "bg-emerald-500/10 border-emerald-500/30",
            };

  const Icon = tone.icon;

  return (
    <div className={`space-y-2 rounded-md border px-3 py-2.5 ${tone.bg}`}>
      <div className="flex items-center gap-2">
        <Icon className={`size-4 shrink-0 ${tone.text}`} />

        <p className={`text-sm font-medium ${tone.text}`}>
          Compatibilité génétique : {RISK_LABEL[worstRisk]}
        </p>
      </div>

      <ul className="space-y-1 pl-6 text-xs text-muted-foreground">
        {comparisons.map((c) => (
          <li key={c.testName}>
            <span className="font-medium text-foreground">{c.testName}</span>{" "}
            — Mâle : {c.sireResult}, Femelle : {c.damResult}
            {c.risk === "high" && " · risque de chiots atteints"}
            {c.risk === "moderate" &&
              " · certains chiots pourraient être porteurs"}
          </li>
        ))}
      </ul>
    </div>
  );
}
