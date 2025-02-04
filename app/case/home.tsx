import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronDown } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"

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

  const furtherSteps = [
    {
      title: "Apply for a Driving License",
      description: "Start your journey to drive in Dubai with an official UAE driving license",
    },
    {
      title: "Register for Healthcare",
      description: "Get access to Dubai's world-class healthcare system",
    },
    {
      title: "Set up Internet & TV",
      description: "Connect your home with high-speed internet and entertainment",
    },
    {
      title: "Join Local Communities",
      description: "Connect with other expats and locals in your area",
    },
  ]

  const cardData = [
    {
      title: "Get an Emirates ID",
      content:
        "An Emirates ID grants residents of the UAE a proof of identification and is required for most things in dubai ",
    },
    {
      title: "Open a new bank account",
      content:
        "You will need a UAE bank account for essential daily transactions, Some banks offer free international transfers for the first few months!",
    },
    {
      title: "Set up a mobile SIM card",
      content: "A UAE SIM card is essential for local calls, mobile payments, and OTP verifications",
    },
  ]

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
        <div className="flex flex-col items-center justify-center space-y-6 mt-20">
          <div className="w-full max-w-xl mt-6 space-y-4">
            {furtherSteps.map((step, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-zinc-900/50">
                <div className="flex flex-col">
                  <h3 className="text-lg font-medium text-zinc-200">{step.title}</h3>
                  <p className="text-sm text-zinc-400">{step.description}</p>
                </div>
                <button className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white">
                  Go
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
        <h1 className="text-4xl text-white text-center mb-3">Welcome back, TESTNAME</h1>
        <ProgressCircle />
        <div className="w-full max-w-xl">
          <div onClick={() => setOverviewMode(true)} className="cursor-pointer">
            <div className="flex items-center justify-between hover:bg-gray-700/50 transition-colors p-4">
              <div className="flex items-center gap-2">
                <span className="text-lg text-zinc-200">Want to take things further?</span>
              </div>
              <p className="h-5 w-5 text-white transition-transform duration-200 ease-in-out">{/* icon placeholder */}</p>
            </div>
          </div>
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
    </div>
  )
}