"use client"

import { Home, ImageIcon, Zap, History, Compass } from "lucide-react"

export default function Page() {
  return (
    <div className="min-h-screen bg-[url('/images/background.png')] bg-cover bg-center flex items-center justify-center p-4 font-['Inter']">
      <div className="w-full max-w-[420px] bg-[#121212] rounded-[18px] overflow-hidden flex flex-col min-h-[680px]">
        {/* Main Content Area */}
        <div className="flex-1 p-5">
          {/* Header Area */}
          <div className="h-[60px]">{/* Your header content will go here */}</div>

          {/* Balance Area */}
          <div className="h-[120px]">{/* Your balance content will go here */}</div>

          {/* Action Buttons Area */}
          <div className="h-[100px]">{/* Your action buttons will go here */}</div>

          {/* Warning Cards Area */}
          <div className="space-y-3">
            <div className="h-[56px] bg-[#1A1A1A] rounded-xl">{/* First warning card content */}</div>
            <div className="h-[56px] bg-[#1A1A1A] rounded-xl">{/* Second warning card content */}</div>
          </div>

          {/* Assets Area */}
          <div className="mt-6">
            <div className="h-[200px]">{/* Your assets content will go here */}</div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="bg-[#1A1A1A] h-[72px] flex justify-around items-center border-t border-[#232323]">
          <button className="flex flex-col items-center justify-center gap-1">
            <Home className="w-5 h-5 text-white/60" />
            <span className="text-[10px] text-white/60">Home</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1">
            <ImageIcon className="w-5 h-5 text-white/60" />
            <span className="text-[10px] text-white/60">NFT</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1">
            <Zap className="w-5 h-5 text-white/60" />
            <span className="text-[10px] text-white/60">$MOON</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1">
            <History className="w-5 h-5 text-white/60" />
            <span className="text-[10px] text-white/60">History</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1">
            <Compass className="w-5 h-5 text-white/60" />
            <span className="text-[10px] text-white/60">Explore</span>
          </button>
        </div>
      </div>
    </div>
  )
}

