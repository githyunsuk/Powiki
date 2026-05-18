import { Box, Typography, Container, AppBar, Toolbar, Button, Stack } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "도감", path: "/" },
    { label: "기술", path: "/move" },
    { label: "도구", path: "/" },
    { label: "기타", path: "/quiz" },
  ];

  return (
    <AppBar 
      position="static" 
      elevation={0} 
      sx={{ 
        backgroundColor: "#f44336", 
        borderBottom: "4px solid #333", 
        mb: 6,
        width: "100%",
        position: "relative", 
        overflow: "visible" 
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ flexDirection: "column", py: 2 }}>
          {/* 로고 영역 */}
          <Box 
            onClick={() => navigate("/")}
            sx={{ display: "flex", alignItems: "center", gap: 1.5, cursor: "pointer", mb: 2 }}
          >
            <Box
              component="img"
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
              alt="pokeball"
              sx={{ width: 40, height: 40, filter: "drop-shadow(2px 2px 0px rgba(0,0,0,0.2))" }}
            />
            <Typography variant="h4" sx={{ fontWeight: 900, color: "#fff", textShadow: "2px 2px 0px #333" }}>
              Pokémon Wiki
            </Typography>
          </Box>

          {/* 메뉴 영역 */}
          <Stack direction="row" spacing={1} sx={{ backgroundColor: "rgba(0,0,0,0.1)", padding: "6px", borderRadius: "12px" }}>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  sx={{
                    color: "#fff",
                    fontWeight: 700,
                    px: 3,
                    borderRadius: "8px",
                    backgroundColor: isActive ? "#333" : "transparent",
                    border: isActive ? "2px solid #fff" : "2px solid transparent",
                    "&:hover": { backgroundColor: isActive ? "#333" : "rgba(255,255,255,0.3)" }
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Stack>
        </Toolbar>
      </Container>

      {/* 포켓볼 버튼 장식 (위치 교정) */}
      <Box 
        sx={{ 
          position: "absolute", 
          bottom: "-19px", 
          left: "50%", 
          transform: "translateX(-50%)",
          width: "34px",
          height: "34px",
          backgroundColor: "#fff",
          border: "4px solid #333",
          borderRadius: "50%",
          zIndex: 10,
          boxShadow: "0 2px 0 rgba(0,0,0,0.1)",
          "&::after": {
            content: '""',
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "12px",
            height: "12px",
            border: "2px solid #333",
            borderRadius: "50%"
          }
        }} 
      />
    </AppBar>
  );
}

export default Header;