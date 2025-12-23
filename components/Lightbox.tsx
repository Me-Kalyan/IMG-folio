'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import { useEffect } from 'react';

interface SanityImage {
    _type: string;
    asset: {
        _ref: string;
        _type: string;
    };
}

interface LightboxProps {
    isOpen: boolean;
    onClose: () => void;
    image: SanityImage | null;
    alt: string;
}

export default function Lightbox({ isOpen, onClose, image, alt }: LightboxProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!image) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 z-[99999] flex items-center justify-center bg-background/95 backdrop-blur-2xl p-6 md:p-12 cursor-pointer"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 z-10 font-mono text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
                    >
                        [ Close ]
                    </button>

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="relative w-full h-full max-w-7xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={urlFor(image).width(2000).url()}
                            alt={alt}
                            fill
                            className="object-contain"
                            sizes="100vw"
                        />
                    </motion.div>

                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] opacity-30 text-center pointer-events-none">
                        {alt} — Editorial View
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
