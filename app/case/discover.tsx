import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Utensils, ShoppingBag, Landmark, ArrowLeft, ExternalLink } from "lucide-react";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Animation variants for cards – custom value * 0.1 = delay
const cardVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: (custom: number) => ({
		opacity: 1,
		y: 0,
		transition: { delay: custom * 0.1 }
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
              transition={{ delay: 0.1 }}
              className="text-white mt-4 mb-6 text-left text-3xl font-bold"
            >
              Discover Abu Dhabi
            </motion.h1>
    
            {/* Section 1: Places to Visit */}
            <section className="mb-12">
              <motion.h2
                initial={isFirstRender.current ? { opacity: 0, y: 20 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
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
                        // Base offset 4: delay = (4 + index) * 0.1 = 0.4, 0.5, ...
                        custom={index + 4}
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
                // Header delay set so it appears after Section 1 cards
                transition={{ delay: 1.2 }}
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
                        // Base offset 13: cards start at 1.3s delay
                        custom={index + 13}
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
                transition={{ delay: 2.0 }}
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
                        // Base offset 21: cards start at 2.1s delay
                        custom={index + 21}
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
                transition={{ delay: 2.8 }}
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
                        // Base offset 29: cards start at 2.9s delay
                        custom={index + 29}
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
        <h3 className="text-white text-lg font-semibold mb-2 line-clamp-2">{place.title}</h3>
        <p className="text-gray-400 text-sm line-clamp-3">{place.description}</p>
      </CardContent>
    </Card>
  );
}

const placesToVisit = [
  {
    image: "/images/mosque.png", // remains unchanged
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
    image: "/images/louvre.png", // remains unchanged
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
    image: "/images/qasr.png", // remains unchanged
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
    image: "/images/yas.png", // remains unchanged
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
    image: "/images/corniche.png", // remains unchanged
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
    image: "/images/palace.png", // remains unchanged
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
    image: "/images/mangrove.png", // remains unchanged
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
    image: "/images/shawarmaS.jpg", // remains unchanged
    title: "Shawarma Station",
    description: "Popular chain known for fresh shawarmas and Middle Eastern street food.",
    longDescription: [
      "A beloved quick-service restaurant chain that's become synonymous with quality shawarmas in Abu Dhabi.",
      "Known for their signature chicken and meat shawarmas, fresh juices, and falafel sandwiches.",
      "Offers great value meals perfect for lunch breaks or quick dinners.",
      "Multiple convenient locations across the city with consistent quality and fast service."
    ],
    externalLink: "https://visitabudhabi.ae/restaurants/shawarmatime"
  },
  {
    // Nested folder image: updated with a new valid URL
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Flame-grilled_PERi-PERi_chicken.jpg/440px-Flame-grilled_PERi-PERi_chicken.jpg",
    title: "Nando's",
    description: "Famous for its Peri-Peri chicken in a casual dining atmosphere.",
    longDescription: [
      "Nando's offers their world-famous flame-grilled Peri-Peri chicken at reasonable prices.",
      "Wide range of spice levels from mild to extra hot, catering to all taste preferences.",
      "Popular for both dine-in and takeaway, with numerous branches across Abu Dhabi.",
      "Great value meal deals and family platters make it perfect for group dining."
    ],
    externalLink: "https://www.nandos.ae"
  },
  {
    image: "/images/shakespeare.png", // remains unchanged
    title: "Shakespeare & Co.",
    description: "Casual dining café with international menu and charming atmosphere.",
    longDescription: [
      "Shakespeare & Co. offers a diverse menu of international dishes in a Victorian-inspired setting.",
      "Known for their all-day breakfast, fresh pastries, and extensive beverage menu.",
      "Comfortable seating and reasonable prices make it perfect for casual meals or coffee meetings.",
      "Popular among families and professionals, with multiple locations across Abu Dhabi."
    ],
    externalLink: "https://shakespeare-and-co.com"
  },
  {
    image: "/images/mandi.jpg", // remains unchanged
    title: "Al Mandi and Al Madhbi House",
    description: "Yemeni restaurant.",
    longDescription: [
      "Papa John's offers fresh, quality pizzas with a variety of toppings at competitive prices.",
      "Regular promotions and combo deals make it an affordable option for families.",
      "Quick delivery service and consistent quality across all branches.",
      "Popular for both dine-in and delivery, with multiple locations throughout Abu Dhabi."
    ],
    externalLink: "https://papajohns.ae"
  },
  {
    // Nested folder image: updated with a new valid URL
    image: "/images/lebaneseflower.jpg",
    title: "Lebanese Flower",
    description: "Famous local spot for Lebanese cuisine at reasonable prices.",
    longDescription: [
      "Lebanese Flower is an Abu Dhabi institution, serving delicious Middle Eastern cuisine since 1991.",
      "Known for their incredible shawarmas, mixed grills, and freshly baked Lebanese bread.",
      "With multiple locations across the city, it's a go-to spot for both quick bites and family meals.",
      "Their generous portions and consistent quality have made them a local favorite for decades."
    ],
    externalLink: "https://lebaneseflower.ae"
  },
  {
    // Nested folder image: updated with a new valid URL
    image: "/images/subway.jpg",
    title: "Subway",
    description: "Fresh sandwiches and salads with customizable options.",
    longDescription: [
      "Subway offers fresh, made-to-order sandwiches with a variety of healthy options.",
      "Customize your meal with a wide selection of fresh vegetables and sauces.",
      "Great value meal deals and regular promotions make it budget-friendly.",
      "Perfect for quick lunches or light dinners, with locations throughout Abu Dhabi."
    ],
    externalLink: "https://subway.com/en-AE"
  },
  {
    // Nested folder image: updated with a new valid URL
    image: "/images/almrzab.jpg",
    title: "Al Mrzab",
    description: "Authentic Emirati cuisine in a modern casual setting.",
    longDescription: [
      "Al Mrzab offers traditional Emirati dishes in a contemporary atmosphere.",
      "Perfect introduction to local cuisine with friendly staff and English menus.",
      "Reasonable prices and generous portions make it popular with tourists and locals alike.",
      "Great place to try authentic Emirati dishes like Harees and Machboos."
    ],
    externalLink: "https://visitabudhabi.ae/restaurants/al-mrzab"
  }
];

const shoppingPlaces = [
  {
    image: "/images/yasmall.jpg",
    title: "Yas Mall",
    description: "Largest mall in Abu Dhabi with over 370 stores and 60 restaurants.",
    longDescription: [
      "Yas Mall is Abu Dhabi's largest and most modern shopping destination, spanning over 2.5 million square feet.",
      "The mall features unique concepts like Ferrari World Abu Dhabi and Warner Bros. World Abu Dhabi nearby.",
      "Visitors can enjoy a diverse mix of international and local brands across fashion, electronics, and home furnishings.",
      "The mall's entertainment options include a 20-screen cinema, family entertainment center, and year-round events."
    ],
    externalLink: "https://yasmall.ae"
  },
  {
    image: "/images/galleria.jpg",
    title: "The Galleria Al Maryah Island",
    description: "Luxury shopping destination with high-end brands and dining options.",
    longDescription: [
      "The Galleria is Abu Dhabi's premier luxury shopping and dining destination on Al Maryah Island.",
      "The mall houses over 400 stores including flagship luxury boutiques and first-to-Abu Dhabi brands.",
      "Its dining collection features award-winning restaurants with spectacular waterfront views.",
      "The expansion includes a dedicated family entertainment zone with innovative leisure attractions."
    ],
    externalLink: "https://thegalleria.ae"
  },
  {
    image: "/images/admall.jpg",
    title: "Abu Dhabi Mall",
    description: "Central mall with a mix of local and international brands.",
    longDescription: [
      "Abu Dhabi Mall is strategically located in the heart of the city's business district.",
      "The mall offers a comprehensive retail mix with over 200 stores spread across four levels.",
      "Its family entertainment center and ice rink make it a popular destination for families.",
      "The mall is directly connected to Beach Rotana Hotel, making it convenient for tourists."
    ],
    externalLink: "https://abudhabi-mall.com"
  },
  {
    image: "/images/madinatzayed.jpg",
    title: "Madinat Zayed Shopping Centre",
    description: "Known for its gold souk and traditional items.",
    longDescription: [
      "Madinat Zayed Shopping Centre is famous for its extensive gold souk featuring dozens of jewelry stores.",
      "The center offers traditional Arabic perfumes, textiles, and handicrafts alongside modern retail stores.",
      "Its gold souk is known for competitive prices and authentic Arabic jewelry designs.",
      "The shopping centre serves as a cultural bridge between traditional and modern retail experiences."
    ],
    externalLink: "https://madinatzayed-mall.com"
  },
  {
    image: "/images/wtcmall.jpg",
    title: "World Trade Center Mall",
    description: "Modern mall in the heart of the city with a traditional souk feel.",
    longDescription: [
      "World Trade Center Mall combines modern retail with traditional Arabian architecture.",
      "The mall features a contemporary interpretation of a traditional souk with over 160 shops.",
      "Its central location makes it a key shopping destination in Abu Dhabi's downtown area.",
      "The mall's rooftop garden provides a unique outdoor shopping and dining experience."
    ],
    externalLink: "https://wtcad.ae"
  },
  {
    image: "/images/dalma.jpg",
    title: "Dalma Mall",
    description: "Large shopping center with a variety of stores and entertainment options.",
    longDescription: [
      "Dalma Mall is one of Abu Dhabi's largest shopping destinations with over 450 stores.",
      "The mall features an extensive entertainment zone with a multi-screen cinema and family attractions.",
      "Its diverse dining options include both international restaurants and local cuisine.",
      "The mall serves as a community hub for the Mussafah and Mohammed Bin Zayed City areas."
    ],
    externalLink: "https://dalmamall.ae"
  },
  {
    image: "/images/mushrifmall.jpg",
    title: "Mushrif Mall",
    description: "Family-friendly mall with a good mix of retail and leisure facilities.",
    longDescription: [
      "Mushrif Mall is designed as a family-centric shopping destination with over 200 retail outlets.",
      "The mall's distinctive feature is its circular design making navigation intuitive for shoppers.",
      "It houses one of the largest indoor play areas for children in Abu Dhabi.",
      "The mall's traditional souk section offers local products and handicrafts."
    ],
    externalLink: "https://mushrifmall.com"
  }
];

const essentialServices = [
  {
    image: "/images/tamm.jpg",
    title: "TAMM Service Centre",
    description: "One-stop shop for government services in Abu Dhabi.",
    longDescription: [
      "TAMM is Abu Dhabi's comprehensive government services platform integrating over 600 services.",
      "The center offers digital solutions for business, personal, and administrative requirements.",
      "TAMM's service centers provide in-person support with multilingual staff members.",
      "The platform has revolutionized government service delivery in Abu Dhabi through digital transformation."
    ],
    externalLink: "https://tamm.abudhabi"
  },
  {
    image: "/images/seha.jpg",
    title: "Abu Dhabi Health Services (SEHA)",
    description: "Network of public hospitals and clinics in Abu Dhabi.",
    longDescription: [
      "SEHA operates the largest healthcare network in the UAE with multiple hospitals and clinics.",
      "The organization provides comprehensive healthcare services from primary to specialized care.",
      "SEHA facilities are equipped with state-of-the-art medical technology and expert healthcare professionals.",
      "Their services include emergency care, specialized treatments, and preventive healthcare programs."
    ],
    externalLink: "https://seha.ae"
  },
  {
    image: "/images/adpolice.jpg",
    title: "Abu Dhabi Police",
    description: "Main law enforcement agency, offering various services including traffic-related matters.",
    longDescription: [
      "Abu Dhabi Police is the primary law enforcement agency ensuring safety and security in the emirate.",
      "They offer digital services for traffic fines, licensing, and various security permits.",
      "The force is known for its smart police stations providing 24/7 services without human intervention.",
      "Their community policing initiatives help maintain strong relationships with residents."
    ],
    externalLink: "https://adi.gov.ae"
  },
  {
    image: "/images/admunandtransport.jpg",
    title: "Department of Municipalities and Transport",
    description: "Handles city planning, transportation, and municipal affairs.",
    longDescription: [
      "The Department oversees urban planning, infrastructure development, and public transportation in Abu Dhabi.",
      "They manage municipal services including building permits and land allocation.",
      "The department is responsible for developing and maintaining Abu Dhabi's transport network.",
      "Their services include parking management, public bus operations, and maritime transport regulation."
    ],
    externalLink: "https://dmt.gov.ae"
  },
  {
    image: "/images/addc.jpg",
    title: "Abu Dhabi Distribution Company",
    description: "Manages electricity and water services for residents.",
    longDescription: [
      "ADDC is the sole provider of electricity and water services in Abu Dhabi region.",
      "They offer digital services for bill payments, connection requests, and consumption monitoring.",
      "The company implements smart meter solutions for better resource management.",
      "ADDC promotes sustainable consumption through various awareness programs."
    ],
    externalLink: "https://addc.ae"
  },
  {
    image: "/images/adchamber.jpg",
    title: "Abu Dhabi Chamber",
    description: "Supports businesses and provides various commercial services.",
    longDescription: [
      "Abu Dhabi Chamber represents the interests of the private sector in Abu Dhabi.",
      "They provide crucial services for business setup and development in the emirate.",
      "The chamber offers training programs and workshops for business development.",
      "Their services include certificate of origin issuance and business networking opportunities."
    ],
    externalLink: "https://abudhabichamber.ae"
  },
  {
    image: "/images/adjudicial.jpg",
    title: "Abu Dhabi Judicial Department",
    description: "Handles legal matters and court services in the emirate.",
    longDescription: [
      "The Judicial Department manages all courts and legal services in Abu Dhabi.",
      "They provide digital services for case filing, document authentication, and legal inquiries.",
      "The department offers alternative dispute resolution services including mediation.",
      "Their services include notary public, marriage services, and legal consultation."
    ],
    externalLink: "https://adjd.gov.ae"
  }
];