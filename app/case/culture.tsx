"use client";
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cardsData, cardData, TraditionsData, ClothesData, FoodData, ReligionData } from "./cultureData";
import { ArrowLeft } from "lucide-react";

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
  }, [selectedCard]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const renderCardContent = () => {
    if (!selectedCard) return null;
    
    return (
      <div className="text-gray-300 space-y-6">
        {selectedCard.comp === "TraditionsData" && <TraditionsContent />}
        {selectedCard.comp === "ClothesData" && <ClothesContent />}
        {selectedCard.comp === "FoodData" && <FoodContent />}
        {selectedCard.comp === "ReligionData" && <ReligionContent />}
      </div>
    );
  };

  const TraditionsContent = () => (
    <div className="prose prose-invert max-w-none">
      <TraditionsData />
    </div>
  );
  
  const ClothesContent = () => (
    <div className="prose prose-invert max-w-none">
      <ClothesData />
    </div>
  );
  
  const FoodContent = () => (
    <div className="prose prose-invert max-w-none">
      <FoodData />
    </div>
  );
  
  const ReligionContent = () => (
    <div className="prose prose-invert max-w-none">
      <ReligionData />
    </div>
  );

  return (
    <div ref={containerRef} className="flex-1 p-5 overflow-y-auto">
      <AnimatePresence mode="wait">
        {selectedCard ? (
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="pb-10"
          >
            {/* Detail View */}
            <div className="flex items-center gap-4 mb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCard(null)}
                className="flex items-center gap-2 text-white hover:text-blue-400"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </motion.button>
            </div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-white text-4xl font-bold mb-8"
            >
              {selectedCard.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="relative w-full h-[300px] mb-8"
            >
              <img
                src={selectedCard.src}
                alt={selectedCard.alt}
                className="w-full h-full object-cover rounded-lg"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {selectedCard.content}
              </p>
              
              {/* Render the detailed content directly here */}
              {renderCardContent()}
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCard(null)}
              className="w-full py-4 mt-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg flex items-center justify-center"
            >
              Back to Culture
            </motion.button>
          </motion.div>
        ) : (
          <div className="p-2">
            <h1 className="text-2xl font-bold mb-4 text-white">Culture</h1>
            <p className="text-gray-400 mb-6">
              Emirati culture blends Bedouin traditions, Islamic values, and heritage. Hospitality, family, and community are key. Traditional arts thrive alongside modern advancements.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cardsData.map((card, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className="w-full h-full bg-gray-800 border-gray-700 cursor-pointer hover:bg-gray-700/50 transition-colors"
                    onClick={() => setSelectedCard(card)}
                  >
                    <CardHeader className="relative text-white text-lg font-semibold line-clamp-2 pb-2">
                      <div className="w-full h-36 relative mb-2">
                        <Image
                          src={card.src}
                          alt={card.alt}
                          className="object-cover rounded-2xl"
                          fill
                          sizes="(max-width: 768px) 100vw, 300px"
                        />
                      </div>
                      <CardTitle className="text-lg p-2 text-center m-0">
                        {card.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-gray-400 text-sm text-center items-center justify-center">
                      <p className="line-clamp-3">{card.content}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
