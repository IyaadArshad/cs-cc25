import { SettingsItemProps } from "../../types/types";
import { ChevronRight } from "lucide-react";

export default function SettingsItem({
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