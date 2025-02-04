import { WeatherPillProps } from "@/types/types";

const weatherIcons = {
    sunny: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="5" fill="currentColor" />
        <path
          d="M12 2V4M12 20V22M4 12H2M22 12H20M19.78 4.22L17.66 6.34M6.34 17.66L4.22 19.78M19.78 19.78L17.66 17.66M6.34 6.34L4.22 4.22"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    cloudy: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.5 19H9C6.79086 19 5 17.2091 5 15C5 12.7909 6.79086 11 9 11C9.12366 11 9.24601 11.0067 9.36706 11.0198C10.0952 9.23499 11.8913 8 14 8C16.7614 8 19 10.2386 19 13C19 13.7286 18.8407 14.4117 18.5579 15.0183C19.3871 15.5424 20 16.4111 20 17.5C20 18.3284 19.3284 19 18.5 19H17.5Z"
          fill="currentColor"
        />
      </svg>
    ),
    rainy: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 18V20M12 18V22M8 18V20M17.5 12H9C6.79086 12 5 10.2091 5 8C5 5.79086 6.79086 4 9 4C9.12366 4 9.24601 4.00674 9.36706 4.01981C10.0952 2.23499 11.8913 1 14 1C16.7614 1 19 3.23858 19 6C19 6.72862 18.8407 7.41169 18.5579 8.0183C19.3871 8.54237 20 9.41111 20 10.5C20 11.3284 19.3284 12 18.5 12H17.5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  };
  
export default function WeatherPill({ temperature, condition }: WeatherPillProps) {
  const Icon = weatherIcons[condition];

  return (
    <div className="flex items-center bg-[#272739] rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.5)] px-4 py-2 space-x-2">
      <div className="text-yellow-400 drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">
        {Icon}
      </div>
      <span className="text-sm font-semibold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        {temperature}°
      </span>
      <span className="text-xs font-medium text-gray-200 capitalize drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        {condition}
      </span>
    </div>
  );
}