'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev < 100) return prev + 1;
        clearInterval(interval);
        return 100;
      });
    }, 20);
    const timeout = setTimeout(() => setIsLoading(false), 2500);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-end bg-black text-white px-4 pb-8 cursor-wait"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex justify-between w-full max-w-7xl mx-auto items-end font-bold text-[15vw] leading-none tracking-tighter">
             <h1>IMG'folio</h1>
             <span className="tabular-nums">{count}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}