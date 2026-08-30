import { Link } from "react-router-dom";
import { Truck, ShieldCheck, HeartHandshake } from "lucide-react";

import SiteLayout from "../../components/site/SiteLayout";
import ProductCard from "../../components/site/ProductCard";
import { Button } from "../../components/ui/button";
import { mockProducts } from "../../data/mockProducts";
import type { ProductCategory } from "../../types/product";

const categories: {
  label: ProductCategory;
  emoji: string;
}[] = [
  { label: "Alimentation", emoji: "🍖" },
  { label: "Jouets", emoji: "🎾" },
  { label: "Laisses & Colliers", emoji: "🦮" },
  { label: "Hygiène", emoji: "🧴" },
  { label: "Accessoires", emoji: "🛏️" },
];

const featuredProducts = mockProducts.slice(0, 4);

const valueProps = [
  {
    icon: Truck,
    title: "Livraison rapide",
    description: "Expédié sous 24h, chez vous en 2 à 3 jours ouvrés.",
  },
  {
    icon: ShieldCheck,
    title: "Produits de qualité",
    description: "Sélectionnés avec soin pour le bien-être de votre chien.",
  },
  {
    icon: HeartHandshake,
    title: "Satisfait ou remboursé",
    description: "30 jours pour changer d'avis, sans question.",
  },
];

export default function Home() {
  return (
    <SiteLayout>
      <section className="bg-accent/40">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-20 text-center">
          <span className="text-5xl">🐾</span>

          <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Tout ce dont votre chien a besoin, au même endroit
          </h1>

          <p className="max-w-xl text-lg text-muted-foreground">
            Alimentation, jouets, laisses et accessoires soigneusement
            choisis pour le bonheur de votre compagnon.
          </p>

          <Button
            size="lg"
            className="h-11 px-6 text-base"
            render={<Link to="/produits">Découvrir les produits</Link>}
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-bold text-foreground">
          Nos catégories
        </h2>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category.label}
              to={`/produits?categorie=${encodeURIComponent(category.label)}`}
              className="flex flex-col items-center gap-3 rounded-2xl bg-card p-6 text-center shadow-sm ring-1 ring-border transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="text-4xl">{category.emoji}</span>
              <span className="text-sm font-medium text-foreground">
                {category.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">
            Produits populaires
          </h2>

          <Link
            to="/produits"
            className="text-sm font-medium text-primary hover:underline"
          >
            Voir tout →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 sm:grid-cols-3">
          {valueProps.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="flex flex-col items-center gap-3 text-center">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon size={22} />
                </div>

                <h3 className="font-semibold text-foreground">
                  {item.title}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </SiteLayout>
  );
}
