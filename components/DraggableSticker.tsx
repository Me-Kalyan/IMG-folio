'use client';
import { motion } from 'framer-motion';

export default function DraggableSticker({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      whileHover={{ scale: 1.05, rotate: 2 }}
      whileDrag={{ scale: 1.1, cursor: 'grabbing', zIndex: 100 }}
      className={`absolute z-30 cursor-grab px-4 py-2 bg-foreground text-background text-mono border border-background border-dashed ${className}`}
    >
      {children}
    </motion.div>
  );
}