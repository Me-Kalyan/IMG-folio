'use client';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ScrambleText from './ScrambleText';

export default function MagneticLink({ href, children, isActive }: { href: string, children: string, isActive?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      <Link href={href} className="relative group py-4 md:py-2 block">
         <ScrambleText className={`${isActive ? 'opacity-100 font-bold' : 'opacity-60'} transition-opacity group-hover:opacity-100`}>
           {children}
         </ScrambleText>
         {isActive && (
            <motion.div layoutId="navDot" className="absolute -bottom-1 left-1/2 w-1 h-1 bg-white md:bg-black rounded-full -translate-x-1/2" />
         )}
      </Link>
    </motion.div>
  );
}