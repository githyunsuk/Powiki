import { Box, Grid, Typography } from "@mui/material";
import PokemonCard from "./PokemonCard";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePokemonStore } from "../../store/pokemonStore";

function PokemonList({ pokemonData }) {
  
  const keyword = usePokemonStore((state) => state.keyword);
  const selectedTypes = usePokemonStore((state) => state.selectedTypes);
  const currentGen = usePokemonStore((state) => state.currentGen);
  const formType = usePokemonStore((state) => state.formType);

  const [itemLimit, setItemLimit] = useState(20);
  const observerTarget = useRef(null);

  const filteredData = useMemo(() => {
    if (!pokemonData) return [];

    return pokemonData.filter((pokemon) => {
      // 세대 필터
      const matchesGen = currentGen === 0 || pokemon.generation === currentGen;
      // 키워드 필터
      const matchesKeyword = pokemon.name.includes(keyword);
      // 타입 필터
      const matchesType =
        selectedTypes.length === 0 ||
        pokemon.types.some((t) => selectedTypes.includes(t.typeId));
      // 폼(탭) 필터
      let matchesForm = null;
      if (formType === "default" || formType === "mega") {
        matchesForm = pokemon.formType === formType;
      } else if (formType === "legendary") {
        matchesForm = pokemon.legendary && pokemon.formType === "default";
      } else if (formType === "mythical") {
        matchesForm = pokemon.mythical && pokemon.formType === "default";;
      }

      return matchesGen && matchesKeyword && matchesType && matchesForm;
    });
  }, [pokemonData, keyword, selectedTypes, currentGen, formType]);

  useEffect(() => {
    setItemLimit((prev) => (prev !== 20 ? 20 : prev));
  }, [filteredData]);

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
      <Box 
        sx={{ 
          textAlign: "center", 
          mt: 10, 
          color: "text.secondary",
          minHeight: "50vh", 
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          조건에 맞는 포켓몬이 없습니다. 🔍
        </Typography>
      </Box>
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
