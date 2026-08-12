import { lazy, Suspense, type ReactNode } from "react";
import { createBrowserRouter } from "react-router-dom";

import PageLoader from "../components/layout/PageLoader";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Dogs = lazy(() => import("../pages/Dogs"));
const DogProfile = lazy(() => import("../pages/DogProfile"));
const Breeding = lazy(() => import("../pages/Breeding"));
const BreedingDetail = lazy(() => import("../pages/BreedingDetail"));
const Litters = lazy(() => import("../pages/Litters"));
const LitterDetail = lazy(() => import("../pages/LitterDetail"));
const Clients = lazy(() => import("../pages/Clients"));
const ClientDetail = lazy(() => import("../pages/ClientDetail"));
const Calendar = lazy(() => import("../pages/Calendar"));
const Finances = lazy(() => import("../pages/Finances"));
const Settings = lazy(() => import("../pages/Settings"));
const SaleContract = lazy(() => import("../pages/SaleContract"));
const PedigreeCertificate = lazy(() => import("../pages/PedigreeCertificate"));
const NotFound = lazy(() => import("../pages/NotFound"));

function withSuspense(element: ReactNode) {
  return <Suspense fallback={<PageLoader />}>{element}</Suspense>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(<Dashboard />),
  },
  {
    path: "/dogs",
    element: withSuspense(<Dogs />),
  },
  {
    path: "/dogs/:id",
    element: withSuspense(<DogProfile />),
  },
  {
    path: "/breeding",
    element: withSuspense(<Breeding />),
  },
  {
    path: "/breeding/:id",
    element: withSuspense(<BreedingDetail />),
  },
  {
    path: "/litters",
    element: withSuspense(<Litters />),
  },
  {
    path: "/litters/:id",
    element: withSuspense(<LitterDetail />),
  },
  {
    path: "/clients",
    element: withSuspense(<Clients />),
  },
  {
    path: "/clients/:id",
    element: withSuspense(<ClientDetail />),
  },
  {
    path: "/calendar",
    element: withSuspense(<Calendar />),
  },
  {
    path: "/finances",
    element: withSuspense(<Finances />),
  },
  {
    path: "/settings",
    element: withSuspense(<Settings />),
  },
  {
    path: "/contracts/:id",
    element: withSuspense(<SaleContract />),
  },
  {
    path: "/pedigree/:id",
    element: withSuspense(<PedigreeCertificate />),
  },
  {
    path: "*",
    element: withSuspense(<NotFound />),
  },
]);
