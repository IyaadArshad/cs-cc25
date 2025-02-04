import { Carousel, CarouselContent, CarouselItem, CarouselNext } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Utensils, ShoppingBag, Landmark, ArrowLeft, ExternalLink } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Place {
  image: string;
  title: string;
  description: string;
  longDescription?: string[];
  externalLink?: string;
}

export default function CaseDiscover() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const carouselOptions = {
    loop: true,
    dragFree: true, // Enables momentum-based dragging
    draggable: true,
    containScroll: 'trimSnaps' as const,
    axis: 'x' as const,
    wheelEnabled: true, // Enables mouse wheel scrolling
    wheelScroll: 1, // Number of slides to scroll with wheel
    align: 'start' as const, // Align items to start to show partial third item
  };

  return (
    <div className="flex-1 p-5 overflow-y-auto">
      <AnimatePresence mode="wait">
        {selectedPlace ? (
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
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
              transition={{ delay: 0.2 }}
              className="text-white text-4xl font-bold mb-8"
            >
              {selectedPlace.title}
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
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
              transition={{ delay: 0.4 }}
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
              transition={{ delay: 0.5 }}
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
              transition={{ delay: 0.6 }}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Carousel View */}
            <h1 className="text-white mt-4 mb-6 text-left text-3xl font-bold">Discover Abu Dhabi</h1>
    
            <section className="mb-12">
              <h2 className="text-white text-xl font-semibold mb-6 flex items-center">
                <MapPin className="mr-2" /> Places to Visit
              </h2>
              <Carousel opts={carouselOptions} className="w-full cursor-grab active:cursor-grabbing">
                <CarouselContent className="select-none -ml-2">
                  {placesToVisit.map((place, index) => (
                    <CarouselItem key={index} className="pl-2 basis-[48%] md:basis-[48%] lg:basis-[48%]">
                      <PlaceCard place={place} onSelect={() => setSelectedPlace(place)} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </section>
    
            <section className="mb-12">
              <h2 className="text-white text-xl font-semibold mb-6 flex items-center">
                <Utensils className="mr-2" /> Culinary Delights
              </h2>
              <Carousel opts={carouselOptions} className="w-full cursor-grab active:cursor-grabbing">
                <CarouselContent className="select-none -ml-2">
                  {foodPlaces.map((place, index) => (
                    <CarouselItem key={index} className="pl-2 basis-[48%] md:basis-[48%] lg:basis-[48%]">
                      <PlaceCard place={place} onSelect={() => setSelectedPlace(place)} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </section>
    
            <section className="mb-12">
              <h2 className="text-white text-xl font-semibold mb-6 flex items-center">
                <ShoppingBag className="mr-2" /> Local Markets & Stores
              </h2>
              <Carousel opts={carouselOptions} className="w-full cursor-grab active:cursor-grabbing">
                <CarouselContent className="select-none -ml-2">
                  {shoppingPlaces.map((place, index) => (
                    <CarouselItem key={index} className="pl-2 basis-[48%] md:basis-[48%] lg:basis-[48%]">
                      <PlaceCard place={place} onSelect={() => setSelectedPlace(place)} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </section>
    
            <section className="mb-12">
              <h2 className="text-white text-xl font-semibold mb-6 flex items-center">
                <Landmark className="mr-2" /> Essential Services
              </h2>
              <Carousel opts={carouselOptions} className="w-full cursor-grab active:cursor-grabbing">
                <CarouselContent className="select-none -ml-2">
                  {essentialServices.map((service, index) => (
                    <CarouselItem key={index} className="pl-2 basis-[48%] md:basis-[48%] lg:basis-[48%]">
                      <PlaceCard place={service} onSelect={() => setSelectedPlace(service)} />
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
        <h3 className="text-white text-lg font-semibold mb-2 line-clamp-2">{place.title}</h3>
        <p className="text-gray-400 text-sm line-clamp-3">{place.description}</p>
      </CardContent>
    </Card>
  );
}

const placesToVisit = [
  {
    image: "/images/mosque.png",
    title: "Sheikh Zayed Grand Mosque",
    description: "Iconic mosque known for its stunning white domes and intricate Islamic architecture.",
    longDescription: [
      "The Sheikh Zayed Grand Mosque stands as one of the world's largest mosques and an architectural masterpiece that intentionally blends different Islamic architectural schools.",
      "The mosque features 82 domes, more than 1,000 columns, 24-carat gold-plated chandeliers, and the world's largest hand-knotted carpet. Its main prayer hall can accommodate over 7,000 worshippers.",
      "White marble panels ornamented with semi-precious stones, including lapis lazuli, red agate, amethyst, abalone shell and mother of pearl, create intricate floral designs throughout the mosque."
    ],
    externalLink: "https://www.szgmc.gov.ae/en"
  },
  {
    image: "/images/louvre.png",
    title: "Louvre Abu Dhabi",
    description: "World-class museum showcasing art and artifacts from around the globe.",
    longDescription: [
      "The Louvre Abu Dhabi represents a unique cultural collaboration between Abu Dhabi and France, bringing the renowned Louvre name to the UAE.",
      "The museum's striking architecture, designed by Jean Nouvel, features a vast silver dome that appears to float above the water, creating an enchanting 'rain of light' effect inspired by the emirate's palm trees.",
      "Housing over 600 artworks, including both permanent collections and loans from French partner museums, the Louvre Abu Dhabi tells the story of humanity through art, from ancient times to the contemporary era."
    ],
    externalLink: "https://www.louvreabudhabi.ae"
  },
  {
    image: "/images/qasr.png",
    title: "Qasr Al Watan",
    description: "Presidential palace offering insights into UAE's culture and governance.",
    longDescription: [
      "Qasr Al Watan, the Presidential Palace of the UAE, opened its doors to the public in 2019 as a cultural landmark and architectural marvel.",
      "The palace showcases traditional Arabian architecture and craftsmanship, featuring stunning white domes, intricate geometric patterns, and gardens inspired by Islamic design.",
      "Visitors can explore the House of Knowledge, which contains rare manuscripts and books, and learn about the UAE's system of governance and traditions through interactive exhibitions."
    ],
    externalLink: "https://www.qasralwatan.ae"
  },
  {
    image: "/images/yas.png",
    title: "Yas Island",
    description: "Entertainment hub featuring Ferrari World, Yas Waterworld, and Warner Bros. World.",
    longDescription: [
      "Yas Island is Abu Dhabi's premier entertainment destination, spanning 25 square kilometers of pure excitement and adventure.",
      "Home to Ferrari World Abu Dhabi, the world's first Ferrari-branded theme park, featuring Formula Rossa, the world's fastest roller coaster, reaching speeds of up to 240 km/h.",
      "The island also hosts Yas Waterworld, Warner Bros. World Abu Dhabi, and the Yas Marina Circuit, home to the Formula 1 Abu Dhabi Grand Prix.",
      "With world-class hotels, shopping at Yas Mall, and a vibrant dining scene, Yas Island offers endless entertainment options for visitors of all ages."
    ],
    externalLink: "https://www.yasisland.ae"
  },
  {
    image: "/images/corniche.png",
    title: "Corniche Beach",
    description: "Beautiful waterfront promenade perfect for relaxation and outdoor activities.",
    longDescription: [
      "The Corniche Beach is Abu Dhabi's premier public beach, stretching over 8 kilometers of pristine coastline.",
      "This Blue Flag certified beach offers pristine white sand and crystal-clear waters, with dedicated swimming zones and lifeguards on duty throughout the day.",
      "The promenade features cycling and walking paths, children's play areas, and numerous cafes and restaurants, making it a perfect destination for families and fitness enthusiasts alike.",
      "Regular events and festivals are held along the Corniche, bringing the community together for celebrations and entertainment throughout the year."
    ],
    externalLink: "https://visitabudhabi.ae/en/where-to-go/corniche-beach"
  },
  {
    image: "/images/palace.png",
    title: "Emirates Palace",
    description: "Luxurious hotel known for its opulent architecture and gold leaf interiors.",
    longDescription: [
      "The Emirates Palace is a landmark super-luxury hotel that has become synonymous with Arabian luxury and hospitality.",
      "Built at a cost of $3 billion, the hotel features 394 rooms and suites, 114 domes, and over 1,000 chandeliers, with extensive use of gold leaf and marble throughout.",
      "The palace grounds span 85 hectares, including pristine beaches, pools, and manicured gardens, offering guests an exclusive retreat in the heart of Abu Dhabi.",
      "Famous for its Palace Cappuccino sprinkled with 24-karat gold flakes, the hotel offers unique dining experiences across its multiple award-winning restaurants."
    ],
    externalLink: "https://www.mandarinoriental.com/abu-dhabi/emirates-palace"
  },
  {
    image: "/images/mangrove.png",
    title: "Mangrove National Park",
    description: "Natural reserve offering kayaking tours through lush mangrove forests.",
    longDescription: [
      "The Mangrove National Park represents about 75% of the total mangrove forest area in the UAE, playing a crucial role in Abu Dhabi's ecosystem.",
      "This protected area spans 19 square kilometers and is home to diverse wildlife, including herons, flamingos, and various marine life species.",
      "Visitors can explore the mangroves through guided kayaking tours, paddleboarding sessions, or walking along the newly opened boardwalk.",
      "The park serves as both a natural habitat and a research center, helping scientists study and preserve this unique ecosystem."
    ],
    externalLink: "https://visitabudhabi.ae/en/where-to-go/mangrove-national-park"
  }
];

const foodPlaces = [
  {
    image: "/placeholder.svg?height=160&width=240",
    title: "Mezlai",
    description: "Authentic Emirati cuisine in a luxurious setting at Emirates Palace.",
  },
  {
    image: "/placeholder.svg?height=160&width=240",
    title: "Hakkasan",
    description: "Michelin-starred Chinese restaurant at Emirates Palace.",
  },
  {
    image: "/placeholder.svg?height=160&width=240",
    title: "Li Beirut",
    description: "High-end Lebanese restaurant with stunning views at Jumeirah at Etihad Towers.",
  },
  {
    image: "/placeholder.svg?height=160&width=240",
    title: "Zuma",
    description: "Contemporary Japanese cuisine in a stylish setting at Al Maryah Island.",
  },
  {
    image: "/placeholder.svg?height=160&width=240",
    title: "Byblos Sur Mer",
    description: "Authentic Lebanese seafood restaurant with a beautiful terrace.",
  },
  {
    image: "/placeholder.svg?height=160&width=240",
    title: "Villa Toscana",
    description: "Upscale Italian dining at The St. Regis Abu Dhabi.",
  },
  {
    image: "/placeholder.svg?height=160&width=240",
    title: "Nolu's",
    description: "Fusion of Afghan and American cuisines, known for healthy options.",
  },
];

const shoppingPlaces = [
  {
    image: "/placeholder.svg?height=160&width=240",
    title: "Yas Mall",
    description: "Largest mall in Abu Dhabi with over 370 stores and 60 restaurants.",
  },
  {
    image: "/placeholder.svg?height=160&width=240",
    title: "The Galleria Al Maryah Island",
    description: "Luxury shopping destination with high-end brands and dining options.",
  },
  {
    image: "/placeholder.svg?height=160&width=240",
    title: "Abu Dhabi Mall",
    description: "Central mall with a mix of local and international brands.",
  },
  {
    image: "/placeholder.svg?height=160&width=240",
    title: "Madinat Zayed Shopping Centre",
    description: "Known for its gold souk and traditional items.",
  },
  {
    image: "/placeholder.svg?height=160&width=240",
    title: "World Trade Center Mall",
    description: "Modern mall in the heart of the city with a traditional souk feel.",
  },
  {
    image: "/placeholder.svg?height=160&width=240",
    title: "Dalma Mall",
    description: "Large shopping center with a variety of stores and entertainment options.",
  },
  {
    image: "/placeholder.svg?height=160&width=240",
    title: "Mushrif Mall",
    description: "Family-friendly mall with a good mix of retail and leisure facilities.",
  },
];

const essentialServices = [
  {
    image: "/placeholder.svg?height=160&width=240",
    title: "TAMM Service Centre",
    description: "One-stop shop for government services in Abu Dhabi.",
  },
  {
    image: "/placeholder.svg?height=160&width=240",
    title: "Abu Dhabi Health Services (SEHA)",
    description: "Network of public hospitals and clinics in Abu Dhabi.",
  },
  {
    image: "/placeholder.svg?height=160&width=240",
    title: "Abu Dhabi Police",
    description: "Main law enforcement agency, offering various services including traffic-related matters.",
  },
  {
    image: "/placeholder.svg?height=160&width=240",
    title: "Department of Municipalities and Transport",
    description: "Handles city planning, transportation, and municipal affairs.",
  },
  {
    image: "/placeholder.svg?height=160&width=240",
    title: "Abu Dhabi Distribution Company",
    description: "Manages electricity and water services for residents.",
  },
  {
    image: "/placeholder.svg?height=160&width=240",
    title: "Abu Dhabi Chamber",
    description: "Supports businesses and provides various commercial services.",
  },
  {
    image: "/placeholder.svg?height=160&width=240",
    title: "Abu Dhabi Judicial Department",
    description: "Handles legal matters and court services in the emirate.",
  },
];