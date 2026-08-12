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

  // Determine color scheme based on match score
  let strokeColor = '#10B981'; // Emerald >= 80%
  let badgeText = 'Excellent';
  let badgeBg = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';

  if (score < 60) {
    strokeColor = '#F59E0B'; // Amber < 60%
    badgeText = 'Fair';
    badgeBg = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
  } else if (score < 80) {
    strokeColor = '#4F46E5'; // Indigo 60-79%
    badgeText = 'Good';
    badgeBg = 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
  }

  return (
    <div className="flex items-center gap-3">
      <div className="relative inline-flex items-center justify-center" style={{ width: dimensions, height: dimensions }}>
        <svg className="transform -rotate-90" width={dimensions} height={dimensions}>
          {/* Background Ring */}
          <circle
            cx={dimensions / 2}
            cy={dimensions / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-slate-800"
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
        <span className={`absolute font-display font-bold text-slate-100 ${size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-xl' : 'text-sm'}`}>
          {Math.round(score)}%
        </span>
      </div>

      {showLabel && (
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Match Score</span>
          <span className={`inline-flex items-center px-2 py-0.5 mt-0.5 text-xs font-medium rounded-full border ${badgeBg}`}>
            {badgeText} Vector Match
          </span>
        </div>
      )}
    </div>
  );
};
