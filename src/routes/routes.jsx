import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { lazy } from "react";
import LazyWrapper from "../components/lazy-wrapper";
import { GamesContextProvider } from "../context/GamesProvider";
import Layout from "../components/Layout";

// Lazy-loaded components
const Games = lazy(() => import("../pages/Games"));
const Game = lazy(() => import("../pages/Game"));
const Favourites = lazy(() => import("../pages/Favourites"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <GamesContextProvider>
        <Layout>
          <Outlet />
        </Layout>
      </GamesContextProvider>
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
