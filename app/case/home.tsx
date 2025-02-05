import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { cardData, furtherSteps } from "./homeData"

function ProgressBar({ percentage = 40 }) {
  return (
    <div className="flex items-center">
      <div className="w-24 bg-gray-700 rounded-full h-2">
        <div
          className="bg-[#2563eb] h-2 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <span className="ml-2 text-white text-sm">{percentage}%</span>
    </div>
  )
}

function ProgressCircle({ percentage = 40, hideText = false }) {
  const radius = 90
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference
  return (
    <div className="relative bg-[#27272a] rounded-full inline-flex items-center justify-center">
      <svg
        viewBox="-10 -10 200 200"
        className={`transform -rotate-90 ${hideText ? "w-20 h-20" : "w-44 h-44"}`}
      >
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
      {!hideText && (
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-extralight text-[#2563eb]">{percentage}%</span>
          <span className="text-base font-extralight text-zinc-400">complete</span>
        </div>
      )}
    </div>
  )
}

export default function CaseHome() {
  const [overviewMode, setOverviewMode] = useState(false)
  const [userName, setUserName] = useState("")

useEffect(() => {
  const name = Cookies.get("name")
  if (name) {
    setUserName(name)
  }
}, [])

  if (overviewMode) {
    return (
      <div className="relative flex-1 p-6 overflow-y-auto">
        <div 
          onClick={() => setOverviewMode(false)} 
          className="absolute top-6 left-6 cursor-pointer flex items-center gap-4 hover:text-gray-300"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
          <span className="text-white">Back</span>
        </div>
        <div className="absolute top-6 right-6">
          <ProgressBar percentage={40} />
        </div>
        <div className="flex flex-col items-center justify-center space-y-6 mt-6">
          <div className="w-full max-w-xl mt-6 space-y-4">
            {furtherSteps.map((step, index) => (
              <div
                key={index}
                className="group flex items-center justify-between p-4 rounded-lg bg-zinc-900/50 hover:bg-zinc-800 transition-colors"
              >
                <div className="flex flex-col">
                  <h3 className="text-lg font-medium text-zinc-200">{step.title}</h3>
                  <p className="text-sm text-zinc-400">{step.description}</p>
                </div>
                <button className="p-2 rounded text-white"> {/*bg-white/10 group-hover:bg-white/20 */}
                  <ArrowRight className="w-5 h-5 transform transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="flex flex-col items-center justify-center space-y-6 mt-8">

        <h1 className="text-4xl text-white text-center mb-3">Welcome back, {userName}</h1>
        {/* Wrap ProgressCircle with clickable area with hover and wiggle animation */}
        <div 
          onClick={() => setOverviewMode(true)} 
          className="cursor-pointer transform transition-transform hover:scale-105 animate-wiggle"
        >
          <ProgressCircle />
        </div>
        <div className="w-full max-w-xl">
          {/* ...existing code... */}
        </div>
        <Carousel className="w-full max-w-sm mt-4">
          <CarouselContent className="-ml-2">
            {cardData.map((item, index) => (
              <CarouselItem key={index} className="pl-2 basis-3/4 sm:basis-2/3">
                <Card className="bg-zinc-800/50 border-zinc-700">
                  <CardContent className="flex flex-col items-start justify-center p-4 h-48">
                    <h2 className="text-xl font-normal text-zinc-200 mb-2">{item.title}</h2>
                    <p className="text-sm text-zinc-400 leading-relaxed">{item.content}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      {/* Add custom keyframes for wiggle animation */}
      <style jsx global>{`
        @keyframes wiggle {
          0%, 80%, 100% { transform: rotate(0deg); }
          10% { transform: rotate(-3deg); }
          20% { transform: rotate(3deg); }
          30% { transform: rotate(-3deg); }
          40% { transform: rotate(3deg); }
        }
        .animate-wiggle {
          animation: wiggle 1s ease-in-out;
          animation-delay: 14s;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  )
}