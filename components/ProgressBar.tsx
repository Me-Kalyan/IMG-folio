'use client';
import { motion, useScroll } from 'framer-motion';
export default function ProgressBar() {
  const { scrollYProgress } = useScroll();
  return <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-black origin-left z-[9999]" style={{ scaleX: scrollYProgress }} />;
}