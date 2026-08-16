import { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Download, Loader2, Printer } from "lucide-react";

import { Button } from "../components/ui/button";

import { useSale } from "../hooks/useSales";
import { usePuppies } from "../hooks/usePuppies";
import { useLitter } from "../hooks/useLitters";
import { useDogs } from "../hooks/useDogs";
import { useClient } from "../hooks/useClients";
import { useKennelSettings } from "../hooks/useKennelSettings";
import { useContractTemplates } from "../hooks/useContractTemplates";
import { exportElementToPdf } from "../lib/pdf";
import { getBalanceDue, getTotalPaid, isFullyPaid } from "../lib/payments";
import { DEFAULT_CLAUSES } from "../lib/contractClauses";

export default function SaleContract() {
  const { id } = useParams();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const { data: sale, isLoading: loadingSale } = useSale(id);
  const { data: puppies = [] } = usePuppies();
  const { data: client } = useClient(sale?.clientId);
  const { data: litter } = useLitter(sale?.litterId);
  const { data: dogs = [] } = useDogs();
  const { data: kennel } = useKennelSettings();
  const { data: contractTemplates = [] } = useContractTemplates();

  if (loadingSale) {
    return (
      <div className="flex h-screen items-center justify-center">
        Chargement...
      </div>
    );
  }

  if (!sale) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Vente introuvable</h1>
        <Button onClick={() => navigate("/litters")}>
          Retour aux portées
        </Button>
      </div>
    );
  }

  const puppy = puppies.find((p) => p.id === sale.puppyId);
  const female = litter ? dogs.find((d) => d.id === litter.femaleId) : undefined;
  const male = litter ? dogs.find((d) => d.id === litter.maleId) : undefined;
  const breed = female?.breed ?? male?.breed;

  const today = new Date().toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const clientName = client ? `${client.firstName} ${client.lastName}` : "—";
  const priceWords = sale.price.toLocaleString("fr-FR");
  const totalPaid = getTotalPaid(sale);
  const balanceDue = getBalanceDue(sale);
  const fullyPaid = isFullyPaid(sale);

  const activeTemplate = contractTemplates.find((t) => t.isDefault);
  const clauses = activeTemplate?.clauses ?? DEFAULT_CLAUSES;

  async function handleDownloadPdf() {
    if (!contentRef.current || !sale || isExporting) return;

    setIsExporting(true);
    try {
      await exportElementToPdf(
        contentRef.current,
        `contrat-cession-${puppy?.identifier ?? sale.id}.pdf`,
      );
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <div className="min-h-screen bg-muted/30 py-8 print:bg-white print:py-0">
      <div className="mx-auto mb-6 flex max-w-[210mm] items-center justify-between px-4 print:hidden">
        <Link
          to={puppy ? `/litters/${puppy.litterId}` : "/litters"}
          className="text-sm text-muted-foreground hover:text-foreground hover:underline"
        >
          ← Retour à la portée
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
        {/* Letterhead */}
        <header className="mb-8 flex items-start justify-between border-b-2 border-neutral-900 pb-4">
          <div>
            <p className="text-lg font-bold">
              {kennel?.name || "Élevage"}
            </p>
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
          Contrat de cession d'un chiot
        </h1>

        <p className="mb-8 text-center text-neutral-500">
          Établi le {today}
        </p>

        {/* Parties */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-md border border-neutral-300 p-4">
            <p className="mb-2 font-bold uppercase">Le Cédant</p>
            <p className="italic text-neutral-500">
              ci-après désigné « l'Éleveur »
            </p>
            <div className="mt-2 space-y-0.5">
              <p>{kennel?.name || "—"}</p>
              <p>{kennel?.ownerName || "—"}</p>
              <p>{kennel?.address || "—"}</p>
              <p>Tél : {kennel?.phone || "—"}</p>
              <p>Email : {kennel?.email || "—"}</p>
            </div>
          </div>

          <div className="rounded-md border border-neutral-300 p-4">
            <p className="mb-2 font-bold uppercase">Le Cessionnaire</p>
            <p className="italic text-neutral-500">
              ci-après désigné « l'Acquéreur »
            </p>
            <div className="mt-2 space-y-0.5">
              <p>{clientName}</p>
              <p>{client?.address || "—"}</p>
              <p>Tél : {client?.phone || "—"}</p>
              <p>Email : {client?.email || "—"}</p>
            </div>
          </div>
        </section>

        <p className="mb-6">
          Il a été convenu et arrêté ce qui suit :
        </p>

        <div className="space-y-5">
          <article>
            <h2 className="mb-1 font-bold">Article 1 — Objet</h2>
            <p>
              Le présent contrat a pour objet la cession, à titre onéreux,
              par l'Éleveur à l'Acquéreur, qui l'accepte, du chiot décrit à
              l'article 2 ci-après.
            </p>
          </article>

          <article>
            <h2 className="mb-1 font-bold">
              Article 2 — Identification de l'animal
            </h2>
            <table className="w-full border-collapse">
              <tbody>
                {[
                  ["Identifiant", puppy?.identifier ?? "—"],
                  ["Race", breed ?? "—"],
                  ["Sexe", puppy?.sex ?? "—"],
                  ["Couleur / robe", puppy?.color ?? "—"],
                  [
                    "Date de naissance",
                    litter
                      ? new Date(litter.birthDate).toLocaleDateString("fr-FR")
                      : "—",
                  ],
                  ["Père", male?.name ?? "—"],
                  ["Mère", female?.name ?? "—"],
                ].map(([label, value]) => (
                  <tr key={label} className="border-b border-neutral-200">
                    <td className="w-1/3 py-1 text-neutral-600">{label}</td>
                    <td className="py-1 font-medium">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>

          <article>
            <h2 className="mb-1 font-bold">
              Article 3 — Prix et modalités de paiement
            </h2>
            {fullyPaid ? (
              <p>
                La présente cession est consentie et acceptée moyennant le
                prix de <strong>{priceWords} FCFA</strong>, que l'Acquéreur a
                payé intégralement à l'Éleveur, ce dont ce dernier lui donne
                quittance.
              </p>
            ) : (
              <p>
                La présente cession est consentie et acceptée moyennant le
                prix de <strong>{priceWords} FCFA</strong>. L'Acquéreur a
                versé à ce jour un acompte de{" "}
                <strong>{totalPaid.toLocaleString("fr-FR")} FCFA</strong>, le
                solde de{" "}
                <strong>{balanceDue.toLocaleString("fr-FR")} FCFA</strong>{" "}
                restant dû devant être réglé selon les modalités convenues
                entre les parties.
              </p>
            )}
            <p>
              Date de la cession :{" "}
              {new Date(sale.saleDate).toLocaleDateString("fr-FR")}.
            </p>
          </article>

          {clauses.map((clause, index) => (
            <article key={clause.id}>
              <h2 className="mb-1 font-bold">
                Article {index + 4} — {clause.title}
              </h2>
              <p className="whitespace-pre-wrap">{clause.content}</p>
            </article>
          ))}

          {sale.notes && (
            <article>
              <h2 className="mb-1 font-bold">Notes complémentaires</h2>
              <p>{sale.notes}</p>
            </article>
          )}
        </div>

        <p className="mt-8 mb-2">
          Fait en deux exemplaires originaux, à ______________________, le{" "}
          {today}.
        </p>

        <p className="mb-8 text-neutral-600 italic">
          Chaque partie fait précéder sa signature de la mention manuscrite
          « Bon pour accord ».
        </p>

        <section className="grid gap-12 sm:grid-cols-2">
          <div>
            <p className="font-bold">L'Éleveur</p>
            <div className="mt-16 border-t border-neutral-400" />
          </div>

          <div>
            <p className="font-bold">L'Acquéreur</p>
            <div className="mt-16 border-t border-neutral-400" />
          </div>
        </section>

        <p className="mt-10 border-t border-neutral-200 pt-4 text-[11px] text-neutral-400">
          Document généré automatiquement par TheDogMall Pro à partir des
          informations saisies par l'éleveur. Il constitue un modèle et ne
          remplace pas un contrat rédigé ou validé par un professionnel du
          droit.
        </p>
      </div>
    </div>
  );
}
