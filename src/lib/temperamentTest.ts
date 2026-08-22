import type {
  TemperamentTest,
  TemperamentTestItem,
} from "../types/models/puppy";

export interface TemperamentTestDefinition {
  id: string;
  label: string;
  description: string;
}

// Grille inspirée du Puppy Aptitude Test (Volhard) : 10 exercices notés de 1 à 6,
// réalisés vers 7 semaines, dans un lieu neutre et calme.
export const VOLHARD_TEMPERAMENT_TEST: TemperamentTestDefinition[] = [
  {
    id: "social-attraction",
    label: "Attraction sociale",
    description:
      "L'observateur s'accroupit et tape des mains : le chiot vient-il facilement, la queue haute ?",
  },
  {
    id: "following",
    label: "Suivi",
    description:
      "L'observateur se relève et s'éloigne en marchant normalement : le chiot suit-il ?",
  },
  {
    id: "restraint",
    label: "Contrainte",
    description:
      "Le chiot est doucement allongé sur le dos et maintenu 30 secondes : comment réagit-il ?",
  },
  {
    id: "social-dominance",
    label: "Dominance sociale",
    description:
      "Le chiot debout est caressé le long du dos jusqu'à la croupe : accepte-t-il le contact ?",
  },
  {
    id: "elevation-dominance",
    label: "Dominance par élévation",
    description:
      "Le chiot est soulevé du sol, soutenu sous le ventre, pendant 30 secondes : comment réagit-il ?",
  },
  {
    id: "retrieving",
    label: "Rapport d'objet",
    description:
      "Un objet froissé est lancé devant le chiot : le poursuit-il, le rapporte-t-il ?",
  },
  {
    id: "touch-sensitivity",
    label: "Sensibilité tactile",
    description:
      "Une pression légère et progressive est appliquée entre les doigts : à quel niveau réagit-il ?",
  },
  {
    id: "sound-sensitivity",
    label: "Sensibilité sonore",
    description:
      "Un bruit soudain (ex. objet métallique qui tombe) est produit à quelques mètres : comment réagit-il ?",
  },
  {
    id: "sight-sensitivity",
    label: "Sensibilité visuelle",
    description:
      "Un objet inconnu (serviette froissée attachée à une ficelle) est tiré au sol devant le chiot : réagit-il ?",
  },
  {
    id: "stability",
    label: "Stabilité",
    description:
      "Un objet inhabituel s'ouvre soudainement à quelques pas (ex. parapluie) : comment réagit-il ?",
  },
];

export const TEMPERAMENT_SCORE_LABELS: Record<number, string> = {
  1: "1 — Très dominant / affirmé",
  2: "2 — Dominant",
  3: "3 — Sociable, sûr de lui",
  4: "4 — Indépendant, réservé",
  5: "5 — Peu sûr, soumis",
  6: "6 — Craintif",
};

export type TemperamentProfile =
  | "Dominant"
  | "Équilibré"
  | "Indépendant"
  | "Craintif";

export const TEMPERAMENT_PROFILE_DESCRIPTIONS: Record<
  TemperamentProfile,
  string
> = {
  Dominant:
    "Chiot affirmé, potentiellement dominant : convient à un maître expérimenté, ferme et cohérent.",
  Équilibré:
    "Chiot sociable et équilibré : profil recommandé pour la majorité des familles.",
  Indépendant:
    "Chiot indépendant, réservé : bonne compagnie mais éducation à démarrer tôt.",
  Craintif:
    "Chiot craintif ou peu sûr de lui : nécessite un environnement calme et un placement adapté.",
};

export function createEmptyTemperamentTest(
  date = new Date().toISOString(),
): TemperamentTest {
  return {
    date,
    items: VOLHARD_TEMPERAMENT_TEST.map((definition) => ({
      id: definition.id,
      label: definition.label,
      score: 0,
    })),
    notes: "",
  };
}

export function computeTemperamentProfile(
  items: TemperamentTestItem[],
): TemperamentProfile | null {
  const scored = items.filter((item) => item.score > 0);

  if (scored.length === 0) return null;

  const average =
    scored.reduce((sum, item) => sum + item.score, 0) / scored.length;

  if (average <= 2) return "Dominant";
  if (average <= 3.5) return "Équilibré";
  if (average <= 4.5) return "Indépendant";
  return "Craintif";
}
