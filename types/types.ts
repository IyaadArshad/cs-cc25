export type WeatherCondition = "sunny" | "cloudy" | "rainy";

export interface WeatherPillProps {
  temperature: number;
  condition: WeatherCondition;
}

export interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  plainIcon?: boolean;
}

export type Tab = "home" | "discover" | "chat" | "apps" | "profile";