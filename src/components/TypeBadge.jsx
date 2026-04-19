import { Chip } from "@mui/material";

function TypeBadge({type}) {
 
  return (
    <Chip
      key={type.typeName}
      label={type.typeName}
      size="small"
      sx={{
        width: "60px",
        borderRadius: "4px",
        fontSize: "0.75rem",
        fontWeight: "bold",
        color: "white",
        backgroundColor: type.typeColor,

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