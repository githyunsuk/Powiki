import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography
} from "@mui/material";
import TypeBadge from "./TypeBadge";
import { useOutletContext } from "react-router-dom";
import { getPokemonCries, getPokemonImageUrl } from "../utils/pokemonHelper";

function PokemonCard({ pokemon }) {

  const { imageType } = useOutletContext();
  const imageUrl = getPokemonImageUrl(pokemon.id, imageType);

  const playCry = (id) => {
    const audio = getPokemonCries(id);
    audio.volume = 0.5; 
    audio.play();
  };
  
  return (
    <Card
      onClick={() => playCry(pokemon.id)}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        boxShadow: 3,
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.02)" },
      }}
    >
      <CardMedia
        component="img"
        sx={{ p: 0, backgroundColor: "#f5f5f5", objectFit: "contain" }}
        height="200"
        image={imageUrl}
        alt={pokemon.name}
      />
      <CardContent
        sx={{ flexGrow: 1, textAlign: "center", pb: "16px !important" }}
      >
        <Typography variant="caption" color="text.secondary">
          No.{String(pokemon.pokemonSpeciesId).padStart(4, "0")}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          {pokemon.name}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}>
          {pokemon.types.map((type) => (
            <TypeBadge type={type} />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

export default PokemonCard;
