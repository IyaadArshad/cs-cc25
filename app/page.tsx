"use client"

import { useState } from "react"
import {
  Home,
  ImageIcon,
  Zap,
  Settings,
  Compass,
  ChevronLeft,
  ChevronRight,
  Rocket,
  Shield,
  MoreHorizontal,
  Trash2,
  HomeIcon,
  MessageSquare,
} from "lucide-react"
import { HomeFilled, ImageFilled, ZapFilled, SettingsFilled, CompassFilled, EditProfile, ConnectedIcon } from "./filled-icons"

type Tab = "home" | "nft" | "moon" | "explore" | "settings";

const backgrounds = [
  'https://images.pexels.com/photos/1473673/pexels-photo-1473673.jpeg',
  'https://images.pexels.com/photos/442579/pexels-photo-442579.jpeg'
]

type WeatherCondition = "sunny" | "cloudy" | "rainy";

interface WeatherPillProps {
  temperature: number;
  condition: WeatherCondition;
}

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  plainIcon?: boolean;
}

function SettingsItem({ icon, title, description, plainIcon }: SettingsItemProps) {
  return (
    <div className="flex items-center justify-between py-4 cursor-pointer group hover:bg-[#1e1e2e45] transition-colors">
      <div className="flex items-center gap-4">
        { plainIcon ? (
          // Render icon directly without wrapper styling
          <div>{icon}</div>
        ) : (
          // ...existing wrapper...
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#272739] text-white">
            {icon}
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-white text-base font-semibold">{title}</span>
          <span className="text-gray-400 text-sm">{description}</span>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
    </div>
  );
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
    <div className="flex items-center bg-[#272739] rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.5)] px-4 py-2 space-x-2">
      <div className="text-yellow-400 drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">{Icon}</div>
      <span className="text-sm font-semibold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{temperature}°</span>
      <span className="text-xs font-medium text-gray-200 capitalize drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{condition}</span>
    </div>
  );
}

export default function Page() {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  // Generate a random background URL
  const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];

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
      case "explore":
        return (
          <div className="flex-1 p-5">
            <h2 className="text-white text-2xl">Explore</h2>
          </div>
        );
      case "settings":
        return (
          <div className="flex-1 p-5 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-7 ">
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#272739]">
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <h1 className="text-xl font-semibold text-center text-white">Settings</h1>
            </div>

            {/* Profile Section */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-[#2563eb] flex items-center justify-center">
                <img src="/images/default_pfp.png" alt="Profile" style={{ borderRadius: "9999px", width: "auto", height: "64px"}} className="text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-white mb-2 font-bold text-xl">The Donors Foundation</h2>
                <p className="text-gray-400 text-sm">Crypto, for good. $DONOR allows people to donate more with...</p>
              </div>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#272739]">
                <EditProfile className="" />
              </button>
            </div>

            {/* Wallet Settings Section */}
            <div className="mb-8">  
              <div className="space-y-2">
              <SettingsItem 
                plainIcon
                icon={<ConnectedIcon className="w-7 h-7 text-white" />}
                title="Connected Apps"
                description="Manage connected apps"
              />
              <SettingsItem
                plainIcon
                icon={<Shield className="w-7 h-7 text-white" />}
                title="Security and Recovery"
                description="Manage your passwords and recovery methods"
              />
              <SettingsItem
                plainIcon
                icon={<MoreHorizontal className="w-7 h-7 text-white" />}
                title="Change Password" 
                description="Change the password used to unlock your app"
              />
              <SettingsItem
                plainIcon
                icon={<Trash2 className="w-7 h-7 text-white" />}
                title="Remove Account"
                description="Remove this account from your app"
              />
              </div>
            </div>

            {/* App Settings Section */}
            <div>
              <div className="space-y-2">
                <SettingsItem
                  icon={<HomeIcon className="w-5 h-5" />}
                  title="Dubai Community"
                  description="Come and join us"
                />
                <SettingsItem
                  icon={<MessageSquare className="w-5 h-5" />}
                  title="Report Issues or Give Feedback"
                  description="Let us know what we can improve on"
                />
              </div>
            </div>
          </div>
        )
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${randomBackground})` }}
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4 font-['Segoe_UI']"
    >
      <div className="w-[490px] max-w-lg h-[780px] bg-gradient-to-b from-[#12121d]/80 to-[#12121d]/95 backdrop-blur-xl main-card rounded-[18px] overflow-hidden flex flex-col">
        {/* Main Content Area */}
        {getTabContent(activeTab)}

        {/* Bottom Navigation */}
        <div className="bg-[#090910] min-h-[96px] flex justify-around items-center border-t border-[#232323] p-4 relative">
          {/* Active tab indicator */}
          <div
            className="absolute top-0 left-0 w-1/5 h-1 bg-[#2563eb] transition-all duration-300 ease-in-out"
            style={{
              transform: `translateX(${
                ["home", "nft", "moon", "explore", "settings"].indexOf(
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
          <button
            onClick={() => setActiveTab("settings")}
            className="flex flex-col items-center justify-center gap-1 mx-7"
          >
            {activeTab === "settings" ? (
              <SettingsFilled className="w-8 h-8 text-[#2563eb]" />
            ) : (
              <Settings className="w-8 h-8 text-[#ffffff]" />
            )}
            <span
              className={`text-[12px] ${
                activeTab === "settings" ? "text-[#2563eb]" : "text-[#ffffff]"
              }`}
            >
              Settings
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}