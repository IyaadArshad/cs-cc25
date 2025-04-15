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

  if (isLoading || !weatherData) {
    return null;
  }

  const temperature = usesFahrenheit
    ? `${weatherData.temperature.fahrenheit}°F`
    : `${weatherData.temperature.celsius}°C`;

  const feelsLike = weatherData.feels_like
    ? usesFahrenheit
      ? `${weatherData.feels_like.fahrenheit}°F`
      : `${weatherData.feels_like.celsius}°C`
    : null;

  return (
    <>
      <div
        className="weather-pill-container flex justify-center"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <motion.div
          className="weather-pill"
          animate={{
            width: isExpanded ? "auto" : "auto",
            height: isExpanded ? "auto" : "32px",
            borderRadius: "20px",
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Basic View - Always visible */}
          <div className="basic-view">
            <span className="weather-icon">
              {weatherData.icon
                ? getWeatherIcon(weatherData.icon)
                : getWeatherIcon("01d")}
            </span>
            <span className="temperature">{temperature}</span>
            <span className="divider">|</span>
            <span className="condition">{weatherData.condition}</span>
          </div>

          {/* Expanded View - Only visible on hover */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="expanded-view"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <hr className="divider-line" />

                <div className="details-grid">
                  {feelsLike && (
                    <div className="detail-item">
                      <Thermometer size={14} className="detail-icon" />
                      <span className="detail-label">Feels like:</span>
                      <span className="detail-value">{feelsLike}</span>
                    </div>
                  )}

                  <div className="detail-item">
                    <Droplets size={14} className="detail-icon" />
                    <span className="detail-label">Humidity:</span>
                    <span className="detail-value">
                      {weatherData.humidity.value}
                      {weatherData.humidity.unit}
                    </span>
                  </div>

                  <div className="detail-item">
                    <Wind size={14} className="detail-icon" />
                    <span className="detail-label">Wind:</span>
                    <span className="detail-value">
                      {weatherData.wind.value} {weatherData.wind.unit}
                    </span>
                  </div>

                  {weatherData.pressure && (
                    <div className="detail-item">
                      <Gauge size={14} className="detail-icon" />
                      <span className="detail-label">Pressure:</span>
                      <span className="detail-value">
                        {weatherData.pressure.value} {weatherData.pressure.unit}
                      </span>
                    </div>
                  )}

                  {weatherData.visibility && (
                    <div className="detail-item">
                      <Eye size={14} className="detail-icon" />
                      <span className="detail-label">Visibility:</span>
                      <span className="detail-value">
                        {weatherData.visibility.value}{" "}
                        {weatherData.visibility.unit}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <style jsx>{`
          .weather-pill-container {
            margin-bottom: 12px;
            z-index: 10;
          }

          .weather-pill {
            background-color: rgba(10, 37, 64, 0.75);
            padding: 6px 16px;
            display: flex;
            flex-direction: column;
            color: white;
            backdrop-filter: blur(4px);
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            cursor: pointer;
          }

          .basic-view {
            display: flex;
            align-items: center;
            white-space: nowrap;
          }

          .weather-icon {
            margin-right: 6px;
            display: flex;
            align-items: center;
          }

          .temperature {
            font-weight: 500;
            font-size: 14px;
          }

          .divider {
            margin: 0 8px;
            opacity: 0.6;
          }

          .condition {
            font-size: 14px;
            opacity: 0.9;
          }

          .divider-line {
            margin: 8px 0;
            border: 0;
            height: 1px;
            background-color: rgba(255, 255, 255, 0.2);
          }

          .details-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px 16px;
            padding: 0 0 6px;
          }

          .detail-item {
            display: flex;
            align-items: center;
            font-size: 12px;
            white-space: nowrap;
          }

          .detail-icon {
            margin-right: 4px;
            opacity: 0.7;
          }

          .detail-label {
            margin-right: 4px;
            opacity: 0.7;
          }

          .detail-value {
            font-weight: 500;
          }
        `}</style>
      </div>
    </>
  );
}