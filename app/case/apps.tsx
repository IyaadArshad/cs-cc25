import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, MapPin } from "lucide-react";

interface cardData {
  title: string;
  content: string;
  externalLink: string;
  location: string;
}

const cardsData: cardData[] = [
  {
    title: "The Entertainer",
    content:
      "Discover exclusive discounts on dining, leisure, and entertainment activities.",
    externalLink: "https://www.theentertainerme.com/en-ae/abu-dhabi-al-ain",
    location: "/img/tips/entertainer.png",
  },
  {
    title: "Tripadvisor",
    content: "Read reviews and find the best places in Abu Dhabi.",
    externalLink: "https://www.tripadvisor.com",
    location: "/img/tips/tripadvisor.png",
  },
  {
    title: "Zomato",
    content: "Discover top restaurants and cafes in Abu Dhabi.",
    externalLink: "https://www.zomato.com",
    location: "/img/tips/zomato.png",
  },
  {
    title: "Careem",
    content: "Book rides quickly and conveniently across the city.",
    externalLink: "https://www.careem.com",
    location: "/img/tips/careem.png",
  },
  {
    title: "ADDC",
    content: "Pay your water and electricity bills quickly and securely.",
    externalLink: "https://www.addc.ae/en-US/home/pages/AboutUs.aspx",
    location: "/img/tips/abuDhabiDistributionCompany.png",
  },
  {
    title: "DARB",
    content:
      "Access real-time public transport and traffic information with ease.",
    externalLink: "https://darb.qmobility.ae/RucWeb/login",
    location: "/img/tips/darb.png",
  },
  {
    title: "AD Police",
    content:
      "Connect with Abu Dhabi's trusted police services for prompt assistance.",
    externalLink: "https://es.adpolice.gov.ae/trafficservices/",
    location: "/img/tips/abuDhabiPolice.png",
  },
  {
    title: "Visit Abu Dhabi",
    content: "Plan your trip and explore attractions in Abu Dhabi.",
    externalLink: "https://visitabudhabi.ae",
    location: "/img/tips/visitAbuDhabi.png",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + custom * 0.05 },
  }),
};

export default function CaseApps() {
  const [showLocationDialog, setShowLocationDialog] = useState(false);

  return (
    <div className="flex-1 p-6 overflow-auto h-screen">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="text-white text-2xl mb-4"
      >
        <b>Apps</b>
      </motion.h1>
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-gray-400 text-l mb-6"
      >
        The essentials to navigating{" "}
        <span
          onClick={() => setShowLocationDialog(true)}
          className="inline-flex items-center bg-gray-800 hover:bg-gray-700/50 transition-colors text-white text-md font-medium px-3 py-1 rounded-full cursor-pointer"
        >
          <span className="text-[13px]">Abu Dhabi</span>
          <MapPin className="ml-1 w-3 h-3" />
        </span>
      </motion.h3>
      <div className="grid grid-cols-2 gap-6">
        {cardsData.map((card, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={index}
          >
            <a href={card.externalLink} target="_blank" rel="noreferrer">
              <Card className="w-full min-w-[120px] bg-gray-800 border-gray-700 min-h-[280px] select-none cursor-pointer hover:bg-gray-700/50 transition-colors flex flex-col">
                <CardHeader className="relative text-white text-lg font-semibold line-clamp-2 pb-2">
                  <span rel="noreferrer" className="absolute top-3 right-3">
                    <ExternalLink className="w-4 h-4 text-gray-100/70" />
                  </span>
                  <img
                    src={card.location}
                    className="object-cover mb-2 mx-auto"
                    width={"72px"}
                    height={"72px"}
                  />
                  <CardTitle className="text-lg text-center">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-400 text-sm text-center pt-0 flex-1 flex items-center justify-center px-4">
                  <p className="line-clamp-4">{card.content}</p>
                </CardContent>
              </Card>
            </a>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {showLocationDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-gray-800 p-8 rounded-lg text-center mx-4 max-w-xs"
            >
              <MapPin className="w-16 h-16 text-[#2563eb] mx-auto" />
              <h2 className="mt-4 text-2xl font-bold text-white">
                Location Curation
              </h2>
              <p className="mt-2 text-gray-300">
                We have curated these results based on details including your
                location data.
              </p>
              <button
                onClick={() => setShowLocationDialog(false)}
                className="mt-6 px-4 py-2 bg-gray-700/50 hover:bg-[#2563eb] transition-colors text-white rounded-lg"
              >
                Got it 👍
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}