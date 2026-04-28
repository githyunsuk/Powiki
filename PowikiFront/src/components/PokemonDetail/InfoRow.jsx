import { Box, Stack, Typography, Divider } from "@mui/material";

function InfoRow({ label, value, color, isLast, children }) {
  return (
    <Box>
      <Stack direction={{ xs: "column", sm: "row" }}>
        <Box 
          sx={{ 
            width: { xs: "100%", sm: "120px" },
            bgcolor: color, 
            p: 2, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            flexShrink: 0
          }}
        >
          <Typography variant="body1" fontWeight="800" sx={{ color: "#fff" }}>
            {label}
          </Typography>
        </Box>

        <Box sx={{ p: 2, bgcolor: "#fff", flexGrow: 1, display: "flex", alignItems: "center" }}>
          {children ? children : (
            <Typography variant="body2" sx={{ color: "#4a5568", lineHeight: 1.6 }}>
              {value}
            </Typography>
          )}
        </Box>
      </Stack>
      
      {!isLast && <Divider />}
    </Box>
  );
}

export default InfoRow;