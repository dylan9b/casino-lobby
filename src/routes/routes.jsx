import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";
import LazyWrapper from "../components/lazy-wrapper";
import { GamesProvider } from "../context/GamesProvider";

// Lazy-loaded components
const Games = lazy(() => import("../pages/games"));
const Game = lazy(() => import("../pages/game"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/games" replace />,
  },
  {
    path: "/games",
    element: (
      <GamesProvider>
        <LazyWrapper Component={Games} />
      </GamesProvider>
    ),
  },
  {
    path: "/games/:id",
    element: <LazyWrapper Component={Game} />,
  },
  {
    path: "*",
    element: <Navigate to="/games" replace />,
  },
]);

export default router;
