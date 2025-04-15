import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Get the query parameters
  const url = new URL(request.url);
  const location = url.searchParams.get('location') || 'Abu Dhabi';
  
  // In a real implementation, this would call a weather API service
  // For demo purposes, we're returning mock data
  const weatherData = {
    location: location,
    temperature: {
      celsius: 37,
      fahrenheit: 98.6
    },
    condition: 'Clear',
    precipitation: {
      value: 0,
      unit: '%'
    },
    humidity: {
      value: 20,
      unit: '%'
    },
    wind: {
      value: 11,
      unit: 'km/h'
    },
    time: new Date().toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    }),
    day: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
    forecast: [
      { day: 'Tomorrow', high: 38, low: 27, condition: 'Sunny' },
      { day: 'Thursday', high: 39, low: 28, condition: 'Clear' },
      { day: 'Friday', high: 37, low: 26, condition: 'Partly Cloudy' },
    ]
  };

  return NextResponse.json(weatherData);
}
