"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TransitionContentProps {
  children: ReactNode;
}

const TransitionContent = ({ children }: TransitionContentProps) => {
  return (
    <motion.div
      key={"pageContent"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} // Optional: Add exit animation
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

export default TransitionContent;
