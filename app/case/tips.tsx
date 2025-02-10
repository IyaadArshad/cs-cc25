import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion"; // added import

interface cardData {
  title: string,
  content: string,
  externalLink: string,
  location: string,
}

const cardsData: cardData[] = [

  {
    title: "ADDC",
    content: "Where you can pay your water and electricity bills!",
    externalLink: "https://www.addc.ae/en-US/home/pages/AboutUs.aspx",
    location: "/img/tips/abuDhabiDistributionCompany.png"
  },
  {
    title: "DARB",
    content: "Abu Dhabi’s smart mobility platform for real-time public transport, traffic, and parking information.",
    externalLink: "https://darb.qmobility.ae/RucWeb/login",
    location: "/img/tips/darb.png"
  },
  {
    title: "AD Police",
    content: "The law enforcement agency responsible for maintaining security, traffic regulation, and public safety in Abu Dhabi.",
    externalLink: "https://es.adpolice.gov.ae/trafficservices/",
    location: "/img/tips/abuDhabiPolice.png"
  },
  {
    title: "The Entertainer",
    content: "A lifestyle app offering discounts and buy-one-get-one-free deals on dining, entertainment, and leisure activities",
    externalLink: "https://www.theentertainerme.com/en-ae/abu-dhabi-al-ain",
    location: "/img/tips/entertainer.png"
  }

]

// Updated cardVariants with sequential delay offset (starting at 0.15 for the first card)
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + custom * 0.05 }
  })
};

export default function CaseTips() {
  return (
    <div className="flex-1 p-6 overflow-auto h-screen">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="text-white text-2xl mb-4"
      >
        <b>Tips</b>
      </motion.h1>
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-gray-400 text-l mb-6"
      >
        The essentials to navigating the UAE
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
            <Card className="w-full min-w-[120px] bg-gray-800 border-gray-700 min-h-[280px] select-none cursor-pointer hover:bg-gray-700/50 transition-colors flex flex-col">
              <CardHeader className="text-white text-lg font-semibold line-clamp-2 pb-2">
                <a href={card.externalLink} className="flex justify-center items-center">
                  <img
                    src={card.location}
                    className="object-cover mb-2"
                    width={"72px"}
                    height={"72px"}
                  />
                </a>
                <CardTitle className="text-lg text-center">
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-400 text-sm text-center pt-0 flex-1 flex items-center justify-center px-4">
                <p className="line-clamp-4">{card.content}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}