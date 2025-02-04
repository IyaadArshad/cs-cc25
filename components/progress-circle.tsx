export default function ProgressCircle({ percentage = 40 }) {
  const radius = 90; // Reduced by 10%
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="relative bg-[#27272a] rounded-full inline-flex items-center justify-center">
    <svg viewBox="-10 -10 200 200" className="transform -rotate-90 w-44 h-44">
      <circle
      className="text-zinc-800"
      strokeWidth="12"
      stroke="currentColor"
      fill="transparent"
      r={radius}
      cx="90"
      cy="90"
      />
      <circle
      className="text-[#2563eb]"
      strokeWidth="12"
      strokeDasharray={circumference}
      strokeDashoffset={strokeDashoffset}
      strokeLinecap="butt"
      stroke="currentColor"
      fill="transparent"
      r={radius}
      cx="90"
      cy="90"
      />
    </svg>
    <div className="absolute flex flex-col items-center justify-center text-center">
      <span className="text-4xl font-extralight text-[#2563eb]">{percentage}%</span>
      <span className="text-base font-extralight text-zinc-400">complete</span>
    </div>
    </div>
  )
  }
