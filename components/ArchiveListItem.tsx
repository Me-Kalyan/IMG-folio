'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { urlFor } from '@/lib/sanity';

interface ArchiveListItemProps {
  slug: string;
  title: string;
  client?: string;
  year?: string;
  coverImage?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  index: number;
}

export default function ArchiveListItem({ slug, title, client, year, coverImage, index }: ArchiveListItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) setMousePos({ x: e.clientX - rect.left + 20, y: e.clientY - rect.top - 100 });
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative border-b border-neutral-200"
    >
      <Link
        href={`/work/${slug}`}
        className="group grid grid-cols-12 py-6 hover:bg-black hover:text-white transition-colors cursor-pointer items-baseline px-2"
      >
        <div className="col-span-2 font-mono text-xs">{year}</div>
        <div className="col-span-4 font-sans font-medium">{client || 'Personal'}</div>
        <div className="col-span-6 font-sans font-bold uppercase text-lg md:text-2xl tracking-tight">
          {title}
        </div>
      </Link>
      {isHovered && coverImage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, x: mousePos.x, y: mousePos.y }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
          className="pointer-events-none absolute top-0 left-0 z-50 w-[250px] h-[180px] overflow-hidden hidden md:block border border-black"
        >
          <Image src={urlFor(coverImage).width(400).url()} alt={title} fill className="object-cover" />
        </motion.div>
      )}
    </motion.div>
  );
}