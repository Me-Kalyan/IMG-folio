'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function TextReveal({ children }: { children: string }) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start 0.9", "end 0.25"] // Adjusts when the effect starts/ends
    });

    const words = children.split(" ");

    return (
        <p ref={container} className="text-4xl md:text-5xl leading-tight font-bold flex flex-wrap gap-x-3 gap-y-1">
            {words.map((word, i) => {
                const start = i / words.length;
                const end = start + (1 / words.length);
                return (
                    <Word key={i} range={[start, end]} progress={scrollYProgress}>
                        {word}
                    </Word>
                );
            })}
        </p>
    );
}

const Word = ({ children, range, progress }: any) => {
    const opacity = useTransform(progress, range, [0.1, 1]); // 0.1 is gray, 1 is black
    return (
        <span className="relative">
            <span className="absolute opacity-10">{children}</span>
            <motion.span style={{ opacity }}>{children}</motion.span>
        </span>
    );
};
