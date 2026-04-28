import { Chip } from "@mui/material";

interface TypeBadgeProps {
  name: string,
  color: string,
}
function TypeBadge({name, color}: TypeBadgeProps) {
 
  return (
    <Chip
      key={name}
      label={name}
      size="small"
      sx={{
        width: "60px",
        borderRadius: "4px",
        fontSize: "0.75rem",
        fontWeight: "bold",
        color: "white",
        backgroundColor: color,

        border: "none",
        height: "24px",
        "& .MuiChip-label": {
          px: 0,
        },
      }}
    />
  );
}

export default TypeBadge;