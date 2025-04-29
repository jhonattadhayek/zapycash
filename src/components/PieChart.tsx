import React, { useEffect, useRef } from 'react';
import { CategoryTotal } from '../types';

interface PieChartProps {
  data: CategoryTotal[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current || data.length === 0) return;
    
    const size = 200;
    const radius = size / 2;
    const centerX = radius;
    const centerY = radius;
    
    let startAngle = 0;
    let svg = `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(${centerX}, ${centerY})">
    `;
    
    // Create pie slices
    data.forEach((item) => {
      const angle = (item.percentage / 100) * 360;
      const endAngle = startAngle + angle;
      
      // Convert angles to radians
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;
      
      // Calculate path coordinates
      const x1 = Math.sin(startRad) * radius;
      const y1 = -Math.cos(startRad) * radius;
      const x2 = Math.sin(endRad) * radius;
      const y2 = -Math.cos(endRad) * radius;
      
      // Determine large arc flag
      const largeArcFlag = angle > 180 ? 1 : 0;
      
      // Create path element
      const path = `
        <path
          d="M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z"
          fill="${item.color}"
          stroke="#1E1E1E"
          stroke-width="1"
        />
      `;
      
      svg += path;
      startAngle = endAngle;
    });
    
    // Add inner circle for donut effect
    svg += `
      <circle cx="0" cy="0" r="${radius * 0.6}" fill="#1E1E1E" />
    `;
    
    svg += `
        </g>
      </svg>
    `;
    
    chartRef.current.innerHTML = svg;
  }, [data]);

  return (
    <div className="flex flex-col items-center">
      <div 
        ref={chartRef} 
        className="w-[200px] h-[200px] mx-auto my-4"
      ></div>
      
      <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            ></div>
            <div className="flex items-center justify-between w-full">
              <span className="text-xs text-text-secondary">{item.category}</span>
              <span className="text-xs font-medium">{item.percentage.toFixed(0)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;