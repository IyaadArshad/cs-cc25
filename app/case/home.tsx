import WeatherPill from "@/components/WeatherPill";

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function CaseHome() {
  return (    
    <div className="flex-1 p-6">
      <div className="flex flex-col items-center justify-center space-y-6 mt-16">
        {/* Welcome Section */}
        <h1 className="text-4xl text-white text-center">
          Welcome back, TESTNAME
        </h1>

        {/* Weather Pill */}

        <WeatherPill temperature={22} condition="sunny" />

        <Carousel></Carousel>


      </div>
    </div>
  );
}