'use client';
import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 28, stiffness: 400, mass: 0.5 };
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
      className="fixed top-0 left-0 pointer-events-none z-[999999]"
      style={{
        x: cursorX,
        y: cursorY,
      }}
    >
      {/* Arrow cursor (default) */}
      <motion.svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        animate={{
          opacity: isHovering ? 0 : 1,
          scale: isHovering ? 0.8 : 1,
        }}
        transition={{ duration: 0.15 }}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <path
          d="M5 3L19 12L12 14L9 21L5 3Z"
          fill="currentColor"
          className="text-foreground"
        />
        <path
          d="M5 3L19 12L12 14L9 21L5 3Z"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinejoin="round"
          className="text-background"
        />
      </motion.svg>

      {/* Hand/pointer cursor (on hover) */}
      <motion.svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        animate={{
          opacity: isHovering ? 1 : 0,
          scale: isHovering ? 1 : 0.8,
        }}
        transition={{ duration: 0.15 }}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        {/* Pointing hand */}
        <path
          d="M10 7V4C10 3.45 10.45 3 11 3C11.55 3 12 3.45 12 4V11H13V5C13 4.45 13.45 4 14 4C14.55 4 15 4.45 15 5V11H16V6C16 5.45 16.45 5 17 5C17.55 5 18 5.45 18 6V11H19V8C19 7.45 19.45 7 20 7C20.55 7 21 7.45 21 8V15C21 18.31 18.31 21 15 21H12C9.79 21 7.88 19.64 7.22 17.56L5.08 11.22C4.86 10.58 5.26 9.9 5.93 9.77L6.18 9.72C6.75 9.61 7.32 9.94 7.53 10.48L8.5 13H9V4C9 3.45 9.45 3 10 3C10.55 3 11 3.45 11 4"
          fill="currentColor"
          className="text-foreground"
        />
        <path
          d="M10 7V4C10 3.45 10.45 3 11 3C11.55 3 12 3.45 12 4V11H13V5C13 4.45 13.45 4 14 4C14.55 4 15 4.45 15 5V11H16V6C16 5.45 16.45 5 17 5C17.55 5 18 5.45 18 6V11H19V8C19 7.45 19.45 7 20 7C20.55 7 21 7.45 21 8V15C21 18.31 18.31 21 15 21H12C9.79 21 7.88 19.64 7.22 17.56L5.08 11.22C4.86 10.58 5.26 9.9 5.93 9.77L6.18 9.72C6.75 9.61 7.32 9.94 7.53 10.48L8.5 13H9V4C9 3.45 9.45 3 10 3C10.55 3 11 3.45 11 4"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeLinejoin="round"
          className="text-background"
        />
      </motion.svg>
    </motion.div>
  );
}