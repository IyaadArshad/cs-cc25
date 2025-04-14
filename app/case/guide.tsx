"use client";
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  cardsData,
  TraditionsData,
  ClothesData,
  FoodData,
  ReligionData,
} from "./guideData";
import {
  ArrowLeft,
  Search,
  BookOpen,
  MapPin,
  Bus,
  Utensils,
  HelpCircle,
  Map,
  Home,
  User,
  Calendar,
  ChevronRight,
} from "lucide-react";

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
        content:
          "Abu Dhabi is the capital of the United Arab Emirates and offers a blend of traditional heritage and modern innovation.",
        comp: "AboutData",
      },
      {
        id: "welcome-2",
        title: "Travel Tips",
        src: "/images/travel-tips.jpg",
        alt: "Travel Tips",
        content:
          "Practical information to help you prepare for your visit or move to Abu Dhabi.",
        comp: "TravelTipsData",
      },
      {
        id: "welcome-3",
        title: "Safety & Regulations",
        src: "/images/safety.jpg",
        alt: "Safety Information",
        content:
          "Important safety information and local regulations to be aware of during your stay.",
        comp: "SafetyData",
      },
    ],
  },
  {
    id: "culture",
    title: "Culture",
    icon: <BookOpen className="w-4 h-4" />,
    description:
      "Emirati culture blends Bedouin traditions, Islamic values, and heritage. Hospitality, family, and community are key.",
    cards: cardsData, // Reusing existing culture cards
  },
  {
    id: "getting-around",
    title: "Getting Around",
    icon: <Bus className="w-4 h-4" />,
    description:
      "Transportation options and guidance for navigating Abu Dhabi with ease.",
    cards: [
      {
        id: "transport-1",
        title: "Public Transport",
        src: "/images/public-transport.jpg",
        alt: "Public Transport",
        content:
          "Information about buses, taxis, and other public transportation options in Abu Dhabi.",
        comp: "TransportData",
      },
      {
        id: "transport-2",
        title: "Driving in Abu Dhabi",
        src: "/images/driving.jpg",
        alt: "Driving",
        content:
          "Essential information for renting a car and driving in Abu Dhabi.",
        comp: "DrivingData",
      },
      {
        id: "transport-3",
        title: "Walking & Cycling",
        src: "/images/cycling.jpg",
        alt: "Cycling",
        content:
          "Options for walking and cycling around the city and popular recreational routes.",
        comp: "WalkingData",
      },
    ],
  },
  {
    id: "dining",
    title: "Dining",
    icon: <Utensils className="w-4 h-4" />,
    description:
      "Discover the diverse culinary scene of Abu Dhabi from traditional Emirati cuisine to international restaurants.",
    cards: [
      {
        id: "dining-1",
        title: "Local Cuisine",
        src: "/images/local-cuisine.jpg",
        alt: "Local Cuisine",
        content:
          "Traditional Emirati dishes and where to find the best local dining experiences.",
        comp: "LocalCuisineData",
      },
      {
        id: "dining-2",
        title: "International Restaurants",
        src: "/images/international-restaurants.jpg",
        alt: "International Restaurants",
        content:
          "A guide to the diverse international dining options available in Abu Dhabi.",
        comp: "InternationalData",
      },
      {
        id: "dining-3",
        title: "Cafés & Desserts",
        src: "/images/cafes.jpg",
        alt: "Cafés",
        content: "The best cafés and dessert spots to enjoy in Abu Dhabi.",
        comp: "CafesData",
      },
    ],
  },
  {
    id: "attractions",
    title: "Attractions",
    icon: <MapPin className="w-4 h-4" />,
    description:
      "Explore the top attractions and activities that Abu Dhabi has to offer.",
    cards: [
      {
        id: "attractions-1",
        title: "Cultural Sites",
        src: "/images/cultural-sites.jpg",
        alt: "Cultural Sites",
        content:
          "Discover the rich cultural heritage of Abu Dhabi through its museums and historical sites.",
        comp: "CulturalSitesData",
      },
      {
        id: "attractions-2",
        title: "Theme Parks",
        src: "/images/theme-parks.jpg",
        alt: "Theme Parks",
        content:
          "Family-friendly theme parks and entertainment venues in Abu Dhabi.",
        comp: "ThemeParksData",
      },
      {
        id: "attractions-3",
        title: "Natural Wonders",
        src: "/images/natural-wonders.jpg",
        alt: "Natural Wonders",
        content:
          "Explore the natural beauty of Abu Dhabi from deserts to mangrove forests.",
        comp: "NaturalWondersData",
      },
    ],
  },
];

