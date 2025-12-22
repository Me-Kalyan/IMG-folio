'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Check if hovering over clickable elements
      const target = e.target as HTMLElement;
      const clickable = target.closest('a, button, input, [role="button"]');
      setIsHovering(!!clickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* 1. Main Dot (Follows perfectly) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-black dark:bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePos.x - 4, // Center the 8px dot
          y: mousePos.y - 4,
          scale: isHovering ? 0 : 1 // Disappear when hovering (ring takes over)
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />

      {/* 2. Magnetic Ring (Follows with delay/spring) */}
      <motion.div
        className="fixed top-0 left-0 border border-black dark:border-white rounded-full pointer-events-none z-[9998] mix-blend-difference"
        animate={{
          x: mousePos.x - (isHovering ? 24 : 10), // Adjust centering based on size
          y: mousePos.y - (isHovering ? 24 : 10),
          width: isHovering ? 48 : 20,
          height: isHovering ? 48 : 20,
          opacity: isHovering ? 1 : 0.5,
          borderWidth: isHovering ? '2px' : '1px',
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1
        }}
      />
    </>
  );
}