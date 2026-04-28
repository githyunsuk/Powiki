import { Box, Typography, keyframes } from "@mui/material";

// 몬스터볼 회전 및 통통 튀는 애니메이션
const rotateAndBounce = keyframes`
  0% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-15px) rotate(90deg); }
  50% { transform: translateY(0) rotate(180deg); }
  75% { transform: translateY(-7px) rotate(270deg); }
  100% { transform: translateY(0) rotate(360deg); }
`;

function Loading() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      gap={3}
    >
      {/* 커스텀 몬스터볼 로더 */}
      <Box
        sx={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          border: "4px solid #333",
          position: "relative",
          background: "linear-gradient(to bottom, #FF0000 50%, #FFFFFF 50%)",
          animation: `${rotateAndBounce} 1.2s infinite ease-in-out`,
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: "50%",
            left: 0,
            width: "100%",
            height: "4px",
            backgroundColor: "#333",
            transform: "translateY(-50%)",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "12px",
            height: "12px",
            backgroundColor: "#fff",
            border: "4px solid #333",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
          },
        }}
      />

      <Typography
        variant="h6"
        sx={{
          color: "#333",
          fontWeight: "bold",
          fontFamily: "'Courier New', Courier, monospace", // 레트로 게임 폰트 느낌
          letterSpacing: "0.1rem",
          textAlign: "center",
          "&::after": {
            content: '"..."',
            display: "inline-block",
            width: "1em",
            textAlign: "left",
          },
        }}
      />
      
    </Box>
  );
}

export default Loading;