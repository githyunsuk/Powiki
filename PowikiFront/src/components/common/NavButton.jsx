import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"; 
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IconButton, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NavButton({ pokemon, color, direction }) {
  
  const navigate = useNavigate();
  const isLeft = direction === 'left';

   const handleClick = () => {
    navigate(`/pokedex/${pokemon.id}`);
  };
  
  if (!pokemon) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: isLeft 
          ? "translate(calc(-450px - 100px - 100%), -50%)" 
          : "translate(calc(450px + 100px), -50%)",        
        zIndex: 1100,
        display: { xs: "none", lg: "flex" }, 
        flexDirection: "column",
        alignItems: "center",
        width: 150, 
      }}
    >
      <Typography
        variant="caption"
        sx={{
          mb: 1,
          px: 1.5,
          py: 0.5,
          bgcolor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(4px)",
          borderRadius: "20px",
          border: `1px solid ${color}`,
          color: "#333",
          fontWeight: "bold",
          fontSize: { xs: "0.7rem", md: "0.85rem" },
          whiteSpace: "nowrap",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          textAlign: "center", 
        }}
      >
        No.{String(pokemon.id).padStart(4, "0")} {pokemon.name}
      </Typography>

      <IconButton
        onClick={handleClick}
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(4px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          border: `2px solid ${color}`,
          color: color,
          width: { xs: 45, md: 60 },
          height: { xs: 45, md: 60 },
          transition: "all 0.3s ease",
          "&:hover": {
            bgcolor: color,
            color: "#fff",
            transform: "scale(1.1)",
          },
          "&:active": {
            transform: "scale(0.95)",
          },
        }}
      >
        {direction === "left" ? (
          <ArrowBackIosNewIcon fontSize="large" />
        ) : (
          <ArrowForwardIosIcon fontSize="large" />
        )}
      </IconButton>
    </Box>
  );
}

export default NavButton;