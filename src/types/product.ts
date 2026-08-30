export type ProductCategory =
  | "Alimentation"
  | "Accessoires"
  | "Jouets"
  | "Hygiène"
  | "Laisses & Colliers";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  description: string;
  emoji: string;
};
