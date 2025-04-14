import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Check, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  categories: Category[];
}

interface Category {
  name: string;
  items: MenuItem[];
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface OrderItem extends MenuItem {
  quantity: number;
}

const sampleRestaurants: Restaurant[] = [
  {
    id: "shawarma-station",
    name: "Shawarma Station",
    image: "/img/discover/culinaryDelights/shawarmaStation.png",
    rating: 4.5,
    deliveryTime: "20-30",
    categories: [
      {
        name: "Popular",
        items: [
          {
            id: "chicken-shawarma",
            name: "Chicken Shawarma",
            description: "Fresh chicken with garlic sauce and pickles",
            price: 12,
            image: "/img/discover/culinaryDelights/shawarmaStation.png"
          },
          {
            id: "meat-shawarma",
            name: "Meat Shawarma",
            description: "Tender meat with tahini sauce",
            price: 14,
            image: "/img/discover/culinaryDelights/shawarmaStation.png"
          }
        ]
      }
    ]
  },
  {
    id: "al-mandi",
    name: "Al Mandi and Al Madhbi House",
    image: "/img/discover/culinaryDelights/alMandi.png",
    rating: 4.3,
    deliveryTime: "30-40",
    categories: [
      {
        name: "Signature Dishes",
        items: [
          {
            id: "chicken-mandi",
            name: "Chicken Mandi",
            description: "Traditional Yemeni rice dish with chicken",
            price: 45,
            image: "/img/discover/culinaryDelights/alMandi.png"
          }
        ]
      }
    ]
  }
];

export function OrderScreen({ onClose, onOrderComplete }: { onClose: () => void, onOrderComplete: (restaurant: Restaurant) => void }) {
  const [step, setStep] = useState<'restaurants' | 'menu' | 'checkout' | 'processing' | 'confirmation'>('restaurants');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [showMore, setShowMore] = useState(false);

  const handleAddToCart = (item: MenuItem) => {
    setCart(current => {
      const existing = current.find(i => i.id === item.id);
      if (existing) {
        return current.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...current, { ...item, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart(current => {
      const existing = current.find(i => i.id === itemId);
      if (existing && existing.quantity > 1) {
        return current.map(i => 
          i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return current.filter(i => i.id !== itemId);
    });
  };

  const getTotalAmount = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    setStep('processing');
    // Simulate processing
    setTimeout(() => {
      setStep('confirmation');
      setTimeout(() => {
        if (selectedRestaurant) {
          onOrderComplete(selectedRestaurant);
        }
      }, 2000);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-900 z-50 overflow-hidden"
    >
      <div className="relative h-full">
        <header className="p-4 flex items-center justify-between border-b border-gray-800">
          <button onClick={onClose} className="text-white">
            <X className="w-6 h-6" />
          </button>
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center text-white">
            {step === 'restaurants' && <MapPin className="w-4 h-4 mr-2" />}
            <span className="text-lg font-medium">
              {step === 'restaurants' && "Nearby Restaurants"}
              {step === 'menu' && selectedRestaurant?.name}
              {step === 'checkout' && "Confirm Order"}
              {step === 'processing' && "Processing"}
              {step === 'confirmation' && "Order Confirmed"}
            </span>
          </div>
          {step !== 'restaurants' && (
            <div className="text-white px-3 py-1 rounded-full bg-blue-600 text-sm">
              Demo Mode
            </div>
          )}
        </header>

        <AnimatePresence mode="wait">
          {step === 'restaurants' && (
            <motion.div
              key="restaurants"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-64px)]"
            >
              {sampleRestaurants.slice(0, showMore ? undefined : 2).map((restaurant) => (
                <motion.div
                  key={restaurant.id}
                  className="bg-gray-800 rounded-lg p-4 cursor-pointer"
                  onClick={() => {
                    setSelectedRestaurant(restaurant);
                    setStep('menu');
                  }}
                >
                  <div className="h-40 rounded-lg overflow-hidden mb-4">
                    <img 
                      src={restaurant.image} 
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-white text-lg font-medium">{restaurant.name}</h3>
                  <div className="flex items-center mt-2 text-sm text-gray-400">
                    <span className="mr-4">⭐️ {restaurant.rating}</span>
                    <span>{restaurant.deliveryTime} mins</span>
                  </div>
                </motion.div>
              ))}
              {!showMore && (
                <Button 
                  onClick={() => setShowMore(true)}
                  className="w-full bg-gray-800 text-white hover:bg-gray-700"
                >
                  Show More
                </Button>
              )}
            </motion.div>
          )}

          {step === 'menu' && selectedRestaurant && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="h-[calc(100vh-64px)] flex flex-col"
            >
              <div className="flex-1 overflow-y-auto">
                <div className="h-48 relative">
                  <img 
                    src={selectedRestaurant.image}
                    alt={selectedRestaurant.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                </div>
                
                {selectedRestaurant.categories.map((category) => (
                  <div key={category.name} className="p-4">
                    <h3 className="text-white text-xl font-medium mb-4">{category.name}</h3>
                    <div className="space-y-4">
                      {category.items.map((item) => (
                        <div 
                          key={item.id}
                          className="bg-gray-800 rounded-lg p-4 flex items-center"
                        >
                          <img 
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 rounded-lg object-cover"
                          />
                          <div className="ml-4 flex-1">
                            <h4 className="text-white font-medium">{item.name}</h4>
                            <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-white">AED {item.price}</span>
                              <Button
                                onClick={() => handleAddToCart(item)}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                              >
                                Add
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-gray-800 p-4">
                  <Button
                    onClick={() => setStep('checkout')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Checkout (AED {getTotalAmount()})
                  </Button>
                </div>
              )}
            </motion.div>
          )}

          {step === 'checkout' && (
            <motion.div
              key="checkout"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 h-[calc(100vh-64px)] flex flex-col"
            >
              <div className="flex-1">
                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-center mb-4">
                    <ShoppingCart className="w-12 h-12 text-blue-600" />
                  </div>
                  <h3 className="text-white text-xl font-medium text-center mb-6">Your Order</h3>
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-2">
                      <div className="flex items-center">
                        <span className="text-white">{item.quantity}x</span>
                        <span className="text-white ml-2">{item.name}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-white">AED {item.price * item.quantity}</span>
                        <div className="ml-4 flex items-center space-x-2">
                          <Button
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white"
                          >
                            -
                          </Button>
                          <Button
                            onClick={() => handleAddToCart(item)}
                            className="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white"
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Place Order (AED {getTotalAmount()})
              </Button>
            </motion.div>
          )}

          {step === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-[calc(100vh-64px)] flex items-center justify-center"
            >
              <div className="text-center">
                <motion.div
                  className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <p className="text-white text-lg">Processing your order...</p>
              </div>
            </motion.div>
          )}

          {step === 'confirmation' && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-[calc(100vh-64px)] flex items-center justify-center"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center mx-auto mb-4"
                >
                  <Check className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-white text-xl font-medium">Order Confirmed!</h3>
                <p className="text-gray-400 mt-2">Your food is being prepared</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
