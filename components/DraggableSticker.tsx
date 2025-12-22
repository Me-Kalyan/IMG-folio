'use client';
import { motion } from 'framer-motion';
export default function DraggableSticker({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.div
      drag dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
      whileHover={{ scale: 1.1, cursor: 'grab' }} whileDrag={{ scale: 1.2, cursor: 'grabbing' }}
      className={`absolute z-30 ${className}`}
    >
      {children}
    </motion.div>
  );
}