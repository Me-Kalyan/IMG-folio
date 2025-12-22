'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

// Added className prop
export default function FocusGrid({ children, className }: { children: React.ReactNode, className?: string }) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div
      // Use the passed className, or a default if none is provided
      className={className || "columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4"}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {Array.isArray(children) && children.map((child, i) => (
        <motion.div
          key={i}
          className="break-inside-avoid mb-4 transition-opacity duration-500"
          style={{ opacity: isHovering ? 0.3 : 1 }}
          whileHover={{ opacity: 1 }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}