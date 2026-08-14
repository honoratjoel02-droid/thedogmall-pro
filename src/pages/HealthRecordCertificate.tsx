import { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Download, Loader2, Printer } from "lucide-react";

import { Button } from "../components/ui/button";

import { useDog } from "../hooks/useDogs";
import { useHealthRecordsByDog } from "../hooks/useHealthRecords";
import { useKennelSettings } from "../hooks/useKennelSettings";

import { exportElementToPdf } from "../lib/pdf";
import { getCurrentWeightKg } from "../lib/weight";

const TYPE_LABELS: Record<string, string> = {
  Vaccination: "Vaccination",
  Vermifuge: "Vermifuge",
  Traitement: "Traitement",
  "Consultation vétérinaire": "Consultation vétérinaire",
  Pesée: "Pesée",
  Autre: "Autre",
};

export default function HealthRecordCertificate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const { data: dog, isLoading } = useDog(id);
  const { data: records = [] } = useHealthRecordsByDog(id);
  const { data: kennel } = useKennelSettings();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Chargement...
      </div>
    );
  }

  if (!dog) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Chien introuvable</h1>
        <Button onClick={() => navigate("/dogs")}>Retour aux chiens</Button>
      </div>
    );
  }

  const today = new Date().toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const sortedRecords = [...records].sort((a, b) => a.date.localeCompare(b.date));

  async function handleDownloadPdf() {
    if (!contentRef.current || !dog || isExporting) return;

    setIsExporting(true);
    try {
      await exportElementToPdf(contentRef.current, `carnet-de-sante-${dog.name}.pdf`);
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <div className="min-h-screen bg-muted/30 py-8 print:bg-white print:py-0">
      <div className="mx-auto mb-6 flex max-w-[210mm] items-center justify-between px-4 print:hidden">
        <Link
          to={`/dogs/${dog.id}`}
          className="text-sm text-muted-foreground hover:text-foreground hover:underline"
        >
          ← Retour à la fiche
        </Link>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDownloadPdf} disabled={isExporting}>
            {isExporting ? (
              <Loader2 className="mr-1.5 size-4 animate-spin" />
            ) : (
              <Download className="mr-1.5 size-4" />
            )}
            Télécharger en PDF
          </Button>

          <Button onClick={() => window.print()}>
            <Printer className="mr-1.5 size-4" />
            Imprimer
          </Button>
        </div>
      </div>

      <div
        ref={contentRef}
        className="mx-auto max-w-[210mm] rounded-xl border border-neutral-200 bg-white p-12 font-serif text-[13px] leading-relaxed text-neutral-900 shadow-sm print:max-w-none print:rounded-none print:border-0 print:p-[15mm] print:shadow-none"
      >
        <header className="mb-8 flex items-start justify-between border-b-2 border-neutral-900 pb-4">
          <div>
            <p className="text-lg font-bold">{kennel?.name || "Élevage"}</p>
            {kennel?.ownerName && <p>{kennel.ownerName}</p>}
            {kennel?.address && (
              <p className="text-neutral-600">{kennel.address}</p>
            )}
            <p className="text-neutral-600">
              {[kennel?.phone, kennel?.email].filter(Boolean).join(" — ")}
            </p>
          </div>

          {kennel?.registrationNumber && (
            <p className="text-right text-neutral-600">
              N° d'élevage
              <br />
              {kennel.registrationNumber}
            </p>
          )}
        </header>

        <h1 className="mb-1 text-center text-2xl font-bold tracking-wide uppercase">
          Carnet de santé
        </h1>

        <p className="mb-8 text-center text-neutral-500">Établi le {today}</p>

        <section className="mb-8 rounded-md border border-neutral-300 p-4">
          <p className="mb-2 font-bold uppercase">Sujet</p>

          <table className="w-full border-collapse">
            <tbody>
              {[
                ["Nom", dog.name],
                ["Race", dog.breed],
                ["Sexe", dog.sex],
                ["Couleur / robe", dog.color],
                [
                  "Date de naissance",
                  new Date(dog.birthDate).toLocaleDateString("fr-FR"),
                ],
                ["Poids", `${getCurrentWeightKg(dog)} kg`],
              ].map(([label, value]) => (
                <tr key={label} className="border-b border-neutral-200">
                  <td className="w-1/3 py-1 text-neutral-600">{label}</td>
                  <td className="py-1 font-medium">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h2 className="mb-3 font-bold uppercase">Historique médical</h2>

          {sortedRecords.length === 0 ? (
            <p className="text-neutral-500 italic">
              Aucun soin enregistré pour ce chien.
            </p>
          ) : (
            <table className="w-full border-collapse text-[12px]">
              <thead>
                <tr className="border-b-2 border-neutral-900 text-left">
                  <th className="py-1.5 pr-2">Date</th>
                  <th className="py-1.5 pr-2">Type</th>
                  <th className="py-1.5 pr-2">Intitulé</th>
                  <th className="py-1.5 pr-2">Poids</th>
                  <th className="py-1.5 pr-2">Fait</th>
                  <th className="py-1.5">Notes</th>
                </tr>
              </thead>

              <tbody>
                {sortedRecords.map((record) => (
                  <tr key={record.id} className="border-b border-neutral-200 align-top">
                    <td className="py-1.5 pr-2 whitespace-nowrap">
                      {new Date(record.date).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="py-1.5 pr-2">
                      {TYPE_LABELS[record.type] ?? record.type}
                    </td>
                    <td className="py-1.5 pr-2 font-medium">{record.title}</td>
                    <td className="py-1.5 pr-2 whitespace-nowrap">
                      {record.weightKg ? `${record.weightKg} kg` : "—"}
                    </td>
                    <td className="py-1.5 pr-2">{record.done ? "Oui" : "Non"}</td>
                    <td className="py-1.5 text-neutral-600">{record.notes ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <p className="mt-10 border-t border-neutral-200 pt-4 text-[11px] text-neutral-400">
          Document généré automatiquement par TheDogMall Pro à partir des
          informations saisies par l'éleveur. Il constitue un récapitulatif et
          ne remplace pas le carnet de santé officiel délivré par un
          vétérinaire.
        </p>
      </div>
    </div>
  );
}
