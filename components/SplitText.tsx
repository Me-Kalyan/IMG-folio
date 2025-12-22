'use client';
import { motion } from 'framer-motion';

export default function SplitText({ children }: { children: string }) {
    // Split text into words
    const words = children.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const child = {
        hidden: { y: "100%" },
        visible: {
            y: 0,
            transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] as const }
        }
    };

    return (
        <motion.h2
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight overflow-hidden flex flex-wrap gap-x-3 gap-y-1 justify-center"
        >
            {words.map((word, index) => (
                <span key={index} className="relative overflow-hidden inline-block">
                    <motion.span variants={child} className="inline-block">
                        {word}
                    </motion.span>
                </span>
            ))}
        </motion.h2>
    );
}
