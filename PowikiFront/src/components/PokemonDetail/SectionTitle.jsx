import { Box, Typography } from "@mui/material";

function SectionTitle({ label, color }) {

  return (
    <Typography variant="h6" fontWeight="800" sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
      <Box sx={{ width: 4, height: 18, bgcolor: color, borderRadius: 1 }}/>{label}

    </Typography>
  );
}

export default SectionTitle;