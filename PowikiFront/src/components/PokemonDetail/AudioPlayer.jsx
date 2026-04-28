import { useEffect, useRef, useState } from "react";
import { POKEMON_ASSETS } from "../../constants/pokemon";
import { Box, Stack, Typography } from "@mui/material";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

function AudioPlayer({ pokemonId, accentColor }) {

  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const crySource = `${POKEMON_ASSETS.CRY}${parseInt(pokemonId)}.ogg`

  // 언마운트 및 페이지 이동시 오디오 초기화
  useEffect(() => {
    const currentAudio = audioRef.current;

    return () => {
      if (currentAudio) {
        currentAudio.pause(); 
        currentAudio.currentTime = 0; 
      }
      setProgress(0); 
    };
  }, [pokemonId]);

  const handlePlayCry = () => {
    if (audioRef.current) {
      setProgress(0);
      audioRef.current.volume = 0.5;
      audioRef.current.play();
    }
  };

  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    if(duration) {
      setProgress((currentTime / duration) * 100);
    }
  };

  const handleEnded = () => {
    setProgress(100);
    setTimeout(() => {
      setProgress(0);
    }, 300);
  };

  return (
    <Box sx={{ width: "100%", px: 2}}>
      
      <audio ref={audioRef} src={crySource} onTimeUpdate={handleTimeUpdate} onEnded={handleEnded} />
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Box 
          onClick={handlePlayCry}
          sx={{ 
            bgcolor: accentColor, color: "#fff", borderRadius: "50%", 
            width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", transition: "transform 0.1s",
            "&:active": { transform: "scale(0.9)" },
            "&:hover": { opacity: 0.8 }
          }}
        >
          <VolumeUpIcon sx={{ fontSize: "1.2rem" }} />
        </Box>
        <Box sx={{ flexGrow: 1, height: 6, bgcolor: "#f1f5f9", borderRadius: 3, position: "relative", overflow: "hidden" }}>
          <Box 
            sx={{ 
              position: "absolute", left: 0, top: 0, height: "100%", 
              width: `${progress}%`, bgcolor: accentColor,
              transition: progress === 0 ? "none" : "width 0.1s linear" 
            }} 
          />
        </Box>
        <Typography sx={{ fontSize: "0.65rem", color: "#94a3b8", fontWeight: "700" }}>CRIES</Typography>
      </Stack>

    </Box>
  )
}

export default AudioPlayer;