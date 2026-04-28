import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import App from "../App";
import PokemonWiki from "../pages/PokemonWiki";
import PokemonLayout from "../layouts/PokemonLayout";
import PokemonDetail from "../pages/PokemonDetail";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <PokemonLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/pokedex" replace />,
          },
          {
            path: "pokedex",
            element: <PokemonWiki />,
          },
          {
            path: "pokedex/:pokemonId",
            element: <PokemonDetail />,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;