export default function CaseGuide() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState("welcome");
  const [selectedCard, setSelectedCard] = useState<cardData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isFirstRender = useRef(true);

  const aprilEvents = [
    {
      id: "les-miserables",
      title: "Les Misérables: The Arena Spectacular",
      date: "April 8-20, 2025",
      location: "Etihad Arena, Yas Island",
      description:
        'This adaptation of the classic musical features a cast and orchestra of over 65 performers, delivering an immersive experience with iconic songs like "I Dreamed a Dream" and "One Day More."',
      link: "https://www.etihadarena.ae/en/event-booking/les-miserables-the-arena-spectacular",
      source: "Etihad Arena",
      icon: "🎭",
    },
    {
      id: "club-social",
      title: "Club Social Abu Dhabi",
      date: "April 18-20, 2025",
      location: "Etihad Park, Yas Island",
      description:
        "Three nights of live performances featuring artists such as Usher, Snow Patrol, and The Kooks, providing a mix of pop, rock, and indie hits for attendees.",
      link: "https://www.clubsocial.ae/",
      source: "Club Social",
      icon: "🎵",
    },
    {
      id: "comic-con",
      title: "Middle East Film & Comic Con (MEFCC)",
      date: "April 18-20, 2025",
      location: "Abu Dhabi National Exhibition Centre (ADNEC)",
      description:
        "The region's largest pop culture festival featuring celebrity appearances, including Ian McDiarmid (Sheev Palpatine from Star Wars) and Hideo Ishikawa (voice of Itachi Uchiha in Naruto), along with panels, workshops, and exhibitions related to film, TV, comics, and gaming.",
      link: "https://www.mefcc.com/home/",
      source: "Middle East Film & Comic Con",
      icon: "🦸‍♂️",
    },
    {
      id: "healthcare-week",
      title: "Abu Dhabi Global Healthcare Week 2025",
      date: "April 15-17, 2025",
      location: "Abu Dhabi National Exhibition Centre (ADNEC)",
      description:
        "This event brings together global health leaders for conferences, workshops, and exhibitions focused on diverse and inclusive health, longevity, precision health, and medical breakthroughs.",
      link: "https://www.adnec.ae/en/eventlisting/abu-dhabi-global-health-week-2025",
      source: "adnec.ae",
      icon: "🏥",
    },
    {
      id: "racing-league",
      title: "Autonomous Racing League (A2RL)",
      date: "April 26, 2025",
      location: "Yas Marina Circuit",
      description:
        "Features autonomous car, drone, and dune buggy races with a prize pool of US$2.25 million, where eight elite teams will compete, showcasing cutting-edge technology in motorsports.",
      link: "https://a2rl.io/",
      source: "Abu Dhabi Autonomous Racing League",
      icon: "🏎️",
    },
    {
      id: "bred",
      title: "BRED Abu Dhabi",
      date: "April 23-28, 2025",
      location: "Yas Bay Waterfront",
      description:
        "A celebration of neo-culture blending music, fashion, art, sport, and gaming, featuring performances from regional and global talent, emphasizing the fusion of local and international creativity.",
      link: "https://bredabudhabi.com/",
      source: "BRED Abu Dhabi",
      icon: "🎨",
    },
    {
      id: "more-events-end-of-list",
      title: "More Events coming soon...",
      link: "https://visitabudhabi.ae/en/events",
      source: "Visit Abu Dhabi",
      date: "April 2025",
      location: "Abu Dhabi",
      description:
        "Stay tuned for more exciting events and activities happening in Abu Dhabi this April. This list will be updated as more events become available",
      icon: "⏳",
    },
  ];

  const EventsDetailView = () => {
    const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

    return (
      <motion.div
        key="events-detail"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
        className="pb-10"
      >
        <div className="flex items-center gap-4 mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowEvents(false)}
            className="flex items-center gap-2 text-white hover:text-blue-400"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Guides</span>
          </motion.button>
        </div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="text-white text-4xl font-bold mb-6 flex items-center gap-2"
        >
          {/* <Calendar className="w-12 h-12 pr-1" /> */}
          Latest Events
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.15 }}
          className="text-gray-300 text-lg mb-8"
        >
          Abu Dhabi is hosting a variety of exciting events this April, offering
          a blend of cultural, musical, and sporting experiences. Here are some
          highlights:
        </motion.p>

        <div className="space-y-4">
          {aprilEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2, delay: 0.2 + index * 0.05 }}
              className={`bg-gray-800 border ${
                expandedEvent === event.id
                  ? "border-blue-500"
                  : "border-gray-700"
              } rounded-lg overflow-hidden`}
            >
              <div
                className="flex items-center p-4 cursor-pointer hover:bg-gray-700/50 transition"
                onClick={() =>
                  setExpandedEvent(expandedEvent === event.id ? null : event.id)
                }
              >
                <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  <span className="text-2xl">{event.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium text-lg">
                    {event.title}
                  </h3>
                  <div className="flex flex-wrap gap-x-4 text-gray-400 text-sm mt-1">
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" /> {event.date}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" /> {event.location}
                    </span>
                  </div>
                </div>
                <ChevronRight
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    expandedEvent === event.id ? "rotate-90" : ""
                  }`}
                />
              </div>

              <AnimatePresence>
                {expandedEvent === event.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-4 pb-4"
                  >
                    {/* <div className="h-48 relative mb-4 mt-2 rounded-lg overflow-hidden">
                      <div className="absolute inset-0 bg-gray-900/20 z-10"></div>
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/images/event-placeholder.jpg";
                        }}
                      />
                    </div> */}
                    <p className="text-gray-300 pt-4  mb-4">
                      {event.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        Source: {event.source}
                      </span>
                      <a
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition"
                      >
                        Visit Website
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.25 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowEvents(false)}
          className="w-full py-4 mt-8 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center justify-center"
        >
          Back to Guides
        </motion.button>
      </motion.div>
    );
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: isSearching ? 0 : custom * 0.05,
        duration: 0.2,
      },
    }),
  };

  const searchResultsVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
  };

  const filteredCategories = searchQuery
    ? guideCategories
        .map((category) => ({
          ...category,
          cards: category.cards.filter(
            (card) =>
              card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              card.content.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((category) => category.cards.length > 0)
    : guideCategories;

  const PlaceholderContent = ({ title }: { title: string }) => (
    <div className="prose prose-invert max-w-none">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p>
        This section is currently under development. Soon you'll find detailed
        information about {title.toLowerCase()} here.
      </p>
      <p>
        Please check back later for updates or contact our support team for
        immediate assistance.
      </p>
    </div>
  );

  const renderCardContent = () => {
    if (!selectedCard) return null;

    switch (selectedCard.comp) {
      case "TraditionsData":
        return (
          <div className="prose prose-invert max-w-none">
            <TraditionsData />
          </div>
        );
      case "ClothesData":
        return (
          <div className="prose prose-invert max-w-none">
            <ClothesData />
          </div>
        );
      case "FoodData":
        return (
          <div className="prose prose-invert max-w-none">
            <FoodData />
          </div>
        );
      case "ReligionData":
        return (
          <div className="prose prose-invert max-w-none">
            <ReligionData />
          </div>
        );
      default:
        return <PlaceholderContent title={selectedCard.title} />;
    }
  };

  const categoryIcons = {
    welcome: <Home className="w-5 h-5" />,
    culture: <BookOpen className="w-5 h-5" />,
    "getting-around": <Bus className="w-5 h-5" />,
    dining: <Utensils className="w-5 h-5" />,
    attractions: <MapPin className="w-5 h-5" />,
  };

  const DecorationShapes = () => (
    <div className="absolute bottom-0 right-0 overflow-hidden opacity-30">
      <div className="w-20 h-20 rounded-full bg-blue-300 absolute bottom-[-10px] right-[-10px]"></div>
      <div className="w-12 h-12 rounded-full bg-blue-200 absolute bottom-[20px] right-[30px]"></div>
      <div className="w-8 h-8 rounded-md bg-blue-100 rotate-12 absolute bottom-[15px] right-[60px]"></div>
    </div>
  );

  return (
    <div ref={containerRef} className="flex-1 p-5 overflow-y-auto">
      <AnimatePresence mode="wait">
        {selectedCard ? (
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="pb-10"
          >
            <div className="flex items-center gap-4 mb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCard(null)}
                className="flex items-center gap-2 text-white hover:text-blue-400"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Guides</span>
              </motion.button>
            </div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="text-white text-4xl font-bold mb-8"
            >
              {selectedCard.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: 0.15 }}
              className="relative w-full h-[300px] mb-8"
            >
              <img
                src={selectedCard.src}
                alt={selectedCard.alt}
                className="w-full h-full object-cover rounded-lg"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.2 }}
              className="mb-8"
            >
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {selectedCard.content}
              </p>

              {renderCardContent()}
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.25 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCard(null)}
              className="w-full py-4 mt-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center justify-center"
            >
              Back to Guides
            </motion.button>
          </motion.div>
        ) : showEvents ? (
          <EventsDetailView />
        ) : (
          <div>
            <motion.div
              initial={isFirstRender.current ? { opacity: 0, y: -10 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              onAnimationComplete={() => {
                isFirstRender.current = false;
              }}
              className="mb-6"
            >
              <h1 className="text-4xl font-bold text-white text-center">
                Guides
              </h1>
            </motion.div>

            <motion.div
              initial={isFirstRender.current ? { opacity: 0, y: 10 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="relative mb-6"
            >
              <Search className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search guides..."
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-full py-2 px-10 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="absolute right-3 top-2 text-gray-400 hover:text-white"
                  onClick={() => setSearchQuery("")}
                >
                  Clear
                </button>
              )}
            </motion.div>

            {searchQuery ? (
              <motion.div
                variants={searchResultsVariants}
                initial="hidden"
                animate="visible"
              >
                <h2 className="text-xl font-semibold text-white mb-4">
                  Search Results
                </h2>
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category, categoryIndex) => (
                    <div key={category.id} className="mb-10">
                      <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                        {
                          categoryIcons[
                            category.id as keyof typeof categoryIcons
                          ]
                        }
                        <span className="ml-2">{category.title}</span>
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {category.cards.map((card, index) => (
                          <motion.div
                            key={card.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                          >
                            <Card
                              className="w-full h-full bg-gray-800 border-gray-700 cursor-pointer hover:bg-gray-700/50 transition-colors shadow-md"
                              onClick={() => setSelectedCard(card as cardData)}
                            >
                              <CardContent className="p-4 flex flex-row items-center">
                                <div className="w-12 h-12 relative rounded-full overflow-hidden flex-shrink-0">
                                  <Image
                                    src={card.src}
                                    alt={card.alt}
                                    className="object-cover"
                                    fill
                                    sizes="48px"
                                  />
                                </div>
                                <div className="ml-3 flex-1">
                                  <h4 className="text-white font-medium">
                                    {card.title}
                                  </h4>
                                  <p className="text-gray-400 text-sm line-clamp-1">
                                    {card.content}
                                  </p>
                                </div>
                                <ChevronRight className="text-gray-400 w-5 h-5 flex-shrink-0" />
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
                    <h3 className="text-xl font-medium text-white mb-2">
                      No results found
                    </h3>
                    <p className="text-gray-400">
                      We couldn't find any matches for "{searchQuery}". Try
                      different keywords or browse the categories below.
                    </p>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="space-y-6">
                <motion.div
                  initial={
                    isFirstRender.current ? { opacity: 0, y: 10 } : false
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.2 }}
                  className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 p-6 shadow-lg"
                >
                  <DecorationShapes />
                  <div className="flex items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">
                        Welcome to Abu Dhabi
                      </h2>
                      <p className="text-blue-100 max-w-lg">
                        Your comprehensive guide to navigating, exploring, and
                        enjoying everything Abu Dhabi has to offer.
                      </p>
                      <button className="mt-4 bg-white text-blue-700 rounded-full px-5 py-2 text-sm font-medium hover:bg-blue-50 transition shadow-sm">
                        Get Started
                      </button>
                    </div>
                    <User className="ml-auto w-16 h-16 text-blue-300 opacity-40" />
                  </div>
                </motion.div>

                <motion.div
                  initial={
                    isFirstRender.current ? { opacity: 0, y: 10 } : false
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.3 }}
                  className="bg-gray-800 rounded-xl p-4 shadow-md cursor-pointer hover:bg-gray-700/50 transition"
                  onClick={() => setShowEvents(true)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-semibold flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Recent Updates
                    </h3>
                    <span className="text-xs bg-blue-600 text-white rounded-full px-2 py-1">
                      New
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Check out the new dining recommendations and cultural
                    attractions added this month.
                  </p>
                </motion.div>

                <motion.div
                  initial={
                    isFirstRender.current ? { opacity: 0, y: 10 } : false
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.4 }}
                >
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Browse by Category
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {guideCategories.map((category, index) => (
                      <motion.div
                        key={category.id}
                        variants={cardVariants}
                        initial={isFirstRender.current ? "hidden" : false}
                        animate="visible"
                        custom={index}
                      >
                        <Card
                          className="w-full cursor-pointer hover:bg-gray-800/70 transition bg-gray-800 border-gray-700 shadow-md overflow-hidden"
                          onClick={() => setSelectedTab(category.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start mb-3">
                              <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center">
                                {
                                  categoryIcons[
                                    category.id as keyof typeof categoryIcons
                                  ]
                                }
                              </div>
                              <ChevronRight className="ml-auto text-gray-500 w-5 h-5" />
                            </div>
                            <h4 className="text-white font-medium text-lg mb-1">
                              {category.title}
                            </h4>
                            <p className="text-gray-400 text-sm line-clamp-2">
                              {category.description}
                            </p>

                            <div className="mt-3 pt-3 border-t border-gray-700 flex items-center justify-between">
                              <span className="text-xs text-gray-400">
                                {category.cards.length} guides
                              </span>
                              <span className="text-xs text-blue-400 hover:underline">
                                View all
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {selectedTab && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.6 }}
                    className="mt-8"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white flex items-center">
                        {
                          categoryIcons[
                            selectedTab as keyof typeof categoryIcons
                          ]
                        }
                        <span className="ml-2">
                          {
                            guideCategories.find(
                              (cat) => cat.id === selectedTab
                            )?.title
                          }
                        </span>
                      </h3>
                      <button
                        onClick={() => setSelectedTab("welcome")}
                        className="text-sm text-gray-400 hover:text-white"
                      >
                        View All
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {guideCategories
                        .find((cat) => cat.id === selectedTab)
                        ?.cards.map((card, index) => (
                          <motion.div
                            key={card.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.2,
                              delay: 0.7 + index * 0.05,
                            }}
                          >
                            <Card
                              className="w-full cursor-pointer hover:bg-gray-700/50 transition bg-gray-800 border-gray-700"
                              onClick={() => setSelectedCard(card as cardData)}
                            >
                              <div className="h-32 relative">
                                <Image
                                  src={card.src}
                                  alt={card.alt}
                                  className="object-cover rounded-t-lg"
                                  fill
                                  sizes="(max-width: 768px) 100vw, 384px"
                                />
                              </div>
                              <CardContent className="p-4">
                                <h4 className="text-white font-medium mb-1">
                                  {card.title}
                                </h4>
                                <p className="text-gray-400 text-sm line-clamp-2">
                                  {card.content}
                                </p>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                    </div>
                  </motion.div>
                )}

                <motion.div
                  initial={
                    isFirstRender.current ? { opacity: 0, y: 10 } : false
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.9 }}
                  className="mt-8 bg-gray-800 rounded-xl p-6 border border-gray-700"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">Need Help?</h3>
                    <Map className="w-6 h-6 text-blue-400" />
                  </div>
                  <p className="text-gray-400 mb-4">
                    Can't find what you're looking for? Our support team is here
                    to help you navigate Abu Dhabi with ease.
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
                </motion.div>
              </div>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
