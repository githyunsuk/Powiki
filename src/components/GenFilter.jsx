import { FormControlLabel, Paper, Radio, RadioGroup, Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";

function GenFilter() {

  const { currentGen, handleGen } = useOutletContext();
  const GENERATIONS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

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

      <RadioGroup
        row
        value={currentGen}
        onChange={(e) => handleGen(Number(e.target.value))}
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
        {GENERATIONS.map((gen) => {
          const isSelected = currentGen === gen;
          return (
            <FormControlLabel
              key={gen}
              value={gen}
              control={<Radio sx={{ display: "none" }} />} 
              label={gen === 0 ? "전체" : `${gen}세대`}
              sx={{
                margin: 0,
                height: "36px",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s",
                border: isSelected ? "2px solid #333" : "2px solid #ddd",
                backgroundColor: isSelected ? "#333" : "#fff",
                color: isSelected ? "#fff" : "#888",
                fontWeight: "bold",
                fontSize: "0.8rem",
                "&:hover": {
                  borderColor: "#333",
                },
              }}
            />
          );
        })}
      </RadioGroup>
    </Paper>
  );
}

export default GenFilter;
