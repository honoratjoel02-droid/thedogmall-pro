import { useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Download, Loader2, Printer } from "lucide-react";

import { Button } from "../components/ui/button";

import { useDog, useDogs } from "../hooks/useDogs";
import { useKennelSettings } from "../hooks/useKennelSettings";

import { buildPedigreeTree, type PedigreeNode } from "../lib/pedigree";
import { exportElementToPdf } from "../lib/pdf";
import type { Dog } from "../types/dog";

const ANCESTOR_GENERATIONS = 4;

function CertificateBox({ dog }: { dog: Dog | null }) {
  return (
    <div className="flex w-44 shrink-0 flex-col justify-center gap-0.5 border border-neutral-400 px-2.5 py-1.5 text-[11px]">
      {dog ? (
        <>
          <p className="font-bold">{dog.name}</p>
          <p className="text-neutral-600">{dog.breed}</p>
          <p className="text-neutral-600">
            {dog.sex} · {dog.color}
          </p>
        </>
      ) : (
        <p className="text-neutral-400 italic">Inconnu</p>
      )}
    </div>
  );
}

function CertificateBranch({ node, depth }: { node: PedigreeNode; depth: number }) {
  const hasNextGeneration = depth > 1 && (node.sire || node.dam);

  return (
    <div className="flex items-stretch">
      <div className="flex items-center">
        <CertificateBox dog={node.dog} />
      </div>

      {hasNextGeneration && (
        <div className="ml-3 flex flex-col justify-around gap-3 border-l border-neutral-300 pl-3">
          <CertificateBranch
            node={node.sire ?? { dog: null, sire: null, dam: null }}
            depth={depth - 1}
          />
          <CertificateBranch
            node={node.dam ?? { dog: null, sire: null, dam: null }}
            depth={depth - 1}
          />
        </div>
      )}
    </div>
  );
}

export default function PedigreeCertificate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const { data: dog, isLoading } = useDog(id);
  const { data: dogs = [] } = useDogs();
  const { data: kennel } = useKennelSettings();

  const dogsById = useMemo(() => new Map(dogs.map((d) => [d.id, d])), [dogs]);
  const tree = useMemo(
    () => (dog ? buildPedigreeTree(dog, dogsById, ANCESTOR_GENERATIONS) : null),
    [dog, dogsById],
  );

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Chargement...
      </div>
    );
  }

  if (!dog || !tree) {
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

  async function handleDownloadPdf() {
    if (!contentRef.current || !dog || isExporting) return;

    setIsExporting(true);
    try {
      await exportElementToPdf(contentRef.current, `pedigree-${dog.name}.pdf`);
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
          Certificat de pedigree
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
                ["Poids", `${dog.weight} kg`],
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
          <h2 className="mb-3 font-bold uppercase">Ascendance</h2>

          <div className="overflow-x-auto pb-2">
            <CertificateBranch node={tree} depth={ANCESTOR_GENERATIONS} />
          </div>
        </section>

        <p className="mt-10 border-t border-neutral-200 pt-4 text-[11px] text-neutral-400">
          Document généré automatiquement par TheDogMall Pro à partir des
          informations saisies par l'éleveur. Il constitue un modèle et ne
          remplace pas un certificat officiel délivré par un livre
          généalogique reconnu.
        </p>
      </div>
    </div>
  );
}
