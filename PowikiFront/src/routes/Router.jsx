import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App.jsx";
import PokemonWiki from "../pages/PokemonWiki.jsx";
import PokemonLayout from "../layouts/PokemonLayout.jsx";
import PokemonDetail from "../pages/PokemonDetail.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <PokemonLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/pokedex" repleace />
          },
          {
            path: "pokedex",
            element: <PokemonWiki />
          },
          {
            path: "pokedex/:pokemonId",
            element: <PokemonDetail />,
          }
        ],
      },
    ],
  },
]);

export default router;
 