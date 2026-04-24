import { Box, CircularProgress, Typography, Container } from "@mui/material";
import { Fab, Zoom, useScrollTrigger } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Loading from "../components/common/Loading";
import api from "../api/axiosInstance";

function PokemonLayout() {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPixel, setIsPixel] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [currentGen, setCurrentGen] = useState(0);
  const [formType, setFormType] = useState("default");
  const [imageType, setImageType] = useState("ARTWORK");

  function ScrollTop() {
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 100,
    });
  
    const handleClick = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  
    return (
      <Zoom in={trigger}>
        <Fab
          onClick={handleClick}
          size="medium" // 크기를 살짝 키워 존재감 부여
          sx={{
            position: "fixed",
            // 위치 조정: 우측 하단에서 도감 컨테이너 안쪽으로 살짝 이동
            bottom: { xs: 20, md: 40 },
            right: { xs: 20, md: "calc(50% - 650px)" }, // maxWidth="lg"(1200px) 기준 중앙 정렬 활용
            zIndex: 1000,
            
            // 몬스터볼 컨셉 디자인
            backgroundColor: "#ff1c1c", // 몬스터볼 빨간색
            color: "white",
            border: "4px solid #333", // 테두리
            boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
            
            "&:hover": {
              backgroundColor: "#d32f2f", // 호버 시 좀 더 진한 빨간색
              transform: "scale(1.1) rotate(15deg)", // 살짝 커지면서 회전하는 효과
            },
            
            // 하단 절반을 흰색으로 만드는 트릭 (가상 요소)
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50%",
              backgroundColor: "white",
              borderRadius: "0 0 50px 50px",
              zIndex: -1,
              borderTop: "2px solid #333",
            }
          }}
        >
          <KeyboardArrowUpIcon sx={{ color: "#333", zIndex: 1, fontSize: "2rem" }} />
        </Fab>
      </Zoom>
    );
  }

  //포켓몬 데이터 가져오기
  useEffect(() => {
    const getPokemonList = async () => {
      try{
        const response = await api.get(`/api/pokemons/${formType}`);
        setPokemonData(response.data.data);
      } catch(error) {
        console.error("포켓몬 리스트 데이터 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    getPokemonList();
  }, [formType]);

  const togglePixel = () => {
    const nextValue = !isPixel;
    setIsPixel(nextValue);
    handleImageType(nextValue ? "PIXEL" : "ARTWORK");
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

  const handleFormType = (value) => {
    setFormType(value);
  }

  const handleImageType = (value) => {
    setImageType(value);
  }

  //로딩 시 로딩 바
  if (loading) {
    return <Loading />;
  }
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Header isPixel={isPixel} togglePixel={togglePixel} keyword={keyword} handleKeyword={handleKeyword} />
      <Outlet context={{ pokemonData, isPixel, keyword, selectedTypes, handleType, currentGen, handleGen, formType, handleFormType, imageType}} />
      <ScrollTop />
    </Container>
  );
}

export default PokemonLayout;
