import { createBrowserRouter } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Dogs from "../pages/Dogs";
import DogProfile from "../pages/DogProfile";
import Breeding from "../pages/Breeding";
import Litters from "../pages/Litters";
import Clients from "../pages/Clients";
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
    path: "/litters",
    element: <Litters />,
  },
  {
    path: "/clients",
    element: <Clients />,
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
