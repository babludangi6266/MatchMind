import React from 'react';

interface CircularScoreRingProps {
  score: number; // 0 to 100
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const CircularScoreRing: React.FC<CircularScoreRingProps> = ({
  score,
  size = 'md',
  showLabel = true,
}) => {
  const dimensions = size === 'sm' ? 44 : size === 'lg' ? 84 : 64;
  const strokeWidth = size === 'sm' ? 4 : size === 'lg' ? 7 : 5;
  const radius = (dimensions - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const normalizedScore = Math.min(100, Math.max(0, score));
  const offset = circumference - (normalizedScore / 100) * circumference;

  let strokeColor = '#0D9488'; // Teal Green >= 80%
  let badgeText = 'Excellent Match';
  let badgeBg = 'bg-teal-50 text-teal-700 border-teal-200';

  if (score < 60) {
    strokeColor = '#D97706'; // Amber < 60%
    badgeText = 'Fair Match';
    badgeBg = 'bg-amber-50 text-amber-700 border-amber-200';
  } else if (score < 80) {
    strokeColor = '#4F46E5'; // Indigo 60-79%
    badgeText = 'Good Match';
    badgeBg = 'bg-indigo-50 text-indigo-700 border-indigo-200';
  }

  return (
    <div className="flex items-center gap-3">
      <div className="relative inline-flex items-center justify-center" style={{ width: dimensions, height: dimensions }}>
        <svg className="transform -rotate-90" width={dimensions} height={dimensions}>
          {/* Track Circle */}
          <circle
            cx={dimensions / 2}
            cy={dimensions / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-slate-100 dark:text-slate-800"
          />
          {/* Progress Ring */}
          <circle
            cx={dimensions / 2}
            cy={dimensions / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <span className={`absolute font-display font-bold text-slate-900 dark:text-white ${size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-xl' : 'text-sm'}`}>
          {Math.round(score)}%
        </span>
      </div>

      {showLabel && (
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Vector Similarity</span>
          <span className={`inline-flex items-center px-2.5 py-0.5 mt-0.5 text-xs font-semibold rounded-full border ${badgeBg}`}>
            {badgeText}
          </span>
        </div>
      )}
    </div>
  );
};
