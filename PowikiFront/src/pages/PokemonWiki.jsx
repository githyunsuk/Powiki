import {
  Box,
  Paper,
  Tab,
  Tabs,
} from "@mui/material";
import PokemonList from "../components/PokemonWiki/PokemonList";
import GenFilter from "../components/features/GenFilter";
import TypeFilter from "../components/features/TypeFilter"; 
import { usePokemonStore } from "../store/pokemonStore";
import { useEffect } from "react";
import Loading from "../components/common/Loading";

function PokemonWiki() {

  const pokemonData = usePokemonStore((state) => state.pokemonData);
  const fetchOnes = usePokemonStore((state) => state.fetchOnes);
  const selectedTypes = usePokemonStore((state) => state.selectedTypes);
  const formType = usePokemonStore((state) => state.formType);
  const handleFormType = usePokemonStore((state) => state.handleFormType);
  const formTypeList = ["default", "mega", "legendary", "mythical"];

  const tabValue = formTypeList.indexOf(formType);
  const clickTab = (event, newValue) => {
    handleFormType(formTypeList[newValue]);
  };

  useEffect(() => {
    fetchOnes();
  }, [fetchOnes])

  if(!pokemonData || pokemonData.length == 0) {
    return <Loading />
  }

  return (
      <Box sx={{ maxWidth: "1250px", margin: "0 auto", px: 2 }}>
        
        {/* 1. 상단 탭 */}
        <Tabs
          value={tabValue}
          onChange={clickTab}
          sx={{
            minHeight: "auto",
            "& .MuiTabs-indicator": {
              display: "none",
            },
            "& .MuiTabs-flexContainer": {
              position: "relative",
              zIndex: 1,
              top: "1px", 
            }
          }}
        >
          <Tab label="일반 도감" sx={tabStyle} />
          <Tab label="메가진화" sx={tabStyle} />
          <Tab label="전설" sx={tabStyle} />
          <Tab label="환상" sx={tabStyle} />
        </Tabs>

        {/* 2. 도감 */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: "0 20px 20px 20px",
            border: "1px solid #ddd",
            bgcolor: "#fff",
            overflow: "hidden", 
          }}
        >
          <Box sx={{ p: { xs: 2, md: 3 }, pb: 0 }}>
            <GenFilter />
            <TypeFilter />
            <PokemonList pokemonData={pokemonData} selectedTypes={selectedTypes} currentDex={tabValue} />
          </Box>
        </Paper>
      </Box>
  );
}

const tabStyle = {
  textTransform: "none",
  fontWeight: "bold",
  fontSize: "0.9rem",
  minWidth: "auto",
  padding: "10px 24px",
  borderRadius: "12px 12px 0 0",
  marginRight: "5px",
  backgroundColor: "#eee",
  color: "#666",
  transition: "0.2s",
  border: "1px solid #ddd",
  borderBottom: "none",
  "&.Mui-selected": {
    backgroundColor: "#fff",
    color: "#e3350d",
    fontWeight: 900,
    zIndex: 2,
  },
};

export default PokemonWiki;