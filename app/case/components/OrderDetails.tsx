import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Package, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrderDetailsProps {
  order: {
    restaurant: string;
    estimatedTime: string;
    status: string;
    items?: Array<{ name: string; quantity: number; price: number }>;
  };
  onClose: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function OrderDetails({ order, onClose }: OrderDetailsProps) {
  // Sample order items if none provided
  const orderItems = order.items || [
    { name: "Chicken Shawarma", quantity: 2, price: 18 },
    { name: "French Fries", quantity: 1, price: 10 },
    { name: "Soft Drink", quantity: 2, price: 8 }
  ];
  
  const total = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="relative flex-1 p-6 overflow-y-auto hide-scrollbar fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
      <motion.div 
        className="bg-gray-900 rounded-xl w-full max-w-2xl overflow-hidden relative h-[80vh]"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div 
          onClick={onClose}
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
          animate="show"
          variants={containerVariants}
          className="flex flex-col items-center space-y-6 p-6 mt-12 h-full"
        >
          <motion.div variants={itemVariants} className="self-center">
            <div className="bg-blue-500/20 p-4 rounded-full mb-6">
              <Package size={32} className="text-blue-500" />
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="self-start w-full">
            <h2 className="text-5xl font-extrabold text-white mb-8 leading-tight text-center">
              Order<br />
              <span style={{ color: "#2563eb" }}>details</span>
            </h2>
          </motion.div>

          <motion.div variants={itemVariants} className="w-full">
            <div className="bg-blue-900/20 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <div>
                  <h3 className="text-white font-medium text-xl">{order.restaurant}</h3>
                  <div className="flex items-center gap-2 mt-1 text-gray-300 text-sm">
                    <MapPin size={14} />
                    <span>Al Wahda Mall, Abu Dhabi</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 border-t border-blue-900/30 pt-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-blue-400">
                  <Clock size={16} />
                  <span>Delivery in ~{order.estimatedTime} mins</span>
                </div>
                <div className="bg-blue-500/20 px-2 py-1 rounded-full text-blue-300 text-xs font-medium">
                  {order.status}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants} 
            className="w-full bg-gray-800 rounded-lg p-4 overflow-y-auto max-h-[35vh]"
          >
            <h3 className="text-white font-medium mb-3">Order Items</h3>
            {orderItems.map((item, index) => (
              <div 
                key={index}
                className="flex justify-between items-center py-3 border-b border-gray-700 last:border-b-0"
              >
                <div className="flex items-center">
                  <span className="text-white mr-2">{item.quantity}×</span>
                  <span className="text-white">{item.name}</span>
                </div>
                <span className="text-white">{item.price * item.quantity} AED</span>
              </div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="w-full text-center">
            <div className="text-3xl font-light text-white mb-4">
              Total: <span className="font-medium">{total} AED</span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="w-full flex gap-4">
            <Button 
              className="w-1/2 bg-red-600 hover:bg-red-700 text-white"
            >
              Cancel Order
            </Button>
            
            <Button
              className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Edit Order
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
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
