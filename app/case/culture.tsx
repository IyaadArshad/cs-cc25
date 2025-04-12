import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image"

interface cardData {
    title: string;
    content: string;
    src: string;
    alt: string;
}
export default function CaseCulture() {
  const isFirstRender = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);

const cardsData: cardData[] = [
    {
            title: "Emirati Culture and Traditions",
            content:
                    "Explore the rich tapestry of Emirati culture, from traditional Bedouin customs to modern artistic expressions. Discover the values of hospitality, family, and community that define the Emirati identity.",
            src: "/img/culture/cultureVillage.webp",
            alt: "Culture Village"
            },
            {
            title: "Traditional Emirati Wear",
            content:
                    "Uncover the significance of traditional Emirati clothing, such as the Kandura for men and the Abaya for women. Learn how these garments reflect cultural pride, religious values, and the desert environment.",
            src: "/img/culture/kandura.jpg",
            alt: "Kandura"
            },
            {
            title: "Emirati Food",
            content:
                    "Indulge in the flavors of Emirati cuisine, a delightful fusion of Middle Eastern, Persian, and Indian influences. From savory dishes like Machboos to sweet treats like Luqaimat, experience the culinary heritage of the UAE.",
            src: "/img/culture/luqaimat.jpg",
            alt: "Luqaimat"
            },
            {
            title: "Religious Values and Beliefs",
            content:
                    "Delve into the role of Islam in shaping Emirati society and values. Discover the importance of faith, compassion, and generosity in daily life, and explore the stunning mosques and religious sites that showcase Islamic art and architecture.",
            src: "/img/culture/zayedMosque.jpg",
            alt: "Sheikh Zayed Mosque Main Hall"
            } 
]

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }, 350);

    return () => clearTimeout(timeoutId);
  },);
  return (
    <div ref={containerRef} className="flex-1 p-5 overflow-y-auto">
        
        <div className="p-2">
            <h1 className="text-2xl font-bold mb-4 text-white">Culture</h1>
            <p className="text-gray-400">
                Emirati culture blends Bedouin traditions, Islamic values, and heritage. Hospitality, family, and community are key. Traditional arts thrive alongside modern advancements.
            </p>
            <div className="p-6">
                    {cardsData.map((card, index) => (
                        <Card key={index} className="w-full bg-gray-800 border-gray-700 mb-10">
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
    </div>
  );
}
