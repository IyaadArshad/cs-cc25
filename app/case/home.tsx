  import WeatherPill from "@/components/WeatherPill"
  import ProgressCircle from "@/components/progress-circle"
  import { Card, CardContent } from "@/components/ui/card"
  import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
  import { Button } from "@/components/ui/button"
  import { AlertCircle } from "lucide-react"
  import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

  export default function CaseHome() {
    const cardData = [
      {
        title: "Get an Emirates ID",
        content:
          "An Emirates ID grants residents of the UAE a proof of identification and is required for most things in dubai ",
      },
      {
        title: "Open a new bank account",
        content:
          "You will need a UAE bank account for essential daily transactions, Some banks offer free international transfers for the first few months!",
      },
      {
        title: "Set up a mobile SIM card",
        content: "A UAE SIM card is essential for local calls, mobile payments, and OTP verifications",
      },
    ]

    return (
      <div className="flex-1 p-6">
        <div className="flex flex-col items-center justify-center space-y-6 mt-8">
        <h1 className="text-4xl text-white text-center mb-3">Welcome back, TESTNAME</h1>
        
          {/* Progress Circle */}
          <ProgressCircle />

                  {/* Checklist Alert */}
                  <Alert className="bg-zinc-800/50 border-zinc-700 max-w-xl">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Getting Started Checklist</AlertTitle>
            <AlertDescription className="flex items-center justify-between">
              <span>Have you completed the getting started checklist?</span>
              <Button variant="outline" size="sm" className="ml-4">
                Open
              </Button>
            </AlertDescription>
          </Alert>

          {/* Carousel */}
          <Carousel className="w-full max-w-sm">
            <CarouselContent className="-ml-2">
              {cardData.map((item, index) => (
                <CarouselItem key={index} className="pl-2 basis-3/4 sm:basis-2/3">
                  <Card className="bg-zinc-800/50 border-zinc-700">
                    <CardContent className="flex flex-col items-start justify-center p-4 h-48">
                      <h2 className="text-xl font-normal text-zinc-200 mb-2">{item.title}</h2>
                      <p className="text-sm text-zinc-400 leading-relaxed">{item.content}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    )
  }

