'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsHoveringLink(!!(target.closest('a') || target.closest('button')));
    };
    window.addEventListener('mousemove', updateMouse);
    return () => window.removeEventListener('mousemove', updateMouse);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      animate={{
        x: mousePosition.x - (isHoveringLink ? 32 : 12),
        y: mousePosition.y - (isHoveringLink ? 32 : 12),
        width: isHoveringLink ? 64 : 24,
        height: isHoveringLink ? 64 : 24,
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
    />
  );
}