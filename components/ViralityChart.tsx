import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis } from 'recharts';
import { GeneratedContent } from '../types';

interface ViralityChartProps {
  score: GeneratedContent['viralityScore'];
}

export const ViralityChart: React.FC<ViralityChartProps> = ({ score }) => {
  const data = [
    { subject: 'Emotion', A: score.emotion, fullMark: 100 },
    { subject: 'Logic', A: score.logic, fullMark: 100 },
    { subject: 'Trend', A: score.trendiness, fullMark: 100 },
    { subject: 'Clarity', A: score.clarity, fullMark: 100 },
    { subject: 'Controversy', A: score.controversy, fullMark: 100 },
  ];

  return (
    <div className="w-full bg-slate-900/50 rounded-xl p-6 border border-slate-800">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">Virality DNA</h4>
        <div className="h-[220px] w-full -ml-2">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                <PolarGrid stroke="#334155" strokeDasharray="3 3" />
                <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }} 
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                    name="Virality"
                    dataKey="A"
                    stroke="#22d3ee"
                    strokeWidth={2}
                    fill="#06b6d4"
                    fillOpacity={0.3}
                />
                </RadarChart>
            </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="bg-slate-800/50 p-2 rounded text-center border border-slate-700">
                <span className="block text-2xl font-bold text-cyan-400">
                    {Math.round((score.emotion + score.trendiness) / 2)}
                </span>
                <span className="text-[9px] uppercase text-slate-500 font-bold tracking-wider">Impact Score</span>
            </div>
            <div className="bg-slate-800/50 p-2 rounded text-center border border-slate-700">
                <span className="block text-2xl font-bold text-fuchsia-400">
                    {Math.round((score.logic + score.clarity) / 2)}
                </span>
                <span className="text-[9px] uppercase text-slate-500 font-bold tracking-wider">Quality Score</span>
            </div>
        </div>
    </div>
  );
};