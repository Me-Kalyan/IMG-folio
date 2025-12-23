'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // 1. Mobile Detection
    const checkDevice = () => {
      const hasMouse = window.matchMedia('(pointer: fine)').matches;
      setIsMobile(!hasMouse);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    // 2. Movement Logic
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      const clickable = target.closest('a, button, input, textarea, [role="button"]');
      setIsHovering(!!clickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkDevice);
    }
  }, [isVisible]);

  // Don't render on mobile or before first move
  if (isMobile) return null;
  if (!isVisible) return null;

  return (
    <>
      {/* Main Dot - Mix Blend Difference ensures it is visible on white (black) and black (white) */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none mix-blend-difference z-[99999]"
        animate={{
          x: mousePos.x - 6,
          y: mousePos.y - 6,
          scale: isHovering ? 0 : 1
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />
      {/* Magnetic Ring */}
      <motion.div
        className="fixed top-0 left-0 border-2 border-white rounded-full pointer-events-none mix-blend-difference z-[99999]"
        animate={{
          x: mousePos.x - (isHovering ? 32 : 10),
          y: mousePos.y - (isHovering ? 32 : 10),
          width: isHovering ? 64 : 20,
          height: isHovering ? 64 : 20,
          opacity: isHovering ? 1 : 0.5,
          borderWidth: isHovering ? '2px' : '1px'
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      />
    </>
  );
}