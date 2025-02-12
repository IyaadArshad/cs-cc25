import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Briefcase,
  Plane,
  FileQuestion,
} from "lucide-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { cardData, furtherSteps } from "./homeData";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import React from 'react';

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
}

function TaskQuestion({ question, emphasisText, options, onSave, onExit }: TaskQuestionProps) {
  const [selectedOption, setSelectedOption] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
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
    }, 300); // Matches the exit animation duration
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
      {/* Back button and progress bar stay outside animation scope */}
      <div onClick={handleExit} className="absolute top-6 left-6 cursor-pointer flex items-center gap-4 hover:text-gray-300">
        <ArrowLeft className="w-5 h-5 text-white" />
        <span className="text-white">Back</span>
      </div>
      <div className="absolute top-6 right-6">
        <ProgressBar percentage={40} />
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
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6 w-full max-w-4xl">
            {options.map((option) => (
              <Button
                key={option.id}
                variant="outline"
                className={`flex bg-gray-800 border-gray-700 text-white hover:bg-gray-700/50 transition-colors flex-col items-center justify-center gap-4 p-6 border
                  ${option.isWide ? "col-span-2 h-24" : "h-32"}
                  ${selectedOption === option.id ? "border-[#2563eb] bg-blue-500/10 hover:text-white" : "hover:text-white"}`}
                onClick={() => setSelectedOption((curr) => (curr === option.id ? "" : option.id))}
              >
                {option.icon}
                <span className="text-lg font-light">{option.label}</span>
              </Button>
            ))}
          </motion.div>
          <motion.div variants={itemVariants} className="w-full">
            <Button
              className={`mt-2 w-full px-8 text-white border border-gray-700 ${selectedOption ? "bg-gray-800 hover:bg-[#2563eb] transition-colors" : "bg-gray-800/50 text-gray-500"}`}
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
                <button onClick={handleDialogClose} className="px-4 py-2 bg-gray-700/50 hover:bg-gray-600 text-white rounded-lg">
                  Cancel
                </button>
                <button onClick={handleExitAnyway} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg">
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


function ProgressBar({ percentage = 40 }) {
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

function ProgressCircle({ percentage = 40, hideText = false }) {
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
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

interface VisaSelectionProps {
  onSave: (visa: string) => void;
  onExit: () => void;
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
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}

export default function CaseHome() {
  const [overviewMode, setOverviewMode] = useState(false);
  const [userName, setUserName] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // New animation states
  const [isReturning, setIsReturning] = useState(false);
  const [mainViewReady, setMainViewReady] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Remove visaSelectionMode and add generic task state:
  // const [visaSelectionMode, setVisaSelectionMode] = useState(false);
  const [currentTaskStep, setCurrentTaskStep] = useState<string | null>(null);

  useEffect(() => {
    const name = Cookies.get("name");
    if (name) {
      setUserName(name);
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
  }, []);

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

  // Update task save to close the open question:
  const handleTaskSave = (taskId: string, selected: string) => {
    // Handle save logic here
    setCurrentTaskStep(null);
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

    return (
      <TaskQuestion
        question={taskStep.question}
        emphasisText={taskStep.emphasisText}
        options={taskOptions}
        onSave={(selected) => handleTaskSave(currentTaskStep, selected)}
        onExit={() => setCurrentTaskStep(null)}
      />
    );
  }

  if (overviewMode) {
    return (
      <div className="relative flex-1 p-6 overflow-y-auto">
        <div
          onClick={() => setOverviewMode(false)}
          className="absolute top-6 left-6 cursor-pointer flex items-center gap-4 hover:text-gray-300"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
          <span className="text-white">Back</span>
        </div>
        <div className="absolute top-6 right-6">
          <ProgressBar percentage={40} />
        </div>
        <div className="flex flex-col items-center justify-center space-y-6 mt-6">
          <div className="w-full max-w-xl mt-6 space-y-4">
            {furtherSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.06 }} // Reduced from 0.5 + index * 0.1
                className="group hover:cursor-pointer flex items-center justify-between p-4 rounded-lg bg-zinc-900/50 hover:bg-zinc-800 transition-colors"
                onClick={() => step.id && handleTaskClick(step.id)}
              >
                <div className="flex flex-col">
                  <h3 className="text-lg font-medium text-zinc-200">
                    {step.title}
                  </h3>
                  <p className="text-sm text-zinc-400">{step.description}</p>
                </div>
                <button className="p-2 rounded text-white">
                  {" "}
                  {/*bg-white/10 group-hover:bg-white/20 */}
                  <ArrowRight className="w-5 h-5 transform transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            ))}
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
            animate={{ opacity: mainViewReady ? 1 : 0, y: mainViewReady ? 0 : -20 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-4xl text-white text-center mb-3"
          >
            { isReturning 
              ? `Welcome back, ${userName}` 
              : `Welcome, ${userName}` }
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: mainViewReady ? (isTransitioning ? 0 : 1) : 0,
              scale: mainViewReady ? (isTransitioning ? 0.9 : 1) : 0.9
            }}
            transition={{ duration: 0.4, delay: 0.4 }}
            onClick={handleOverviewClick}
            className="cursor-pointer transform transition-transform hover:scale-105 animate-wiggle"
          >
            <ProgressCircle />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: mainViewReady ? (isTransitioning ? 0 : 1) : 0,
              y: mainViewReady ? 0 : 20
            }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="w-full max-w-xl"
          >
            <Carousel className="w-full max-w-sm mt-4">
              <CarouselContent className="-ml-2">
                {cardData.map((item, index) => (
                  <CarouselItem key={index} className="pl-2 basis-3/4 sm:basis-2/3">
                    <Card className="bg-zinc-800/50 border-zinc-700">
                      <CardContent className="flex flex-col items-start justify-center p-4 h-48">
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: mainViewReady ? 1 : 0, x: mainViewReady ? 0 : 20 }}
                          transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                        >
                          <h2 className="text-xl font-normal text-zinc-200 mb-2">
                            {item.title}
                          </h2>
                          <p className="text-sm text-zinc-400 leading-relaxed">
                            {item.content}
                          </p>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </motion.div>
        </div>
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