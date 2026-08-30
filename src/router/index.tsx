import {
  createBrowserRouter,
} from "react-router-dom";

import Home from "../pages/site/Home";
import Products from "../pages/site/Products";
import ProductDetail from "../pages/site/ProductDetail";
import Cart from "../pages/site/Cart";
import Checkout from "../pages/site/Checkout";
import Contact from "../pages/site/Contact";
import About from "../pages/site/About";

import Dashboard from "../pages/Dashboard";
import Dogs from "../pages/Dogs";
import Breeding from "../pages/Breeding";
import Litters from "../pages/Litters";
import Clients from "../pages/Clients";
import Calendar from "../pages/Calendar";
import Settings from "../pages/Settings";

import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/produits",
    element: <Products />,
  },
  {
    path: "/produits/:productId",
    element: <ProductDetail />,
  },
  {
    path: "/panier",
    element: <Cart />,
  },
  {
    path: "/commande",
    element: <Checkout />,
  },
  {
    path: "/a-propos",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/admin",
    element: <Dashboard />,
  },
  {
    path: "/admin/dogs",
    element: <Dogs />,
  },
  {
    path: "/admin/breeding",
    element: <Breeding />,
  },
  {
    path: "/admin/litters",
    element: <Litters />,
  },
  {
    path: "/admin/clients",
    element: <Clients />,
  },
  {
    path: "/admin/calendar",
    element: <Calendar />,
  },
  {
    path: "/admin/settings",
    element: <Settings />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
