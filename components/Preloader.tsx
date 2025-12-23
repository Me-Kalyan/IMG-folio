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
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black text-white px-6 cursor-wait"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col md:flex-row justify-between w-full max-w-7xl mx-auto items-center md:items-end font-bold text-[12vw] md:text-[8vw] leading-none tracking-tighter">
            <h1>IMG&apos;folio</h1>
            <span className="tabular-nums opacity-50">{count}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}