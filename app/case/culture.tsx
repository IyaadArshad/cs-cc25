"use client";
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { cardsData,
    cardData,
    TraditionsData,
    ClothesData,
    FoodData,
    ReligionData,
 } from "./cultureData";

export default function CaseCulture() {
  const isFirstRender = useRef(true);
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

  return (
    <div ref={containerRef} className="flex-1 p-5 overflow-y-auto">
      <div className="p-2">
        <h1 className="text-2xl font-bold mb-4 text-white">Culture</h1>
        <p className="text-gray-400">
          Emirati culture blends Bedouin traditions, Islamic values, and heritage. Hospitality, family, and community are key. Traditional arts thrive alongside modern advancements.
        </p>
        <div className="p-6">
          {cardsData.map((card, index) => (
            <Card
              key={index}
              className="w-full bg-gray-800 border-gray-700 mb-10 cursor-pointer"
              onClick={() => setSelectedCard(card)}
            >
              <CardHeader className="relative text-white text-lg font-semibold line-clamp-2 pb-2">
                <Image
                  src={card.src}
                  alt={card.alt}
                  className="mb-2 object-cover mx-auto"
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
          ))}
        </div>
      </div>

      {selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 w-full px-4">
          <div>
            {selectedCard.comp === "TraditionsData" && <TraditionsData />}
            {selectedCard.comp === "ClothesData" && <ClothesData />}
            {selectedCard.comp === "FoodData" && <FoodData />}
            {selectedCard.comp === "ReligionData" && <ReligionData />}
            <button
              className="absolute top-4 right-4 bg-gray-700 text-gray-400 hover:text-white hover:bg-gray-600 p-2 rounded-full shadow-lg"
              onClick={() => setSelectedCard(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
