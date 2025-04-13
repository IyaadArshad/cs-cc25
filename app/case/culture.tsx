"use client";
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cardsData, cardData, TraditionsData, ClothesData, FoodData, ReligionData } from "./cultureData";

export default function CaseCulture() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [selectedCard, setSelectedCard] = useState<cardData | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }, 350);

    return () => clearTimeout(timeoutId);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  return (
    <div ref={containerRef} className="flex-1 p-5 overflow-y-auto">
      <div className="p-2">
        <h1 className="text-2xl font-bold mb-4 text-white">Culture</h1>
        <p className="text-gray-400">
          Emirati culture blends Bedouin traditions, Islamic values, and heritage. Hospitality, family, and community are key. Traditional arts thrive alongside modern advancements.
        </p>
        <div className="p-6">
          {cardsData.map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className="w-full bg-gray-800 border-gray-700 cursor-pointer mb-6"
                onClick={() => setSelectedCard(card)}
              >
                <CardHeader className="relative text-white text-lg font-semibold line-clamp-2 pb-2">
                  <Image
                    src={card.src}
                    alt={card.alt}
                    className="mb-2 object-cover mx-auto rounded-2xl"
                    width={300}
                    height={100}
                  />
                  <CardTitle className="text-lg p-2 text-center m-0">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-400 text-sm text-center items-center justify-center">
                  <p className="line-clamp-4">{card.content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedCard && (
          <motion.div
            className="fixed inset-0 bg-black flex items-center justify-center z-50 p-4"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="relative w-full max-w-4xl max-h-full overflow-y-auto bg-black rounded-lg">
              {selectedCard.comp === "TraditionsData" && <TraditionsData />}
              {selectedCard.comp === "ClothesData" && <ClothesData />}
              {selectedCard.comp === "FoodData" && <FoodData />}
              {selectedCard.comp === "ReligionData" && <ReligionData />}
              <button
                className="absolute top-4 right-4 bg-gray-700 hover:text-white hover:bg-gray-600 p-1 text-sm font-bold rounded-full shadow-lg"
                onClick={() => setSelectedCard(null)}
              >
                <p className="text-sm font-extrabold text-white p-1">
                  Close
                </p>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
