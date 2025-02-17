"use client";

import { useState, useEffect } from "react";
import type React from "react";
import { countries } from "./countries";
import { Tab } from "../types/types";
import SettingsItem from "@/components/SettingsItem";
import { backgrounds } from "../variables/backgrounds";
import {
  HomeIcon as HomeIconFilled,
  MagnifyingGlassIcon as MagnifyingGlassFilled,
  Squares2X2Icon as Squares2X2Filled,
  UserCircleIcon as UserCircleFilled,
  ChevronLeftIcon as ChevronLeftFilled,
  ExclamationCircleIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon as ChatBubbleLeftRightFilled,
} from "@heroicons/react/24/solid";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  Squares2X2Icon,
  UserCircleIcon,
  ShieldCheckIcon,
  TrashIcon,
  LockClosedIcon,
  LinkIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { Check } from "lucide-react";
import CaseHome from "./case/home";
import CaseDiscover from "./case/discover";
import CaseApps from "./case/apps";

export default function Page() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [phase, setPhase] = useState<"name" | "bio" | "origin" | "final">("name");
  const [origin, setOrigin] = useState("");
  const [countrySearch, setCountrySearch] = useState("");
  const [hasUserCookie, setHasUserCookie] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const lookingForOptions = [
    "Find Job & Employment Opportunities",
    "Explore Local Transportation Options",
    "Manage Utilities Services"
  ];
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  useEffect(() => {
    const nameCookie = document.cookie
      .split(";")
      .find((c) => c.trim().startsWith("name="));
    if (nameCookie) {
      const name = nameCookie.split("=")[1];
      setUserName(name);
      setHasUserCookie(true);
    }
    setIsLoading(false);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phase === "name") {
      if (userName.trim()) {
        document.cookie = `name=${userName};path=/;max-age=${60 * 60 * 24 * 7}`;
        setPhase("bio");
      }
    } else if (phase === "bio") {
      const selectedOptions = inputValue.split(",").map(x => x.trim()).filter(Boolean);
      if (selectedOptions.length > 0) {
        document.cookie = `lookingFor=${JSON.stringify(selectedOptions)};path=/;max-age=${60 * 60 * 24 * 7}`;
        setPhase("origin");
      }
    } else if (phase === "origin") {
      if (origin.trim()) {
        document.cookie = `country=${origin};path=/;max-age=${60 * 60 * 24 * 7}`;
        setPhase("final");
      }
    }
  };

  // Generate a random background URL
  const randomBackground =
    backgrounds[Math.floor(Math.random() * backgrounds.length)];

  const addOption = (option: string) => {
    let parts = inputValue.split(",").map(p => p.trim());
    // Remove the current (possibly incomplete) fragment.
    parts.pop();
    // Append the new option.
    parts.push(option);
    // Reassemble the input with a trailing comma and space.
    setInputValue(parts.join(", ") + ", ");
    setHighlightedIndex(0);
  };

  const getTabContent = (tab: Tab) => {
    switch (tab) {
      case "home":
        return (
          <CaseHome />
        );
      case "discover":
        return (
          <CaseDiscover />
        );
      case "chat":
        return (
          <div className="flex-1 p-5">
            <h2 className="text-white text-2xl">$tips Trading</h2>
          </div>
        );
      case "apps":
        return (
          <CaseApps />
        );
      case "profile":
        return (
          <div className="flex-1 p-5 overflow-y-auto">
            {/* Updated Header */}
            <div className="relative mb-7">
              <button className="absolute left-0 w-8 h-8 flex items-center justify-center rounded-full bg-[#272739]">
                <ChevronLeftFilled className="w-5 h-5 text-white" />
              </button>
              <h1 className="text-xl font-semibold text-white text-center">
                Settings
              </h1>
            </div>

            {/* Profile Section */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-[#2563eb] flex items-center justify-center">
                <img
                  src="/images/default_pfp.png"
                  alt="Profile"
                  style={{
                    borderRadius: "9999px",
                    width: "auto",
                    height: "64px",
                  }}
                  className="text-white"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-white mb-2 font-bold text-xl">
                  The Donors Foundation
                </h2>
                <p className="text-gray-400 text-sm">
                  Crypto, for good. $DONOR allows people to donate more with...
                </p>
              </div>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#272739]">
              </button>
            </div>

            {/* Wallet Settings Section */}
            <div className="mb-8">
              <div className="space-y-2">
                <SettingsItem
                  plainIcon
                  icon={<LinkIcon className="w-7 h-7 text-white" />}
                  title="Connected Apps"
                  description="Manage connected apps"
                />
                <SettingsItem
                  plainIcon
                  icon={<ShieldCheckIcon className="w-7 h-7 text-white" />}
                  title="Security and Recovery"
                  description="Manage your passwords and recovery methods"
                />
                <SettingsItem
                  plainIcon
                  icon={<LockClosedIcon className="w-7 h-7 text-white" />}
                  title="Change Password"
                  description="Change the password used to unlock your app"
                />
                <SettingsItem
                  plainIcon
                  icon={<TrashIcon className="w-7 h-7 text-white" />}
                  title="Remove Account"
                  description="Remove this account from your app"
                />
              </div>
            </div>

            {/* App Settings Section */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Other</h3>
              <div className="space-y-2">
                <SettingsItem
                  plainIcon
                  icon={<UserGroupIcon className="w-7 h-7 text-white" />}
                  title="Dubai Community"
                  description="Come and join us"
                />
                <SettingsItem
                  plainIcon
                  icon={
                    <ExclamationCircleIcon className="w-7 h-7 text-white" />
                  }
                  title="Report Issues or Give Feedback"
                  description="Let us know what we can improve on"
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return null;
  }

  if (!hasUserCookie) {
    return (
      <div
        style={{ backgroundImage: `url(${randomBackground})` }}
        className="min-h-screen bg-cover bg-center flex items-center justify-center p-4 font-['Segoe_UI'] sm:p-4"
      >
        <div className="w-full h-screen sm:w-[490px] sm:max-w-lg sm:h-[780px] bg-gradient-to-b from-[#12121d]/80 to-[#12121d]/95 backdrop-blur-xl main-card fixed sm:relative sm:rounded-[18px] overflow-hidden flex flex-col">

          {/* Content */}
          <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6">
            {phase === "name" || phase === "bio" ? (
                <div className="relative w-auto min-w-[20rem] h-auto min-h-[12rem] mb-0 flex justify-center items-center">
                <img
                  src="/landing_new.png"
                  alt="Welcome"
                  className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-500 ${phase === "name" ? "opacity-100" : "opacity-0"}`}
                />
                <img
                  src="/images/default_pfp.png"
                  alt="Profile"
                  className={`w-40 h-40 absolute object-cover transition-opacity duration-500 rounded-full transform ${phase === "bio" ? "opacity-100 scale-110" : "opacity-0 scale-90"}`}
                />
                </div>
            ) : phase === "origin" ? (
              <div className="relative w-24 h-24">
                <img
                  src="/images/default_pfp.png"
                  alt="Profile"
                  className="object-cover w-full h-full rounded-full transition-all duration-500"
                />
              </div>
            ) : null}
            {phase !== "final" && (
              <>
                <h1 className="text-4xl font-bold text-white text-center">
                  {phase === "name" ? "Welcome to the Emirates" : userName}
                </h1>
                {phase !== "origin" && phase !== "bio" && (
                  <p className="text-gray-400 text-lg mb-4 text-center">
                    {phase === "name" && "Let's start by getting to know you"}
                  </p>
                )}
                {phase === "origin" && (
                  <div className="w-full">
                    <p className="text-gray-400 text-lg text-center mb-1">
                      Where are you coming from?
                    </p>
                  </div>
                )}
              </>
            )}
            <form onSubmit={handleFormSubmit} className="w-full max-w-sm space-y-6">
              <div className="space-y-2">
                {phase === "name" ? (
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-[#272739] rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                    required
                  />
                ) : phase === "bio" ? (
                  <div className="w-full">
                    <p className="text-gray-400 text-lg mb-4 text-center">
                      What are you looking for?
                    </p>
                    <div className="space-y-3">
                      {lookingForOptions.map((option) => (
                        <label 
                          key={option} 
                          className="flex items-center gap-4 bg-[#272739] p-4 rounded-lg cursor-pointer hover:bg-[#272739]/80 transition-all duration-200 group relative"
                        >
                          <div className="relative flex items-center justify-center">
                            <input
                              type="checkbox"
                              value={option}
                              checked={inputValue.includes(option)}
                              onChange={(e) => {
                                const selectedOptions = inputValue ? inputValue.split(',').map(x => x.trim()) : [];
                                if (e.target.checked) {
                                  selectedOptions.push(option);
                                } else {
                                  const index = selectedOptions.indexOf(option);
                                  if (index > -1) selectedOptions.splice(index, 1);
                                }
                                setInputValue(selectedOptions.join(', '));
                              }}
                              className="appearance-none w-5 h-5 border-2 border-[#2563eb] rounded transition-all duration-200 
                                checked:bg-[#2563eb] checked:border-transparent
                                focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2 focus:ring-offset-[#12121d]"
                            />
                            <Check 
                              className={`absolute w-3 h-3 text-white pointer-events-none transition-opacity duration-200 
                                ${inputValue.includes(option) ? 'opacity-100' : 'opacity-0'}`}
                            />
                          </div>
                          <span className="text-white text-lg font-medium">{option}</span>
                          <div className={`absolute inset-0 border-2 border-transparent rounded-lg transition-all duration-200 
                            ${inputValue.includes(option) ? 'border-[#2563eb]/50' : 'group-hover:border-[#2563eb]/20'}`} 
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                ) : phase === "origin" ? (
                  <>
                    <input
                      type="text"
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      placeholder="Search your country"
                      className="w-full px-4 py-3 bg-[#272739] rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563eb] mb-4"
                    />
                    <div className="max-h-48 overflow-y-scroll w-full grid grid-cols-2 gap-2">
                      {countries
                        .filter((c) =>
                          c.name.toLowerCase().includes(countrySearch.toLowerCase())
                        )
                        .map((c) => (
                            <button
                            key={c.name}
                            onClick={() => {
                              setOrigin(c.name);
                              setCountrySearch(c.name);
                            }}
                            className="flex items-center gap-2 p-2 bg-[#272739] rounded-lg hover:bg-[#2563eb] transition-colors"
                            >
                            <span className="text-xl">{c.flag}</span>
                            <span className="text-sm text-white truncate">{c.name}</span>
                            </button>
                        ))}
                    </div>
                  </>
                ) : null}
              </div>
              {phase !== "final" && (
                <button
                  type="submit"
                  className="w-full py-3 bg-[#2563eb] hover:bg-[#2563eb]/90 text-white font-medium rounded-lg transition-colors"
                >
                  Next
                </button>
              )}
            </form>
          </div>

          {/* Bottom Navigation (disabled state) */}
            <div className="bg-[#090910] min-h-[96px] flex justify-evenly gap-x-8 items-center border-t border-[#232323] p-4 relative">
            {/* Active tab indicator (hidden in disabled state) */}
            <div className="absolute top-0 left-0 w-1/5 h-1 bg-[#2563eb] opacity-30"></div>

            <button
            disabled
            className="flex flex-col items-center justify-center gap-1 opacity-50 cursor-not-allowed"
            >
            <HomeIcon className="w-8 h-8 text-[#ffffff]/50" />
            <span className="text-[12px] text-[#ffffff]/50">
              Home
            </span>
            </button>
            <button
            disabled
            className="flex flex-col items-center justify-center gap-1 opacity-50 cursor-not-allowed"
            >
            <MagnifyingGlassIcon className="w-8 h-8 text-[#ffffff]/50" />
            <span className="text-[12px] text-[#ffffff]/50">
              Discover
            </span>
            </button>
            <button
            disabled
            className="flex flex-col items-center justify-center gap-1 opacity-50 cursor-not-allowed"
            >
            <Squares2X2Filled className="w-8 h-8 text-[#ffffff]/50" />
            <span className="text-[12px] text-[#ffffff]/50">
              Apps
            </span>
            </button>
            <button
            disabled
            className="flex flex-col items-center justify-center gap-1 opacity-50 cursor-not-allowed"
            >
            <ChatBubbleLeftRightIcon className="w-8 h-8 text-[#ffffff]/50" />
            <span className="text-[12px] text-[#ffffff]/50">
              Chat
            </span>
            </button>
            <button
            disabled
            className="flex flex-col items-center justify-center gap-1 opacity-50 cursor-not-allowed"
            >
            <UserCircleIcon className="w-8 h-8 text-[#ffffff]/50" />
            <span className="text-[12px] text-[#ffffff]/50">
              Profile
            </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ backgroundImage: `url(${randomBackground})` }}
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4 font-['Segoe_UI'] sm:p-4"
    >
      <div className="w-full h-screen sm:w-[490px] sm:max-w-lg sm:h-[780px] bg-gradient-to-b from-[#12121d]/80 to-[#12121d]/95 backdrop-blur-xl main-card fixed sm:relative sm:rounded-[18px] overflow-hidden flex flex-col">
        {/* Main Content Area */}
        {getTabContent(activeTab)}

        {/* Bottom Navigation */}
        <div className="bg-[#090910] min-h-[96px] flex justify-evenly gap-x-8 items-center border-t border-[#232323] p-4 relative">
          {/* Active tab indicator */}
          <div
            className="absolute top-0 left-0 w-1/5 h-1 bg-[#2563eb] transition-all duration-300 ease-in-out"
            style={{
              transform: `translateX(${
                ["home", "discover", "apps", "chat", "profile"].indexOf(
                  activeTab
                ) * 100
              }%)`,
            }}
          ></div>

          <button
            onClick={() => setActiveTab("home")}
            className="flex flex-col items-center justify-center gap-1"
          >
            {activeTab === "home" ? (
              <HomeIconFilled className="w-8 h-8 text-[#2563eb]" />
            ) : (
              <HomeIcon className="w-8 h-8 text-[#ffffff]" />
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
            onClick={() => setActiveTab("discover")}
            className="flex flex-col items-center justify-center gap-1"
          >
            {activeTab === "discover" ? (
              <MagnifyingGlassFilled className="w-8 h-8 text-[#2563eb]" />
            ) : (
              <MagnifyingGlassIcon className="w-8 h-8 text-[#ffffff]" />
            )}
            <span
              className={`text-[12px] ${
                activeTab === "discover" ? "text-[#2563eb]" : "text-[#ffffff]"
              }`}
            >
              Discover
            </span>
          </button>
          <button
            onClick={() => setActiveTab("apps")}
            className="flex flex-col items-center justify-center gap-1"
          >
            {activeTab === "apps" ? (
              <Squares2X2Filled className="w-8 h-8 text-[#2563eb]" />
            ) : (
              <Squares2X2Icon className="w-8 h-8 text-[#ffffff]" />
            )}
            <span
              className={`text-[12px] ${
                activeTab === "apps" ? "text-[#2563eb]" : "text-[#ffffff]"
              }`}
            >
              Apps
            </span>
          </button>
          <button
            onClick={() => setActiveTab("chat")}
            className="flex flex-col items-center justify-center gap-1"
          >
            {activeTab === "chat" ? (
              <ChatBubbleLeftRightFilled className="w-8 h-8 text-[#2563eb]" />
            ) : (
              <ChatBubbleLeftRightIcon className="w-8 h-8 text-[#ffffff]" />
            )}
            <span
              className={`text-[12px] ${
                activeTab === "chat" ? "text-[#2563eb]" : "text-[#ffffff]"
              }`}
            >
              Chat
            </span>
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className="flex flex-col items-center justify-center gap-1"
          >
            {activeTab === "profile" ? (
              <UserCircleFilled className="w-8 h-8 text-[#2563eb]" />
            ) : (
              <UserCircleIcon className="w-8 h-8 text-[#ffffff]" />
            )}
            <span
              className={`text-[12px] ${
                activeTab === "profile" ? "text-[#2563eb]" : "text-[#ffffff]"
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
