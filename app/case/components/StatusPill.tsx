"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";
import { getWeatherIcon } from "./WeatherIcons";
import { Droplets, Wind, Eye, Thermometer, Gauge, Package, Clock } from "lucide-react";

export interface WeatherData {
  location: string;
  temperature: {
    celsius: number;
    fahrenheit: number;
  };
  condition: string;
  precipitation: {
    value: number;
    unit: string;
  };
  humidity: {
    value: number;
    unit: string;
  };
  wind: {
    value: number;
    unit: string;
  };
  pressure?: {
    value: number;
    unit: string;
  };
  visibility?: {
    value: number | string;
    unit: string;
  };
  feels_like?: {
    celsius: number;
    fahrenheit: number;
  };
  uvi?: number;
  time: string;
  day: string;
  icon?: string;
}

export interface OrderInfo {
  restaurant: string;
  estimatedTime: string;
  status: string;
}

const usTemperatureCountries = [
  "United States", "Antigua and Barbuda", "Bahamas", "Belize", "British Virgin Islands",
  "Cayman Islands", "Cyprus", "Liberia", "Marshall Islands", "Micronesia", "Montserrat",
  "Palau", "Saint Kitts and Nevis", "Turks and Caicos Islands",
];

type StatusPillProps = {
  mode: 'weather' | 'order';
  orderInfo?: OrderInfo;
  onClick?: () => void;
  className?: string;
};

export default function StatusPill({ mode, orderInfo, onClick, className = "" }: StatusPillProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(mode === 'weather');
  const [usesFahrenheit, setUsesFahrenheit] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (mode === 'weather') {
      setIsLoading(true);
      const userCountry = Cookies.get("comingFrom");
      setUsesFahrenheit(userCountry ? usTemperatureCountries.includes(userCountry) : false);

      const userLocation = Cookies.get("location") || "Abu Dhabi";
      let lat = "24.4539";
      let lon = "54.3773";

      const fetchWeather = async () => {
        try {
          const response = await fetch(`/api/v1/weather?location=${encodeURIComponent(userLocation)}&lat=${lat}&lon=${lon}`);
          if (!response.ok) throw new Error("Failed to fetch weather data");
          const data = await response.json();
          setWeatherData(data);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchWeather();
    }
  }, [mode]);

  const pillVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.1 } },
  };

  const expandedVariants = {
    hidden: { opacity: 0, width: 0, scale: 0.8, x: -20 },
    visible: { opacity: 1, width: "auto", scale: 1, x: 0, transition: { duration: 0.2 } }
  };

  if (isLoading && mode === 'weather') return null;
  if (mode === 'weather' && !weatherData) return null;

  const temperature = weatherData
    ? usesFahrenheit
      ? `${weatherData.temperature.fahrenheit}°F`
      : `${weatherData.temperature.celsius}°C`
    : "";

  return (
    <motion.div
      className={`flex justify-center mb-3 ${className}`}
      variants={pillVariants}
      initial="hidden"
      animate="visible"
      onClick={onClick}
    >
      <div 
        className={`pill-container ${mode === 'order' ? "order-active" : "weather-default"}`}
        onMouseEnter={() => mode === 'weather' && setIsExpanded(true)}
        onMouseLeave={() => mode === 'weather' && setIsExpanded(false)}
      >
        {mode === 'order' && orderInfo ? (
          <div className="pill-content">
            <Package size={16} className="icon" />
            <span className="text truncate">{orderInfo.restaurant}</span>
            <span className="divider">|</span>
            <Clock size={14} className="icon" />
            <span className="text">{orderInfo.estimatedTime} min</span>
          </div>
        ) : weatherData ? (
          <div className="pill-content">
            <span className="icon">
              {weatherData.icon ? getWeatherIcon(weatherData.icon) : getWeatherIcon("01d")}
            </span>
            <span className="text font-medium">{temperature}</span>
            <span className="divider">|</span>
            <span className="text condition">{weatherData.condition}</span>
            
            <AnimatePresence mode="sync">
              {isExpanded && (
                <motion.span
                  className="expanded-wrapper"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={expandedVariants}
                >
                  <span className="divider">|</span>
                  <span className="detail">
                    <Droplets size={14} className="detail-icon" />
                    <span>{weatherData.humidity.value}%</span>
                  </span>
                  <span className="divider">|</span>
                  <span className="detail">
                    <Wind size={14} className="detail-icon" />
                    <span>{weatherData.wind.value} {weatherData.wind.unit}</span>
                  </span>
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        ) : null}
      </div>

      <style jsx>{`
        .pill-container {
          background-color: rgba(10, 37, 64, 0.75);
          backdrop-filter: blur(5px);
          padding: 6px 16px;
          border-radius: 20px;
          display: inline-flex;
          align-items: center;
          color: white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
          overflow: hidden;
          white-space: nowrap;
          height: 32px;
          transition: all 0.3s ease;
        }

        .pill-container.order-active {
          background-color: rgba(37, 99, 235, 0.85);
          box-shadow: 0 3px 10px rgba(37, 99, 235, 0.4);
          cursor: pointer;
        }

        .pill-container.order-active:hover {
          background-color: rgba(29, 78, 216, 0.9);
        }

        .pill-container.weather-default {
          cursor: default;
        }

        .pill-container.weather-default:hover {
          background-color: rgba(10, 37, 64, 0.9);
        }

        .pill-content {
          display: flex;
          align-items: center;
          font-size: 14px;
          height: 100%;
        }

        .expanded-wrapper {
          display: inline-flex;
          align-items: center;
          overflow: hidden;
          height: 100%;
          transform-origin: left center;
        }

        .icon {
          margin-right: 5px;
          opacity: 0.9;
          display: flex;
          align-items: center;
        }

        .text {
          font-size: 14px;
          display: flex;
          align-items: center;
        }

        .text.truncate {
          max-width: 120px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .condition {
          opacity: 0.9;
        }

        .divider {
          margin: 0 8px;
          opacity: 0.5;
        }

        .detail {
          display: inline-flex;
          align-items: center;
          font-size: 13px;
          white-space: nowrap;
        }

        .detail-icon {
          margin-right: 3px;
          opacity: 0.7;
        }
      `}</style>
    </motion.div>
  );
}
