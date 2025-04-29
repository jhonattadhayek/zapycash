import React, { useEffect, useRef } from 'react';
import { MonthlyData } from '../types';

interface LineChartProps {
  data: MonthlyData[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current || data.length === 0) return;

    // Chart dimensions
    const width = 600;
    const height = 300;
    const padding = { top: 30, right: 30, bottom: 50, left: 60 };
    
    // Calculate chart area dimensions
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    
    // Find max value for scaling
    const maxValue = Math.max(
      ...data.map(d => Math.max(d.receitas, d.despesas))
    ) * 1.2; // Add 20% margin
    
    // Create SVG container
    let svg = `
      <svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(${padding.left}, ${padding.top})">
    `;
    
    // Y-axis grid lines and labels
    const yAxisSteps = 5;
    for (let i = 0; i <= yAxisSteps; i++) {
      const y = chartHeight - (i / yAxisSteps) * chartHeight;
      const value = (i / yAxisSteps) * maxValue;
      
      svg += `
        <line 
          x1="0" 
          y1="${y}" 
          x2="${chartWidth}" 
          y2="${y}" 
          stroke="rgba(255, 255, 255, 0.1)" 
          stroke-width="1"
        />
        <text 
          x="-10" 
          y="${y + 5}" 
          fill="rgba(255, 255, 255, 0.5)" 
          font-size="12" 
          text-anchor="end"
        >
          $${Math.round(value).toLocaleString()}
        </text>
      `;
    }
    
    // X-axis labels
    const xStep = chartWidth / (data.length - 1);
    data.forEach((d, i) => {
      const x = i * xStep;
      
      svg += `
        <text 
          x="${x}" 
          y="${chartHeight + 20}" 
          fill="rgba(255, 255, 255, 0.5)" 
          font-size="12" 
          text-anchor="middle"
        >
          ${d.month.split(' ')[0]}
        </text>
      `;
    });
    
    // Receitas line
    let receitasPath = `M`;
    data.forEach((d, i) => {
      const x = i * xStep;
      const y = chartHeight - (d.receitas / maxValue) * chartHeight;
      
      receitasPath += `${i === 0 ? '' : ' '}${x},${y}`;
    });
    
    svg += `
      <path 
        d="${receitasPath}" 
        fill="none" 
        stroke="#00E676" 
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    `;
    
    // Despesas line
    let despesasPath = `M`;
    data.forEach((d, i) => {
      const x = i * xStep;
      const y = chartHeight - (d.despesas / maxValue) * chartHeight;
      
      despesasPath += `${i === 0 ? '' : ' '}${x},${y}`;
    });
    
    svg += `
      <path 
        d="${despesasPath}" 
        fill="none" 
        stroke="#FF5252" 
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    `;
    
    // Data points for receitas
    data.forEach((d, i) => {
      const x = i * xStep;
      const y = chartHeight - (d.receitas / maxValue) * chartHeight;
      
      svg += `
        <circle 
          cx="${x}" 
          cy="${y}" 
          r="4" 
          fill="#00E676" 
          stroke="#1E1E1E" 
          stroke-width="2"
        />
      `;
    });
    
    // Data points for despesas
    data.forEach((d, i) => {
      const x = i * xStep;
      const y = chartHeight - (d.despesas / maxValue) * chartHeight;
      
      svg += `
        <circle 
          cx="${x}" 
          cy="${y}" 
          r="4" 
          fill="#FF5252" 
          stroke="#1E1E1E" 
          stroke-width="2"
        />
      `;
    });
    
    // Legend
    svg += `
      <g transform="translate(${chartWidth - 150}, 0)">
        <rect width="150" height="40" rx="4" fill="rgba(0, 0, 0, 0.3)" />
        
        <line x1="10" y1="15" x2="30" y2="15" stroke="#00E676" stroke-width="3" />
        <circle cx="20" cy="15" r="3" fill="#00E676" />
        <text x="40" y="20" fill="white" font-size="12">Receitas</text>
        
        <line x1="10" y1="35" x2="30" y2="35" stroke="#FF5252" stroke-width="3" />
        <circle cx="20" cy="35" r="3" fill="#FF5252" />
        <text x="40" y="40" fill="white" font-size="12">Despesas</text>
      </g>
    `;
    
    svg += `
        </g>
      </svg>
    `;
    
    chartRef.current.innerHTML = svg;
  }, [data]);

  return (
    <div 
      ref={chartRef} 
      className="w-full h-[300px] overflow-visible"
    ></div>
  );
};

export default LineChart;