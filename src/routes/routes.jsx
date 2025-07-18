import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
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
        <Outlet /> {/* Shared layout for nested routes */}
      </GamesProvider>
    ),
    children: [
      { index: true, element: <LazyWrapper Component={Games} /> },
      {
        path: ":slug",
        element: <LazyWrapper Component={Game} />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/games" replace />,
  },
]);

export default router;
