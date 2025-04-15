import React from "react";

export const SunIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="6" fill="#FFD700" />
    <path
      d="M12 2V4M12 20V22M4 12H2M6.31 6.31L4.9 4.9M17.69 6.31L19.1 4.9M6.31 17.69L4.9 19.1M17.69 17.69L19.1 19.1M22 12H20"
      stroke="#FFD700"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const CloudSunIcon = ({
  className = "w-5 h-5",
}: {
  className?: string;
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8" cy="8" r="3.5" fill="#FFD700" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.5 18H7C4.79086 18 3 16.2091 3 14C3 11.7909 4.79086 10 7 10C7.11873 10 7.23576 10.0043 7.35108 10.0126C8.15128 7.73507 10.393 6 13 6C16.3137 6 19 8.68629 19 12C19 12.2457 18.9793 12.4863 18.9392 12.7209C20.6134 13.1861 21.818 14.7295 21.9695 16.5641L22 16.9944L21.9947 17.4249C21.9105 17.9705 21.5923 18 17.5 18Z"
      fill="#D1D5DB"
    />
  </svg>
);

export const CloudIcon = ({
  className = "w-5 h-5",
}: {
  className?: string;
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.5 18H7C4.79086 18 3 16.2091 3 14C3 11.7909 4.79086 10 7 10C7.11873 10 7.23576 10.0043 7.35108 10.0126C8.15128 7.73507 10.393 6 13 6C16.3137 6 19 8.68629 19 12C19 12.2457 18.9793 12.4863 18.9392 12.7209C20.6134 13.1861 21.818 14.7295 21.9695 16.5641L22 16.9944L21.9947 17.4249C21.9105 17.9705 21.5923 18 17.5 18Z"
      fill="#D1D5DB"
    />
  </svg>
);

export const CloudRainIcon = ({
  className = "w-5 h-5",
}: {
  className?: string;
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.5 13H7C4.79086 13 3 11.2091 3 9C3 6.79086 4.79086 5 7 5C7.11873 5 7.23576 5.00427 7.35108 5.01264C8.15128 2.73507 10.393 1 13 1C16.3137 1 19 3.68629 19 7C19 7.24566 18.9793 7.4863 18.9392 7.72091C20.6134 8.18608 21.818 9.72954 21.9695 11.5641L22 11.9944L21.9947 12.4249C21.9105 12.9705 21.5923 13 17.5 13Z"
      fill="#D1D5DB"
    />
    <path
      d="M8 16L7 19M12 16L11 19M16 16L15 19"
      stroke="#3B82F6"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const CloudSnowIcon = ({
  className = "w-5 h-5",
}: {
  className?: string;
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.5 13H7C4.79086 13 3 11.2091 3 9C3 6.79086 4.79086 5 7 5C7.11873 5 7.23576 5.00427 7.35108 5.01264C8.15128 2.73507 10.393 1 13 1C16.3137 1 19 3.68629 19 7C19 7.24566 18.9793 7.4863 18.9392 7.72091C20.6134 8.18608 21.818 9.72954 21.9695 11.5641L22 11.9944L21.9947 12.4249C21.9105 12.9705 21.5923 13 17.5 13Z"
      fill="#D1D5DB"
    />
    <path
      d="M8 17V17.01M12 17V17.01M16 17V17.01M8 20V20.01M12 20V20.01M16 20V20.01"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const CloudFogIcon = ({
  className = "w-5 h-5",
}: {
  className?: string;
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.5 9H7C4.79086 9 3 7.20914 3 5C3 2.79086 4.79086 1 7 1C7.11873 1 7.23576 1.00427 7.35108 1.01264C8.15128 -1.26493 10.393 -3 13 -3C16.3137 -3 19 -0.313706 19 3C19 3.24566 18.9793 3.4863 18.9392 3.72091C20.6134 4.18608 21.818 5.72954 21.9695 7.56406L22 7.99443L21.9947 8.42493C21.9105 8.97054 21.5923 9 17.5 9Z"
      fill="#D1D5DB"
    />
    <path
      d="M5 13H19M7 17H17M9 21H15"
      stroke="#D1D5DB"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const CloudThunderIcon = ({
  className = "w-5 h-5",
}: {
  className?: string;
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.5 13H7C4.79086 13 3 11.2091 3 9C3 6.79086 4.79086 5 7 5C7.11873 5 7.23576 5.00427 7.35108 5.01264C8.15128 2.73507 10.393 1 13 1C16.3137 1 19 3.68629 19 7C19 7.24566 18.9793 7.4863 18.9392 7.72091C20.6134 8.18608 21.818 9.72954 21.9695 11.5641L22 11.9944L21.9947 12.4249C21.9105 12.9705 21.5923 13 17.5 13Z"
      fill="#D1D5DB"
    />
    <path
      d="M13 12.5L10 17.5H14L11 22.5"
      stroke="#FFD700"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Map OpenWeather icon codes to our custom icons
export const getWeatherIcon = (iconCode: string, className = "w-5 h-5") => {
  // First digit is for day/night, second digit is for weather condition
  const conditionCode = iconCode.substring(0, 2);

  switch (conditionCode) {
    case "01": // Clear sky
      return <SunIcon className={className} />;
    case "02": // Few clouds
      return <CloudSunIcon className={className} />;
    case "03": // Scattered clouds
    case "04": // Broken clouds
      return <CloudIcon className={className} />;
    case "09": // Shower rain
    case "10": // Rain
      return <CloudRainIcon className={className} />;
    case "11": // Thunderstorm
      return <CloudThunderIcon className={className} />;
    case "13": // Snow
      return <CloudSnowIcon className={className} />;
    case "50": // Mist
      return <CloudFogIcon className={className} />;
    default:
      return <SunIcon className={className} />;
  }
};