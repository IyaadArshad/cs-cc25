import WeatherPill from "@/components/WeatherPill";

export default function CaseHome() {
  return (    
    <div className="flex-1 p-6">
      <div className="flex flex-col items-center justify-center space-y-6 mt-16">
        {/* Welcome Section */}
        <h1 className="text-4xl text-white text-center">
          Welcome back, {userName}
        </h1>

        {/* Weather Pill */}
        <WeatherPill temperature={22} condition="sunny" />
      </div>
    </div>
  );
}