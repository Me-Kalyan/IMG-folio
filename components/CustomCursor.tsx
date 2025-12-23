'use client';
import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 30, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  useEffect(() => {
    const checkDevice = () => {
      const hasMouse = window.matchMedia('(pointer: fine)').matches;
      setIsMobile(!hasMouse);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      const clickable = target.closest('a, button, input, textarea, [role="button"], .cursor-zoom-in');
      setIsHovering(!!clickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkDevice);
    }
  }, [isVisible, cursorX, cursorY]);

  if (isMobile) return null;
  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%'
      }}
      animate={{
        scale: isHovering ? 5 : 1
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    />
  );
}