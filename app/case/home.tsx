"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Check,
  ArrowLeft,
  X,
  Utensils,
  Car,
  ShoppingBag,
  Receipt,
  MapPin,
  Clock,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { furtherSteps } from "./homeData";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import JSConfetti from "js-confetti";
import { OrderScreen } from "./components/OrderScreen";
import { OrderDetails } from "./components/OrderDetails";
import WeatherDisplay from "./components/WeatherDisplay";

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

export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
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

export default function CaseHome() {
  const [overviewMode, setOverviewMode] = useState(false);
  const [userName, setUserName] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showOrderScreen, setShowOrderScreen] = useState(false);
  const [activeOrder, setActiveOrder] = useState<any>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

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
  const [newsArticles, setNewsArticles] = useState<any[]>([]);
  const [isLoadingNews, setIsLoadingNews] = useState(false);

  // Add state to manage the overlay visibility and selected article
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  // Function to handle article click
  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setIsOverlayVisible(true);
  };

  // Function to close the overlay
  const closeOverlay = () => {
    setIsOverlayVisible(false);
    setSelectedArticle(null);
  };

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
          <span className="text-[#2563eb]">
            <br />
            with Zomato
          </span>
        </>
      ),
      description: "Find restaurants and food delivery options near you",
      icon: <Utensils size={32} />,
      link: "#",
    },
    {
      title: (
        <>
          Call a taxi
          <span className="text-[#2563eb]">
            <br />
            with Careem
          </span>
        </>
      ),
      description: "Book a ride quickly and conveniently across the city",
      icon: <Car size={32} />,
      link: "https://www.careem.com",
    },
    {
      title: (
        <>
          Order groceries
          <span className="text-[#2563eb]">
            <br />
            with Talabat
          </span>
        </>
      ),
      icon: <ShoppingBag size={32} />,
      link: "https://www.talabat.com/uae",
    },
    {
      title: (
        <>
          Pay utilities
          <span className="text-[#2563eb]">
            <br />
            with ADDC
          </span>
        </>
      ),
      icon: <Receipt size={32} />,
      link: "https://www.addc.ae",
    },
    {
      title: (
        <>
          Explore attractions
          <span className="text-[#2563eb]">
            <br />
            on Visit Abu Dhabi
          </span>
        </>
      ),
      description: "Discover local events and activities in Abu Dhabi",
      icon: <MapPin size={32} />,
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
    startIndex: 0,
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

  // Add new useEffect for fetching news articles
  useEffect(() => {
    const fetchNews = async () => {
      if (!mainViewReady) return;

      setIsLoadingNews(true);
      try {
        const response = await fetch("/api/v1/feed");

        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }

        const data = await response.json();
        // Parse date string into a standardized Date object
        const parseArticleDate = (dateStr: string): Date => {
          if (!dateStr) return new Date(0); // Default to epoch if no date

          try {
            return new Date(dateStr);
          } catch (e) {
            console.warn("Could not parse date:", dateStr);
            return new Date(0);
          }
        };

        // Sort by date (newest first)
        const sortedArticles = data.sort((a: any, b: any) => {
          const dateA = parseArticleDate(a.date);
          const dateB = parseArticleDate(b.date);
          return dateB.getTime() - dateA.getTime();
        });

        // Limit to 5 articles
        setNewsArticles(sortedArticles.slice(0, 100));
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsLoadingNews(false);
      }
    };

    fetchNews();
  }, [mainViewReady]);

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

  const handleOrderComplete = (restaurant: any) => {
    setShowOrderScreen(false);
    setActiveOrder({
      restaurant: restaurant.name,
      estimatedTime: "20",
      status: "In Progress",
    });
  };

  // Show spinner during initial load
  if (isInitialLoading) {
    return (
      <div className="flex-1 p-6 overflow-y-auto">
        <LoadingSpinner />
      </div>
    );
  }

  // Show order screen if it's active
  if (showOrderScreen) {
    return (
      <OrderScreen
        onClose={() => setShowOrderScreen(false)}
        onOrderComplete={handleOrderComplete}
      />
    );
  }

  // Show order details if active
  if (showOrderDetails && activeOrder) {
    return (
      <OrderDetails
        order={activeOrder}
        onClose={() => setShowOrderDetails(false)}
      />
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
    <div className="flex-1 overflow-y-auto relative">
      {/* Weather gradient background */}
      <div className="weather-gradient">
        <div className="p-6">
          {activeOrder && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800 rounded-lg p-4 mb-6 cursor-pointer hover:bg-gray-700/70 transition-all"
              onClick={() => setShowOrderDetails(true)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">
                    {activeOrder.restaurant}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Order {activeOrder.status}
                  </p>
                </div>
                <div className="text-blue-400 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Delivery in ~{activeOrder.estimatedTime} mins</span>
                </div>
              </div>
            </motion.div>
          )}

          <div className="flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              {/* Weather Pill - "The Island" - Positioned ABOVE welcome text */}
              {!isInitialLoading && mainViewReady && !currentTaskStep && !showOrderScreen && !showOrderDetails && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="mb-3"
                >
                  <WeatherDisplay />
                </motion.div>
              )}
              
              <motion.h1
                key="welcome-title"
                initial={{ opacity: 0, y: -20 }}
                animate={{
                  opacity: mainViewReady ? 1 : 0,
                  y: mainViewReady ? 0 : -20,
                }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="text-4xl text-white text-center mb-4"
              >
                {isReturning ? `Welcome back, ${userName}` : `Welcome, ${userName}`}
              </motion.h1>

              <motion.div
                key="progress-circle"
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
            </AnimatePresence>
          </div>

          {/* Section Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.8 }}
            animate={{
              opacity: mainViewReady ? 1 : 0,
              scaleX: mainViewReady ? 1 : 0.8,
            }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="w-full flex items-center gap-4 mt-8"
          >
            <div className="h-px bg-gray-700 flex-grow"></div>
          </motion.div>

          {/* Quick Actions Carousel */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: mainViewReady ? 1 : 0,
              y: mainViewReady ? 0 : 20,
            }}
            transition={{ duration: 0.4, delay: 0.55 }}
            className="text-2xl mt-4 text-white"
          >
            Quick Actions
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: mainViewReady ? 1 : 0,
              y: mainViewReady ? 0 : 20,
            }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="w-full mt-6"
          >
            <Carousel
              opts={carouselOptions}
              className="w-full cursor-grab active:cursor-grabbing"
            >
              <CarouselContent className="select-none px-2 -ml-1">
                {quickActions.map((action, index) => (
                  <CarouselItem
                    key={index}
                    className={`pl-2 ${
                      index === 0 ? "ml-1" : ""
                    } basis-[60%] min-w-[200px] sm:basis-1/3 md:basis-[28%] lg:basis-[20%] xl:basis-1/6 max-w-[250px]`}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className="h-full"
                    >
                      <Card
                        className="bg-gray-800 border-gray-700 h-[130px] w-full select-none cursor-pointer hover:bg-gray-700/50 transition-colors"
                        onClick={() =>
                          index === 0
                            ? setShowOrderScreen(true)
                            : window.open(action.link, "_blank")
                        }
                      >
                        <CardContent className="p-3 flex flex-col text-left justify-center h-full">
                          <div className="flex flex-col items-start">
                            <div className="text-[#2563eb] mb-3">{action.icon}</div>
                            <h1 className="text-white font-semibold text-lg leading-normal">
                              {action.title}
                            </h1>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0.8 }}
            animate={{
              opacity: mainViewReady ? 1 : 0,
              scaleX: mainViewReady ? 1 : 0.8,
            }}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="w-full flex items-center gap-4 mt-8"
          >
            <div className="h-px bg-gray-700 flex-grow"></div>
          </motion.div>

          {/* News & Stories Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: mainViewReady ? 1 : 0,
              y: mainViewReady ? 0 : 20,
            }}
            transition={{ duration: 0.4, delay: 0.8 }}
            className="w-full"
          >
            <h2 className="text-2xl text-white mb-4 mt-4">For You</h2>

            <div className="space-y-4">
              {/* Articles */}
              {isLoadingNews ? (
                <div className="flex justify-center py-4">
                  <div className="w-6 h-6 border-2 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                </div>
              ) : (
                newsArticles.map((article, index) => (
                  <motion.div
                    key={`news-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    onClick={() => handleArticleClick(article)}
                  >
                    <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700/50 cursor-pointer transition-colors">
                      <div className="flex p-3">
                        <div className="flex-shrink-0">
                          <div className="w-[100px] h-[70px] rounded-md overflow-hidden bg-gray-700">
                            <img
                              src={article.urlToImage || ""}
                              alt={article.title || "News article"}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="ml-4 flex flex-col justify-between flex-1">
                          <h3 className="text-white font-medium line-clamp-2 text-sm">
                            {article.title}
                          </h3>
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-blue-400">
                              {article.source.name || "News Source"}
                            </span>
                            <span className="mx-2 text-gray-500">•</span>
                            <span className="text-xs text-gray-400">
                              {(() => {
                                const publishedDate = new Date(article.publishedAt);
                                if (isNaN(publishedDate.getTime())) {
                                  return "Invalid date";
                                }
                                const now = new Date();
                                const diffInMs =
                                  now.getTime() - publishedDate.getTime();
                                const diffInHours = Math.floor(
                                  diffInMs / (1000 * 60 * 60)
                                );
                                if (diffInHours < 24) {
                                  return `${diffInHours}h ago`;
                                } else {
                                  const diffInDays = Math.floor(diffInHours / 24);
                                  return `${diffInDays}d ago`;
                                }
                              })()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Add the overlay component */}
      {isOverlayVisible && selectedArticle && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-gray-800 p-6 rounded-lg max-w-lg w-full relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="text-black px-4 absolute font-extrabold bg-white rounded-full p-1 bottom-5 right-4"
              onClick={closeOverlay}
            >
              Close
            </button>
            <h2 className="text-white text-xl font-bold mb-4">
              {selectedArticle.title}
            </h2>
            <p className="text-gray-300 mb-4">
              {selectedArticle.description || "No summary available."}
            </p>
            <a
              href={selectedArticle.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Read full article
            </a>
          </motion.div>
        </motion.div>
      )}

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
      {/* Add custom styles for the gradient and animations */}
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
        
        .weather-gradient {
          background: linear-gradient(180deg, #1e40af 0%, rgba(30, 64, 175, 0) 300px);
          position: relative;
          min-height: 100%;
        }
      `}</style>
    </div>
  );
}