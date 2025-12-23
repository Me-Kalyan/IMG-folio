'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';

interface SanityImage {
    _type: string;
    asset: {
        _ref: string;
        _type: string;
    };
}

interface EditorialImageProps {
    image: SanityImage;
    alt: string;
    parallaxSpeed?: number;
    aspectRatio?: string;
    className?: string;
}

export default function EditorialImage({
    image,
    alt,
    aspectRatio = 'aspect-[4/5]',
    className = ''
}: EditorialImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Subtle Parallax
    const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden ${aspectRatio} ${className} bg-gray-100 dark:bg-zinc-900 group`}
        >
            {/* Reveal Mask Animation */}
            <motion.div
                initial={{ y: '100%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} // Ease out expo-ish
                className="absolute inset-0 z-10 bg-inherit"
            />

            <motion.div style={{ y }} className="absolute inset-0 scale-110">
                {image && (
                    <Image
                        src={urlFor(image).width(1200).url()}
                        alt={alt}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                )}
            </motion.div>

            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>
    );
}
