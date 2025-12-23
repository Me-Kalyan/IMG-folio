'use client';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function MagneticLink({ href, children, isActive }: { href: string, children: string, isActive?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.35, y: middleY * 0.35 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.1 }}
      className="relative"
    >
      <Link
        href={href}
        className={`relative block transition-opacity duration-300 ${isActive ? 'opacity-100 font-bold' : 'opacity-40 hover:opacity-100'}`}
      >
        {children}
        {isActive && (
          <motion.div
            layoutId="nav-underline"
            className="absolute -bottom-1 left-0 w-full h-[1px] bg-current"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </Link>
    </motion.div>
  );
}