import { createBrowserRouter } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Dogs from "../pages/Dogs";
import DogProfile from "../pages/DogProfile";
import Breeding from "../pages/Breeding";
import BreedingDetail from "../pages/BreedingDetail";
import Litters from "../pages/Litters";
import LitterDetail from "../pages/LitterDetail";
import Clients from "../pages/Clients";
import ClientDetail from "../pages/ClientDetail";
import Calendar from "../pages/Calendar";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/dogs",
    element: <Dogs />,
  },
  {
    path: "/dogs/:id",
    element: <DogProfile />,
  },
  {
    path: "/breeding",
    element: <Breeding />,
  },
  {
    path: "/breeding/:id",
    element: <BreedingDetail />,
  },
  {
    path: "/litters",
    element: <Litters />,
  },
  {
    path: "/litters/:id",
    element: <LitterDetail />,
  },
  {
    path: "/clients",
    element: <Clients />,
  },
  {
    path: "/clients/:id",
    element: <ClientDetail />,
  },
  {
    path: "/calendar",
    element: <Calendar />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
