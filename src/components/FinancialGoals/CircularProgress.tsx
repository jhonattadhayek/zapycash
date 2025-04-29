import React from 'react';

interface CircularProgressProps {
  percentage: number;
  color: string;
  size: number;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  color,
  size
}) => {
  const strokeWidth = size * 0.1;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const dash = (percentage * circumference) / 100;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Círculo de fundo */}
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        <circle
          className="text-background"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={`text-${color} transition-all duration-300`}
          strokeWidth={strokeWidth}
          strokeDasharray={`${dash} ${circumference}`}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      
      {/* Texto do percentual */}
      <div 
        className="absolute inset-0 flex items-center justify-center text-sm font-medium"
        style={{ fontSize: size * 0.2 }}
      >
        {Math.round(percentage)}%
      </div>
    </div>
  );
}; 