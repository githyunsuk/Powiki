import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  keyword: string;
  handleKeyword: (value: string) => void;
}

function SearchBar({ keyword, handleKeyword }: SearchBarProps) {

  return (
    <Paper
      elevation={3}
      sx={{
        p: "4px 12px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        maxWidth: 500,
        borderRadius: "50px",
        border: "2px solid #3c5aa6",
        zIndex: 1,
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, fontSize: "1.1rem" }}
        placeholder="포켓몬 이름을 검색해보세요!"
        value={keyword}
        onChange={(e) => handleKeyword(e.target.value)}

      />
      <IconButton type="button" sx={{ p: "10px" }}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default SearchBar;