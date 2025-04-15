"use client";

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { 
  SunIcon, 
  CloudSunIcon, 
  CloudIcon, 
  CloudRainIcon, 
  CloudSnowIcon, 
  CloudFogIcon, 
  CloudLightningIcon 
} from './WeatherIcons';

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
    
  // Get appropriate weather icon based on condition
  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
      return <SunIcon className="w-5 h-5" />;
    } else if (conditionLower.includes('partly cloudy') || conditionLower.includes('mostly sunny')) {
      return <CloudSunIcon className="w-5 h-5" />;
    } else if (conditionLower.includes('cloud')) {
      return <CloudIcon className="w-5 h-5" />;
    } else if (conditionLower.includes('rain') || conditionLower.includes('shower') || conditionLower.includes('drizzle')) {
      return <CloudRainIcon className="w-5 h-5" />;
    } else if (conditionLower.includes('snow') || conditionLower.includes('sleet') || conditionLower.includes('ice')) {
      return <CloudSnowIcon className="w-5 h-5" />;
    } else if (conditionLower.includes('fog') || conditionLower.includes('haze') || conditionLower.includes('mist')) {
      return <CloudFogIcon className="w-5 h-5" />;
    } else if (conditionLower.includes('thunder') || conditionLower.includes('lightning') || conditionLower.includes('storm')) {
      return <CloudLightningIcon className="w-5 h-5" />;
    } else {
      return <SunIcon className="w-5 h-5" />; // Default to sun
    }
  };

  return (
    <div className="weather-pill-container flex justify-center">
      <div className="weather-pill">
        <span className="weather-icon">{getWeatherIcon(weatherData.condition)}</span>
        <span className="temperature">{temperature}</span>
        <span className="divider">|</span>
        <span className="condition">{weatherData.condition}</span>
      </div>
      
      <style jsx>{`
        .weather-pill-container {
          margin-bottom: 8px;
        }
        
        .weather-pill {
          background-color: rgba(10, 37, 64, 0.75);
          border-radius: 20px;
          padding: 4px 14px;
          display: inline-flex;
          align-items: center;
          color: white;
          backdrop-filter: blur(4px);
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
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
      `}</style>
    </div>
  );
}
