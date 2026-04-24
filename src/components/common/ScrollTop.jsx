import { Fab, Zoom, useScrollTrigger } from "@mui/material";
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
        <Fab
          onClick={handleClick}
          size="medium" 
          sx={{
            position: "fixed",
            bottom: { xs: 20, md: 30 }, 
            right: { xs: 20, md: 30 },  
            zIndex: 1000,
            backgroundColor: "#ff1c1c", 
            color: "white",
            border: "4px solid #333", 
            boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
            "&:hover": {
              backgroundColor: "#d32f2f", 
              transform: "scale(1.1) rotate(15deg)", 
            },
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

  export default ScrollTop;