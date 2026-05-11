import { Container, Typography, Box, Paper, Stack, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import TypeBadge from "../components/common/TypeBadge";
import AudioPlayer from "../components/PokemonDetail/AudioPlayer";
import SectionTitle from "../components/PokemonDetail/SectionTitle";
import InfoColumn from "../components/PokemonDetail/InfoColumn";
import InfoRow from "../components/PokemonDetail/InfoRow";
import BaseStatsChart from "../components/PokemonDetail/BaseStatsChart";
import { getPokemonImageUrl } from "../utils/pokemonHelper";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import api from "../api/axiosInstance";
import Loading from "../components/common/Loading";
import NavButton from "../components/common/NavButton";
import { PokemonDetailListData, PokemonFormData } from "../types/Pokemon";
import { FORM_TYPE_NAME_MAP, TAB_NAME_MAP } from "../constants/pokemon";
import FormBookmark from "../components/PokemonDetail/FormBookmark";
import DetailSearchBar from "../components/PokemonDetail/DetailSearchBar";

export default function PokemonDetail() {

  const navigate = useNavigate();
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState<PokemonDetailListData>();
  const [loading, setLoading] = useState(false);
  const [activeGroup, setActiveGroup] = useState("standard");
  const [activeFormId, setActiveFormId] = useState<number | null>(null);

  // 포켓몬 상세 정보 불러오기
  useEffect(() => {
    window.scrollTo(0, 0);
    const getPokemonData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/pokemon/${pokemonId}`);
        const data = response.data.data;
        setPokemon(data);
        
        if (data.forms && data.forms.length > 0) {
          const defaultForm = data.forms.find((f: PokemonFormData)=> f.id === Number(pokemonId) || data.forms[0])
          setActiveGroup(defaultForm.formGroup);
          setActiveFormId(defaultForm.id);
        }
      } catch(error) {
        console.log("포켓몬 상세 정보 불러오기 실패 ", error);
      } finally {
        setLoading(false);
      }
    }
    getPokemonData();
  }, [pokemonId]);

  const formatFormName = (form: PokemonFormData) => {
    if (form.formType && FORM_TYPE_NAME_MAP[form.formType]) {
      return FORM_TYPE_NAME_MAP[form.formType];
    }
    return form.formName || "기본 모습";
  };
  
  const groupItems = useMemo(() => {
    if (!pokemon?.forms) return [];
    
    const existingGroups = new Set(pokemon.forms.map(form => form.formGroup));
    
    return Object.keys(TAB_NAME_MAP)
      .filter(key => existingGroups.has(key))
      .map(key => ({ id: key, label: TAB_NAME_MAP[key] }));
  }, [pokemon]);

  const subFormItems = useMemo(() => {
    if (!pokemon?.forms) return [];
    
    return pokemon.forms
      .filter(f => f.formGroup === activeGroup && f.formType !== "cosmetic")
      .map(f => ({ id: f.id, label: formatFormName(f) }));
  }, [pokemon, activeGroup]); 

  const pokemonForm = pokemon?.forms.find(f => f.id === activeFormId) || pokemon?.forms[0]; 

  const nameInfo = useMemo(() => {
  if (!pokemonForm) return { main: "", sub: "" };

  const formName = formatFormName(pokemonForm);

  // 기본 모습이면 이름만 출력
  if (formName === "기본 모습") {
    return { main: pokemonForm.name, sub: "" };
  }

  // 특수면 폼 이름 출력(메가리자몽x, 거다이맥스 리자몽)
  if (pokemonForm.formType && FORM_TYPE_NAME_MAP[pokemonForm.formType]) {
    return { main: pokemonForm.formName, sub: "" };
  }

  // 그 외는 이름과 폼이름 분리
  return { main: pokemonForm.name, sub: pokemonForm.formName };
}, [pokemonForm]);

  const selectLeftSideBar = (groupId: string) => {
    setActiveGroup(groupId);
    const first = pokemon?.forms.find(f => f.formGroup === groupId);
    if (first) setActiveFormId(first.id);
  }

  if (loading || !pokemon || !pokemonForm) return <Loading />;

  const ACCENT_COLOR = pokemonForm.types.find(type => type.slot === 1)?.color || "#718096";
  const pokemonImage = getPokemonImageUrl(pokemonForm.id, "ARTWORK");
  const gender = pokemon.gender.genderless ? "무성" : `수컷: ${pokemon.gender.male}%, 암컷: ${pokemon.gender.female}%`;

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", mb: 4, position: "relative",}}>
        <DetailSearchBar />
      </Box>

      <Container maxWidth="md" sx={{ pb: 5, mt: 4 }}>
        
        {/* 도감 목록 버튼 배치 */}
        <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-start", mb: 1.5, px: 1 }}>
          <Button
            onClick={() => navigate("/")}
            startIcon={<MenuIcon />}
            sx={{
              color: "#64748b",
              fontWeight: 800,
              fontSize: "0.9rem",
              borderRadius: "12px",
              px: 2,
              py: 0.8,
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(4px)",
              border: "1px solid #e2e8f0",
              transition: "all 0.2s",
              "&:hover": {
                backgroundColor: "#fff",
                color: ACCENT_COLOR,
                borderColor: ACCENT_COLOR,
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
              }
            }}
          >
            도감 목록
          </Button>
        </Box>

        <Box sx={{ position: "relative", width: "100%" }}>
          
          {/* 좌측 책갈피: 폼 그룹 선택 */}
          {groupItems.length > 1 && (
          <FormBookmark side="left" items={groupItems} activeId={activeGroup} accentColor={ACCENT_COLOR} onSelect={(groupId) => selectLeftSideBar(groupId)}/>
          )}

          {/* 우측 책갈피: 세부 폼 선택 */}
          {subFormItems.length > 1 && (
          <FormBookmark side="right" items={subFormItems} activeId={activeFormId} accentColor={ACCENT_COLOR} onSelect={(formId) => setActiveFormId(formId)}/>
          )}

          {/* 메인 정보 카드 */}
          <Paper elevation={0} sx={{borderRadius: "24px", border: "1px solid #ddd", bgcolor: "#fff", overflow: "hidden", p: { xs: 2, md: 4 }, position: "relative", zIndex: 2}}>
            
            {/* 포켓몬 이름 & 번호 카드 */}
            <Paper 
              elevation={0} 
              sx={{ 
                p: { xs: 3, md: 4 }, mb: 4, borderRadius: 6, 
                background: `linear-gradient(135deg, ${ACCENT_COLOR} 0%, ${ACCENT_COLOR}dd 100%)`, 
                color: "#fff",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                boxShadow: `0 10px 30px ${ACCENT_COLOR}44`,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Box sx={{ zIndex: 1 }}>
                <Typography variant="h6" sx={{ opacity: 0.8, fontWeight: "700" }}>
                  No.{String(pokemon.speciesId).padStart(4, "0")}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.5 }}>
                  <Typography variant="h3" fontWeight="800">
                    {nameInfo.main}
                  </Typography>
                  {nameInfo.sub && (
                  <Typography variant="h5" fontWeight="700" sx={{ opacity: 0.9 }}>
                    ({nameInfo.sub})
                  </Typography>
                  )}
                </Box>
              </Box>
            </Paper>

            <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ mb: 6 }}>
              <Paper elevation={0} sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", bgcolor: "#f8fafc", borderRadius: 5, border: "1px solid #edf2f7", p: 3 }}>
                <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", mb: 2 }}>
                  <img src={pokemonImage} alt={pokemonForm.name} style={{ width: "100%", maxWidth: "280px", height: "auto" }} />
                </Box>
                <AudioPlayer pokemonId={pokemonForm.id} accentColor={ACCENT_COLOR} />
              </Paper>
              <BaseStatsChart stats={pokemonForm.stats} color={ACCENT_COLOR} />
            </Stack>

            <Box sx={{ mb: 6 }}>
              <SectionTitle label="도감 설명" color={ACCENT_COLOR}/>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 4, bgcolor: "#f8fafc", borderLeft: `5px solid ${ACCENT_COLOR}` }}>
                <Typography variant="body1" sx={{ color: "#475569", lineHeight: 1.8, fontWeight: "500", wordBreak: "keep-all" }}>
                  {pokemonForm.description}
                </Typography>
              </Paper>
            </Box>

            <Box sx={{ mb: 6 }}>
              <SectionTitle label="기본 정보" color={ACCENT_COLOR}/>
              <Paper elevation={0} sx={{ borderRadius: "15px", overflow: "hidden", border: `1px solid ${ACCENT_COLOR}`, display: "flex", flexWrap: "wrap" }}>
                <InfoColumn label="포켓몬" value={`${String(pokemon.speciesId).padStart(4, "0")} ${pokemon.name}`} color={ACCENT_COLOR} />
                <InfoColumn label="분류" value={pokemon.category} color={ACCENT_COLOR} />
                <InfoColumn label="타입" color={ACCENT_COLOR}>
                  <Stack direction="column" spacing={0.5} alignItems="center">
                    {pokemonForm.types.map(type => (
                      <TypeBadge key={type.id} name={type.name} color={type.color} />
                    ))}
                  </Stack>
                </InfoColumn>
                <InfoColumn label="신장" value={`${pokemonForm.height / 10}m`} color={ACCENT_COLOR} />
                <InfoColumn label="체중" value={`${pokemonForm.weight / 10}kg`} color={ACCENT_COLOR} />
                <InfoColumn label="성비" value={gender} color={ACCENT_COLOR} />
                <InfoColumn label="알그룹" value={pokemon.eggGroups.join(", ")} color={ACCENT_COLOR} isLast />
              </Paper>
            </Box>

            <Box sx={{ mb: 6 }}>
              <SectionTitle label="특성 정보" color={ACCENT_COLOR}/>
              <Paper elevation={0} sx={{ borderRadius: 4, overflow: "hidden", border: `1px solid ${ACCENT_COLOR}` }}>
                {pokemonForm.abilities.map((ability, idx) => (
                  <InfoRow key={ability.id} label={ability.isHidden ? `*${ability.name}` : ability.name} value={ability.description} color={ACCENT_COLOR} isLast={idx === pokemonForm.abilities.length - 1}/>
                ))}
              </Paper>
            </Box>

            <Box>
              <SectionTitle label="방어 상성" color={ACCENT_COLOR}/>
              <Paper elevation={0} sx={{ borderRadius: 4, overflow: "hidden", border: `1px solid ${ACCENT_COLOR}` }}>
                {Object.entries(pokemonForm.typeEfficacy)
                  .sort(([a], [b]) => parseFloat(b) - parseFloat(a))
                  .map(([multiplier, types], idx, array) => (
                    <InfoRow key={multiplier} label={`${Number(multiplier)}배`} color={ACCENT_COLOR} isLast={idx === array.length - 1}>
                      <Stack direction="row" sx={{ gap: 1.0 }} flexWrap="wrap">
                        {(types as any[]).map(type => (
                          <TypeBadge key={type.id} name={type.name} color={type.color} />
                        ))}
                      </Stack>
                    </InfoRow>
                  ))}
              </Paper>
            </Box>
          </Paper>
        </Box>
      </Container>

      <NavButton pokemon={pokemon.prev} color={ACCENT_COLOR} direction='left'/>
      <NavButton pokemon={pokemon.next} color={ACCENT_COLOR} direction='right'/>
    </>
  );
}


