import { Link } from "react-router-dom";

import type { Product } from "../../types/product";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useCart } from "../../hooks/useCart";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <Card className="group flex flex-col border-none shadow-sm ring-1 ring-border transition-all hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="flex flex-1 flex-col gap-3 p-4">
        <Link
          to={`/produits/${product.id}`}
          className="flex aspect-square items-center justify-center rounded-2xl bg-accent text-6xl transition-transform group-hover:scale-105"
        >
          {product.emoji}
        </Link>

        <span className="text-xs font-medium tracking-wide text-primary uppercase">
          {product.category}
        </span>

        <Link to={`/produits/${product.id}`}>
          <h3 className="font-semibold text-foreground hover:text-primary">
            {product.name}
          </h3>
        </Link>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-foreground">
            {product.price.toFixed(2)} €
          </span>

          <Button size="sm" onClick={() => addItem(product)}>
            Ajouter
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
