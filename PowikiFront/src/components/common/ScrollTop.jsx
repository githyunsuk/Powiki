import { Fab, Zoom, useScrollTrigger, Box } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

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
      <Box
        role="presentation"
        sx={{
          position: "fixed",
          // [수정] 화면 끝에서 살짝 더 띄워서 답답함을 해소 (20/30 -> 32/40)
          bottom: { xs: 32, md: 40 },
          right: { xs: 32, md: 40 },
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
        }}
      >
        <KeyboardArrowUpIcon
          sx={{
            color: "#333",
            // [수정] 2.5rem -> 2rem으로 축소 (공 크기에 맞춤)
            fontSize: "2rem",
            filter: "drop-shadow(2px 2px 0px white)",
            // [수정] 공이 작아졌으므로 마진도 살짝 조정
            mb: -0.8,
            zIndex: 11,
            animation: "bounce 2s infinite",
            "@keyframes bounce": {
              "0%, 100%": { transform: "translateY(0)" },
              "50%": { transform: "translateY(-4px)" },
            },
          }}
        />

        <Fab
          onClick={handleClick}
          sx={{
            // [수정] 60px -> 48px로 축소 (가장 큰 변화!)
            width: 48,
            height: 48,
            borderRadius: "50%",
            // [수정] 선 굵기도 4px -> 3px로 조정해서 투박함 제거
            border: "3px solid #333",
            position: "relative",
            background: "linear-gradient(to bottom, #FF0000 50%, #FFFFFF 50%)",
            boxShadow: "3px 3px 0px rgba(0,0,0,0.15)",
            overflow: "hidden",
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.1) rotate(15deg)",
            },
            
            "&::before": {
              content: '""',
              position: "absolute",
              top: "50%",
              left: 0,
              width: "100%",
              // [수정] 선 굵기 4px -> 3px
              height: "3px",
              backgroundColor: "#333",
              transform: "translateY(-50%)",
              zIndex: 1,
            },

            "&::after": {
              content: '""',
              position: "absolute",
              top: "50%",
              left: "50%",
              // [수정] 전체 크기에 맞춰 중앙 버튼도 10px -> 8px로 축소
              width: "8px",
              height: "8px",
              backgroundColor: "#fff",
              // [수정] 테두리 4px -> 3px
              border: "3px solid #333",
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
            },
          }}
        />
      </Box>
    </Zoom>
  );
}

export default ScrollTop;