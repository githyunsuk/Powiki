import { Container, Typography, Box, Paper, Stack } from "@mui/material";
import TypeBadge from "../components/common/TypeBadge";
import AudioPlayer from "../components/PokemonDetail/AudioPlayer";
import SectionTitle from "../components/PokemonDetail/SectionTitle";
import InfoColumn from "../components/PokemonDetail/InfoColumn";
import InfoRow from "../components/PokemonDetail/InfoRow";
import BaseStatsChart from "../components/PokemonDetail/BaseStatsChart";
import { getPokemonImageUrl } from "../utils/pokemonHelper";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import Loading from "../components/common/Loading";
import NavButton from "../components/common/NavButton";

function PokemonDetail() {
  const [pokemon, setPokemon] = useState(null);
  const { pokemonId } = useParams();

  useEffect(() => {
    
    window.scrollTo(0, 0);

    const getPokemonData = async () => {
      try {
        const response = await api.get(`/api/pokemon/${pokemonId}`);
        setPokemon(response.data.data);
      }   catch(error) {
        console.log("포켓몬 상세 정보 불러오기 실패 ", error);
      }
    }
    getPokemonData();
  }, [pokemonId]);
   if (!pokemon) {
    return <Loading />
  }

  const ACCENT_COLOR = pokemon.types.find(type => type.slot === 1).color;
  const pokemonImage = getPokemonImageUrl(pokemon.id, "ARTWORK");
  const pixelImage = getPokemonImageUrl(pokemon.id, "PIXEL" );
  const gender = pokemon.gender.genderless ? "무성" : `수컷: ${pokemon.gender.male}%, 암컷: ${pokemon.gender.female}%`;
  
  return (
    <>
    <Container maxWidth="md" sx={{ pt: 2, pb: 5, bgcolor: "#fcfcfc" }}>

      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          mb: 4, 
          borderRadius: 6, 
          background: `linear-gradient(135deg, ${ACCENT_COLOR} 0%, ${ACCENT_COLOR}dd 100%)`, 
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: `0 10px 30px ${ACCENT_COLOR}44`
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ opacity: 0.8, fontWeight: "700" }}>
            No.{String(pokemon.pokemonSpeciesId).padStart(4, "0")}
          </Typography>
          <Typography variant="h3" fontWeight="700">
            {pokemon.name}
          </Typography>
      
        </Box>

      </Paper>

      {/* 2. 이미지 & 차트 */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ mb: 6 }}>

        {/* 2.1 이미지 & 오디오 */}
        <Paper elevation={0} sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", bgcolor: "#fff", borderRadius: 5, border: "1px solid #edf2f7", p: 3 }}>
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", mb: 2 }}>
            <img src={pokemonImage} alt={pokemon.name} style={{ width: "100%", maxWidth: "280px", height: "auto" }} />
          </Box>
          <AudioPlayer pokemonId={pokemon.id} accentColor={ACCENT_COLOR} />
        </Paper>

        {/* 2.2 종족값 차트*/}
        <BaseStatsChart stats={pokemon.stats} color={ACCENT_COLOR} />

      </Stack>

      {/* 3. 도감 설명 */}
      <Box sx={{ mb: 6 }}>

        <Paper elevation={0} sx={{ p: 3, borderRadius: 4, bgcolor: "#f8fafc", borderLeft: `5px solid ${ACCENT_COLOR}` }}>
          <Typography variant="body1" sx={{ color: "#475569", lineHeight: 1.8, fontWeight: "500", wordBreak: "keep-all" }}>
            {pokemon.description}
          </Typography>
        </Paper>

      </Box>

      {/* 4. 기본 정보 */}
      <Box sx={{ mb: 6 }}>

        <SectionTitle label="기본 정보" color={ACCENT_COLOR}/>

        <Paper elevation={0} sx={{ borderRadius: "15px", overflow: "hidden", border: `1px solid ${ACCENT_COLOR}`, display: "flex" }}>
          <InfoColumn label="포켓몬" value={`${String(pokemon.pokemonSpeciesId).padStart(4, "0")} ${pokemon.name}`} color={ACCENT_COLOR} />
          <InfoColumn label="분류" value={pokemon.category} color={ACCENT_COLOR} />
          <InfoColumn label="타입" color={ACCENT_COLOR}>
            <Stack spacing={0.5} alignItems="center">
              {pokemon.types.map(type => <TypeBadge key={type.id} type={{ typeName: type.name, typeColor: type.color }} />)}
            </Stack>
          </InfoColumn>
          <InfoColumn label="신장" value={`${pokemon.height / 10}m`} color={ACCENT_COLOR} />
          <InfoColumn label="체중" value={`${pokemon.weight / 10}kg`} color={ACCENT_COLOR} />
          <InfoColumn label="성비" value={gender} color={ACCENT_COLOR} />
          <InfoColumn label="알그룹" value={pokemon.eggGroups.join(", ")} color={ACCENT_COLOR} isLast />
        </Paper>

      </Box>

      {/* 5. 특성 정보 */}
      <Box sx={{ mb: 6 }}>

        <SectionTitle label="특성 정보" color={ACCENT_COLOR}/>

        <Paper elevation={0} sx={{ borderRadius: 4, overflow: "hidden", border: `1px solid ${ACCENT_COLOR}` }}>
          {pokemon.abilities.map((ability, idx) => (
            <InfoRow key={ability.id} label={ability.isHidden ? `*${ability.name}` : ability.name} value={ability.description} color={ACCENT_COLOR} isLast={idx === pokemon.abilities.length - 1}/>
          ))}
        </Paper>

      </Box>

      {/* 6. 방어 상성 */}
      <Box sx={{ mt: 4 }}>

        <SectionTitle label="방어 상성" color={ACCENT_COLOR}/>

        <Paper elevation={0} sx={{ borderRadius: 4, overflow: "hidden", border: `1px solid ${ACCENT_COLOR}` }}>
          {Object.entries(pokemon.typeEfficacy).sort(([a], [b]) => parseFloat(b) - parseFloat(a)).map(([multiplier, types], idx, array) => (
              <InfoRow key={multiplier} label={`${multiplier}배`} color={ACCENT_COLOR} isLast={idx === array.length - 1}>
                <Stack direction="row" sx={{ gap: 1.0 }} flexWrap="wrap">
                  {types.map(type => (
                    <TypeBadge key={type.id} type={{ typeName: type.name, typeColor: type.color }} />
                  ))}
                </Stack>
              </InfoRow>
            ))}
        </Paper>

      </Box>

    </Container>

    {/* 7. 페이지 이동 버튼*/}
    <NavButton pokemon={pokemon.prev} color={ACCENT_COLOR} direction='left'/>
    <NavButton pokemon={pokemon.next} color={ACCENT_COLOR} direction='right'/>
    </>
  );
}

export default PokemonDetail;