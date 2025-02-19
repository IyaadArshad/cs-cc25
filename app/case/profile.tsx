import {
    ChevronLeftIcon as ChevronLeftFilled,
    ExclamationCircleIcon,
    UserGroupIcon,
  } from "@heroicons/react/24/solid";
  import {
    ShieldCheckIcon,
    TrashIcon,
    LockClosedIcon,
    LinkIcon
  } from "@heroicons/react/24/outline";
import SettingsItem from "@/components/SettingsItem";

export default function CaseProfile () {
    return(
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
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#272739]"></button>
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
}