'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Example dummy data (replace with your props if needed)
const items = [
    { id: 1, title: "Tokyo", src: "/image1.jpg" }, // Replace with real image paths or URLs if available
    { id: 2, title: "Kyoto", src: "/image2.jpg" },
    { id: 3, title: "Osaka", src: "/image3.jpg" },
    { id: 4, title: "Seoul", src: "/image4.jpg" },
];

export default function HorizontalScroll() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Moves the X position from 0% to -75% (depends on how many items you have)
    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-black text-white">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">

                <motion.div style={{ x }} className="flex gap-10 pl-20">

                    {/* Header Card */}
                    <div className="h-[400px] w-[300px] flex flex-col justify-center shrink-0">
                        <h2 className="text-6xl font-bold tracking-tighter leading-none uppercase">
                            Selected<br />Series
                        </h2>
                        <p className="mt-4 font-mono text-xs uppercase tracking-widest text-gray-500">
                            Scroll Down →
                        </p>
                    </div>

                    {/* The Cards */}
                    {items.map((item) => (
                        <div key={item.id} className="group relative h-[400px] w-[300px] md:h-[500px] md:w-[400px] bg-neutral-900 overflow-hidden shrink-0">
                            {/* Placeholder for image */}
                            <div className="absolute inset-0 bg-neutral-800" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="font-bold text-2xl uppercase">{item.title}</span>
                            </div>
                        </div>
                    ))}

                </motion.div>
            </div>
        </section>
    );
}
