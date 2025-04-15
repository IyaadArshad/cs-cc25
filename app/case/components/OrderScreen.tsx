import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, ShoppingBag, X, Search, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    description:
      "Popular chain known for fresh shawarmas and Middle Eastern street food.",
    rating: 4.5,
    deliveryTime: "20-30 min",
  },
  {
    id: "al-mandi",
    name: "Al Mandi and Al Madhbi House",
    image: "/img/discover/culinaryDelights/alMandi.png",
    description:
      "Authentic Yemeni restaurant specializing in Mandi and Madhbi dishes.",
    rating: 4.3,
    deliveryTime: "25-35 min",
  },
  {
    id: "nandos",
    name: "Nando's",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Flame-grilled_PERi-PERi_chicken.jpg/440px-Flame-grilled_PERi-PERi_chicken.jpg",
    description:
      "Famous for its Peri-Peri chicken in a casual dining atmosphere.",
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
  },
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
        categoryId: "popular",
      },
      {
        id: "beef-shawarma",
        name: "Beef Shawarma",
        description: "Tender beef with tahini sauce and vegetables",
        price: 20,
        image: "/img/discover/culinaryDelights/shawarmaStation.png",
        categoryId: "popular",
      },
      {
        id: "falafel-wrap",
        name: "Falafel Wrap",
        description: "Crispy falafel with fresh vegetables and tahini",
        price: 15,
        image: "/img/discover/culinaryDelights/shawarmaStation.png",
        categoryId: "popular",
      },
      {
        id: "hummus",
        name: "Hummus",
        description: "Creamy chickpea dip with olive oil",
        price: 12,
        image: "/img/discover/culinaryDelights/shawarmaStation.png",
        categoryId: "appetizers",
      },
      {
        id: "tabbouleh",
        name: "Tabbouleh",
        description: "Fresh parsley salad with bulgur wheat",
        price: 14,
        image: "/img/discover/culinaryDelights/shawarmaStation.png",
        categoryId: "appetizers",
      },
      {
        id: "mixed-grill",
        name: "Mixed Grill",
        description: "Assortment of grilled meats with rice",
        price: 45,
        image: "/img/discover/culinaryDelights/shawarmaStation.png",
        categoryId: "main",
      },
      {
        id: "french-fries",
        name: "French Fries",
        description: "Crispy golden fries",
        price: 10,
        image: "/img/discover/culinaryDelights/shawarmaStation.png",
        categoryId: "sides",
      },
      {
        id: "soft-drink",
        name: "Soft Drink",
        description: "Cola, Sprite, or Fanta",
        price: 8,
        image: "/img/discover/culinaryDelights/shawarmaStation.png",
        categoryId: "drinks",
      },
      {
        id: "baklava",
        name: "Baklava",
        description: "Sweet pastry with nuts and honey",
        price: 16,
        image: "/img/discover/culinaryDelights/shawarmaStation.png",
        categoryId: "desserts",
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
        categoryId: "popular",
      },
      {
        id: "lamb-madhbi",
        name: "Lamb Madhbi",
        description: "Tender lamb grilled on hot stones",
        price: 45,
        image: "/img/discover/culinaryDelights/alMandi.png",
        categoryId: "popular",
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
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

enum OrderStep {
  RESTAURANT_SELECTION = 0,
  MENU_SELECTION = 1,
  CHECKOUT = 2,
  LOADING = 3,
  CONFIRMATION = 4,
}

export function OrderScreen({
  onClose,
  onOrderComplete,
}: {
  onClose: () => void;
  onOrderComplete: (restaurant: Restaurant) => void;
}) {
  const [currentStep, setCurrentStep] = useState<OrderStep>(
    OrderStep.RESTAURANT_SELECTION
  );
  const [showMoreRestaurants, setShowMoreRestaurants] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("popular");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isExiting, setIsExiting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleRestaurantSelect = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setMenuItems(generateMenuItems(restaurant.id));
    setCurrentStep(OrderStep.MENU_SELECTION);
  };

  const handleAddToCart = (item: MenuItem) => {
    setOrderItems((prev) => {
      const existingItem = prev.find((i) => i.item.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prev, { item, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (itemId: string) => {
    setOrderItems((prev) => {
      const existingItem = prev.find((i) => i.item.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prev.map((i) =>
          i.item.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        );
      } else {
        return prev.filter((i) => i.item.id !== itemId);
      }
    });
  };

  const getTotalAmount = () => {
    return orderItems.reduce(
      (total, item) => total + item.item.price * item.quantity,
      0
    );
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

  const handleExit = () => {
    if (
      (currentStep === OrderStep.MENU_SELECTION && orderItems.length > 0) ||
      currentStep === OrderStep.CHECKOUT
    ) {
      setShowDialog(true);
    } else {
      handleExitWithAnimation();
    }
  };

  const handleExitWithAnimation = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (
        currentStep > 0 &&
        currentStep !== OrderStep.LOADING &&
        currentStep !== OrderStep.CONFIRMATION
      ) {
        setCurrentStep((prev) => prev - 1);
        setIsExiting(false);
      } else {
        onClose();
      }
    }, 300);
  };

  const handleExitAnyway = () => {
    setShowDialog(false);
    onClose();
  };

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  const visibleRestaurants = showMoreRestaurants
    ? RESTAURANTS
    : RESTAURANTS.slice(0, 2);

  const filteredMenuItems = menuItems.filter(
    (item) => selectedCategory === "all" || item.categoryId === selectedCategory
  );

  return (
    <div className="relative flex-1 p-6 overflow-y-auto hide-scrollbar">
      {/* Restaurant Selection Screen */}
      {currentStep === OrderStep.RESTAURANT_SELECTION && (
        <>
          <div
            onClick={onClose}
            className="absolute top-6 left-6 cursor-pointer flex items-center gap-4 hover:text-gray-300 z-10"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
            <span className="text-white">Back</span>
          </div>

          <motion.div
            initial="hidden"
            animate={isExiting ? "exit" : "show"}
            exit="exit"
            variants={containerVariants}
            className="flex flex-col space-y-6 mt-12"
          >
            <motion.div variants={itemVariants} className="self-start w-full">
              <h2 className="text-6xl font-extrabold text-white mb-2 leading-tight">
                Choose your
                <br />
                <span style={{ color: "#2563eb" }}>restaurant</span>
              </h2>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="w-full grid grid-cols-2 gap-6"
            >
              {[RESTAURANTS[0], RESTAURANTS[1]].map((restaurant) => {
                const topItems = generateMenuItems(restaurant.id)
                  .filter((item) => item.categoryId === "popular")
                  .slice(0, 2); // Limit to 2 items only
                return (
                  <div
                    key={restaurant.id}
                    className="bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col h-[380px]"
                  >
                    <div className="mb-3">
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-36 object-cover rounded-md"
                      />
                      <h3 className="text-white text-xl font-semibold mt-2 truncate">
                        {restaurant.name}
                      </h3>
                      {/* <p className="text-gray-400 text-sm line-clamp-1">
                        {restaurant.description}
                      </p> */}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-gray-300 mb-2">Quick items</h4>
                      <div className="space-y-2">
                        {topItems.map((item) => (
                          <div
                            key={item.id}
                            className="bg-gray-700 rounded-md p-2 cursor-pointer hover:bg-gray-600"
                            onClick={() => {
                              handleRestaurantSelect(restaurant);
                              handleAddToCart(item);
                            }}
                          >
                            <div className="flex items-center">
                              {/* <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 mr-2">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div> */}
                              <div className="flex-1 min-w-0">
                                <div className="text-white font-medium truncate">
                                  {item.name}
                                </div>
                                <div className="text-gray-300 text-sm">
                                  {item.price} AED
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        </>
      )}
      {currentStep === OrderStep.MENU_SELECTION && selectedRestaurant && (
        <>
          <div
            onClick={handleExit}
            className="absolute top-6 left-6 cursor-pointer flex items-center gap-4 hover:text-gray-300 z-10"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
            <span className="text-white">Back</span>
          </div>

          <motion.div
            initial="hidden"
            animate={isExiting ? "exit" : "show"}
            exit="exit"
            variants={containerVariants}
            className="flex flex-col mt-12 h-[calc(100vh-130px)]"
          >
            <motion.div variants={itemVariants} className="self-start">
              <h2 className="text-6xl font-extrabold text-white mb-6 leading-tight">
                Choose your
                <br />
                <span style={{ color: "#2563eb" }}>items</span>
              </h2>
            </motion.div>

            <div className="flex flex-1 overflow-hidden">
              {/* Categories sidebar */}
              <motion.div
                variants={itemVariants}
                className="w-1/4 border-r border-gray-800 overflow-y-auto pr-2"
              >
                {CATEGORIES.map((category) => (
                  <Button
                    key={category.id}
                    variant="ghost"
                    className={`w-full text-left px-4 py-3 justify-start ${
                      selectedCategory === category.id
                        ? "bg-gray-800 text-white font-medium border-l-2 border-blue-500"
                        : "text-gray-400 hover:bg-gray-800/50"
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </motion.div>

              {/* Menu items */}
              <motion.div
                variants={itemVariants}
                className="w-3/4 overflow-y-auto p-4 space-y-4"
              >
                {filteredMenuItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-800 rounded-lg p-4 flex justify-between"
                  >
                    <div className="flex gap-3">
                      <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{item.name}</h3>
                        <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="mt-2 text-white font-semibold">
                          {item.price} AED
                        </div>
                      </div>
                    </div>
                    <button
                      className="self-end bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded h-8"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add
                    </button>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {orderItems.length > 0 && (
            <div className="sticky bottom-4 mt-6 w-full">
              <Button
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3"
                onClick={handleCheckout}
              >
                Checkout (
                {orderItems.reduce((total, item) => total + item.quantity, 0)}{" "}
                items • {getTotalAmount()} AED)
              </Button>
            </div>
          )}
        </>
      )}

      {/* Checkout Screen */}
      {currentStep === OrderStep.CHECKOUT && (
        <>
          <div
            onClick={handleExit}
            className="absolute top-6 left-6 cursor-pointer flex items-center gap-4 hover:text-gray-300 z-10"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
            <span className="text-white">Back</span>
          </div>

          <div className="absolute top-6 right-6 z-10">
            <div className="bg-yellow-500/80 text-yellow-900 px-3 py-1 rounded-full text-xs font-medium">
              Demo Mode
            </div>
          </div>

          <motion.div
            initial="hidden"
            animate={isExiting ? "exit" : "show"}
            exit="exit"
            variants={containerVariants}
            className="flex flex-col items-center space-y-6 mt-12"
          >
            <motion.div variants={itemVariants} className="self-center">
              <div className="bg-blue-500/20 p-4 rounded-full mb-6">
                <ShoppingBag size={32} className="text-blue-500" />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full">
              <h2 className="text-6xl font-extrabold text-white mb-8 leading-tight text-center">
                Confirm
                <br />
                <span style={{ color: "#2563eb" }}>your order</span>
              </h2>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="w-full bg-gray-800 rounded-lg p-4 overflow-y-auto max-h-[40vh]"
            >
              {orderItems.map((orderItem) => (
                <div
                  key={orderItem.item.id}
                  className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0"
                >
                  <div className="flex items-center">
                    <div className="text-white mr-2">{orderItem.quantity}×</div>
                    <div className="text-white">{orderItem.item.name}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-white">
                      {orderItem.quantity * orderItem.item.price} AED
                    </div>
                    <div className="flex gap-1">
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

            <motion.div variants={itemVariants} className="w-full text-center">
              <div className="text-3xl font-light text-white mb-4">
                Total:{" "}
                <span className="font-medium">{getTotalAmount()} AED</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full">
              <Button
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-6 text-lg"
                onClick={handleConfirmOrder}
                disabled={orderItems.length === 0}
              >
                Place Order
              </Button>
            </motion.div>
          </motion.div>
        </>
      )}

      {/* Loading Screen */}
      {currentStep === OrderStep.LOADING && (
        <div className="flex flex-col items-center justify-center h-full p-6">
          <motion.div
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="mt-6 text-white text-lg">Processing your order...</p>
        </div>
      )}

      {/* Confirmation Screen */}
      {currentStep === OrderStep.CONFIRMATION && (
        <div className="flex flex-col items-center justify-center h-full p-6">
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
        </div>
      )}

      {/* Exit Dialog */}
      <AnimatePresence>
        {showDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-gray-800 p-8 rounded-lg text-center mx-4 max-w-xs"
            >
              <X className="w-16 h-16 text-[#2563eb] mx-auto" />
              <h2 className="mt-4 text-2xl font-bold text-white">
                You have unsaved changes
              </h2>
              <p className="mt-2 text-gray-300">
                Do you want to exit without completing your order?
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <button
                  onClick={handleDialogClose}
                  className="px-4 py-2 bg-gray-700/50 hover:bg-gray-600 text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExitAnyway}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg"
                >
                  Exit anyway
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}