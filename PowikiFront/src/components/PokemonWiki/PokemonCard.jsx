import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import TypeBadge from "../common/TypeBadge";
import { useNavigate } from "react-router-dom";
import { getPokemonImageUrl } from "../../utils/pokemonHelper";
import { usePokemonStore } from "../../store/pokemonStore";

function PokemonCard({ pokemon }) {

  const imageType = usePokemonStore((state) => state.imageType);
  const imageUrl = getPokemonImageUrl(pokemon.id, imageType);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pokedex/${pokemon.id}`);
  };
  
  return (
    <Card
      onClick={handleClick}
      sx={{
        width: "100%",      
        height: "380px",
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
        <Typography 
          sx={{ 
            fontWeight: "bold", 
            mb: 1,
            fontSize: pokemon.name.length > 10 ? "0.9rem" : "1.25rem",
            lineHeight: 1.2,
            height: "2.4em", 
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
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
