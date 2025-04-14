import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, ShoppingCart, X, Search, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface Restaurant {
  id: string;
  name: string;
  image: string;
  description: string;
  rating: number;
  deliveryTime: string;
}

interface Category {
  id: string;
  name: string;
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
}

interface OrderItem {
  item: MenuItem;
  quantity: number;
}

// Sample data
const RESTAURANTS: Restaurant[] = [
  {
    id: "shawarma-station",
    name: "Shawarma Station",
    image: "/img/discover/culinaryDelights/shawarmaStation.png",
    description: "Popular chain known for fresh shawarmas and Middle Eastern street food.",
    rating: 4.5,
    deliveryTime: "20-30 min",
  },
  {
    id: "al-mandi",
    name: "Al Mandi and Al Madhbi House",
    image: "/img/discover/culinaryDelights/alMandi.png",
    description: "Authentic Yemeni restaurant specializing in Mandi and Madhbi dishes.",
    rating: 4.3,
    deliveryTime: "25-35 min",
  },
  {
    id: "nandos",
    name: "Nando's",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Flame-grilled_PERi-PERi_chicken.jpg/440px-Flame-grilled_PERi-PERi_chicken.jpg",
    description: "Famous for its Peri-Peri chicken in a casual dining atmosphere.",
    rating: 4.2,
    deliveryTime: "20-30 min",
  },
  {
    id: "lebanese-flower",
    name: "Lebanese Flower",
    image: "/img/discover/culinaryDelights/lebaneseFlower.png",
    description: "Famous local spot for Lebanese cuisine at reasonable prices.",
    rating: 4.7,
    deliveryTime: "15-25 min",
  }
];

// Sample menu categories
const CATEGORIES: Category[] = [
  { id: "popular", name: "Most Popular" },
  { id: "appetizers", name: "Appetizers" },
  { id: "main", name: "Main Dishes" },
  { id: "sides", name: "Sides" },
  { id: "drinks", name: "Drinks" },
  { id: "desserts", name: "Desserts" },
];

// Sample menu items
const generateMenuItems = (restaurantId: string): MenuItem[] => {
  if (restaurantId === "shawarma-station") {
    return [
      {
        id: "chicken-shawarma",
        name: "Chicken Shawarma",
        description: "Grilled marinated chicken with garlic sauce and pickles",
        price: 18,
        image: "/img/discover/culinaryDelights/shawarmaStation.png",
        categoryId: "popular"
      },
      {
        id: "beef-shawarma",
        name: "Beef Shawarma",
        description: "Tender beef with tahini sauce and vegetables",
        price: 20,
        image: "/img/discover/culinaryDelights/shawarmaStation.png",
        categoryId: "popular"
      },
      {
        id: "falafel-wrap",
        name: "Falafel Wrap",
        description: "Crispy falafel with fresh vegetables and tahini",
        price: 15,
        image: "/img/discover/culinaryDelights/shawarmaStation.png",
        categoryId: "popular"
      },
      {
        id: "hummus",
        name: "Hummus",
        description: "Creamy chickpea dip with olive oil",
        price: 12,
        image: "/img/discover/culinaryDelights/shawarmaStation.png",
        categoryId: "appetizers"
      },
      {
        id: "tabbouleh",
        name: "Tabbouleh",
        description: "Fresh parsley salad with bulgur wheat",
        price: 14,
        image: "/img/discover/culinaryDelights/shawarmaStation.png",
        categoryId: "appetizers"
      },
      {
        id: "mixed-grill",
        name: "Mixed Grill",
        description: "Assortment of grilled meats with rice",
        price: 45,
        image: "/img/discover/culinaryDelights/shawarmaStation.png",
        categoryId: "main"
      },
      {
        id: "french-fries",
        name: "French Fries",
        description: "Crispy golden fries",
        price: 10,
        image: "/img/discover/culinaryDelights/shawarmaStation.png",
        categoryId: "sides"
      },
      {
        id: "soft-drink",
        name: "Soft Drink",
        description: "Cola, Sprite, or Fanta",
        price: 8,
        image: "/img/discover/culinaryDelights/shawarmaStation.png",
        categoryId: "drinks"
      },
      {
        id: "baklava",
        name: "Baklava",
        description: "Sweet pastry with nuts and honey",
        price: 16,
        image: "/img/discover/culinaryDelights/shawarmaStation.png",
        categoryId: "desserts"
      },
    ];
  } else if (restaurantId === "al-mandi") {
    return [
      {
        id: "chicken-mandi",
        name: "Chicken Mandi",
        description: "Traditional Yemeni dish with aromatic rice and chicken",
        price: 35,
        image: "/img/discover/culinaryDelights/alMandi.png",
        categoryId: "popular"
      },
      {
        id: "lamb-madhbi",
        name: "Lamb Madhbi",
        description: "Tender lamb grilled on hot stones",
        price: 45,
        image: "/img/discover/culinaryDelights/alMandi.png", 
        categoryId: "popular"
      },
      // More items would go here
    ];
  } else {
    return [];
  }
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.2 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};

