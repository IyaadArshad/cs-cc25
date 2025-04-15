import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Get the query parameters
  const url = new URL(request.url);
  const location = url.searchParams.get("location") || "Abu Dhabi";
  const lat = url.searchParams.get("lat") || "24.4539"; // Default to Abu Dhabi
  const lon = url.searchParams.get("lon") || "54.3773"; // Default to Abu Dhabi

  try {
    // Get API key from environment variable
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      throw new Error("OpenWeather API key is not configured");
    }

    // Fetch data from OpenWeather API
    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&units=metric&appid=${apiKey}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour (3600 seconds)
    );

    if (!response.ok) {
      throw new Error(`Weather API responded with status: ${response.status}`);
    }

    const openWeatherData = await response.json();

    // Transform data to our application format
    const weatherData = {
      location: location,
      temperature: {
        celsius: Math.round(openWeatherData.current.temp),
        fahrenheit: Math.round((openWeatherData.current.temp * 9) / 5 + 32),
      },
      condition: openWeatherData.current.weather[0].main,
      precipitation: {
        value: openWeatherData.current.rain
          ? openWeatherData.current.rain["1h"]
          : 0,
        unit: "%",
      },
      humidity: {
        value: openWeatherData.current.humidity,
        unit: "%",
      },
      wind: {
        value: Math.round(openWeatherData.current.wind_speed),
        unit: "km/h",
      },
      pressure: {
        value: openWeatherData.current.pressure,
        unit: "hPa",
      },
      visibility: {
        value: (openWeatherData.current.visibility / 1000).toFixed(1),
        unit: "km",
      },
      feels_like: {
        celsius: Math.round(openWeatherData.current.feels_like),
        fahrenheit: Math.round(
          (openWeatherData.current.feels_like * 9) / 5 + 32
        ),
      },
      uvi: openWeatherData.current.uvi,
      time: new Date(openWeatherData.current.dt * 1000).toLocaleTimeString(
        "en-US",
        {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }
      ),
      day: new Date(openWeatherData.current.dt * 1000).toLocaleDateString(
        "en-US",
        { weekday: "long" }
      ),
      icon: openWeatherData.current.weather[0].icon,
    };

    return NextResponse.json(weatherData);
  } catch (error) {
    console.error("Weather API error:", error);

    // Fallback to mock data if API call fails
    const mockData = {
      location: location,
      temperature: {
        celsius: 37,
        fahrenheit: 98.6,
      },
      condition: "Clear",
      precipitation: {
        value: 0,
        unit: "%",
      },
      humidity: {
        value: 20,
        unit: "%",
      },
      wind: {
        value: 11,
        unit: "km/h",
      },
      pressure: {
        value: 1013,
        unit: "hPa",
      },
      visibility: {
        value: 10.0,
        unit: "km",
      },
      feels_like: {
        celsius: 38,
        fahrenheit: 100.4,
      },
      uvi: 11,
      time: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      day: new Date().toLocaleDateString("en-US", { weekday: "long" }),
      icon: "01d",
    };

    return NextResponse.json(mockData);
  }
}