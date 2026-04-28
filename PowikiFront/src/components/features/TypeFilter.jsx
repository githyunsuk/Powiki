import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import { usePokemonStore } from "../../store/pokemonStore";

function TypeFilter() {

  const selectedTypes = usePokemonStore((state) => state.selectedTypes);
  const handleType = usePokemonStore((state) => state.handleType);
  const [pokemonTypes, setPokemonTypes] = useState([]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await api.get("/api/types");
        setPokemonTypes(response.data.data);
      } catch (error) {
        console.error("타입 데이터 불러오기 실패:", error);
      }
    };
    fetchTypes();
  }, []);

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
        sx={{ 
          mb: 2, 
          fontWeight: 900, 
          color: "#222", 
          px: 1,
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // 폰트 통일
        }}
      >
        🏷️ 타입 선택
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
        {pokemonTypes.map((type) => {
          const isSelected = selectedTypes.includes(type.id);
          return (
            <Box
              key={type.id}
              onClick={() => handleType(type.id)}
              sx={{
                height: "40px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.8,
                cursor: "pointer",
                transition: "all 0.2s ease",
                border: `2px solid ${type.color}`,
                backgroundColor: isSelected ? type.color : "transparent",
                color: isSelected ? "#fff" : type.color,
                userSelect: "none",
                "&:hover": {
                  transform: "translateY(-2px)",
                  backgroundColor: isSelected ? type.color : `${type.color}10`, // 살짝 불투명한 배경색
                },
                "&:active": {
                  transform: "scale(0.95)",
                },
              }}
            >
              {type.sprite && (
                <Box
                  component="img"
                  src={type.sprite}
                  alt={type.name}
                  sx={{ 
                    width: 18, 
                    height: 18, 
                    objectFit: "contain",
                    // 선택됐을 때 아이콘이 더 잘 보이도록 필터 조절 가능
                    filter: isSelected ? "brightness(1.2)" : "none"
                  }}
                />
              )}
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  fontWeight: "bold",
                  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // 폰트 통일
                }}
              >
                {type.name}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
}

export default TypeFilter;