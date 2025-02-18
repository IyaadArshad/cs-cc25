interface ModeTransitionProps {
  mode: "expanding" | "minimizing";
}

export default function ModeTransition({ mode }: ModeTransitionProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-6"></div>
  );
}