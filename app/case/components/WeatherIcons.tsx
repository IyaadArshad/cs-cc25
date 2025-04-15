import React from 'react';

export const SunIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="5" fill="#FFD700" />
    <path d="M12 2V4M12 20V22M4 12H2M6.31 6.31L4.9 4.9M17.69 6.31L19.1 4.9M6.31 17.69L4.9 19.1M17.69 17.69L19.1 19.1M22 12H20" 
      stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const CloudSunIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="7" r="3" fill="#FFD700" />
    <path d="M9 2V3.5M3.5 7H2M5 3.5L4 2.5M13 3.5L14 2.5M5 10.5L4 11.5M13 10.5L14 11.5M15.5 7H14" 
      stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6.5 15.5C4.84 15.5 3.5 14.16 3.5 12.5C3.5 10.84 4.84 9.5 6.5 9.5C6.62 9.5 6.73 9.51 6.85 9.52C7.38 7.5 9.29 6 11.5 6C14.26 6 16.5 8.24 16.5 11C16.5 11.25 16.47 11.5 16.43 11.73C16.8 11.58 17.18 11.5 17.6 11.5C19.37 11.5 20.81 12.89 20.9 14.65L21 16.5H3L3.1 14.65C3.15 13.77 3.6 13 4.25 12.52C4.83 11.87 5.62 11.5 6.5 11.5C7.56 11.5 8.5 12.06 9.05 12.9C8.18 13.65 7.6 14.75 7.6 16H9.7C9.75 15.81 9.82 15.63 9.91 15.46C10.26 14.76 10.83 14.19 11.54 13.87C11.98 13.68 12.47 13.59 12.96 13.62M17.6 16L17.6 16.01" 
      fill="#D1D5DB" />
  </svg>
);

export const CloudIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 18.5H19C21.21 18.5 23 16.71 23 14.5C23 12.29 21.21 10.5 19 10.5C18.79 10.5 18.59 10.52 18.39 10.55C17.9 8.07 15.69 6.25 13 6.25C9.82 6.25 7.25 8.82 7.25 12C7.25 12.43 7.3 12.84 7.39 13.23C5.45 13.43 4 15.09 4 17.12C4 17.95 4.28 18.74 4.81 19.35C5.34 19.97 6.08 18.5 7 18.5" 
      fill="#D1D5DB" />
  </svg>
);

export const CloudRainIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 13.5H19C21.21 13.5 23 11.71 23 9.5C23 7.29 21.21 5.5 19 5.5C18.79 5.5 18.59 5.52 18.39 5.55C17.9 3.07 15.69 1.25 13 1.25C9.82 1.25 7.25 3.82 7.25 7C7.25 7.43 7.3 7.84 7.39 8.23C5.45 8.43 4 10.09 4 12.12C4 12.95 4.28 13.74 4.81 14.35C5.34 14.97 6.08 13.5 7 13.5" 
      fill="#D1D5DB" />
    <path d="M8 18L7 20M12 18L11 20M16 18L15 20" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const CloudSnowIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 13.5H19C21.21 13.5 23 11.71 23 9.5C23 7.29 21.21 5.5 19 5.5C18.79 5.5 18.59 5.52 18.39 5.55C17.9 3.07 15.69 1.25 13 1.25C9.82 1.25 7.25 3.82 7.25 7C7.25 7.43 7.3 7.84 7.39 8.23C5.45 8.43 4 10.09 4 12.12C4 12.95 4.28 13.74 4.81 14.35C5.34 14.97 6.08 13.5 7 13.5" 
      fill="#D1D5DB" />
    <path d="M8 18V18.01M12 18V18.01M16 18V18.01M8 21V21.01M12 21V21.01M16 21V21.01" 
      stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const CloudFogIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 9.5H19C21.21 9.5 23 7.71 23 5.5C23 3.29 21.21 1.5 19 1.5C18.79 1.5 18.59 1.52 18.39 1.55C17.9 -0.93 15.69 -2.75 13 -2.75C9.82 -2.75 7.25 -0.18 7.25 3C7.25 3.43 7.3 3.84 7.39 4.23C5.45 4.43 4 6.09 4 8.12C4 8.95 4.28 9.74 4.81 10.35C5.34 10.97 6.08 9.5 7 9.5" 
      fill="#D1D5DB" />
    <path d="M5 14H19M7 18H17M9 22H15" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const CloudLightningIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 13.5H19C21.21 13.5 23 11.71 23 9.5C23 7.29 21.21 5.5 19 5.5C18.79 5.5 18.59 5.52 18.39 5.55C17.9 3.07 15.69 1.25 13 1.25C9.82 1.25 7.25 3.82 7.25 7C7.25 7.43 7.3 7.84 7.39 8.23C5.45 8.43 4 10.09 4 12.12C4 12.95 4.28 13.74 4.81 14.35C5.34 14.97 6.08 13.5 7 13.5" 
      fill="#D1D5DB" />
    <path d="M13 13L10 18H14L11 23" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
