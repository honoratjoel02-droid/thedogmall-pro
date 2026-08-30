import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Minus, Plus } from "lucide-react";

import SiteLayout from "../../components/site/SiteLayout";
import ProductCard from "../../components/site/ProductCard";
import { Button } from "../../components/ui/button";
import { useCart } from "../../hooks/useCart";
import { mockProducts } from "../../data/mockProducts";

export default function ProductDetail() {
  const { productId } = useParams();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = mockProducts.find((item) => item.id === productId);

  if (!product) {
    return <Navigate to="/produits" replace />;
  }

  const relatedProducts = mockProducts
    .filter(
      (item) =>
        item.category === product.category && item.id !== product.id
    )
    .slice(0, 4);

  function handleAddToCart() {
    addItem(product, quantity);
    setAdded(true);
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link to="/produits" className="hover:text-foreground">
            Produits
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-10 md:grid-cols-2">
          <div className="flex aspect-square items-center justify-center rounded-3xl bg-accent text-[8rem]">
            {product.emoji}
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xs font-medium tracking-wide text-primary uppercase">
              {product.category}
            </span>

            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {product.name}
            </h1>

            <p className="text-2xl font-bold text-foreground">
              {product.price.toFixed(2)} €
            </p>

            <p className="text-muted-foreground">
              {product.description}
            </p>

            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center rounded-xl border border-input">
                <button
                  type="button"
                  aria-label="Diminuer la quantité"
                  className="flex size-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
                  onClick={() =>
                    setQuantity((q) => Math.max(1, q - 1))
                  }
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>

                <span className="w-8 text-center font-medium text-foreground">
                  {quantity}
                </span>

                <button
                  type="button"
                  aria-label="Augmenter la quantité"
                  className="flex size-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>

              <Button
                size="lg"
                className="h-10 flex-1"
                onClick={handleAddToCart}
              >
                Ajouter au panier
              </Button>
            </div>

            {added && (
              <p className="text-sm font-medium text-primary">
                Ajouté au panier ✓
              </p>
            )}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold text-foreground">
              Vous aimerez aussi
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
