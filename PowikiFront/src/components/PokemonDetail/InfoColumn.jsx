import { Box, Typography } from "@mui/material";

function InfoColumn({ label, value, color, isLast, children }) {

  return(
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, borderRight: isLast ? "none" : "1px solid #edf2f7" }}>
      <Box sx={{ bgcolor: color, height: "42px", display: "flex", alignItems: "center", justifyContent: "center", px: 0.5, flexShrink: 0 }}>
        <Typography sx={{ color: "#fff", fontWeight: "800", fontSize: "0.75rem", textAlign: "center" }}>{label}</Typography>
      </Box>
      <Box sx={{ py: 2, px: 1, bgcolor: "#fff", flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "65px" }}>
        {children ? children : (
          <Typography variant="body2" fontWeight="700" sx={{ color: "#334155", fontSize: "0.8rem", textAlign: "center", lineHeight: 1.3, wordBreak: "break-all" }}>
            {value}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default InfoColumn;