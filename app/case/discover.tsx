import { Carousel, CarouselContent, CarouselItem, CarouselNext } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Utensils, ShoppingBag, Landmark } from "lucide-react";

export default function CaseDiscover() {
  const carouselOptions = {
    loop: true,
    dragFree: true, // Enables momentum-based dragging
    draggable: true,
    containScroll: 'trimSnaps' as const,
    axis: 'x' as const,
    wheelEnabled: true, // Enables mouse wheel scrolling
    wheelScroll: 1, // Number of slides to scroll with wheel
  };

  return (
    <div className="flex-1 p-5 overflow-y-auto">
      <h1 className="text-white mt-4 mb-6 text-left text-3xl font-bold">Discover Abu Dhabi</h1>

      <section className="mb-8">
        <h2 className="text-white text-xl font-semibold mb-4 flex items-center">
          <MapPin className="mr-2" /> Places to Visit
        </h2>
        <Carousel opts={carouselOptions} className="w-full cursor-grab active:cursor-grabbing">
          <CarouselContent className="select-none">
            {placesToVisit.map((place, index) => (
              <CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <PlaceCard {...place} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

      <section className="mb-8">
        <h2 className="text-white text-xl font-semibold mb-4 flex items-center">
          <Utensils className="mr-2" /> Culinary Delights
        </h2>
        <Carousel opts={carouselOptions} className="w-full cursor-grab active:cursor-grabbing">
          <CarouselContent className="select-none">
            {foodPlaces.map((place, index) => (
              <CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <PlaceCard {...place} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

      <section className="mb-8">
        <h2 className="text-white text-xl font-semibold mb-4 flex items-center">
          <ShoppingBag className="mr-2" /> Local Markets & Stores
        </h2>
        <Carousel opts={carouselOptions} className="w-full cursor-grab active:cursor-grabbing">
          <CarouselContent className="select-none">
            {shoppingPlaces.map((place, index) => (
              <CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <PlaceCard {...place} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

      <section className="mb-8">
        <h2 className="text-white text-xl font-semibold mb-4 flex items-center">
          <Landmark className="mr-2" /> Essential Services
        </h2>
        <Carousel opts={carouselOptions} className="w-full cursor-grab active:cursor-grabbing">
          <CarouselContent className="select-none">
            {essentialServices.map((service, index) => (
              <CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <PlaceCard {...service} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
    </div>
  );
}

function PlaceCard({ image, title, description }: { image: string; title: string; description: string }) {
  return (
    <Card className="bg-gray-800 border-gray-700 h-[280px] select-none">
      <CardContent className="p-4 flex flex-col h-full">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-40 object-cover rounded-md mb-2" />
        <h3 className="text-white font-semibold mb-1 line-clamp-1">{title}</h3>
        <p className="text-gray-400 text-sm line-clamp-3">{description}</p>
      </CardContent>
    </Card>
  );
}

const placesToVisit = [
  {
    image: "/placeholder.svg?height=160&width=240",
    title: "Sheikh Zayed Grand Mosque",
    description: "Iconic mosque known for its stunning white domes and intricate Islamic architecture.",
  },
  {
    image: "/placeholder.svg?height=160&width=240",
    title: "Louvre Abu Dhabi",
    description: "World-class museum showcasing art and artifacts from around the globe.",
  },
  {
    image: "/placeholder.svg?height=160&width=240",
    title: "Qasr Al Watan",
    description: "Presidential palace offering insights into UAE's culture and governance.",
  },
  {
    image: "/placeholder.svg?height=160&width=240",
    title: "Yas Island",
    description: "Entertainment hub featuring Ferrari World, Yas Waterworld, and Warner Bros. World.",
  },
  {
    image: "/placeholder.svg?height=160&width=240",
    title: "Corniche Beach",
    description: "Beautiful waterfront promenade perfect for relaxation and outdoor activities.",
  },
  {
    image: "/placeholder.svg?height=160&width=240",
    title: "Emirates Palace",
    description: "Luxurious hotel known for its opulent architecture and gold leaf interiors.",
  },
  {
    image: "/placeholder.svg?height=160&width=240",
    title: "Mangrove National Park",
    description: "Natural reserve offering kayaking tours through lush mangrove forests.",
  },
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