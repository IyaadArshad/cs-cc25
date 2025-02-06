"use client"

import { useEffect, useRef } from "react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { motion, useAnimation, useInView } from "framer-motion"

interface cardData {
  title: string
  content: string
  externalLink: string
  location: string
}

interface emergencyServiceData {
  title: string
  contact: string
}

interface foodDeliveryService {
  title: string
  externalLink: string
  image: string
}

const foodDeliveryServices: foodDeliveryService[] = [
  {
    title: "Talabat",
    externalLink: "https://talabat.com/uae",
    image: "/images/talabat.png",
  },
  {
    title: "Noon",
    externalLink: "https://noon.com/uae-en",
    image: "/images/noon.svg",
  },
  {
    title: "Deliveroo",
    externalLink: "https://deliveroo.ae",
    image: "/images/deliveroo.png",
  },
]

const emergencyServices: emergencyServiceData[] = [
  {
    title: "Police 👮",
    contact: "999",
  },
  {
    title: "Ambulance 🚑",
    contact: "998",
  },
  {
    title: "Fire 🚒",
    contact: "997",
  },
]

const cardsData: cardData[] = [
  {
    title: "ADDC",
    content: "Where you can pay your water and electricity bills!",
    externalLink: "https://www.addc.ae/en-US/home/pages/AboutUs.aspx",
    location: "/images/addc.png",
  },
  {
    title: "DARB",
    content: "Abu Dhabi's smart mobility platform for real-time public transport, traffic, and parking information.",
    externalLink: "https://darb.qmobility.ae/RucWeb/login",
    location: "/images/darb.png",
  },
  {
    title: "Abu Dhabi Police",
    content:
      "The law enforcement agency responsible for maintaining security, traffic regulation, and public safety in Abu Dhabi.",
    externalLink: "https://es.adpolice.gov.ae/trafficservices/",
    location: "/images/adpolice.png",
  },
  {
    title: "The Entertainer",
    content:
      "A lifestyle app offering discounts and buy-one-get-one-free deals on dining, entertainment, and leisure activities",
    externalLink: "https://www.theentertainerme.com/en-ae/abu-dhabi-al-ain",
    location: "/images/entertainer.png",
  },
]

const MotionCard = motion(Card)

export default function CaseTips() {
  const controls = useAnimation()
  const mainRef = useRef(null)
  const emergencyRef = useRef(null)
  const deliveryRef = useRef(null)
  const isMainInView = useInView(mainRef, { once: true })
  const isEmergencyInView = useInView(emergencyRef, { once: true })
  const isDeliveryInView = useInView(deliveryRef, { once: true })
  const deliveryControls = useAnimation()
  const emergencyControls = useAnimation()

  useEffect(() => {
    if (isMainInView) {
      controls.start("visible")
      // Start emergency services animation after a delay
      setTimeout(() => {
        emergencyControls.start("visible")
        setTimeout(() => {
          deliveryControls.start("visible")
        }, 400)
      }, 1000)
    }
  }, [controls, isMainInView, deliveryControls]) // Added deliveryControls to dependencies

  return (
    <div className="flex-1 p-5 overflow-auto h-screen">
      <h1 className="text-white text-2xl mb-4">
        <b>Tips</b>
      </h1>
      <h3 className="text-gray-400 text-l mb-6">The essentials to navigating the UAE</h3>
      <div className="grid grid-cols-2 gap-6" ref={mainRef}>
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
                  className="w-full h-36  object-fit rounded-md mb-2"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </a>
              <p className="text-lg text-center mb-0">{card.title}</p> {/* Removed CardTitle and used <p> instead */}
            </CardHeader>
            <CardContent className="text-gray-400 text-sm line-clamp-3 text-center">
              <p>{card.content}</p>
            </CardContent>
          </MotionCard>
        ))}
      </div>
      <div>
        <h1 className="text-white text-2xl mb-4 mt-10">
          <b>Emergency Service Numbers</b>
        </h1>
        <div className="grid grid-cols-3 gap-4 mt-6" ref={emergencyRef}>
          {emergencyServices.map((card, index) => (
            <MotionCard
              key={index}
              className="w-full min-w-[120px] bg-gray-800 border-gray-700 min-h-[50px] select-none cursor-pointer hover:bg-gray-700/50 transition-colors"
              initial="hidden"
              animate={emergencyControls}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: (i) => ({
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: i * 0.15,
                    duration: 0.4,
                    ease: "easeOut",
                  },
                }),
              }}
              custom={index}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 className="text-lg text-center mb-0 text-white font-semibold whitespace-nowrap mt-2">{card.title}</h3>
              <p className="text-base text-center text-gray-400 font-bold mb-2">{card.contact}</p>
            </MotionCard>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h1 className="text-white text-2xl mb-4">
          <b>Missing the taste of home?</b>
        </h1>
        <p className="text-gray-400 text-sm mb-6">Don't worry, we got you covered.</p>
        <div className="grid grid-cols-3 gap-4" ref={deliveryRef}>
          {foodDeliveryServices.map((service, index) => (
            <MotionCard
              key={index}
              className="w-full min-w-[120px] bg-gray-800 border-gray-700 min-h-[120px] select-none cursor-pointer hover:bg-gray-700/50 transition-colors"
              initial="hidden"
              animate={deliveryControls}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: (i) => ({
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: i * 0.15,
                    duration: 0.4,
                    ease: "easeOut",
                  },
                }),
              }}
              custom={index}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <a href={service.externalLink} className="block h-full">
                <CardHeader className="text-center">
                  <h3 className="text-lg text-white font-semibold mb-2">{service.title}</h3>
                </CardHeader>
                <CardContent className="flex justify-center items-center">
                  <img
                    className="max-w-[48px] max-h-[48px]"
                    src={service.image || "/placeholder.svg"}
                    alt={`${service.title} logo`}
                  />
                </CardContent>
              </a>
            </MotionCard>
          ))}
        </div>
      </div>
    </div>
  )
}

