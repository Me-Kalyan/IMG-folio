'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import MagneticLink from './MagneticLink';

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (pathname === '/') {
      setHidden(latest < 200);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      variants={{ visible: { y: 0 }, hidden: { y: "100%" } }}
      initial={pathname === '/' ? "hidden" : "visible"}
      animate={hidden && pathname === '/' ? "hidden" : "visible"}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-0 left-0 w-full z-[60] md:mix-blend-normal"
    >
      {/* Background for Desktop */}
      <div className="absolute inset-0 bg-white/90 backdrop-blur-md border-t border-neutral-200 hidden md:block" />

      {/* Background for Mobile - Solid White to ensure visibility */}
      <div className="absolute inset-0 bg-white border-t border-neutral-200 md:hidden" />

      <div className="relative max-w-7xl mx-auto px-4 h-16 md:h-14 grid grid-cols-3 md:grid-cols-4 items-center font-mono text-[10px] md:text-xs uppercase tracking-widest pb-safe">
        <div className="hidden md:flex justify-start">
          <span className="opacity-50">© 2025 IMG&apos;folio</span>
        </div>
        <div className="col-span-3 md:col-span-2 flex justify-between md:justify-center md:gap-12 w-full px-4 md:px-0 text-black">
          {['index', 'work', 'info'].map((item) => {
            const path = item === 'index' ? '/' : `/${item}`;
            return <MagneticLink key={item} href={path} isActive={pathname === path}>{item}</MagneticLink>
          })}
        </div>
        <div className="hidden md:flex justify-end items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>Open for Work</span>
        </div>
      </div>
    </motion.nav>
  );
}