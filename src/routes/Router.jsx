import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import PokemonWiki from "../pages/PokemonWiki.jsx";
import PokemonLayout from "../layouts/PokemonLayout.jsx";

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
            element: <PokemonWiki />,
          },
        ],
      },
    ],
  },
]);

export default router;
 