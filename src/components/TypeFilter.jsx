import { useOutletContext } from "react-router-dom";
import { pokemonTypes } from "../constants/pokemon";
import { Box, Checkbox, FormControlLabel, Paper, Typography } from "@mui/material";

function TypeFilter() {

   const { selectedTypes, handleType } = useOutletContext();
  
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 3 },
        mb: 5,
        borderRadius: "24px",
        backgroundColor: "#fcfcfc",
        border: "1px solid #f0f0f0",
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{ mb: 2, fontWeight: 900, color: "#222", px: 1 }}
      >
        🏷️ 타입 필터
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(3, 1fr)",
            sm: "repeat(6, 1fr)",
            md: "repeat(9, 1fr)",
          },
          gap: 1.5,
        }}
      >
        {Object.entries(pokemonTypes).map(([key, value]) => {
          const isSelected = selectedTypes.includes(key);
          const typeName = value.label;
          const typeColor = value.color;

          return (
            <FormControlLabel
              key={key}
              control={
                <Checkbox
                  checked={isSelected}
                  onChange={() => handleType(key)}
                  sx={{ display: "none" }}
                />
              }
              label={typeName}
              sx={{
                margin: 0,
                height: "40px",
                borderRadius: "12px",
                display: "flex",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
                border: `2px solid ${typeColor}`,
                backgroundColor: isSelected ? typeColor : "transparent",
                color: isSelected ? "#fff" : typeColor,
                fontWeight: "bold",
                fontSize: "0.85rem",
                "&:hover": {
                  transform: "translateY(-2px)",
                },
                "&:active": {
                  transform: "scale(0.95)",
                },
              }}
            />
          );
        })}
      </Box>
    </Paper>
  );
}

export default TypeFilter;
