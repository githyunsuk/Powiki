import { Grid, Typography } from "@mui/material";
import PokemonCard from "./PokemonCard";
import { useOutletContext } from "react-router-dom";

function PokemonList() {
  const { pokemonData, keyword, selectedTypes, currentGen } = useOutletContext();

  const filteredData = pokemonData.filter((pokemon) => {
    const matchesGen = currentGen === 0 || pokemon.generation === currentGen;
    const matchesKeyword = pokemon.name.includes(keyword);
    const matchesType = selectedTypes.length === 0 || pokemon.types.some((types) => selectedTypes.includes(types.typeId));

    return matchesGen && matchesKeyword && matchesType;
  });

  if (filteredData.length === 0) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", mt: 10, color: "text.secondary" }}>
        조건에 맞는 포켓몬이 없습니다. 🔍
      </Typography>
    );
  }

  return (
    <Grid container spacing={3} justifyContent="center" alignItems="stretch">
      {filteredData.map((pokemon) => (
        <Grid item key={pokemon.id} xs={12} sm={6} md={4} lg={3}>
          {/* isPixel 전달 삭제! 카드 안에서 직접 받아올 거니까요 */}
          <PokemonCard pokemon={pokemon} />
        </Grid>
      ))}
    </Grid>
  );
}

export default PokemonList;