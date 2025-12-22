'use client';
import { motion } from 'framer-motion';

export default function Marquee({ text, repeat = 4 }: { text: string, repeat?: number }) {
  return (
    <div className="relative flex overflow-hidden border-y border-black py-4 bg-white z-20">
      <motion.div
        className="flex whitespace-nowrap font-bold text-6xl md:text-8xl uppercase tracking-tighter"
        animate={{ x: "-50%" }}
        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
      >
        {Array.from({ length: repeat }).map((_, i) => (
          <span key={i} className="mx-8">{text} —</span>
        ))}
      </motion.div>
    </div>
  );
}