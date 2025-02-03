"use client";

import { useState, useEffect } from "react";
import {
  Home,
  ImageIcon,
  Zap,
  Settings,
  Compass,
  ChevronLeft,
  ChevronRight,
  Shield,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import {
  HomeFilled,
  ImageFilled,
  ZapFilled,
  SettingsFilled,
  CompassFilled,
  EditProfile,
  ConnectedIcon,
  CommunityIcon,
  ReportIssuesOrGiveFeedbackIcon,
} from "./filled-icons";
import type React from "react";

type Tab = "home" | "nft" | "moon" | "explore" | "settings";

const backgrounds = [
  "https://images.pexels.com/photos/1473673/pexels-photo-1473673.jpeg",
//  "https://images.pexels.com/photos/442579/pexels-photo-442579.jpeg",
];

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

function SettingsItem({
  icon,
  title,
  description,
  plainIcon,
}: SettingsItemProps) {
  return (
    <div className="flex items-center justify-between py-4 cursor-pointer group hover:bg-[#1e1e2e45] transition-colors">
      <div className="flex items-center gap-4">
        {plainIcon ? (
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
      <div className="text-yellow-400 drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">
        {Icon}
      </div>
      <span className="text-sm font-semibold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        {temperature}°
      </span>
      <span className="text-xs font-medium text-gray-200 capitalize drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        {condition}
      </span>
    </div>
  );
}

export default function Page() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  // Remove showBio and use new phase state
  const [phase, setPhase] = useState<"name" | "bio" | "origin" | "loading" | "interests">("name");
  const [origin, setOrigin] = useState("");
  const [countrySearch, setCountrySearch] = useState("");
  const [hasUserCookie, setHasUserCookie] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const loadingPhrases = [
    "AI is identifying your personality",
    "Matching your interests",
    "Analyzing your preferences",
    "Finding connections",
    "Discovering your style"
  ];
  const [loadingIndex, setLoadingIndex] = useState(0);

  const countries = [
    { name: "Afghanistan", flag: "🇦🇫" },
    { name: "Albania", flag: "🇦🇱" },
    { name: "Algeria", flag: "🇩🇿" },
    { name: "Andorra", flag: "🇦🇩" },
    { name: "Angola", flag: "🇦🇴" },
    { name: "Antigua and Barbuda", flag: "🇦🇬" },
    { name: "Argentina", flag: "🇦🇷" },
    { name: "Armenia", flag: "🇦🇲" },
    { name: "Australia", flag: "🇦🇺" },
    { name: "Austria", flag: "🇦🇹" },
    { name: "Azerbaijan", flag: "🇦🇿" },
    { name: "Bahamas", flag: "🇧🇸" },
    { name: "Bahrain", flag: "🇧🇭" },
    { name: "Bangladesh", flag: "🇧🇩" },
    { name: "Barbados", flag: "🇧🇧" },
    { name: "Belarus", flag: "🇧🇾" },
    { name: "Belgium", flag: "🇧🇪" },
    { name: "Belize", flag: "🇧🇿" },
    { name: "Benin", flag: "🇧🇯" },
    { name: "Bhutan", flag: "🇧🇹" },
    { name: "Bolivia", flag: "🇧🇴" },
    { name: "Bosnia and Herzegovina", flag: "🇧🇦" },
    { name: "Botswana", flag: "🇧🇼" },
    { name: "Brazil", flag: "🇧🇷" },
    { name: "Brunei", flag: "🇧🇳" },
    { name: "Bulgaria", flag: "🇧🇬" },
    { name: "Burkina Faso", flag: "🇧" },
    { name: "Burundi", flag: "🇧🇮" },
    { name: "Cabo Verde", flag: "🇨🇻" },
    { name: "Cambodia", flag: "🇰🇭" },
    { name: "Cameroon", flag: "🇨🇲" },
    { name: "Canada", flag: "🇨🇦" },
    { name: "Central African Republic", flag: "🇨🇫" },
    { name: "Chad", flag: "🇹🇩" },
    { name: "Chile", flag: "🇨🇱" },
    { name: "China", flag: "🇨🇳" },
    { name: "Colombia", flag: "🇨🇴" },
    { name: "Comoros", flag: "🇰🇲" },
    { name: "Congo (Congo-Brazzaville)", flag: "🇨🇬" },
    { name: "Costa Rica", flag: "🇨🇷" },
    { name: "Croatia", flag: "🇭🇷" },
    { name: "Cuba", flag: "🇨🇺" },
    { name: "Cyprus", flag: "🇨🇾" },
    { name: "Czechia", flag: "🇨🇿" },
    { name: "Democratic Republic of the Congo", flag: "🇨🇩" },
    { name: "Denmark", flag: "🇩🇰" },
    { name: "Djibouti", flag: "🇩🇯" },
    { name: "Dominica", flag: "🇩🇲" },
    { name: "Dominican Republic", flag: "🇩🇴" },
    { name: "Ecuador", flag: "🇪🇨" },
    { name: "Egypt", flag: "🇪🇬" },
    { name: "El Salvador", flag: "🇸🇻" },
    { name: "Equatorial Guinea", flag: "🇬🇶" },
    { name: "Eritrea", flag: "🇪🇷" },
    { name: "Estonia", flag: "🇪🇪" },
    { name: "Eswatini", flag: "🇸🇿" },
    { name: "Ethiopia", flag: "🇪🇹" },
    { name: "Fiji", flag: "🇫🇯" },
    { name: "Finland", flag: "🇫🇮" },
    { name: "France", flag: "🇫🇷" },
    { name: "Gabon", flag: "🇬🇦" },
    { name: "Gambia", flag: "🇬🇲" },
    { name: "Georgia", flag: "🇬🇪" },
    { name: "Germany", flag: "🇩🇪" },
    { name: "Ghana", flag: "🇬🇭" },
    { name: "Greece", flag: "🇬🇷" },
    { name: "Grenada", flag: "🇬🇩" },
    { name: "Guatemala", flag: "🇬🇹" },
    { name: "Guinea", flag: "🇬🇳" },
    { name: "Guinea-Bissau", flag: "🇬🇼" },
    { name: "Guyana", flag: "🇬🇾" },
    { name: "Haiti", flag: "🇭🇹" },
    { name: "Holy See", flag: "🇻🇦" },
    { name: "Honduras", flag: "🇭🇳" },
    { name: "Hungary", flag: "🇭🇺" },
    { name: "Iceland", flag: "🇮🇸" },
    { name: "India", flag: "🇮🇳" },
    { name: "Indonesia", flag: "🇮🇩" },
    { name: "Iran", flag: "🇮🇷" },
    { name: "Iraq", flag: "🇮🇶" },
    { name: "Ireland", flag: "🇮🇪" },
    { name: "Israel", flag: "🇮🇱" },
    { name: "Italy", flag: "🇮🇹" },
    { name: "Jamaica", flag: "🇯🇲" },
    { name: "Japan", flag: "🇯🇵" },
    { name: "Jordan", flag: "🇯🇴" },
    { name: "Kazakhstan", flag: "🇰🇿" },
    { name: "Kenya", flag: "🇰🇪" },
    { name: "Kiribati", flag: "🇰🇮" },
    { name: "Kuwait", flag: "🇰🇼" },
    { name: "Kyrgyzstan", flag: "🇰🇬" },
    { name: "Laos", flag: "🇱🇦" },
    { name: "Latvia", flag: "🇱🇻" },
    { name: "Lebanon", flag: "🇱🇧" },
    { name: "Lesotho", flag: "🇱🇸" },
    { name: "Liberia", flag: "🇱🇷" },
    { name: "Libya", flag: "🇱🇾" },
    { name: "Liechtenstein", flag: "🇱🇮" },
    { name: "Lithuania", flag: "🇱🇹" },
    { name: "Luxembourg", flag: "🇱🇺" },
    { name: "Madagascar", flag: "🇲🇬" },
    { name: "Malawi", flag: "🇲🇼" },
    { name: "Malaysia", flag: "🇲🇾" },
    { name: "Maldives", flag: "🇲🇻" },
    { name: "Mali", flag: "🇲🇱" },
    { name: "Malta", flag: "🇲🇹" },
    { name: "Marshall Islands", flag: "🇲🇭" },
    { name: "Mauritania", flag: "🇲🇷" },
    { name: "Mauritius", flag: "🇲🇺" },
    { name: "Mexico", flag: "🇲🇽" },
    { name: "Micronesia", flag: "🇫🇲" },
    { name: "Moldova", flag: "🇲🇩" },
    { name: "Monaco", flag: "🇲🇨" },
    { name: "Mongolia", flag: "🇲🇳" },
    { name: "Montenegro", flag: "🇲🇪" },
    { name: "Morocco", flag: "🇲🇦" },
    { name: "Mozambique", flag: "🇲🇿" },
    { name: "Myanmar", flag: "🇲🇲" },
    { name: "Namibia", flag: "🇳🇦" },
    { name: "Nauru", flag: "🇳🇷" },
    { name: "Nepal", flag: "🇳🇵" },
    { name: "Netherlands", flag: "🇳🇱" },
    { name: "New Zealand", flag: "🇳🇿" },
    { name: "Nicaragua", flag: "🇳🇮" },
    { name: "Niger", flag: "🇳🇪" },
    { name: "Nigeria", flag: "🇳🇬" },
    { name: "North Korea", flag: "🇰🇵" },
    { name: "North Macedonia", flag: "🇲🇰" },
    { name: "Norway", flag: "🇳🇴" },
    { name: "Oman", flag: "🇴🇲" },
    { name: "Pakistan", flag: "🇵🇰" },
    { name: "Palau", flag: "🇵🇼" },
    { name: "Palestine", flag: "🇵🇸" },
    { name: "Panama", flag: "🇵🇦" },
    { name: "Papua New Guinea", flag: "🇵🇬" },
    { name: "Paraguay", flag: "🇵🇾" },
    { name: "Peru", flag: "🇵🇪" },
    { name: "Philippines", flag: "🇵🇭" },
    { name: "Poland", flag: "🇵🇱" },
    { name: "Portugal", flag: "🇵🇹" },
    { name: "Qatar", flag: "🇶🇦" },
    { name: "Romania", flag: "🇷🇴" },
    { name: "Russia", flag: "🇷🇺" },
    { name: "Rwanda", flag: "🇷🇼" },
    { name: "Saint Kitts and Nevis", flag: "🇰🇳" },
    { name: "Saint Lucia", flag: "🇱🇨" },
    { name: "Saint Vincent and the Grenadines", flag: "🇻🇨" },
    { name: "Samoa", flag: "🇼🇸" },
    { name: "San Marino", flag: "🇸🇲" },
    { name: "Sao Tome and Principe", flag: "🇸🇹" },
    { name: "Saudi Arabia", flag: "🇸🇦" },
    { name: "Senegal", flag: "🇸🇳" },
    { name: "Serbia", flag: "🇷🇸" },
    { name: "Seychelles", flag: "🇸🇨" },
    { name: "Sierra Leone", flag: "🇸🇱" },
    { name: "Singapore", flag: "🇸🇬" },
    { name: "Slovakia", flag: "🇸🇰" },
    { name: "Slovenia", flag: "🇸🇮" },
    { name: "Solomon Islands", flag: "🇸🇧" },
    { name: "Somalia", flag: "🇸🇴" },
    { name: "South Africa", flag: "🇿🇦" },
    { name: "South Korea", flag: "🇰🇷" },
    { name: "South Sudan", flag: "🇸🇸" },
    { name: "Spain", flag: "🇪🇸" },
    { name: "Sri Lanka", flag: "🇱🇰" },
    { name: "Sudan", flag: "🇸🇩" },
    { name: "Suriname", flag: "🇸🇷" },
    { name: "Sweden", flag: "🇸🇪" },
    { name: "Switzerland", flag: "🇨🇭" },
    { name: "Syria", flag: "🇸🇾" },
    { name: "Tajikistan", flag: "🇹🇯" },
    { name: "Tanzania", flag: "🇹🇿" },
    { name: "Thailand", flag: "🇹🇭" },
    { name: "Timor-Leste", flag: "🇹🇱" },
    { name: "Togo", flag: "🇹🇬" },
    { name: "Tonga", flag: "🇹🇴" },
    { name: "Trinidad and Tobago", flag: "🇹🇹" },
    { name: "Tunisia", flag: "🇹🇳" },
    { name: "Turkey", flag: "🇹🇷" },
    { name: "Turkmenistan", flag: "🇹🇲" },
    { name: "Tuvalu", flag: "🇹🇻" },
    { name: "Uganda", flag: "🇺🇬" },
    { name: "Ukraine", flag: "🇺🇦" },
    { name: "United Arab Emirates", flag: "🇦🇪" },
    { name: "United Kingdom", flag: "🇬🇧" },
    { name: "United States of America", flag: "🇺🇸" },
    { name: "Uruguay", flag: "🇺🇾" },
    { name: "Uzbekistan", flag: "🇺🇿" },
    { name: "Vanuatu", flag: "🇻🇺" },
    { name: "Venezuela", flag: "🇻🇪" },
    { name: "Vietnam", flag: "🇻🇳" },
    { name: "Yemen", flag: "🇾🇪" },
    { name: "Zambia", flag: "🇿🇲" },
    { name: "Zimbabwe", flag: "🇿🇼" },
  ];

  useEffect(() => {
    // Check for existing name cookie
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

  // Handle multi‐phase submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phase === "name") {
      if (userName.trim()) {
        document.cookie = `name=${userName};path=/;max-age=${60 * 60 * 24 * 7}`;
        setPhase("bio");
      }
    } else if (phase === "bio") {
      if (bio.trim()) {
        document.cookie = `bio=${bio};path=/;max-age=${60 * 60 * 24 * 7}`;
        setPhase("origin");
      }
    } else if (phase === "origin") {
      if (origin.trim()) {
        setPhase("loading");
      }
    }
  };

  // In loading phase, cycle phrases and simulate API call
  useEffect(() => {
    let phraseInterval: NodeJS.Timeout;
    if (phase === "loading") {
      phraseInterval = setInterval(() => {
        setLoadingIndex((prev) => (prev + 1) % loadingPhrases.length);
      }, 4000);
      // Simulate API call delay
      setTimeout(() => {
        clearInterval(phraseInterval);
        setPhase("interests");
      }, 12000); // simulate 12 sec load
    }
    return () => phraseInterval && clearInterval(phraseInterval);
  }, [phase]);

  // Generate a random background URL
  const randomBackground =
    backgrounds[Math.floor(Math.random() * backgrounds.length)];

  // Interests options for the final page
  const interests = ["Music", "Tech", "Travel", "Sports", "Art", "Food"];

  const getTabContent = (tab: Tab) => {
    switch (tab) {
      case "home":
        return (
          <div className="flex-1 p-6">
            <div className="flex flex-col items-center justify-center space-y-6 mt-16">
              {/* Welcome Section */}
              <h1 className="text-4xl text-white text-center">
                Welcome back, {userName}
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
            {/* Updated Header */}
            <div className="relative mb-7">
              <button className="absolute left-0 w-8 h-8 flex items-center justify-center rounded-full bg-[#272739]">
                <ChevronLeft className="w-5 h-5 text-white" />
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
              <h3 className="text-2xl font-bold text-white mb-4">Other</h3>
              <div className="space-y-2">
                <SettingsItem
                  plainIcon
                  icon={<CommunityIcon className="w-7 h-7 text-white" />}
                  title="Dubai Community"
                  description="Come and join us"
                />
                <SettingsItem
                  plainIcon
                  icon={
                    <ReportIssuesOrGiveFeedbackIcon className="w-7 h-7 text-white" />
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
        className="min-h-screen bg-cover bg-center flex items-center justify-center p-4 font-['Segoe_UI']"
      >
        <div className="w-[490px] max-w-lg h-[780px] bg-gradient-to-b from-[#12121d]/80 to-[#12121d]/95 backdrop-blur-xl main-card rounded-[18px] overflow-hidden flex flex-col">

          {/* Content */}
          <div className="flex-1 flex flex-col items-center justify-center gap-5 px-6">
            {phase === "name" || phase === "bio" ? (
              <div className="relative w-48 h-48 mb-4">
                <img
                  src="/landing-new.webp"
                  alt="Welcome"
                  className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-500 ${phase === "name" ? "opacity-100" : "opacity-0"}`}
                />
                <img
                  src="/images/default_pfp.png"
                  alt="Profile"
                  className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-500 rounded-full transform ${phase === "bio" ? "opacity-100 scale-110" : "opacity-0 scale-90"}`}
                />
              </div>
            ) : phase === "origin" ? (
              <div className="relative w-24 h-24 mb-4">
                <img
                  src="/images/default_pfp.png"
                  alt="Profile"
                  className="object-cover w-full h-full rounded-full transition-all duration-500"
                />
              </div>
            ) : null}
            {phase === "loading" ? (
              <div className="flex flex-col items-center">
                {/* Simple spinner */}
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#2563eb]"></div>
                <h1 className="mt-4 text-2xl font-bold text-white">Loading...</h1>
                <p className="mt-2 text-lg text-gray-300">
                  {loadingPhrases[loadingIndex]}
                </p>
              </div>
            ) : phase === "interests" ? (
              <div className="flex flex-col items-center">
                <h1 className="text-2xl text-white mb-4">Select Your Interests</h1>
                <div className="flex flex-wrap gap-3 justify-center">
                  {interests.map((item) => (
                    <button
                      key={item}
                      className="px-4 py-2 bg-[#272739] rounded-full text-white hover:bg-[#2563eb] transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-4xl font-bold text-white text-center">
                  {phase === "name" ? "Welcome to the Emirates" : userName}
                </h1>
                {phase !== "origin" && (
                  <p className="text-gray-400 text-lg mb-4 text-center">
                    {phase === "name"
                      ? "Let's start by getting to know you"
                      : phase === "bio"
                      ? "How would you describe yourself?"
                      : null}
                  </p>
                )}
                {phase === "origin" && (
                  <div className="w-full">
                    <p className="text-gray-400 text-lg text-center mb-2">
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
                  <input
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Write your bio"
                    className="w-full px-4 py-3 bg-[#272739] rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                    required
                  />
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
              {phase !== "loading" && phase !== "interests" && (
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
            <div className="bg-[#090910] min-h-[96px] flex justify-around items-center border-t border-[#232323] p-4 relative">
            {/* Active tab indicator (hidden in disabled state) */}
            <div className="absolute top-0 left-0 w-1/5 h-1 bg-[#2563eb] opacity-30"></div>

            <button
            disabled
            className="flex flex-col items-center justify-center gap-1 mx-7 opacity-50 cursor-not-allowed"
            >
            <Home className="w-8 h-8 text-[#ffffff]/50" />
            <span className="text-[12px] text-[#ffffff]/50">
              Home
            </span>
            </button>
            <button
            disabled
            className="flex flex-col items-center justify-center gap-1 mx-7 opacity-50 cursor-not-allowed"
            >
            <ImageIcon className="w-8 h-8 text-[#ffffff]/50" />
            <span className="text-[12px] text-[#ffffff]/50">
              NFT
            </span>
            </button>
            <button
            disabled
            className="flex flex-col items-center justify-center gap-1 mx-7 opacity-50 cursor-not-allowed"
            >
            <Zap className="w-8 h-8 text-[#ffffff]/50" />
            <span className="text-[12px] text-[#ffffff]/50">
              $MOON
            </span>
            </button>
            <button
            disabled
            className="flex flex-col items-center justify-center gap-1 mx-7 opacity-50 cursor-not-allowed"
            >
            <Compass className="w-8 h-8 text-[#ffffff]/50" />
            <span className="text-[12px] text-[#ffffff]/50">
              Explore
            </span>
            </button>
            <button
            disabled
            className="flex flex-col items-center justify-center gap-1 mx-7 opacity-50 cursor-not-allowed"
            >
            <Settings className="w-8 h-8 text-[#ffffff]/50" />
            <span className="text-[12px] text-[#ffffff]/50">
              Settings
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
