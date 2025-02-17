import { motion } from "framer-motion";

export default function CaseChat() {
  return (
    <div className="flex-1 p-6 overflow-auto h-screen">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="text-white text-2xl mb-4"
      >
        <b>Chat</b>
      </motion.h1>
    </div>
  );
}