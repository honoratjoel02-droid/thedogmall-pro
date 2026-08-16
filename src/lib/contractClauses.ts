// src/lib/contractClauses.ts

import type { ContractClause } from "../types/models/contractTemplate";

export const DEFAULT_CLAUSES: ContractClause[] = [
  {
    id: "default-health",
    title: "État de santé et garanties",
    content:
      "L'Éleveur déclare que l'animal cédé est, à sa connaissance et à la date des présentes, en bon état de santé apparent. L'Acquéreur est informé qu'il dispose, conformément aux dispositions applicables en matière de vices rédhibitoires, d'un délai légal pour faire constater par un vétérinaire de son choix tout vice caché affectant l'animal.",
  },
  {
    id: "default-obligations",
    title: "Obligations de l'Acquéreur",
    content:
      "L'Acquéreur s'engage à : assurer à l'animal des conditions de vie, de soins, d'alimentation et d'exercice conformes à ses besoins physiologiques et comportementaux ; faire suivre à l'animal le calendrier de vaccination et de vermifugation recommandé par un vétérinaire ; ne pas céder l'animal à un tiers sans en informer préalablement l'Éleveur.",
  },
  {
    id: "default-documents",
    title: "Documents remis",
    content:
      "Sont remis à l'Acquéreur à la signature des présentes : le carnet de santé de l'animal, ainsi que tout document utile à son identification et à son suivi vétérinaire.",
  },
  {
    id: "default-disputes",
    title: "Litiges",
    content:
      "Tout litige relatif à l'interprétation ou à l'exécution du présent contrat sera, à défaut d'accord amiable entre les parties, soumis aux juridictions compétentes.",
  },
];
