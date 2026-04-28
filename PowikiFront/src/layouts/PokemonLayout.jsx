import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import ScrollTop from "../components/common/ScrollTop";

function PokemonLayout() {

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
   
      <Header />
      <Outlet />
      <ScrollTop />
      
    </Container>
  );
}

export default PokemonLayout;