export default function ProgressCircle({ percentage = 40 }) {
    const circumference = 2 * Math.PI * 45 // radius is 45
    const strokeDashoffset = circumference - (percentage / 100) * circumference
  
    return (
      <div className="relative inline-flex items-center justify-center">
        <svg className="transform -rotate-90 w-24 h-24">
          <circle
            className="text-zinc-800"
            strokeWidth="4"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="48"
            cy="48"
          />
          <circle
            className="text-emerald-500"
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="48"
            cy="48"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-medium text-emerald-500">{percentage}%</span>
          <span className="text-xs text-zinc-400">complete</span>
        </div>
      </div>
    )
  }
  
  