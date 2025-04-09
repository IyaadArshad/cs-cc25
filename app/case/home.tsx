"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { furtherSteps } from "./homeData";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import React from "react";
import JSConfetti from "js-confetti";

export interface Option {
  id: string;
  label: string;
  icon: React.JSX.Element;
  isWide: boolean;
}

export interface TaskQuestionProps {
  question: string;
  emphasisText?: string;
  options: Option[];
  onSave: (selectedId: string) => void;
  onExit: () => void;
  progress: number;
}

function TaskQuestion({
  question,
  emphasisText,
  options,
  onSave,
  onExit,
  progress,
}: TaskQuestionProps) {
  const [selectedOption, setSelectedOption] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const handleExit = () => {
    if (selectedOption) {
      setShowDialog(true);
    } else {
      handleExitWithAnimation();
    }
  };

  const handleExitWithAnimation = () => {
    setIsExiting(true);
    setTimeout(() => {
      onExit();
    }, 300);
  };

  const handleSave = (selected: string) => {
    setIsExiting(true);
    setTimeout(() => {
      onSave(selected);
    }, 300);
  };

  const handleExitAnyway = () => {
    setShowDialog(false);
    handleExitWithAnimation();
  };

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  return (
    <div className="relative flex-1 p-6 overflow-y-auto hide-scrollbar">
      <div
        onClick={handleExit}
        className="absolute top-6 left-6 cursor-pointer flex items-center gap-4 hover:text-gray-300"
      >
        <ArrowLeft className="w-5 h-5 text-white" />
        <span className="text-white">Back</span>
      </div>
      <div className="absolute top-6 right-6">
        <ProgressBar percentage={progress} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key="content"
          initial="hidden"
          animate={isExiting ? "exit" : "show"}
          exit="exit"
          variants={containerVariants}
          className="flex flex-col items-center justify-center space-y-6 mt-12"
        >
          <motion.div variants={itemVariants} className="self-start">
            <h2 className="text-6xl font-extrabold text-white mb-4 ml-3 text-start leading-tight max-w-2xl">
              {question}
              {emphasisText && (
                <>
                  <br />
                  <span style={{ color: "#2563eb" }}>{emphasisText}</span>
                </>
              )}
            </h2>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-6 w-full max-w-4xl"
          >
            {options.map((option) => (
              <Button
                key={option.id}
                variant="outline"
                className={`flex bg-gray-800 border-gray-700 text-white hover:bg-gray-700/50 transition-colors flex-col items-center justify-center gap-4 p-6 border
                  ${option.isWide ? "col-span-2 h-24" : "h-32"}
                  ${
                    selectedOption === option.id
                      ? "border-[#2563eb] bg-blue-500/10 hover:text-white"
                      : "hover:text-white"
                  }`}
                onClick={() =>
                  setSelectedOption((curr) =>
                    curr === option.id ? "" : option.id
                  )
                }
              >
                {option.icon}
                <span className="text-lg font-light">{option.label}</span>
              </Button>
            ))}
          </motion.div>
          <motion.div variants={itemVariants} className="w-full">
            <Button
              className={`mt-2 w-full px-8 text-white border border-gray-700 ${
                selectedOption
                  ? "bg-gray-800 hover:bg-[#2563eb] transition-colors"
                  : "bg-gray-800/50 text-gray-500"
              }`}
              disabled={!selectedOption}
              onClick={() => handleSave(selectedOption)}
            >
              Save Selection <span className="ml-[0.1rem]">✅</span>
            </Button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        {showDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-gray-800 p-8 rounded-lg text-center mx-4 max-w-xs"
            >
              <X className="w-16 h-16 text-[#2563eb] mx-auto" />
              <h2 className="mt-4 text-2xl font-bold text-white">
                You have unsaved changes
              </h2>
              <p className="mt-2 text-gray-300">
                Do you want to exit without saving your selection?
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <button
                  onClick={handleDialogClose}
                  className="px-4 py-2 bg-gray-700/50 hover:bg-gray-600 text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExitAnyway}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg"
                >
                  Exit anyway
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

// Update this helper function to correctly calculate progress
function calculateProgress(
  taskAnswers: Record<string, string>,
  steps: typeof furtherSteps
): number {
  if (!taskAnswers || !steps) return 0;

  const totalTasks = steps.length;
  let completedTasks = 0;

  steps.forEach((step) => {
    const answer = taskAnswers[step.id];
    if (answer && answer !== `${step.id}-not-confirmed`) {
      // Check if the answer exists and isn't the "not confirmed" placeholder
      completedTasks++;
    }
  });

  return Math.round((completedTasks / totalTasks) * 100);
}

// Update ProgressBar to accept children prop
function ProgressBar({ percentage }: { percentage?: number }) {
  return (
    <div className="flex items-center">
      <div className="w-24 bg-gray-700 rounded-full h-2">
        <div
          className="bg-[#2563eb] h-2 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <span className="ml-2 text-white text-sm">{percentage}%</span>
    </div>
  );
}

// Update ProgressCircle
function ProgressCircle({
  percentage,
  hideText = false,
}: {
  percentage?: number;
  hideText?: boolean;
}) {
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - ((percentage || 0) / 100) * circumference;
  return (
    <div className="relative bg-[#27272a] rounded-full inline-flex items-center justify-center">
      <svg
        viewBox="-10 -10 200 200"
        className={`transform -rotate-90 ${
          hideText ? "w-20 h-20" : "w-44 h-44"
        }`}
      >
        <circle
          className="text-zinc-800"
          strokeWidth="12"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="90"
          cy="90"
        />
        <circle
          className="text-[#2563eb]"
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="butt"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="90"
          cy="90"
        />
      </svg>
      {!hideText && (
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-extralight text-[#2563eb]">
            {percentage}%
          </span>
          <span className="text-base font-extralight text-zinc-400">
            complete
          </span>
        </div>
      )}
    </div>
  );
}
function LoadingSpinner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center h-full"
    >
      <motion.div
        className="w-12 h-12 border-4 border-[#2563eb] border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </motion.div>
  );
}
function QuickActionCard({
  title,
  image,
  link,
}: {
  title: React.ReactNode;
  image: string;
  link: string;
}) {
  return (
    <Card
      className="bg-gray-800 border-gray-700 h-[200px] select-none cursor-pointer hover:bg-gray-700/50 transition-colors"
      onClick={() => window.open(link, "_blank")}
    >
      <CardContent className="p-6 text-left flex flex-col gap-2 h-full">
        <div className="w-full flex justify-left">
          <img
            src={image || "/placeholder.svg"}
            alt={typeof title === "string" ? title : "Quick action"}
            className="w-14 h-14 object-cover rounded-md"
          />
        </div>
        <div className="flex flex-col items-start text-left mt-2">
            <h1 className="text-white text-3xl font-semibold leading-normal">{title}</h1>
        </div>
      </CardContent>
    </Card>
  );
}

export default function CaseHome() {
  const [overviewMode, setOverviewMode] = useState(false);
  const [userName, setUserName] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  const handleExitAnyway = () => {
    setShowDialog(false);
  };

  const [isReturning, setIsReturning] = useState(false);
  const [mainViewReady, setMainViewReady] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [currentTaskStep, setCurrentTaskStep] = useState<string | null>(null);
  const [taskAnswers, setTaskAnswers] = useState<Record<string, string>>({});
  const [firstQuestionCompleted, setFirstQuestionCompleted] = useState(false);
  const overviewContainerRef = useRef<HTMLDivElement>(null);
  const [hasShownCelebration, setHasShownCelebration] = useState(false);

  const quickActions = [
    {
      title: (
        <>
          Order{" "}
          <span>
            {new Date().getHours() < 11
              ? "breakfast"
              : new Date().getHours() < 15
              ? "lunch"
              : new Date().getHours() < 19
              ? "dinner"
              : "a snack"}
          </span>
          <span className="text-[#2563eb]">{" "}with Zomato</span>
        </>
      ),
      description: "Find restaurants and food delivery options near you",
      image: "/img/tips/zomato.png",
      link: "https://www.zomato.com/abudhabi",
    },
    {
      title: (
        <>
          Call a taxi{" "}<span className="text-[#2563eb]">with Careem</span>
        </>
      ),
      description: "Book a ride quickly and conveniently across the city",
      image: "/img/tips/careem.png",
      link: "https://www.careem.com",
    },
    {
      title: (
        <>
          Order groceries{" "}<span className="text-[#2563eb]">with Talabat</span>
        </>
      ),
      image: "/placeholder.svg?height=144&width=256",
      link: "https://www.talabat.com/uae",
    },
    {
      title: (
        <>
          Pay utilities{" "}<span className="text-[#2563eb]">with ADDC</span>
        </>
      ),
      image: "/img/tips/abuDhabiDistributionCompany.png",
      link: "https://www.addc.ae",
    },
    {
      title: (
        <>
          Explore attractions{" "}
          <span className="text-[#2563eb]">on Visit Abu Dhabi</span>
        </>
      ),
      description: "Discover local events and activities in Abu Dhabi",
      image: "/img/tips/visitAbuDhabi.png",
      link: "https://visitabudhabi.ae",
    },
  ];

  const carouselOptions = {
    loop: true,
    dragFree: true,
    draggable: true,
    containScroll: "trimSnaps" as const,
    axis: "x" as const,
    wheelEnabled: true,
    wheelScroll: 1,
    align: "start" as const,
  };

  useEffect(() => {
    const name = Cookies.get("name");
    if (name) {
      setUserName(name);
      // Update the tasks cookie to mark setup as complete if name exists
      const tasksCookie = Cookies.get("tasks");
      const tasks = tasksCookie ? JSON.parse(tasksCookie) : {};
      tasks["setup"] = "setup-complete";
      Cookies.set("tasks", JSON.stringify(tasks), { path: "/", expires: 7 });
      setTaskAnswers(tasks);
    }
    // Initialize tasks cookie if not present and update taskAnswers state:
    if (!Cookies.get("tasks")) {
      const taskDefaults: Record<string, string> = {};
      furtherSteps.forEach((step) => {
        const defaultAnswer = `${step.id}-not-confirmed`;
        taskDefaults[step.id] = defaultAnswer;
      });
      Cookies.set("tasks", JSON.stringify(taskDefaults), {
        path: "/",
        expires: 7,
      });
      setTaskAnswers(taskDefaults);
    } else {
      setTaskAnswers(JSON.parse(Cookies.get("tasks") as string));
    }
    // Check if the dashboard has loaded before via cookie
    const hasLoadedDashboard = Cookies.get("hasLoadedDashboard") === "true";
    setIsReturning(hasLoadedDashboard);
    if (!hasLoadedDashboard) {
      setIsInitialLoading(true);
      setTimeout(() => {
        setIsInitialLoading(false);
        Cookies.set("hasLoadedDashboard", "true", { path: "/", expires: 7 });
        setTimeout(() => {
          setMainViewReady(true);
        }, 100);
      }, 1500);
    } else {
      setIsInitialLoading(false);
      setMainViewReady(true);
    }
    // Add this check for the celebration cookie
    const hasSeenCelebration = Cookies.get("hasSeenCelebration") === "true";
    setHasShownCelebration(hasSeenCelebration);
  }, []);

  // Add this new effect for handling the celebration
  useEffect(() => {
    const progress = calculateProgress(taskAnswers, furtherSteps);

    if (progress === 100 && !hasShownCelebration && !overviewMode) {
      const confetti = new JSConfetti();
      confetti.addConfetti({
        emojis: ["🎉", "🎊", "✨", "⭐️", "🌟"],
        emojiSize: 50,
        confettiNumber: 100,
      });

      // Set the celebration cookie
      Cookies.set("hasSeenCelebration", "true", { path: "/", expires: 7 });
      setHasShownCelebration(true);
    }
  }, [taskAnswers, hasShownCelebration, overviewMode]);

  interface Task {
    id: string;
    title: string;
    description: string;
  }

  // Update task click to open any question:
  const handleTaskClick = (taskId: string) => {
    setCurrentTaskStep(taskId);
  };

  const handleOverviewClick = () => {
    setIsTransitioning(true);
    // Reduced from 100ms to 60ms
    setTimeout(() => {
      setOverviewMode(true);
      setIsTransitioning(false);
    }, 60);
  };

  // Update task save to update the tasks cookie and taskAnswers state:
  const handleTaskSave = (taskId: string, selected: string) => {
    const tasksCookie = Cookies.get("tasks");
    const tasks = tasksCookie ? JSON.parse(tasksCookie) : {};
    tasks[taskId] = selected;
    Cookies.set("tasks", JSON.stringify(tasks), { path: "/", expires: 7 });
    setTaskAnswers(tasks);
    setCurrentTaskStep(null);
    if (!firstQuestionCompleted) {
      setTimeout(() => {
        const taskElem = document.getElementById(`task-${taskId}`);
        if (taskElem) {
          taskElem.scrollIntoView({ behavior: "smooth", block: "center" });
          setTimeout(() => {
            overviewContainerRef.current?.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }, 1500);
        }
      }, 100);
      setFirstQuestionCompleted(true);
    }
  };

  // Show spinner during initial load
  if (isInitialLoading) {
    return (
      <div className="flex-1 p-6 overflow-y-auto">
        <LoadingSpinner />
      </div>
    );
  }

  // Replace single visaSelectionMode block with generic task question:
  if (currentTaskStep) {
    const taskStep = furtherSteps.find((step) => step.id === currentTaskStep);
    if (!taskStep) return null;
    const taskOptions = taskStep.answers.map((opt) => ({
      id: opt.id,
      label: opt.label,
      icon: React.createElement(opt.icon, { className: "w-6 h-6" }),
      isWide: !!opt.isWide,
    }));

    const progress = calculateProgress(taskAnswers, furtherSteps);

    return (
      <TaskQuestion
        question={taskStep.question}
        emphasisText={taskStep.emphasisText}
        options={taskOptions}
        onSave={(selected) => handleTaskSave(currentTaskStep, selected)}
        onExit={() => setCurrentTaskStep(null)}
        progress={progress}
      />
    );
  }

  if (overviewMode) {
    const progress = calculateProgress(taskAnswers, furtherSteps);
    // Sort tasks: unanswered first, answered last
    const sortedSteps = [...furtherSteps].sort((a, b) => {
      const answeredA =
        taskAnswers[a.id] && taskAnswers[a.id] !== `${a.id}-not-confirmed`;
      const answeredB =
        taskAnswers[b.id] && taskAnswers[b.id] !== `${b.id}-not-confirmed`;
      if (answeredA === answeredB) return 0;
      return answeredA ? 1 : -1;
    });
    return (
      <div
        ref={overviewContainerRef}
        className="relative flex-1 p-6 overflow-y-auto"
      >
        <div
          onClick={() => setOverviewMode(false)}
          className="absolute top-6 left-6 cursor-pointer flex items-center gap-4 hover:text-gray-300"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
          <span className="text-white">Back</span>
        </div>
        <div className="absolute top-6 right-6">
          <ProgressBar percentage={progress} />
        </div>
        <div className="flex flex-col items-center justify-center space-y-6 mt-6">
          <div className="w-full max-w-xl mt-6 space-y-4">
            {sortedSteps.map((step, index) => {
              const answered =
                taskAnswers[step.id] &&
                taskAnswers[step.id] !== `${step.id}-not-confirmed`;
              return (
                <motion.div
                  id={`task-${step.id}`} // <-- Added id for scrolling
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.06 }}
                  // Disable pointer events if answered
                  onClick={() =>
                    !answered && step.id && handleTaskClick(step.id)
                  }
                  className={`group flex items-center justify-between p-4 rounded-lg transition-colors ${
                    answered
                      ? "bg-zinc-700 pointer-events-none"
                      : "bg-zinc-900/50 hover:bg-zinc-800 cursor-pointer"
                  }`}
                >
                  <div className="flex flex-col">
                    <motion.h3
                      animate={
                        answered
                          ? { textDecoration: "line-through", color: "#9ca3af" }
                          : {}
                      }
                      className="text-lg font-medium text-zinc-200"
                    >
                      {step.title}
                    </motion.h3>
                    <motion.p
                      animate={
                        answered
                          ? { textDecoration: "line-through", color: "#9ca3af" }
                          : {}
                      }
                      className="text-sm text-zinc-400"
                    >
                      {step.description}
                    </motion.p>
                  </div>
                  <button className="p-2 rounded text-white">
                    {answered ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <ArrowRight className="w-5 h-5 transform transition-transform group-hover:translate-x-1" />
                    )}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <AnimatePresence>
        <div className="flex flex-col items-center justify-center space-y-6 mt-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: mainViewReady ? 1 : 0,
              y: mainViewReady ? 0 : -20,
            }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-4xl text-white text-center mb-3"
          >
            {isReturning ? `Welcome back, ${userName}` : `Welcome, ${userName}`}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: mainViewReady ? (isTransitioning ? 0 : 1) : 0,
              scale: mainViewReady ? (isTransitioning ? 0.9 : 1) : 0.9,
            }}
            transition={{ duration: 0.4, delay: 0.4 }}
            onClick={
              calculateProgress(taskAnswers, furtherSteps) === 100
                ? undefined
                : handleOverviewClick
            }
            className={`cursor-pointer transform transition-transform hover:scale-105 ${
              calculateProgress(taskAnswers, furtherSteps) === 100
                ? ""
                : "animate-wiggle"
            }`}
          >
            <ProgressCircle
              percentage={calculateProgress(taskAnswers, furtherSteps)}
            />
          </motion.div>
        </div>
      </AnimatePresence>

      {/* Quick Actions Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: mainViewReady ? 1 : 0,
          y: mainViewReady ? 0 : 20,
        }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="w-full mt-8"
      >
        <Carousel
          opts={carouselOptions}
          className="w-full cursor-grab active:cursor-grabbing"
        >
          <CarouselContent className="select-none -ml-2">
            {quickActions.map((action, index) => (
              <CarouselItem
                key={index}
                className="pl-2 basis-[70%] md:basis-[45%] lg:basis-[30%]"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <QuickActionCard
                    title={action.title}
                    image={action.image}
                    link={action.link}
                  />
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </motion.div>

      <AnimatePresence>
        {showDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-gray-800 p-8 rounded-lg text-center mx-4 max-w-xs"
            >
              <X className="w-16 h-16 text-[#2563eb] mx-auto" />
              <h2 className="mt-4 text-2xl font-bold text-white">
                You have unsaved changes
              </h2>
              <p className="mt-2 text-gray-300">
                Do you want to exit without saving your selection?
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <button
                  onClick={handleDialogClose}
                  className="px-4 py-2 bg-gray-700/50 hover:bg-gray-600 text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExitAnyway}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg"
                >
                  Exit anyway
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Add custom keyframes for wiggle animation */}
      <style jsx global>{`
        @keyframes wiggle {
          0%,
          80%,
          100% {
            transform: rotate(0deg);
          }
          10% {
            transform: rotate(-3deg);
          }
          20% {
            transform: rotate(3deg);
          }
          30% {
            transform: rotate(-3deg);
          }
          40% {
            transform: rotate(3deg);
          }
        }
        .animate-wiggle {
          animation: wiggle 1s ease-in-out;
          animation-delay: 14s;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
}