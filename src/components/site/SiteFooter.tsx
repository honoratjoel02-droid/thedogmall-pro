import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-xl">
              🐾
            </span>
            <span className="text-lg font-bold tracking-tight text-foreground">
              TheDogMall
            </span>
          </div>

          <p className="mt-3 text-sm text-muted-foreground">
            Tout ce dont votre chien a besoin, sélectionné avec
            amour.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Navigation
          </h3>

          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-foreground">
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/produits" className="hover:text-foreground">
                Produits
              </Link>
            </li>
            <li>
              <Link to="/a-propos" className="hover:text-foreground">
                À propos
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-foreground">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Catégories
          </h3>

          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Alimentation</li>
            <li>Jouets</li>
            <li>Laisses & Colliers</li>
            <li>Hygiène</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Contact
          </h3>

          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Mail size={16} />
              contact@thedogmall.fr
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} />
              01 23 45 67 89
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} />
              Paris, France
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-6 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} TheDogMall. Tous droits
        réservés.
      </div>
    </footer>
  );
}
