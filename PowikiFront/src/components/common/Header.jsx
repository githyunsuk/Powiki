import { Box, FormControlLabel, Switch, Typography } from "@mui/material";
import SearchBar from "./SearchBar";
import { usePokemonStore } from "../../store/pokemonStore";

function Header() {

  const isPixel = usePokemonStore((state) => state.isPixel);
  const togglePixel = usePokemonStore((state) => state.togglePixel);
  const keyword = usePokemonStore((state) => state.keyword);
  const handleKeyword = usePokemonStore((state) => state.handleKeyword);
  
  return (
    <>
      <Typography
        variant="h3"
        sx={{
          mb: 6,
          fontWeight: 900,
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1.5,
          letterSpacing: "-0.05rem",
        }}
      >
        <Box
          component="img"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
          alt="pokeball"
          sx={{ width: 48, height: 48 }}
        />
        Pokémon Wiki
        <Box
          component="img"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
          alt="pokeball"
          sx={{ width: 48, height: 48 }}
        />
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          mb: 4,
          position: "relative",
        }}
      >
        <SearchBar keyword={keyword} handleKeyword={handleKeyword}/>

        <FormControlLabel
          control={
            <Switch
              name="pixelMode"
              size="small"
              checked={isPixel}
              onChange={togglePixel}
            />
          }
          label={
            <Typography
              sx={{
                fontWeight: 600,
                color: "text.secondary",
                whiteSpace: "nowrap",
                fontSize: "0.9rem",
              }}
            >
              👾 픽셀
            </Typography>
          }
          sx={{
            position: { sm: "absolute" },
            right: { sm: "calc(50% - 250px - 100px)" },
            transform: { sm: "translateX(100%)" },
            ml: { xs: 0, sm: 2 },
            mt: { xs: 2, sm: 0 },
            backgroundColor: "action.hover",
            pr: 1.5,
            pl: 1,
            py: 0.3,
            borderRadius: "20px",
            display: "flex",
          }}
        />
      </Box>
    </>
  );
}

export default Header;
