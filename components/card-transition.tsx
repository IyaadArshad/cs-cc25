import { motion } from "framer-motion";

const sizeVariants = {
  minimized: {
    width: "490px",
    height: "780px",
    transition: { duration: 0.5, ease: "easeInOut" }
  },
  expanded: {
    width: "75vw",
    height: "90vh",
    transition: { duration: 0.5, ease: "easeInOut" }
  }
};

interface CardTransitionProps {
  isExpanded: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function CardTransition({ isExpanded, children, className = "" }: CardTransitionProps) {
  return (
    <motion.div
      variants={sizeVariants}
      animate={isExpanded ? "expanded" : "minimized"}
      className={`bg-gradient-to-b from-[#12121d]/80 to-[#12121d]/95 backdrop-blur-xl main-card fixed sm:relative sm:rounded-[18px] overflow-hidden flex flex-col ${className}`}
    >
      {children}
    </motion.div>
  );
}
