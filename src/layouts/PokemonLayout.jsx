import { Box, CircularProgress, Typography, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { fetchPokemonList } from "../api/pokemonApi";
import Loading from "../components/Loading";

function PokemonLayout() {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPixel, setIsPixel] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [currentGen, setCurrentGen] = useState("1");

  //포켓몬 데이터 가져오기
  useEffect(() => {
    const getPokemons = async () => {
      try {
        const data = await fetchPokemonList(currentGen);
        setPokemonData(data);
      } catch (error) {
        console.error("포켓몬을 불러오는데 실패했습니다. " + error);
      } finally {
        setLoading(false);
      }
    };

    getPokemons();
  }, [currentGen]);

  const togglePixel = () => {
    setIsPixel((prev) => !prev);
  };

  const handleKeyword = (value) => {
    setKeyword(value);
  }

  const handleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }

  const handleGen = (gen) => {
    setCurrentGen(gen);
  }

  //로딩 시 로딩 바
  if (loading) {
    return <Loading />;
  }
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Header isPixel={isPixel} togglePixel={togglePixel} keyword={keyword} handleKeyword={handleKeyword} />
      <Outlet context={{ pokemonData, isPixel, keyword, selectedTypes, handleType, currentGen, handleGen }} />
    </Container>
  );
}

export default PokemonLayout;
