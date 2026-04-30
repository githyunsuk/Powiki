import { Container, Typography, Box, Paper, Stack, Tab, Tabs } from "@mui/material";
import TypeBadge from "../components/common/TypeBadge";
import AudioPlayer from "../components/PokemonDetail/AudioPlayer";
import SectionTitle from "../components/PokemonDetail/SectionTitle";
import InfoColumn from "../components/PokemonDetail/InfoColumn";
import InfoRow from "../components/PokemonDetail/InfoRow";
import BaseStatsChart from "../components/PokemonDetail/BaseStatsChart";
import { getPokemonImageUrl } from "../utils/pokemonHelper";
import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import api from "../api/axiosInstance";
import Loading from "../components/common/Loading";
import NavButton from "../components/common/NavButton";
import { PokemonDetailListData, PokemonFormData } from "../types/Pokemon";
import { FORM_TYPE_NAME_MAP, TAB_NAME_MAP } from "../constants/pokemon";

function PokemonDetail() {
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState<PokemonDetailListData>();
  const [loading, setLoading] = useState(false);
  const [activeGroup, setActiveGroup] = useState("standard");
  const [activeFormId, setActiveFormId] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getPokemonData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/pokemon/${pokemonId}`);
        const data = response.data.data;
        setPokemon(data);
        
        if (data.forms && data.forms.length > 0) {
          setActiveGroup(data.forms[0].formGroup);
          setActiveFormId(data.forms[0].id);
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

  const availableTabs = useMemo(() => {
    if(!pokemon?.forms) return [];
    const groups = new Set(pokemon.forms.map(form => form.formGroup));
    return Object.keys(TAB_NAME_MAP).filter(key => groups.has(key));
  }, [pokemon]);

  const currentSubForms = useMemo(() => {
    if(!pokemon?.forms) return [];
    return pokemon.forms.filter(f => f.formGroup === activeGroup);
  }, [pokemon, activeGroup]);

  const pokemonForm = useMemo(() => {
    if(!pokemon?.forms) return null;
    return pokemon.forms.find(f => f.id === activeFormId) || pokemon.forms[0];
  }, [pokemon, activeFormId]);

  const displayName = useMemo(() => {
    if (!pokemonForm) return "";

    if (formatFormName(pokemonForm) === "기본 모습") {
      return pokemonForm.name;
    }

    if (pokemonForm.formType && FORM_TYPE_NAME_MAP[pokemonForm.formType]) {
      return pokemonForm.formName;
    }

    return `${pokemonForm.name}(${pokemonForm.formName})`;
  }, [pokemonForm]);

  if (loading || !pokemon || !pokemonForm) return <Loading />;

  const ACCENT_COLOR = pokemonForm.types.find(type => type.slot === 1)?.color || "#718096";
  const pokemonImage = getPokemonImageUrl(pokemonForm.id, "ARTWORK");
  const gender = pokemon.gender.genderless ? "무성" : `수컷: ${pokemon.gender.male}%, 암컷: ${pokemon.gender.female}%`;

  const handleMainTabChange = (_e: React.SyntheticEvent, newValue: number) => {
    const nextGroup = availableTabs[newValue];
    setActiveGroup(nextGroup);
    const firstFormOfGroup = pokemon.forms.find(f => f.formGroup === nextGroup);
    if (firstFormOfGroup) setActiveFormId(firstFormOfGroup.id);
  };

  return (
    <>
      <Container maxWidth="md" sx={{ pt: 4, pb: 5 }}>
        
        {/* 1. 상단 메인 그룹 전환 탭 */}
        <Box sx={{ width: '100%', position: 'relative' }}>
          <Tabs
            value={availableTabs.indexOf(activeGroup)}
            onChange={handleMainTabChange}
            variant="scrollable" 
            scrollButtons={false}
            sx={{
              minHeight: "48px",
              "& .MuiTabs-indicator": { display: "none" },
              "& .MuiTabs-flexContainer": { gap: "4px" }
            }}
          >
            {availableTabs.map((tabKey) => (
              <Tab 
                key={tabKey}
                label={TAB_NAME_MAP[tabKey]} 
                sx={{
                  ...tabStyle,
                  "&.Mui-selected": {
                    backgroundColor: "#fff",
                    color: ACCENT_COLOR,
                    fontWeight: 900,
                    border: "1px solid #ddd",
                    borderBottom: "2px solid #fff", 
                    zIndex: 2,
                  },
                }} 
              />
            ))}
          </Tabs>
        </Box>

        {/* 2. 메인 정보 영역 */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: "0 20px 20px 20px", 
            border: "1px solid #ddd",
            bgcolor: "#fff",
            overflow: "hidden",
            p: { xs: 2, md: 4 }
          }}
        >
          {/* 서브탭 영역 */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: '48px', mb: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, p: 0.6, bgcolor: '#f1f5f9', borderRadius: '12px' }}>
                {currentSubForms.map((form) => {
                  const isSelected = activeFormId === form.id;
                  return (
                    <Box
                      key={form.id}
                      onClick={() => setActiveFormId(form.id)}
                      sx={{
                        px: 2, py: 0.8, borderRadius: '10px', cursor: 'pointer',
                        fontSize: '0.85rem', transition: '0.2s',
                        fontWeight: isSelected ? 800 : 500,
                        color: isSelected ? ACCENT_COLOR : '#64748b',
                        bgcolor: isSelected ? '#fff' : 'transparent',
                        boxShadow: isSelected ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                        '&:hover': { color: ACCENT_COLOR }
                      }}
                    >
                      {formatFormName(form)}
                    </Box>
                  );
                })}
              </Box>
          </Box>

          {/* 포켓몬 이름 & 번호 카드 */}
          <Paper 
            elevation={0} 
            sx={{ 
              p: 4, mb: 4, borderRadius: 6, 
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
              <Typography variant="h3" fontWeight="800">
                {displayName}
              </Typography>
            </Box>
          </Paper>

          {/* 이미지 & 능력치 차트 */}
          <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ mb: 6 }}>
            <Paper elevation={0} sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", bgcolor: "#f8fafc", borderRadius: 5, border: "1px solid #edf2f7", p: 3 }}>
              <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", mb: 2 }}>
                <img src={pokemonImage} alt={pokemonForm.name} style={{ width: "100%", maxWidth: "280px", height: "auto" }} />
              </Box>
              <AudioPlayer pokemonId={pokemonForm.id} accentColor={ACCENT_COLOR} />
            </Paper>
            <BaseStatsChart stats={pokemonForm.stats} color={ACCENT_COLOR} />
          </Stack>

          {/* 도감 설명 */}
          <Box sx={{ mb: 6 }}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 4, bgcolor: "#f8fafc", borderLeft: `5px solid ${ACCENT_COLOR}` }}>
              <Typography variant="body1" sx={{ color: "#475569", lineHeight: 1.8, fontWeight: "500", wordBreak: "keep-all" }}>
                {pokemonForm.description}
              </Typography>
            </Paper>
          </Box>

          {/* 기본 정보 */}
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

          {/* 특성 정보 */}
          <Box sx={{ mb: 6 }}>
            <SectionTitle label="특성 정보" color={ACCENT_COLOR}/>
            <Paper elevation={0} sx={{ borderRadius: 4, overflow: "hidden", border: `1px solid ${ACCENT_COLOR}` }}>
              {pokemonForm.abilities.map((ability, idx) => (
                <InfoRow key={ability.id} label={ability.isHidden ? `*${ability.name}` : ability.name} value={ability.description} color={ACCENT_COLOR} isLast={idx === pokemonForm.abilities.length - 1}/>
              ))}
            </Paper>
          </Box>

          {/* 방어 상성 */}
          <Box>
            <SectionTitle label="방어 상성" color={ACCENT_COLOR}/>
            <Paper elevation={0} sx={{ borderRadius: 4, overflow: "hidden", border: `1px solid ${ACCENT_COLOR}` }}>
              {Object.entries(pokemonForm.typeEfficacy)
                .sort(([a], [b]) => parseFloat(b) - parseFloat(a))
                .map(([multiplier, types], idx, array) => (
                  <InfoRow key={multiplier} label={`${multiplier}배`} color={ACCENT_COLOR} isLast={idx === array.length - 1}>
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
      </Container>

      <NavButton pokemon={pokemon.prev} color={ACCENT_COLOR} direction='left'/>
      <NavButton pokemon={pokemon.next} color={ACCENT_COLOR} direction='right'/>
    </>
  );
}

const tabStyle = {
  textTransform: "none",
  fontWeight: "bold",
  fontSize: "0.9rem",
  minWidth: "120px",
  padding: "10px 16px", 
  borderRadius: "12px 12px 0 0",
  marginRight: "-1px", 
  backgroundColor: "#f5f5f5",
  color: "#666",
  transition: "0.2s",
  border: "1px solid #ddd",
  borderBottom: "none",
};

export default PokemonDetail;