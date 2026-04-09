import {
  Box,
  Checkbox,
  FormControlLabel,
  Paper,
  Typography,
} from "@mui/material";
import { useOutletContext } from "react-router-dom";
import PokemonList from "../components/PokemonList";
import GenFilter from "../components/GenFilter";
import TypeFilter from "../components/TypeFilter";

function PokemonWiki() {
  const { selectedTypes } = useOutletContext();
  

  return (
    <Box sx={{ width: "100%" }}>
      
      {/* 세대 필터 영억 */}
      <GenFilter />

      {/* 타입 필터 영역 */}
      <TypeFilter />

      {/* 포켓몬 리스트 영역*/}
      <PokemonList selectedTypes={selectedTypes} />
    </Box>
  );
}

export default PokemonWiki;
