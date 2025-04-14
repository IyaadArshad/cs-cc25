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

export function OrderDetails({ order, onClose }: OrderDetailsProps) {
  // Sample order items if none provided
  const orderItems = order.items || [
    { name: "Chicken Shawarma", quantity: 2, price: 18 },
    { name: "French Fries", quantity: 1, price: 10 },
    { name: "Soft Drink", quantity: 2, price: 8 }
  ];
  
  const subtotal = orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = 5;
  const total = subtotal + deliveryFee;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gray-900 rounded-xl w-full max-w-md overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
      >
        <div className="sticky top-0 z-10 bg-gray-900 px-6 py-4 border-b border-gray-800 flex items-center">
          <button 
            className="absolute left-4 flex items-center gap-2 text-gray-400 hover:text-white"
            onClick={onClose}
          >
            <ArrowLeft size={18} />
          </button>
          <h2 className="text-white text-lg font-medium w-full text-center">Order Details</h2>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="bg-blue-900/20 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="bg-blue-500/20 p-2 rounded-full">
                <Package className="text-blue-500 w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white font-medium">{order.restaurant}</h3>
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

          <h3 className="text-white font-medium mb-3">Order Summary</h3>
          <div className="bg-gray-800 rounded-lg mb-6">
            {orderItems.map((item, index) => (
              <div 
                key={index}
                className="flex justify-between items-center p-3 border-b last:border-b-0 border-gray-700"
              >
                <div className="flex items-center">
                  <span className="text-white mr-2">{item.quantity}×</span>
                  <span className="text-white">{item.name}</span>
                </div>
                <span className="text-white">{item.price * item.quantity} AED</span>
              </div>
            ))}
          </div>

          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <div className="flex justify-between py-2">
              <span className="text-gray-300">Subtotal</span>
              <span className="text-white">{subtotal} AED</span>
            </div>
            <div className="flex justify-between py-2 border-t border-gray-700">
              <span className="text-gray-300">Delivery Fee</span>
              <span className="text-white">{deliveryFee} AED</span>
            </div>
            <div className="flex justify-between py-2 border-t border-gray-700 font-medium">
              <span className="text-white">Total</span>
              <span className="text-white">{total} AED</span>
            </div>
          </div>

          <div className="flex gap-4">
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
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
