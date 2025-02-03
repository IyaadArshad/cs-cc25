"use client"

import { Home, ImageIcon, Zap, History, Compass } from "lucide-react"

export default function Page() {
  return (
    <div className="min-h-screen bg-[url('/images/background.png')] bg-cover bg-center flex items-center justify-center p-4 font-['Inter']">
      <div className="w-[490px] max-w-lg h-[780px] bg-[#12121d] main-card rounded-[18px] overflow-hidden flex flex-col ">
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
        <div className="bg-[#090910] min-h-[96px] flex justify-around items-center border-t border-[#232323] p-4">
          <button className="flex flex-col items-center justify-center gap-1 mx-7">
            <Home className="w-8 h-8 text-[#ffffff]" />
            <span className="text-[12px] text-[#ffffff]">Home</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1 mx-7">
            <ImageIcon className="w-8 h-8 text-[#ffffff]" />
            <span className="text-[12px] text-[#ffffff]">NFT</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1 mx-7">
            <Zap className="w-8 h-8 text-[#ffffff]" />
            <span className="text-[12px] text-[#ffffff]">$MOON</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1 mx-7">
            <History className="w-8 h-8 text-[#ffffff]" />
            <span className="text-[12px] text-[#ffffff]">History</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1 mx-7">
            <Compass className="w-8 h-8 text-[#ffffff]" />
            <span className="text-[12px] text-[#ffffff]">Explore</span>
          </button>
        </div>
      </div>
    </div>
  )
}

