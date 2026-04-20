import {
  Box,
  Paper,
  Tab,
  Tabs,
} from "@mui/material";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import PokemonList from "../components/PokemonList";
import GenFilter from "../components/GenFilter";
import TypeFilter from "../components/TypeFilter";

function PokemonWiki() {
  const { selectedTypes, handleFormType } = useOutletContext();
  const [tabValue, setTabValue] = useState(0);
  const formTypeList = ["default", "mega", "gmax"];

  const clickTab = (event, newValue) => {
    handleFormType(formTypeList[newValue]);
    setTabValue(newValue);
  };

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
          <Tab label="거다이맥스" sx={tabStyle} />
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
            <PokemonList selectedTypes={selectedTypes} currentDex={tabValue} />
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