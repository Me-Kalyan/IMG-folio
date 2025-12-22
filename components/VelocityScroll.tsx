'use client';
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';
import { useRef } from 'react';

// Simple wrap utility
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

function ParallaxText({ children, baseVelocity = 100 }: { children: React.ReactNode, baseVelocity: number }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef<number>(1);
  
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap m-0">
      <motion.div className="flex whitespace-nowrap gap-8" style={{ x }}>
        {children} {children} {children} {children}
      </motion.div>
    </div>
  );
}

const dummyItems = [1, 2, 3, 4, 5];

export default function VelocityScroll() {
  return (
    <section className="relative w-full py-32 overflow-hidden bg-white text-black z-10 border-t border-black/10">
      <div className="max-w-7xl mx-auto px-4 mb-16 flex items-end justify-between">
         <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-none">Visual<br/>Stream</h2>
         <span className="font-mono text-xs uppercase tracking-widest text-gray-400">— Drag to Pan</span>
      </div>
      <ParallaxText baseVelocity={-1}>
         {dummyItems.map((i) => (
           <div key={i} className="group relative h-[300px] w-[400px] md:h-[400px] md:w-[550px] shrink-0 bg-neutral-50 border border-black/10 hover:border-black transition-colors duration-500 overflow-hidden flex flex-col items-center justify-center gap-4">
               <div className="w-16 h-16 rounded-full border border-black flex items-center justify-center">
                   <span className="font-mono text-xs">{i.toString().padStart(2, '0')}</span>
               </div>
               <span className="font-mono text-[10px] uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">Image Pending</span>
           </div>
         ))}
      </ParallaxText>
    </section>
  );
}