enum OrderStep {
  RESTAURANT_SELECTION = 0,
  MENU_SELECTION = 1,
  CHECKOUT = 2,
  LOADING = 3,
  CONFIRMATION = 4
}

export function OrderScreen({
  onClose,
  onOrderComplete,
}: {
  onClose: () => void;
  onOrderComplete: (restaurant: Restaurant) => void;
}) {
  const [currentStep, setCurrentStep] = useState<OrderStep>(OrderStep.RESTAURANT_SELECTION);
  const [showMoreRestaurants, setShowMoreRestaurants] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("popular");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const handleRestaurantSelect = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setMenuItems(generateMenuItems(restaurant.id));
    setCurrentStep(OrderStep.MENU_SELECTION);
  };

  const handleAddToCart = (item: MenuItem) => {
    setOrderItems(prev => {
      const existingItem = prev.find(i => i.item.id === item.id);
      if (existingItem) {
        return prev.map(i => 
          i.item.id === item.id 
            ? { ...i, quantity: i.quantity + 1 } 
            : i
        );
      } else {
        return [...prev, { item, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (itemId: string) => {
    setOrderItems(prev => {
      const existingItem = prev.find(i => i.item.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prev.map(i => 
          i.item.id === itemId 
            ? { ...i, quantity: i.quantity - 1 } 
            : i
        );
      } else {
        return prev.filter(i => i.item.id !== itemId);
      }
    });
  };

  const getTotalAmount = () => {
    return orderItems.reduce((total, item) => total + item.item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    setCurrentStep(OrderStep.CHECKOUT);
  };

  const handleConfirmOrder = () => {
    setCurrentStep(OrderStep.LOADING);
    // Simulate loading
    setTimeout(() => {
      setCurrentStep(OrderStep.CONFIRMATION);
      // Show confirmation for 1.5 seconds
      setTimeout(() => {
        if (selectedRestaurant) {
          onOrderComplete(selectedRestaurant);
        }
      }, 1500);
    }, 2000);
  };

  const visibleRestaurants = showMoreRestaurants ? RESTAURANTS : RESTAURANTS.slice(0, 2);

  const filteredMenuItems = menuItems.filter(item => 
    selectedCategory === "all" || item.categoryId === selectedCategory
  );

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gray-900 rounded-xl w-full max-w-3xl overflow-hidden relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
      >
        <div className="sticky top-0 z-10 bg-gray-900 px-6 py-4 border-b border-gray-800 flex items-center justify-between">
          <button 
            className="flex items-center gap-2 text-gray-400 hover:text-white"
            onClick={currentStep > OrderStep.RESTAURANT_SELECTION 
              ? () => setCurrentStep(prev => prev - 1) 
              : onClose}
          >
            <ArrowLeft size={18} />
            <span>{currentStep > OrderStep.RESTAURANT_SELECTION ? "Back" : "Cancel"}</span>
          </button>
          
          <div className="text-white text-lg font-medium">
            {currentStep === OrderStep.RESTAURANT_SELECTION && "Select Restaurant"}
            {currentStep === OrderStep.MENU_SELECTION && selectedRestaurant?.name}
            {currentStep === OrderStep.CHECKOUT && "Confirm Order"}
            {currentStep === OrderStep.LOADING && "Processing Order"}
            {currentStep === OrderStep.CONFIRMATION && "Order Confirmed"}
          </div>
          
          <div className="bg-blue-600/30 text-blue-400 px-3 py-1 rounded-full text-xs font-medium">
            Demo Mode
          </div>
        </div>

        <AnimatePresence mode="wait">
          {currentStep === OrderStep.RESTAURANT_SELECTION && (
            <motion.div
              key="restaurant-selection"
              className="p-6 max-h-[70vh] overflow-y-auto"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <motion.div variants={itemVariants} className="mb-4 relative">
                <Search className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for restaurants"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </motion.div>
              
              <motion.h2 
                variants={itemVariants}
                className="text-white font-semibold mb-4"
              >
                NEARBY RESTAURANTS
              </motion.h2>

              <div className="space-y-4">
                {visibleRestaurants.map((restaurant) => (
                  <motion.div
                    key={restaurant.id}
                    variants={itemVariants}
                    onClick={() => handleRestaurantSelect(restaurant)}
                  >
                    <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700/50 cursor-pointer transition-colors">
                      <div className="flex p-4">
                        <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden">
                          <img
                            src={restaurant.image}
                            alt={restaurant.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex flex-col justify-between">
                          <div>
                            <h3 className="text-white font-medium">{restaurant.name}</h3>
                            <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                              {restaurant.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center">
                              <div className="text-yellow-500">★</div>
                              <span className="text-white text-sm ml-1">{restaurant.rating}</span>
                            </div>
                            <div className="flex items-center text-gray-400 text-sm">
                              <Clock size={14} className="mr-1" />
                              {restaurant.deliveryTime}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}

                {!showMoreRestaurants && (
                  <motion.button
                    variants={itemVariants}
                    className="w-full py-3 text-center text-blue-500 hover:text-blue-400 rounded-lg border border-gray-800 hover:border-gray-700"
                    onClick={() => setShowMoreRestaurants(true)}
                  >
                    Show More Restaurants
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}

          {currentStep === OrderStep.MENU_SELECTION && selectedRestaurant && (
            <motion.div
              key="menu-selection"
              className="h-[70vh] overflow-hidden flex"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {/* Categories sidebar */}
              <div className="w-1/4 border-r border-gray-800 overflow-y-auto">
                {CATEGORIES.map((category) => (
                  <motion.button
                    key={category.id}
                    variants={itemVariants}
                    className={`w-full text-left px-4 py-3 transition-colors ${
                      selectedCategory === category.id
                        ? "bg-gray-800 text-white font-medium border-l-2 border-blue-500"
                        : "text-gray-400 hover:bg-gray-800/50"
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </motion.button>
                ))}
              </div>

              {/* Menu items */}
              <div className="w-3/4 overflow-y-auto p-4">
                <div className="space-y-4">
                  {filteredMenuItems.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      className="bg-gray-800 rounded-lg p-4 flex justify-between"
                    >
                      <div className="flex gap-3">
                        <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium">{item.name}</h3>
                          <p className="text-gray-400 text-sm mt-1 line-clamp-2">{item.description}</p>
                          <div className="mt-2 text-white font-semibold">{item.price} AED</div>
                        </div>
                      </div>
                      <button
                        className="self-end bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded h-8"
                        onClick={() => handleAddToCart(item)}
                      >
                        Add
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === OrderStep.CHECKOUT && (
            <motion.div
              key="checkout"
              className="p-6 max-h-[70vh] overflow-y-auto"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <motion.div 
                variants={itemVariants} 
                className="flex items-center justify-center mb-6"
              >
                <div className="bg-blue-500/20 p-3 rounded-full">
                  <ShoppingCart size={28} className="text-blue-500" />
                </div>
              </motion.div>

              <motion.h3 
                variants={itemVariants}
                className="text-xl font-semibold text-white text-center mb-6"
              >
                Confirm your order
              </motion.h3>

              <motion.div variants={itemVariants} className="bg-gray-800 rounded-lg p-4 mb-6">
                <h4 className="text-white font-medium mb-3">Order Summary</h4>
                {orderItems.map((orderItem) => (
                  <div key={orderItem.item.id} className="flex justify-between items-center py-2 border-t border-gray-700">
                    <div className="flex items-center">
                      <div className="text-white">{orderItem.quantity}x</div>
                      <div className="ml-2 text-white">{orderItem.item.name}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-white">{orderItem.quantity * orderItem.item.price} AED</div>
                      <div className="flex gap-2">
                        <button 
                          className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-gray-600"
                          onClick={() => handleRemoveFromCart(orderItem.item.id)}
                        >
                          -
                        </button>
                        <button 
                          className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-gray-600"
                          onClick={() => handleAddToCart(orderItem.item)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-gray-800 rounded-lg p-4 mb-6"
              >
                <div className="flex justify-between py-2">
                  <span className="text-gray-300">Subtotal</span>
                  <span className="text-white">{getTotalAmount()} AED</span>
                </div>
                <div className="flex justify-between py-2 border-t border-gray-700">
                  <span className="text-gray-300">Delivery Fee</span>
                  <span className="text-white">5 AED</span>
                </div>
                <div className="flex justify-between py-2 border-t border-gray-700 font-medium">
                  <span className="text-white">Total</span>
                  <span className="text-white">{getTotalAmount() + 5} AED</span>
                </div>
              </motion.div>

              <motion.button
                variants={itemVariants}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                onClick={handleConfirmOrder}
                disabled={orderItems.length === 0}
              >
                Place Order
              </motion.button>
            </motion.div>
          )}

          {currentStep === OrderStep.LOADING && (
            <motion.div
              key="loading"
              className="p-6 h-[70vh] flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="mt-6 text-white text-lg">Processing your order...</p>
            </motion.div>
          )}

          {currentStep === OrderStep.CONFIRMATION && (
            <motion.div
              key="confirmation"
              className="p-6 h-[70vh] flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 10, stiffness: 100 }}
              >
                <Check className="w-10 h-10 text-white" />
              </motion.div>
              <motion.h3
                className="mt-6 text-white text-2xl font-semibold text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Order Confirmed!
              </motion.h3>
              <motion.p
                className="mt-2 text-gray-400 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Your order has been placed successfully
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {currentStep === OrderStep.MENU_SELECTION && orderItems.length > 0 && (
          <div className="sticky bottom-0 bg-gray-900 border-t border-gray-800 p-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-gray-400">{orderItems.reduce((total, item) => total + item.quantity, 0)} items</span>
                <p className="text-white font-semibold">{getTotalAmount()} AED</p>
              </div>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleCheckout}
              >
                Continue to Checkout
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
