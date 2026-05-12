import { useState, useRef, useEffect } from "react";
import { 
  Box, Typography, Container, Paper, Button, Stack, 
  TextField, LinearProgress, Divider, Alert, Zoom, Fade 
} from "@mui/material";
import { usePokemonStore } from "../store/pokemonStore";
import { PokemonListData } from "../types/Pokemon";
import { getPokemonImageUrl } from "../utils/pokemonHelper";
import ReplayIcon from '@mui/icons-material/Replay';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export default function PokemonQuiz() {
  const [step, setStep] = useState('START');
  const [quizList, setQuizList] = useState<PokemonListData[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const pokemonListData = usePokemonStore((state) => state.pokemonListData);
  const currentPokemon = quizList[currentIdx];
  const isCorrect = input.trim() === currentPokemon?.name;

  useEffect(() => {
    if (step === 'QUIZ' && !isSubmitted) {
      inputRef.current?.focus();
    }
  }, [currentIdx, step, isSubmitted]);

  const startQuiz = (count: number) => {
    const filtered = [...pokemonListData].filter((p) => p.formType === 'default');
    for (let i = filtered.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
    }

    setQuizList(filtered.slice(0, count));
    setScore(0);
    setCurrentIdx(0);
    setInput("");
    setIsSubmitted(false);
    setStep('QUIZ');
  };

  const handleAction = () => {
    if (isSubmitted) {
      if (currentIdx + 1 === quizList.length) {
        setStep('RESULT');
      } else {
        setCurrentIdx((idx) => idx + 1);
        setIsSubmitted(false);
        setInput("");
      }
    } else {
      if (isCorrect) setScore((prev) => prev + 1);
      setIsSubmitted(true);
    }
  };

  // 공통 테두리 스타일
  const commonBorderStyle = { border: "3px solid #333", borderRadius: "20px" };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, pb: 8 }}>
      {/* 1. 시작 화면 */}
      {step === 'START' && (
        <Fade in>
          <Paper elevation={0} sx={{ ...commonBorderStyle, p: 5, textAlign: 'center', bgcolor: '#fff' }}>
            <Box component="img" 
                 src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" 
                 sx={{ width: 80, mb: 2, filter: "drop-shadow(3px 3px 0px rgba(0,0,0,0.1))" }} />
            <Typography variant="h4" fontWeight={900} sx={{ mb: 1, color: '#333' }}>
              포켓몬 퀴즈
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: '#666' }}>
              무작위로 등장하는 포켓몬의 이름을 맞춰보세요!
            </Typography>
            
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 700, color: '#f44336' }}>
              문제 개수 선택
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center">
              {[10, 20, 30].map(count => (
                <Button 
                  key={count} 
                  variant="contained" 
                  onClick={() => startQuiz(count)}
                  sx={{ 
                    bgcolor: '#333', color: '#fff', fontWeight: 800, px: 3,
                    '&:hover': { bgcolor: '#f44336' }
                  }}
                >
                  {count}문항
                </Button>
              ))}
            </Stack>
          </Paper>
        </Fade>
      )}

      {/* 2. 퀴즈 진행 화면 */}
      {step === 'QUIZ' && currentPokemon && (
        <Box>
          <Box sx={{ mb: 2, px: 1 }}>
             <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Typography fontWeight={800} color="#333">QUIZ {currentIdx + 1}/{quizList.length}</Typography>
                <Typography fontWeight={800} color="#f44336">SCORE: {score}</Typography>
             </Stack>
             <LinearProgress 
                variant="determinate" 
                value={((currentIdx) / quizList.length) * 100} 
                sx={{ height: 10, borderRadius: 5, bgcolor: '#eee', '& .MuiLinearProgress-bar': { bgcolor: '#333' } }}
             />
          </Box>

          <Paper elevation={0} sx={{ ...commonBorderStyle, p: 4, textAlign: 'center', bgcolor: '#fff', position: 'relative' }}>
            {/* 포켓몬 이미지 */}
            <Box sx={{ 
              bgcolor: '#f8fafc', borderRadius: '15px', p: 4, mb: 3, 
              border: '1px solid #edf2f7', display: 'flex', justifyContent: 'center' 
            }}>
              <Zoom in key={currentPokemon.id}>
                <Box 
                  component="img"
                  src={getPokemonImageUrl(currentPokemon.id, "ARTWORK")}
                  alt="pokemon"
                  sx={{ 
                    width: '100%', maxWidth: 220, height: 'auto',
                    // filter: isSubmitted ? 'none' : 'brightness(0) drop-shadow(0 0 2px #000)' // 정답 제출 전엔 실루엣 처리 가능 (선택사항)
                  }}
                />
              </Zoom>
            </Box>

            <TextField
              fullWidth
              inputRef={inputRef}
              placeholder="이 포켓몬의 이름은?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isSubmitted}
              onKeyDown={(e) => e.key === 'Enter' && handleAction()}
              autoComplete="off"
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  fontWeight: 700,
                  '&.Mui-focused fieldset': { borderColor: '#333' }
                }
              }}
            />

            {isSubmitted && (
              <Zoom in>
                <Alert 
                  severity={isCorrect ? "success" : "error"}
                  icon={isCorrect ? <CheckCircleOutlineIcon /> : <HelpOutlineIcon />}
                  sx={{ mb: 3, borderRadius: '12px', fontWeight: 700, fontSize: '1rem' }}
                >
                  {isCorrect ? "정답입니다!" : `아쉬워요! 정답은 [${currentPokemon.name}] 입니다.`}
                </Alert>
              </Zoom>
            )}

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleAction}
              sx={{
                py: 1.5, borderRadius: '12px', fontSize: '1.1rem', fontWeight: 800,
                bgcolor: isSubmitted ? '#333' : '#f44336',
                '&:hover': { bgcolor: isSubmitted ? '#555' : '#d32f2f' }
              }}
            >
              {isSubmitted ? (currentIdx + 1 === quizList.length ? "결과 확인하기" : "다음 문제") : "정답 제출"}
            </Button>
          </Paper>
        </Box>
      )}

      {/* 3. 결과 화면 */}
      {step === 'RESULT' && (
        <Fade in>
          <Paper elevation={0} sx={{ ...commonBorderStyle, p: 5, textAlign: 'center', bgcolor: '#fff' }}>
            <Typography variant="h5" fontWeight={900} gutterBottom>QUIZ RESULT</Typography>
            <Divider sx={{ my: 3, borderBottomWidth: 2 }} />
            
            <Box sx={{ py: 4 }}>
                <Typography variant="h2" fontWeight={900} color="#f44336">
                  {Math.round((score / quizList.length) * 100)}점
                </Typography>
                <Typography variant="h6" fontWeight={700} color="#666">
                  {quizList.length}문제 중 {score}문제를 맞췄어요!
                </Typography>
            </Box>

            <Stack spacing={2}>
                <Button 
                    variant="contained" 
                    startIcon={<ReplayIcon />}
                    onClick={() => setStep('START')}
                    sx={{ bgcolor: '#333', fontWeight: 800, py: 1.5, borderRadius: '12px' }}
                >
                    다시 도전하기
                </Button>
                <Button 
                    variant="outlined" 
                    onClick={() => window.location.href = '/'}
                    sx={{ color: '#333', borderColor: '#333', borderWeight: 2, fontWeight: 800, py: 1.5, borderRadius: '12px', '&:hover': { borderWeight: 2, bgcolor: '#f5f5f5' } }}
                >
                    도감으로 돌아가기
                </Button>
            </Stack>
          </Paper>
        </Fade>
      )}
    </Container>
  );
}