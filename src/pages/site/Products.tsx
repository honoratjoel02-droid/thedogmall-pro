import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import SiteLayout from "../../components/site/SiteLayout";
import ProductCard from "../../components/site/ProductCard";
import { Button } from "../../components/ui/button";
import { mockProducts } from "../../data/mockProducts";
import type { ProductCategory } from "../../types/product";
import { cn } from "../../lib/utils";

const categories: ProductCategory[] = [
  "Alimentation",
  "Jouets",
  "Laisses & Colliers",
  "Hygiène",
  "Accessoires",
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("categorie");

  const products = useMemo(() => {
    if (!activeCategory) return mockProducts;
    return mockProducts.filter(
      (product) => product.category === activeCategory
    );
  }, [activeCategory]);

  function selectCategory(category: string | null) {
    if (!category) {
      setSearchParams({});
      return;
    }
    setSearchParams({ categorie: category });
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Nos produits
        </h1>

        <p className="mt-1 text-muted-foreground">
          {products.length} produit{products.length > 1 ? "s" : ""}
          {activeCategory ? ` dans « ${activeCategory} »` : ""}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <Button
            variant={activeCategory ? "outline" : "default"}
            size="sm"
            onClick={() => selectCategory(null)}
          >
            Tous
          </Button>

          {categories.map((category) => (
            <Button
              key={category}
              variant={
                activeCategory === category ? "default" : "outline"
              }
              size="sm"
              className={cn(
                activeCategory === category && "shadow-sm"
              )}
              onClick={() => selectCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {products.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-border bg-card/50 py-20 text-center text-muted-foreground">
            Aucun produit dans cette catégorie pour le moment.
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
