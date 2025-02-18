import { Loader2 } from "lucide-react";

interface ModeTransitionProps {
  mode: "expanding" | "minimizing";
}

export default function ModeTransition({ mode }: ModeTransitionProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-6">
      <Loader2 className="h-8 w-8 text-[#2563eb] animate-spin" />
      <div className="text-center space-y-2 max-w-sm px-4">
        <h3 className="text-white text-lg font-medium">
          {mode === "expanding" ? "Switching to desktop view" : "Switching to mobile view"}
        </h3>
        <p className="text-gray-400 text-sm">
          {mode === "expanding" 
            ? "Expanding the chat interface for a better desktop experience..."
            : "Optimizing the interface for mobile view..."}
        </p>
      </div>
    </div>
  );
}
