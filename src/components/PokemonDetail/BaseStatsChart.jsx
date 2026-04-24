import { Box, Paper, Stack, Typography } from "@mui/material";
import { LabelList, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts";

function BaseStatsChart({ stats, color }) {
  const CHART_MAX = 150;

  const chartData = [
    { subject: "HP", A: stats.hp },
    { subject: "공격", A: stats.attack },
    { subject: "방어", A: stats.defense },
    { subject: "특수공격", A: stats.specialAttack }, 
    { subject: "특수방어", A: stats.specialDefense },
    { subject: "스피드", A: stats.speed },
  ].map(item => ({
    ...item,
    A_fixed: item.A > CHART_MAX ? CHART_MAX : item.A 
  }));

const renderCustomTick = (props) => {
    const { payload, x, y, textAnchor } = props;
    
    let adjustedY = y;
    
    if (payload.value === "특수공격") {
      adjustedY += 10; 
    }

    const dataItem = chartData.find(d => d.subject === payload.value);
    
    return (
      <g transform={`translate(${x},${adjustedY})`}>
        <text
          textAnchor={textAnchor}
          fontSize="12px"
          fontWeight="700"
          fill="#718096"
        >
          {payload.value} 
          <tspan fill={color} fontWeight="900" dx="5">
            {dataItem ? dataItem.A : ""}
          </tspan>
        </text>
      </g>
    );
  };

  return (
    <Paper elevation={0} sx={{ flex: 1.2, p: 3, borderRadius: 5, bgcolor: "#fff", border: "1px solid #edf2f7", display: "flex", flexDirection: "column" }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="subtitle1" fontWeight="800" sx={{ color: "#4a5568" }}>종족값</Typography>
        <Box sx={{ bgcolor: "#f1f5f9", px: 1.5, py: 0.5, borderRadius: "10px", border: "1px solid #e2e8f0" }}>
          <Typography sx={{ fontSize: "0.75rem", color: "#64748b", fontWeight: "600" }}>
            합계 <span style={{ color: color, fontWeight: "900", marginLeft: "4px" }}>{stats.total}</span>
          </Typography>
        </Box>
      </Stack>

      <Box sx={{ flexGrow: 1, minHeight: "320px" }}> 
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="85%" data={chartData}> 
            <PolarGrid stroke="#e2e8f0" />
            
            <PolarAngleAxis 
              dataKey="subject" 
              tick={renderCustomTick} 
            />
            
            <PolarRadiusAxis domain={[0, CHART_MAX]} tick={false} axisLine={false} />
            <Radar dataKey="A_fixed" stroke={color} fill={color} fillOpacity={0.3} isAnimationActive={true} animationDuration={300} animationEasing="linear" />
          </RadarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}

export default BaseStatsChart;