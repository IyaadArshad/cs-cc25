"use client";
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  cardsData,
  TraditionsData,
  ClothesData,
  FoodData,
  ReligionData,
} from "./cultureData";
import { ArrowLeft, Search, BookOpen, MapPin, Bus, Utensils, HelpCircle, Map } from "lucide-react";

export interface cardData {
  id: string;
  title: string;
  content: string;
  src: string;
  alt: string;
  comp: string;
}

const guideCategories = [
  {
    id: "welcome",
    title: "Welcome",
    icon: <BookOpen className="w-4 h-4" />,
    description: "Your essential guide to visiting and living in Abu Dhabi.",
    cards: [
      {
        id: "welcome-1",
        title: "About Abu Dhabi",
        src: "/images/abudhabi-skyline.jpg",
        alt: "Abu Dhabi Skyline",
        content: "Abu Dhabi is the capital of the United Arab Emirates and offers a blend of traditional heritage and modern innovation.",
        comp: "AboutData"
      },
      {
        id: "welcome-2",
        title: "Travel Tips",
        src: "/images/travel-tips.jpg",
        alt: "Travel Tips",
        content: "Practical information to help you prepare for your visit or move to Abu Dhabi.",
        comp: "TravelTipsData"
      },
      {
        id: "welcome-3",
        title: "Safety & Regulations",
        src: "/images/safety.jpg",
        alt: "Safety Information",
        content: "Important safety information and local regulations to be aware of during your stay.",
        comp: "SafetyData"
      }
    ]
  },
  {
    id: "culture",
    title: "Culture",
    icon: <BookOpen className="w-4 h-4" />,
    description: "Emirati culture blends Bedouin traditions, Islamic values, and heritage. Hospitality, family, and community are key.",
    cards: cardsData // Reusing existing culture cards
  },
  {
    id: "getting-around",
    title: "Getting Around",
    icon: <Bus className="w-4 h-4" />,
    description: "Transportation options and guidance for navigating Abu Dhabi with ease.",
    cards: [
      {
        id: "transport-1",
        title: "Public Transport",
        src: "/images/public-transport.jpg",
        alt: "Public Transport",
        content: "Information about buses, taxis, and other public transportation options in Abu Dhabi.",
        comp: "TransportData"
      },
      {
        id: "transport-2",
        title: "Driving in Abu Dhabi",
        src: "/images/driving.jpg",
        alt: "Driving",
        content: "Essential information for renting a car and driving in Abu Dhabi.",
        comp: "DrivingData"
      },
      {
        id: "transport-3",
        title: "Walking & Cycling",
        src: "/images/cycling.jpg",
        alt: "Cycling",
        content: "Options for walking and cycling around the city and popular recreational routes.",
        comp: "WalkingData"
      }
    ]
  },
  {
    id: "dining",
    title: "Dining",
    icon: <Utensils className="w-4 h-4" />,
    description: "Discover the diverse culinary scene of Abu Dhabi from traditional Emirati cuisine to international restaurants.",
    cards: [
      {
        id: "dining-1",
        title: "Local Cuisine",
        src: "/images/local-cuisine.jpg",
        alt: "Local Cuisine",
        content: "Traditional Emirati dishes and where to find the best local dining experiences.",
        comp: "LocalCuisineData"
      },
      {
        id: "dining-2",
        title: "International Restaurants",
        src: "/images/international-restaurants.jpg", 
        alt: "International Restaurants",
        content: "A guide to the diverse international dining options available in Abu Dhabi.",
        comp: "InternationalData"
      },
      {
        id: "dining-3",
        title: "Cafés & Desserts",
        src: "/images/cafes.jpg",
        alt: "Cafés",
        content: "The best cafés and dessert spots to enjoy in Abu Dhabi.",
        comp: "CafesData"
      }
    ]
  },
  {
    id: "attractions",
    title: "Attractions",
    icon: <MapPin className="w-4 h-4" />,
    description: "Explore the top attractions and activities that Abu Dhabi has to offer.",
    cards: [
      {
        id: "attractions-1", 
        title: "Cultural Sites",
        src: "/images/cultural-sites.jpg",
        alt: "Cultural Sites",
        content: "Discover the rich cultural heritage of Abu Dhabi through its museums and historical sites.",
        comp: "CulturalSitesData"
      },
      {
        id: "attractions-2",
        title: "Theme Parks",
        src: "/images/theme-parks.jpg",
        alt: "Theme Parks",
        content: "Family-friendly theme parks and entertainment venues in Abu Dhabi.",
        comp: "ThemeParksData"
      },
      {
        id: "attractions-3",
        title: "Natural Wonders",
        src: "/images/natural-wonders.jpg",
        alt: "Natural Wonders",
        content: "Explore the natural beauty of Abu Dhabi from deserts to mangrove forests.",
        comp: "NaturalWondersData"
      }
    ]
  }
];

