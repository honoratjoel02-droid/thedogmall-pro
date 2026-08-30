import { Link } from "react-router-dom";

import SiteLayout from "../../components/site/SiteLayout";
import { Button } from "../../components/ui/button";

const values = [
  {
    emoji: "🐾",
    title: "Passion animale",
    description:
      "Fondé par des amoureux des chiens, TheDogMall sélectionne chaque produit en pensant au bien-être de votre compagnon.",
  },
  {
    emoji: "✅",
    title: "Qualité vérifiée",
    description:
      "Nous testons et choisissons des produits durables, sûrs et adaptés à toutes les tailles de chiens.",
  },
  {
    emoji: "🚚",
    title: "Service attentionné",
    description:
      "Une équipe disponible pour vous conseiller avant, pendant et après votre commande.",
  },
];

export default function About() {
  return (
    <SiteLayout>
      <section className="bg-accent/40">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-6 py-20 text-center">
          <span className="text-5xl">🐾</span>

          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            À propos de TheDogMall
          </h1>

          <p className="text-lg text-muted-foreground">
            Nous croyons que chaque chien mérite le meilleur : une
            alimentation saine, des accessoires confortables et des
            jouets qui durent. C'est pour ça qu'on a créé TheDogMall.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="flex flex-col items-center gap-3 rounded-2xl bg-card p-8 text-center shadow-sm ring-1 ring-border"
            >
              <span className="text-4xl">{value.emoji}</span>

              <h2 className="text-lg font-semibold text-foreground">
                {value.title}
              </h2>

              <p className="text-sm text-muted-foreground">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-foreground">
            Prêt à gâter votre chien ?
          </h2>

          <Button
            size="lg"
            className="h-11 px-6"
            render={<Link to="/produits">Découvrir les produits</Link>}
          />
        </div>
      </section>
    </SiteLayout>
  );
}
