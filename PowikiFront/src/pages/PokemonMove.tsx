import { Box, Typography, Card, Tooltip, Chip } from "@mui/material";
import TypeFilter from "../components/features/TypeFilter";
import MoveSearchBar from "../components/PokemonMove/MoveSearchBar";
import TypeBadge from "../components/common/TypeBadge";

// 1. 컬럼 너비 재설정 (전체 1150px 대응 비중)
const COLUMN_WIDTHS = {
  name: "15%",      // 기술명
  type: "10%",      // 타입
  category: "8%",   // 분류
  power: "7%",      // 위력
  accuracy: "7%",   // 명중
  pp: "7%",         // PP
  description: "31%", // 효과 설명
  etc: "15%",       // 기타 (태그)
};

interface MoveData {
  id: number;
  name: string;
  type: string;
  color: string;
  category: string;
  power: number | null;
  accuracy: number | null;
  pp: number;
  description: string;
  ailment?: string;
  isContact?: boolean;
}

const dummyMoves: MoveData[] = [
  {
    id: 1,
    name: "10만볼트",
    type: "전기",
    color: "#F7D02C",
    category: "special",
    power: 90,
    accuracy: 100,
    pp: 15,
    description: "10만 볼트의 강한 전격을 상대에게 퍼부어 공격한다. 10% 확률로 상대를 마비 상태로 만든다.",
    ailment: "마비",
    isContact: false,
  },
  {
    id: 2,
    name: "칼춤",
    type: "노말",
    color: "#A8A77A",
    category: "status",
    power: null,
    accuracy: null,
    pp: 20,
    description: "전투 댄스를 추어 격렬하게 기세를 높인다. 자신의 공격을 2랭크 올린다.",
    isContact: false,
  },
  {
    id: 3,
    name: "인파이트",
    type: "격투",
    color: "#C22E28",
    category: "physical",
    power: 120,
    accuracy: 100,
    pp: 5,
    description: "방어를 버리고 상대에게 파고들어 전력으로 공격한다. 자신의 방어와 특수방어가 1랭크씩 떨어진다.",
    ailment: "방어/특방 하락",
    isContact: true,
  }
];

export default function PokemonMove() {
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "physical": return "물리";
      case "special": return "특수";
      case "status": return "변화";
      default: return "미정";
    }
  };

  return (
    <Box sx={{ width: "100%", py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%", mb: 4 }}>
        <MoveSearchBar />
      </Box>

      <TypeFilter />

      {/* 카드 길이를 늘리기 위해 maxWidth를 1150px로 조정 */}
      <Box sx={{ width: "100%", maxWidth: "1150px", margin: "40px auto 0 auto", px: 2 }}>
        
        {/* [헤더] */}
        <Box sx={{ display: "flex", px: "24px", mb: 1.5, color: "text.secondary", alignItems: "center" }}>
          <Typography variant="caption" sx={{ width: COLUMN_WIDTHS.name, fontWeight: "bold" }}>기술명</Typography>
          <Typography variant="caption" sx={{ width: COLUMN_WIDTHS.type, fontWeight: "bold", textAlign: "center" }}>타입</Typography>
          <Typography variant="caption" sx={{ width: COLUMN_WIDTHS.category, fontWeight: "bold", textAlign: "center" }}>분류</Typography>
          <Typography variant="caption" sx={{ width: COLUMN_WIDTHS.power, fontWeight: "bold", textAlign: "center" }}>위력</Typography>
          <Typography variant="caption" sx={{ width: COLUMN_WIDTHS.accuracy, fontWeight: "bold", textAlign: "center" }}>명중</Typography>
          <Typography variant="caption" sx={{ width: COLUMN_WIDTHS.pp, fontWeight: "bold", textAlign: "center" }}>PP</Typography>
          <Typography variant="caption" sx={{ width: COLUMN_WIDTHS.description, fontWeight: "bold", pl: 2 }}>효과 설명</Typography>
          <Typography variant="caption" sx={{ width: COLUMN_WIDTHS.etc, fontWeight: "bold", textAlign: "center" }}>기타</Typography>
        </Box>

        {/* [리스트 본문] */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {dummyMoves.map((move) => {
            const typeColor = move.color || "#e0e0e0";

            return (
              <Card
                key={move.id}
                elevation={0}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: "16px 24px",
                  borderRadius: "12px",
                  border: `1px solid #eee`, 
                  borderLeft: `6px solid ${typeColor}`, 
                  bgcolor: "#ffffff",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateX(1px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }
                }}
              >
                <Typography sx={{ width: COLUMN_WIDTHS.name, fontWeight: "bold", fontSize: "1rem" }}>
                  {move.name}
                </Typography>

                <Box sx={{ width: COLUMN_WIDTHS.type, display: "flex", justifyContent: "center" }}>
                  <TypeBadge name={move.type} color={move.color} />
                </Box>

                <Typography variant="body2" sx={{ width: COLUMN_WIDTHS.category, textAlign: "center", color: "text.secondary" }}>
                  {getCategoryLabel(move.category)}
                </Typography>

                <Typography variant="body2" sx={{ width: COLUMN_WIDTHS.power, textAlign: "center", fontWeight: 700 }}>
                  {move.power ?? "—"}
                </Typography>

                <Typography variant="body2" sx={{ width: COLUMN_WIDTHS.accuracy, textAlign: "center" }}>
                  {move.accuracy ?? "—"}
                </Typography>

                <Typography variant="body2" sx={{ width: COLUMN_WIDTHS.pp, textAlign: "center", color: "text.secondary" }}>
                  {move.pp}
                </Typography>

                {/* 효과 설명 */}
                <Box sx={{ width: COLUMN_WIDTHS.description, pl: 2 }}>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: "#666", 
                      lineHeight: 1.5,
                      display: "-webkit-box",
                      WebkitLineClamp: 2, 
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      wordBreak: "keep-all"
                    }}
                  >
                    {move.description}
                  </Typography>
                </Box>

                {/* 기타 칸 (태그 영역) */}
                <Box sx={{ width: COLUMN_WIDTHS.etc, display: "flex", justifyContent: "center", gap: 0.5, flexWrap: "wrap" }}>
                  {move.isContact !== undefined && (
                    <Tooltip title={move.isContact ? "상대에게 몸을 부딪히는 접촉 기술입니다." : "몸을 부딪히지 않는 비접촉 기술입니다."} arrow>
                      <Chip 
                        label={move.isContact ? "접촉" : "비접촉"} 
                        size="small" 
                        variant="outlined"
                        sx={{ 
                          fontSize: "10px", 
                          height: "20px", 
                          cursor: "help",
                          borderColor: move.isContact ? "#ffcdd2" : "#e0e0e0",
                          color: move.isContact ? "#d32f2f" : "#757575"
                        }}
                      />
                    </Tooltip>
                  )}
                  {move.ailment && (
                    <Tooltip title={`${move.ailment} 관련 부가 효과가 있습니다.`} arrow>
                      <Chip 
                        label={move.ailment} 
                        size="small" 
                        sx={{ 
                          fontSize: "10px", 
                          height: "20px", 
                          cursor: "help",
                          bgcolor: "#f5f5f5", 
                          color: "#616161",
                          border: "1px solid #ddd"
                        }}
                      />
                    </Tooltip>
                  )}
                </Box>
              </Card>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}