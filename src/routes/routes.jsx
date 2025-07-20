import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { lazy } from "react";
import LazyWrapper from "../components/lazy-wrapper";
import { GamesProvider } from "../context/GamesProvider";
import Layout from "../components/layout";

// Lazy-loaded components
const Games = lazy(() => import("../pages/games"));
const Game = lazy(() => import("../pages/game"));
const Favourites = lazy(() => import("../pages/favourites"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <GamesProvider>
        <Layout>
          <Outlet />
        </Layout>
      </GamesProvider>
    ),
    children: [
      {
        path: "/",
        element: <Navigate to="/games" replace />,
      },
      {
        path: "games",
        children: [
          { index: true, element: <LazyWrapper Component={Games} /> },
          { path: ":slug", element: <LazyWrapper Component={Game} /> },
          {
            path: "favourites",
            element: <LazyWrapper Component={Favourites} />,
          },
        ],
      },
      {
        path: "*",
        element: <Navigate to="/games" replace />,
      },
    ],
  },
]);

export default router;
