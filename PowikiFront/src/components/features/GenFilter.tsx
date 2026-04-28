import { Box, Paper, Typography } from "@mui/material";
import { GENERATIONS } from "../../constants/pokemon";
import { usePokemonStore } from "../../store/pokemonStore";

function GenFilter() {
  
  const currentGen = usePokemonStore((state) => state.currentGen);
  const handleGen = usePokemonStore((state) => state.handleGen);
  const generations = GENERATIONS;

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 2 },
        mb: 2,
        borderRadius: "20px",
        backgroundColor: "#f5f5f5",
        border: "1px solid #e0e0e0",
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          mb: 1.5,
          fontWeight: 900,
          color: "#555",
          px: 1,
          fontSize: "0.8rem",
        }}
      >
        📅 세대 선택
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(3, 1fr)",
            sm: "repeat(5, 1fr)",
            md: "repeat(10, 1fr)",
          },
          gap: 1,
        }}
      >
        {generations.map((gen) => {
          const isSelected = currentGen === gen;
          return (
            <Box
              key={gen}
              onClick={() => handleGen(gen)}
              sx={{
                height: "36px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s",
                border: isSelected ? "2px solid #333" : "2px solid #ddd",
                backgroundColor: isSelected ? "#333" : "#fff",
                color: isSelected ? "#fff" : "#888",
                fontWeight: "bold",
                fontSize: "0.8rem",
                userSelect: "none", 
                "&:hover": {
                  borderColor: "#333",
                },
                px: 1,
              }}
            >
              {gen === 0 ? "전체" : `${gen}세대`}
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
}

export default GenFilter;