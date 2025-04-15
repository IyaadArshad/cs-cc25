"use client";

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

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
  time: string;
  day: string;
  forecast: Array<{
    day: string;
    high: number;
    low: number;
    condition: string;
  }>;
}

const usTemperatureCountries = [
  "United States", "Antigua and Barbuda", "Bahamas", "Belize", 
  "British Virgin Islands", "Cayman Islands", "Cyprus", "Liberia", 
  "Marshall Islands", "Micronesia", "Montserrat", "Palau", 
  "Saint Kitts and Nevis", "Turks and Caicos Islands"
];

export default function WeatherDisplay() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [usesFahrenheit, setUsesFahrenheit] = useState(false);
  
  useEffect(() => {
    // Check user's country from cookies to determine temperature unit
    const userCountry = Cookies.get('comingFrom');
    setUsesFahrenheit(
      userCountry ? usTemperatureCountries.includes(userCountry) : false
    );
    
    // Fetch weather data
    const fetchWeather = async () => {
      try {
        const userLocation = Cookies.get('location') || 'Abu Dhabi';
        const response = await fetch(`/api/v1/weather?location=${encodeURIComponent(userLocation)}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
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

  return (
    <div className="weather-pill-container flex justify-center -mb-2.5">
      <div className="weather-pill">
        <span className="temperature">{temperature}</span>
        <span className="divider">|</span>
        <span className="condition">{weatherData.condition}</span>
      </div>
      
      <style jsx>{`        
        .weather-pill {
          background-color: #27272A;
          border-radius: 20px;
          padding: 5px 16px;
          display: inline-flex;
          align-items: center;
          color: white;
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
      `}</style>
    </div>
  );
}
