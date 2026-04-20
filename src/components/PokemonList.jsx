import { Grid, Typography } from "@mui/material";
import PokemonCard from "./PokemonCard";
import { useOutletContext } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function PokemonList() {
  const { pokemonData, keyword, selectedTypes, currentGen } = useOutletContext();

  const [itemLimit, setItemLimit] = useState(20);
  const observerTarget = useRef(null);

  const filteredData = pokemonData.filter((pokemon) => {
    const matchesGen = currentGen === 0 || pokemon.generation === currentGen;
    const matchesKeyword = pokemon.name.includes(keyword);
    const matchesType =
      selectedTypes.length === 0 ||
      pokemon.types.some((types) => selectedTypes.includes(types.typeId));

    return matchesGen && matchesKeyword && matchesType;
  });

  useEffect(() => {
    setItemLimit(20);
  }, [keyword, selectedTypes, currentGen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setItemLimit((prev) => prev < filteredData.length ? prev + 20 : prev);
        }
      },
      { threshold: 0.5 }
    );

    if (observerTarget.current) observer.observe(observerTarget.current);

    return () => observer.disconnect();
  }, [filteredData.length]); 

  const displayData = filteredData.slice(0, itemLimit);

  if (filteredData.length === 0) {
    return (
      <Typography
        variant="h6"
        sx={{ textAlign: "center", mt: 10, color: "text.secondary" }}
      >
        조건에 맞는 포켓몬이 없습니다. 🔍
      </Typography>
    );
  }

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="stretch">
      {displayData.map((pokemon) => (
        <Grid item key={pokemon.id} xs={12} sm={6} md={4} lg={2.4}>
          <PokemonCard pokemon={pokemon} />
        </Grid>
      ))}

      <div ref={observerTarget} style={{ height: "20px", width: "100%" }} />
    </Grid>
  );
}

export default PokemonList;
