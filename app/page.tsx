"use client";

import { useState } from "react";
import { Home, ImageIcon, Zap, History, Compass } from "lucide-react";
import {
  HomeFilled,
  ImageFilled,
  ZapFilled,
  HistoryFilled,
  CompassFilled,
} from "./filled-icons";

type Tab = "home" | "nft" | "moon" | "history" | "explore";

type WeatherCondition = "sunny" | "cloudy" | "rainy";

interface WeatherPillProps {
  temperature: number;
  condition: WeatherCondition;
}

const weatherIcons = {
  sunny: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="5" fill="currentColor" />
      <path
        d="M12 2V4M12 20V22M4 12H2M22 12H20M19.78 4.22L17.66 6.34M6.34 17.66L4.22 19.78M19.78 19.78L17.66 17.66M6.34 6.34L4.22 4.22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  cloudy: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5 19H9C6.79086 19 5 17.2091 5 15C5 12.7909 6.79086 11 9 11C9.12366 11 9.24601 11.0067 9.36706 11.0198C10.0952 9.23499 11.8913 8 14 8C16.7614 8 19 10.2386 19 13C19 13.7286 18.8407 14.4117 18.5579 15.0183C19.3871 15.5424 20 16.4111 20 17.5C20 18.3284 19.3284 19 18.5 19H17.5Z"
        fill="currentColor"
      />
    </svg>
  ),
  rainy: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 18V20M12 18V22M8 18V20M17.5 12H9C6.79086 12 5 10.2091 5 8C5 5.79086 6.79086 4 9 4C9.12366 4 9.24601 4.00674 9.36706 4.01981C10.0952 2.23499 11.8913 1 14 1C16.7614 1 19 3.23858 19 6C19 6.72862 18.8407 7.41169 18.5579 8.0183C19.3871 8.54237 20 9.41111 20 10.5C20 11.3284 19.3284 12 18.5 12H17.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

function WeatherPill({ temperature, condition }: WeatherPillProps) {
  const Icon = weatherIcons[condition];

  return (
    <div className="flex items-center bg-gradient-to-r from-gray-800 to-gray-900 rounded-full shadow-lg px-4 py-2 space-x-2">
      <div className="text-yellow-400">{Icon}</div>
      <span className="text-sm font-semibold text-white">{temperature}°</span>
      <span className="text-xs text-gray-300 capitalize">{condition}</span>
    </div>
  );
}

export default function Page() {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  const getTabContent = (tab: Tab) => {
    switch (tab) {
      case "home":
        return (
          <div className="flex-1 p-6">
            <div className="flex flex-col items-center justify-center space-y-6 mt-16">
              {/* Welcome Section */}
              <h1 className="text-4xl text-white text-center">
                Welcome back, Ahmed
              </h1>

              {/* Weather Pill */}
              <WeatherPill temperature={22} condition="sunny" />
            </div>
          </div>
        );
      case "nft":
        return (
          <div className="flex-1 p-5">
            <h2 className="text-white text-2xl">NFT Gallery</h2>
          </div>
        );
      case "moon":
        return (
          <div className="flex-1 p-5">
            <h2 className="text-white text-2xl">$MOON Trading</h2>
          </div>
        );
      case "history":
        return (
          <div className="flex-1 p-5">
            <h2 className="text-white text-2xl">Transaction History</h2>
          </div>
        );
      case "explore":
        return (
          <div className="flex-1 p-5">
            <h2 className="text-white text-2xl">Explore</h2>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gOA9GTBU3ZgUUbsxU1ifxPbK3L8fPT.png')] bg-cover bg-center flex items-center justify-center p-4 font-['Segoe_UI']">
      <div className="w-[490px] max-w-lg h-[780px] bg-[#12121d] main-card rounded-[18px] overflow-hidden flex flex-col">
        {/* Main Content Area */}
        {getTabContent(activeTab)}

        {/* Bottom Navigation */}
        <div className="bg-[#090910] min-h-[96px] flex justify-around items-center border-t border-[#232323] p-4 relative">
          {/* Active tab indicator */}
          <div
            className="absolute top-0 left-0 w-1/5 h-1 bg-[#2563eb] transition-all duration-300 ease-in-out"
            style={{
              transform: `translateX(${
                ["home", "nft", "moon", "history", "explore"].indexOf(
                  activeTab
                ) * 100
              }%)`,
            }}
          ></div>

          <button
            onClick={() => setActiveTab("home")}
            className="flex flex-col items-center justify-center gap-1 mx-7"
          >
            {activeTab === "home" ? (
              <HomeFilled className="w-8 h-8 text-[#2563eb]" />
            ) : (
              <Home className="w-8 h-8 text-[#ffffff]" />
            )}
            <span
              className={`text-[12px] ${
                activeTab === "home" ? "text-[#2563eb]" : "text-[#ffffff]"
              }`}
            >
              Home
            </span>
          </button>
          <button
            onClick={() => setActiveTab("nft")}
            className="flex flex-col items-center justify-center gap-1 mx-7"
          >
            {activeTab === "nft" ? (
              <ImageFilled className="w-8 h-8 text-[#2563eb]" />
            ) : (
              <ImageIcon className="w-8 h-8 text-[#ffffff]" />
            )}
            <span
              className={`text-[12px] ${
                activeTab === "nft" ? "text-[#2563eb]" : "text-[#ffffff]"
              }`}
            >
              NFT
            </span>
          </button>
          <button
            onClick={() => setActiveTab("moon")}
            className="flex flex-col items-center justify-center gap-1 mx-7"
          >
            {activeTab === "moon" ? (
              <ZapFilled className="w-8 h-8 text-[#2563eb]" />
            ) : (
              <Zap className="w-8 h-8 text-[#ffffff]" />
            )}
            <span
              className={`text-[12px] ${
                activeTab === "moon" ? "text-[#2563eb]" : "text-[#ffffff]"
              }`}
            >
              $MOON
            </span>
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className="flex flex-col items-center justify-center gap-1 mx-7"
          >
            {activeTab === "history" ? (
              <HistoryFilled className="w-8 h-8 text-[#2563eb]" />
            ) : (
              <History className="w-8 h-8 text-[#ffffff]" />
            )}
            <span
              className={`text-[12px] ${
                activeTab === "history" ? "text-[#2563eb]" : "text-[#ffffff]"
              }`}
            >
              History
            </span>
          </button>
          <button
            onClick={() => setActiveTab("explore")}
            className="flex flex-col items-center justify-center gap-1 mx-7"
          >
            {activeTab === "explore" ? (
              <CompassFilled className="w-8 h-8 text-[#2563eb]" />
            ) : (
              <Compass className="w-8 h-8 text-[#ffffff]" />
            )}
            <span
              className={`text-[12px] ${
                activeTab === "explore" ? "text-[#2563eb]" : "text-[#ffffff]"
              }`}
            >
              Explore
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}