import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Utensils, ShoppingBag, Landmark, ArrowLeft, ExternalLink } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { placesToVisit, foodPlaces, shoppingPlaces, essentialServices } from "./discoverData";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.05 } // Reduced from 0.1 to 0.05
  })
};

interface Place {
  image: string;
  title: string;
  description: string;
  longDescription?: string[];
  externalLink?: string;
}

export default function CaseDiscover() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const isFirstRender = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wait for animations to start before scrolling
    const timeoutId = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }, 350); // Increased delay to let animations settle

    return () => clearTimeout(timeoutId);
  }, [selectedPlace]);

  const carouselOptions = {
    loop: true,
    dragFree: true,
    draggable: true,
    containScroll: 'trimSnaps' as const,
    axis: 'x' as const,
    wheelEnabled: true,
    wheelScroll: 1,
    align: 'start' as const,
  };

  return (
    <div ref={containerRef} className="flex-1 p-5 overflow-y-auto">
      <AnimatePresence mode="wait">
        {selectedPlace ? (
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }} // Reduced from 0.3
          >
            {/* Detail View */}
            <div className="flex items-center gap-4 mb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedPlace(null)}
                className="flex items-center gap-2 text-white hover:text-blue-400"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </motion.button>
            </div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }} // Reduced from 0.2
              className="text-white text-4xl font-bold mb-8"
            >
              {selectedPlace.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }} // Reduced from 0.3
              className="relative w-full h-[300px] mb-8"
            >
              <img
                src={selectedPlace.image}
                alt={selectedPlace.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }} // Reduced from 0.4
              className="space-y-4 mb-8"
            >
              {selectedPlace.longDescription?.map((paragraph, index) => (
                <p key={index} className="text-gray-300 text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }} // Reduced from 0.5
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.open(selectedPlace.externalLink, '_blank')}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2"
            >
              Learn More
              <ExternalLink className="w-4 h-4" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }} // Reduced from 0.6
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedPlace(null)}
              className="w-full py-4 mt-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg flex items-center justify-center"
            >
              Back
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="carousel"
            initial={isFirstRender.current ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onAnimationComplete={() => {
              isFirstRender.current = false;
            }}
          >
            {/* Top heading */}
            <motion.h1
              initial={isFirstRender.current ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }} // Reduced from 0.1
              className="text-white mt-4 mb-6 text-left text-3xl font-bold"
            >
              Discover Abu Dhabi
            </motion.h1>

            {/* Section 1: Places to Visit */}
            <section className="mb-12">
              <motion.h2
                initial={isFirstRender.current ? { opacity: 0, y: 20 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }} 
                className="text-white text-xl font-semibold mb-6 flex items-center"
              >
                <MapPin className="mr-2" /> Places to Visit
              </motion.h2>
              <Carousel opts={carouselOptions} className="w-full cursor-grab active:cursor-grabbing">
                <CarouselContent className="select-none -ml-2">
                  {placesToVisit.map((place, index) => (
                    <CarouselItem key={index} className="pl-2 basis-[48%] md:basis-[48%] lg:basis-[48%]">
                      <motion.div
                        variants={cardVariants}
                        initial={isFirstRender.current ? "hidden" : false}
                        animate="visible"
                        // Base offset for Section 1: custom = index + 2
                        custom={index + 2}
                      >
                        <PlaceCard place={place} onSelect={() => setSelectedPlace(place)} />
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </section>

            {/* Section 2: Culinary Delights */}
            <section className="mb-12">
              <motion.h2
                initial={isFirstRender.current ? { opacity: 0, y: 20 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }} // Wait until Section 1 finished
                className="text-white text-xl font-semibold mb-6 flex items-center"
              >
                <Utensils className="mr-2" /> Culinary Delights
              </motion.h2>
              <Carousel opts={carouselOptions} className="w-full cursor-grab active:cursor-grabbing">
                <CarouselContent className="select-none -ml-2">
                  {foodPlaces.map((place, index) => (
                    <CarouselItem key={index} className="pl-2 basis-[48%] md:basis-[48%] lg:basis-[48%]">
                      <motion.div
                        variants={cardVariants}
                        initial={isFirstRender.current ? "hidden" : false}
                        animate="visible"
                        // Base offset for Section 2: custom = index + 12
                        custom={index + 8}
                      >
                        <PlaceCard place={place} onSelect={() => setSelectedPlace(place)} />
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </section>

            {/* Section 3: Local Markets & Stores */}
            <section className="mb-12">
              <motion.h2
                initial={isFirstRender.current ? { opacity: 0, y: 20 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }} // Next section appears after Section 2
                className="text-white text-xl font-semibold mb-6 flex items-center"
              >
                <ShoppingBag className="mr-2" /> Local Markets & Stores
              </motion.h2>
              <Carousel opts={carouselOptions} className="w-full cursor-grab active:cursor-grabbing">
                <CarouselContent className="select-none -ml-2">
                  {shoppingPlaces.map((place, index) => (
                    <CarouselItem key={index} className="pl-2 basis-[48%] md:basis-[48%] lg:basis-[48%]">
                      <motion.div
                        variants={cardVariants}
                        initial={isFirstRender.current ? "hidden" : false}
                        animate="visible"
                        // Base offset for Section 3: custom = index + 16
                        custom={index + 16}
                      >
                        <PlaceCard place={place} onSelect={() => setSelectedPlace(place)} />
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </section>

            {/* Section 4: Essential Services */}
            <section className="mb-12">
              <motion.h2
                initial={isFirstRender.current ? { opacity: 0, y: 20 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }} // Final section appears last
                className="text-white text-xl font-semibold mb-6 flex items-center"
              >
                <Landmark className="mr-2" /> Essential Services
              </motion.h2>
              <Carousel opts={carouselOptions} className="w-full cursor-grab active:cursor-grabbing">
                <CarouselContent className="select-none -ml-2">
                  {essentialServices.map((service, index) => (
                    <CarouselItem key={index} className="pl-2 basis-[48%] md:basis-[48%] lg:basis-[48%]">
                      <motion.div
                        variants={cardVariants}
                        initial={isFirstRender.current ? "hidden" : false}
                        animate="visible"
                        // Base offset for Section 4: custom = index + 20
                        custom={index + 20}
                      >
                        <PlaceCard place={service} onSelect={() => setSelectedPlace(service)} />
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PlaceCard({ place, onSelect }: { place: Place; onSelect: () => void }) {
  return (
    <Card
      className="bg-gray-800 border-gray-700 h-[320px] select-none cursor-pointer hover:bg-gray-700/50 transition-colors"
      onClick={onSelect}
    >
      <CardContent className="p-6 flex flex-col h-full">
        <img
          src={place.image || "/placeholder.svg"}
          alt={place.title}
          className="w-full h-36 object-cover rounded-md mb-4"
        />
        <h3 className="text-white text-lg font-semibold mb-2 line-clamp-1">{place.title}</h3>
        <p className="text-gray-400 text-sm line-clamp-3">{place.description}</p>
      </CardContent>
    </Card>
  );
}