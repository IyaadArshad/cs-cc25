"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";
import { getWeatherIcon } from "./WeatherIcons";
import { Droplets, Wind, Eye, Thermometer, Gauge } from "lucide-react";

interface WeatherData {
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

const usTemperatureCountries = [
  "United States",
  "Antigua and Barbuda",
  "Bahamas",
  "Belize",
  "British Virgin Islands",
  "Cayman Islands",
  "Cyprus",
  "Liberia",
  "Marshall Islands",
  "Micronesia",
  "Montserrat",
  "Palau",
  "Saint Kitts and Nevis",
  "Turks and Caicos Islands",
];

export default function WeatherDisplay() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [usesFahrenheit, setUsesFahrenheit] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Check user's country from cookies to determine temperature unit
    const userCountry = Cookies.get("comingFrom");
    setUsesFahrenheit(
      userCountry ? usTemperatureCountries.includes(userCountry) : false
    );

    // Get coordinates from cookie if available
    const userLocation = Cookies.get("location") || "Abu Dhabi";
    // Default coordinates for Abu Dhabi
    let lat = "24.4539";
    let lon = "54.3773";

    // Fetch weather data
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `/api/v1/weather?location=${encodeURIComponent(
            userLocation
          )}&lat=${lat}&lon=${lon}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, []);

  // Entrance animation variants
  const pillVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.1 } },
  };

  // Horizontal expansion variants
  const expandedVariants = {
    collapsed: {
      opacity: 0,
      width: 0,
      marginLeft: 0,
      transition: { duration: 0.4 },
    },
    expanded: {
      opacity: 1,
      width: "auto",
      marginLeft: "8px",
      transition: { duration: 0.4, delay: 0.02 },
    },
  };

  if (isLoading || !weatherData) {
    return null;
  }

  const temperature = usesFahrenheit
    ? `${weatherData.temperature.fahrenheit}°F`
    : `${weatherData.temperature.celsius}°C`;

  const feelsLike = weatherData.feels_like
    ? usesFahrenheit
      ? `${weatherData.feels_like.fahrenheit}°`
      : `${weatherData.feels_like.celsius}°`
    : null;

  return (
    <motion.div
      className="weather-pill-container flex justify-center"
      variants={pillVariants}
      initial="hidden"
      animate="visible"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="weather-pill">
        {/* Basic Info - Always visible */}
        <span className="weather-icon">
          {weatherData.icon
            ? getWeatherIcon(weatherData.icon)
            : getWeatherIcon("01d")}
        </span>
        <span className="temperature">{temperature}</span>
        <span className="divider">|</span>
        <span className="condition">{weatherData.condition}</span>

        {/* Expanded Info - Animates horizontally */}
        <motion.div
          className="expanded-info-wrapper"
          variants={expandedVariants}
          initial="collapsed"
          animate={isExpanded ? "expanded" : "collapsed"}
          aria-hidden={!isExpanded}
        >
          <div className="expanded-info-content">
            {feelsLike && (
              <>
                <span className="divider">|</span>
                <div className="detail-item">
                  <Thermometer size={14} className="detail-icon" />
                  <span className="detail-value">{feelsLike}</span>
                </div>
              </>
            )}
            <span className="divider">|</span>
            <div className="detail-item">
              <Droplets size={14} className="detail-icon" />
              <span className="detail-value">
                {weatherData.humidity.value}%
              </span>
            </div>
            <span className="divider">|</span>
            <div className="detail-item">
              <Wind size={14} className="detail-icon" />
              <span className="detail-value">
                {weatherData.wind.value} {weatherData.wind.unit}
              </span>
            </div>
            {weatherData.pressure && (
              <>
                <span className="divider">|</span>
                <div className="detail-item">
                  <Gauge size={14} className="detail-icon" />
                  <span className="detail-value">
                    {weatherData.pressure.value} {weatherData.pressure.unit}
                  </span>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .weather-pill-container {
          margin-bottom: 12px;
          z-index: 10;
        }

        .weather-pill {
          background-color: rgba(10, 37, 64, 0.75);
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          padding: 6px 16px;
          border-radius: 20px;
          display: inline-flex;
          align-items: center;
          color: white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
          cursor: pointer;
          overflow: hidden;
          white-space: nowrap;
          transition: background-color 0.3s ease;
        }

        .weather-pill:hover {
          background-color: rgba(10, 37, 64, 0.9);
        }

        .weather-icon {
          margin-right: 8px;
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .temperature,
        .condition {
          font-size: 14px;
          flex-shrink: 0;
        }
        .temperature {
          font-weight: 500;
        }
        .condition {
          opacity: 0.9;
        }

        .divider {
          margin: 0 8px;
          opacity: 0.5;
          flex-shrink: 0;
        }

        .expanded-info-wrapper {
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .expanded-info-content {
          display: flex;
          align-items: center;
        }

        .detail-item {
          display: flex;
          align-items: center;
          font-size: 13px;
          flex-shrink: 0;
        }

        .detail-icon {
          margin-right: 3px;
          opacity: 0.7;
        }

        .detail-value {
          font-weight: 400;
          opacity: 0.9;
        }
      `}</style>
    </motion.div>
  );
}