export default function GuideSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState("welcome");
  const [selectedCard, setSelectedCard] = useState<cardData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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
  }, [selectedCard, selectedTab]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.05 }
    })
  };

  const filteredCategories = searchQuery
    ? guideCategories.map(category => ({
        ...category,
        cards: category.cards.filter(card => 
          card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          card.content.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.cards.length > 0)
    : guideCategories;

  // Placeholder component for content that doesn't exist yet
  const PlaceholderContent = ({ title }: { title: string }) => (
    <div className="prose prose-invert max-w-none">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p>
        This section is currently under development. Soon you'll find detailed information about {title.toLowerCase()} here.
      </p>
      <p>
        Please check back later for updates or contact our support team for immediate assistance.
      </p>
    </div>
  );

  // Function to determine which component to render
  const renderCardContent = () => {
    if (!selectedCard) return null;

    switch(selectedCard.comp) {
      case "TraditionsData": return <div className="prose prose-invert max-w-none"><TraditionsData /></div>;
      case "ClothesData": return <div className="prose prose-invert max-w-none"><ClothesData /></div>;
      case "FoodData": return <div className="prose prose-invert max-w-none"><FoodData /></div>;
      case "ReligionData": return <div className="prose prose-invert max-w-none"><ReligionData /></div>;
      default: return <PlaceholderContent title={selectedCard.title} />;
    }
  };

  return (
    <div ref={containerRef} className="flex-1 p-5 overflow-y-auto bg-gray-900">
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
                <span>Back to Guide</span>
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
              Back to Guide
            </motion.button>
          </motion.div>
        ) : (
          <div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold mb-3 text-white">Abu Dhabi Visitor Guide</h1>
              <p className="text-gray-400 mb-6">
                Everything you need to know about visiting and living in Abu Dhabi. Find information about local culture, transportation, attractions, and more.
              </p>
              
              {/* Search box */}
              <div className="relative mb-8">
                <Search className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search the guide..."
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    className="absolute right-3 top-3 text-gray-400 hover:text-white"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear
                  </button>
                )}
              </div>
            </motion.div>

            {searchQuery ? (
              // Search Results
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">Search Results</h2>
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category, categoryIndex) => (
                    <div key={category.id} className="mb-10">
                      <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                        {category.icon}
                        <span className="ml-2">{category.title}</span>
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {category.cards.map((card, index) => (
                          <motion.div
                            key={card.id}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            custom={index + (categoryIndex * 3)}
                          >
                            <Card
                              className="w-full h-full bg-gray-800 border-gray-700 cursor-pointer hover:bg-gray-700/50 transition-colors"
                              onClick={() => setSelectedCard(card as cardData)}
                            >
                              <CardHeader className="relative text-white text-lg font-semibold pb-2">
                                <div className="w-full h-36 relative mb-2">
                                  <Image
                                    src={card.src}
                                    alt={card.alt}
                                    className="object-cover rounded-lg"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 300px"
                                  />
                                </div>
                                <CardTitle className="text-lg p-2 text-center m-0">
                                  {card.title}
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="text-gray-400 text-sm text-center">
                                <p className="line-clamp-3">{card.content}</p>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <HelpCircle className="w-16 h-16 mx-auto text-gray-600 mb-4" />
                    <h3 className="text-xl font-medium text-white mb-2">No results found</h3>
                    <p className="text-gray-400">
                      We couldn't find any matches for "{searchQuery}". Try different keywords or browse the categories below.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              // Normal view with tabs
              <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab} className="w-full">
                <TabsList className="w-full bg-gray-800 border border-gray-700 mb-6 overflow-x-auto flex whitespace-nowrap p-1">
                  {guideCategories.map((category) => (
                    <TabsTrigger 
                      key={category.id} 
                      value={category.id}
                      className="flex-1 min-w-fit data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                    >
                      <div className="flex items-center gap-2">
                        {category.icon}
                        <span>{category.title}</span>
                      </div>
                    </TabsTrigger>
                  ))}
                </TabsList>
                {guideCategories.map((category) => (
                  <TabsContent key={category.id} value={category.id} className="mt-0">
                    <div className="p-1">
                      <h2 className="text-2xl font-bold mb-2 text-white">{category.title}</h2>
                      <p className="text-gray-400 mb-6">
                        {category.description}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {category.cards.map((card, index) => (
                          <motion.div
                            key={card.id}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            custom={index}
                          >
                            <Card
                              className="w-full h-full bg-gray-800 border-gray-700 cursor-pointer hover:bg-gray-700/50 transition-colors"
                              onClick={() => setSelectedCard(card as cardData)}
                            >
                              <CardHeader className="relative text-white text-lg font-semibold pb-2">
                                <div className="w-full h-36 relative mb-2">
                                  <Image
                                    src={card.src}
                                    alt={card.alt}
                                    className="object-cover rounded-lg"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 300px"
                                  />
                                </div>
                                <CardTitle className="text-lg p-2 text-center m-0">
                                  {card.title}
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="text-gray-400 text-sm text-center">
                                <p className="line-clamp-3">{card.content}</p>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            )}

            {/* Quick help footer */}
            <div className="mt-12 bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Need Help?</h3>
                <Map className="w-6 h-6 text-blue-400" />
              </div>
              <p className="text-gray-400 mb-4">
                Can't find what you're looking for? Our support team is here to help you navigate Abu Dhabi with ease.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                  Contact Support
                </button>
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md">
                  Download Map
                </button>
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md">
                  Emergency Info
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}