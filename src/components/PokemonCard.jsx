import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography
} from "@mui/material";
import TypeBadge from "./TypeBadge";
import { useOutletContext } from "react-router-dom";

function PokemonCard({ pokemon }) {

  const { isPixel } = useOutletContext();
  
  return (
    <Card
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
        // image={isPixel ? pokemon.pixel : pokemon.image}
        alt={pokemon.name}
      />
      <CardContent
        sx={{ flexGrow: 1, textAlign: "center", pb: "16px !important" }}
      >
        <Typography variant="caption" color="text.secondary">
          No.{String(pokemon.id).padStart(4, "0")}
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
