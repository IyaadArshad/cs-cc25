import React from "react";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion"



interface cardData {
  title: string,
  content: string,
  externalLink: string,
  location: string,
}

interface emergencyServiceData {
  title: string,
  contact: string
}

const emergencyServices: emergencyServiceData[] = [
  {
    title: "Police 👮",
    contact: "999"
  },
  {
    title: "Ambulance 🚑",
    contact: "998"
  },
  {
    title: "Fire 🚒",
    contact: "997"
  },
]
const cardsData: cardData[] = [

  {
    title: "ADDC",
    content: "Where you can pay your water and electricity bills!",
    externalLink: "https://www.addc.ae/en-US/home/pages/AboutUs.aspx",
    location: "/images/addc.jpg"
  },
  {
    title: "DARB",
    content: "Abu Dhabi’s smart mobility platform for real-time public transport, traffic, and parking information.",
    externalLink: "https://darb.qmobility.ae/RucWeb/login",
    location: "/images/darb.png"
  },
  {
    title: "Abu Dhabi Police",
    content: "The law enforcement agency responsible for maintaining security, traffic regulation, and public safety in Abu Dhabi.",
    externalLink: "https://es.adpolice.gov.ae/trafficservices/",
    location: "/images/adpolice.jpg"
  },
  {
    title: "The Entertainer",
    content: "A lifestyle app offering discounts and buy-one-get-one-free deals on dining, entertainment, and leisure activities",
    externalLink: "https://www.theentertainerme.com/en-ae/abu-dhabi-al-ain",
    location: "/images/entertainer.jpg"
  }

]

const MotionCard = motion(Card)

export default function CaseTips() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <div className="flex-1 p-5 overflow-auto h-screen" ref={ref}>
      <h1 className="text-white text-2xl mb-4">
        {" "}
        <b>Tips</b>{" "}
      </h1>
      <h3 className="text-gray-400 text-l mb-6"> The essentials to navigating the UAE</h3>
      <div className="grid grid-cols-2 gap-6">
        {cardsData.map((card, index) => (
          <MotionCard
            key={index}
            className="w-full min-w-[120px] bg-gray-800 border-gray-700 min-h-[200px] select-none cursor-pointer hover:bg-gray-700/50 transition-colors"
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: (i) => ({
                opacity: 1,
                y: 0,
                transition: {
                  delay: i * 0.1,
                  duration: 0.5,
                  ease: "easeOut",
                },
              }),
            }}
            custom={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <CardHeader className="text-white text-lg font-semibold mb-2 line-clamp-2">
              <a href={card.externalLink}>
                <motion.img
                  src={card.location}
                  className="w-full h-36 object-cover rounded-md mb-2"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </a>
              <CardTitle className="text-lg text-center mb-0">
                <p>{card.title}</p>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-400 text-sm line-clamp-3 text-center">
              <p>{card.content}</p>
            </CardContent>
          </MotionCard>
        ))}
      </div>
      <div>
        <h1 className="text-white text-2xl mb-4 mt-10">
          {" "}
          <b>Emergency Service Numbers</b>{" "}
        </h1>
        <div className="grid grid-cols-3 gap-4 mt-6">
        {emergencyServices.map((card, index) =>
          <Card key={index} className=" w-full min-w-[120px] bg-gray-800 border-gray-700 min-h-[50px] select-none cursor-pointer hover:bg-gray-700/50 transition-colors">

              <h3 className="text-lg text-center mb-0 text-whitetext-sm text-center text-white font-semibold whitespace-nowrap">
                {card.title}
              </h3>

              <p className="text-base text-center text-gray-400 font-bold">
                {card.contact}
              </p>
          </Card>
        )}
      </div>
    </div>
      </div>
      
  )
}