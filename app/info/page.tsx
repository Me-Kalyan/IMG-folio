'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CopyEmail from '@/components/CopyEmail';
import TextReveal from '@/components/TextReveal';

export default function InfoPage() {
    // --- LIVE TIME LOGIC ---
    const [time, setTime] = useState<string>('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                timeZone: 'Asia/Kolkata'
            }));
        };
        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    // --- ANIMATION VARIANTS ---
    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
        }
    };

    const lineVariant = {
        hidden: { scaleX: 0, originX: 0 },
        visible: {
            scaleX: 1,
            transition: { duration: 0.8, delay: 0.2, ease: "circOut" as const }
        }
    };

    return (
        <main className="min-h-screen bg-white text-black font-sans pb-32">

            {/* 1. HERO HEADER */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="px-4 pt-32 pb-8 max-w-7xl mx-auto"
            >
                <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-4 leading-none uppercase">
                    INFO
                </h1>
                <p className="font-mono text-xs uppercase tracking-widest text-gray-500">
                    PROFILE & CONTACT / 2025
                </p>
            </motion.section>

            {/* 2. MAIN CONTENT GRID */}
            <section className="px-4 max-w-7xl mx-auto">

                {/* The Animated Divider Line */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={lineVariant}
                    className="w-full h-px bg-black mb-12"
                />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

                    {/* LEFT COL: Biography (Spans 6 cols) */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        transition={{ delay: 0.3 }} // Delay slightly so it comes in after the header
                        className="md:col-span-7 lg:col-span-6"
                    >
                        <h2 className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-6">
                            Biography
                        </h2>
                        <div className="prose prose-lg text-black leading-snug text-xl md:text-2xl font-medium max-w-none">
                            <p className="mb-8">
                                Photographer and Art Director based in Hyderabad. My work attempts to document the silent infrastructure that powers our daily lives, focusing on the interplay of harsh shadows, raw materials, and urban decay.
                            </p>
                            <p className="text-gray-500">
                                Currently exploring the intersection of brutalist architecture and digital entropy. Available for editorial, commercial, and architectural assignments globally.
                            </p>
                        </div>
                    </motion.div>

                    {/* RIGHT COL: Data / Contact (Spans 4 cols, pushed to right) */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        transition={{ delay: 0.4 }} // Staggered delay
                        className="md:col-start-9 md:col-span-4 flex flex-col gap-10"
                    >

                        {/* Contact Group */}
                        <div>
                            <h2 className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-4">
                                Inquiries
                            </h2>
                            <CopyEmail email="hello@kalyan.work" />
                            <p className="font-mono text-[10px] text-gray-400 uppercase">
                                Response time: 24-48 Hours
                            </p>
                        </div>

                        {/* Social Group */}
                        <div>
                            <h2 className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-4">
                                Connect
                            </h2>
                            <div className="flex flex-col gap-2 items-start">
                                {['Instagram', 'Twitter', 'Behance', 'LinkedIn'].map((social) => (
                                    <a
                                        key={social}
                                        href="#"
                                        className="font-sans text-lg font-medium hover:bg-black hover:text-white px-1 -ml-1 transition-colors"
                                    >
                                        {social}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Status Group */}
                        <div>
                            <h2 className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-4">
                                Status
                            </h2>
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="font-sans text-base font-medium">Open for Work</span>
                            </div>
                        </div>

                    </motion.div>

                </div>
            </section>

            {/* 3. MANIFESTO (Text Reveal) */}
            <section className="max-w-4xl mx-auto py-32 px-4">
                <TextReveal>
                    We believe in the power of visual storytelling. Every image captures a moment of silence in a chaotic world. This is the archive of our vision.
                </TextReveal>
            </section>

            {/* 3. MOBILE FOOTER DATA */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-sm border-t border-black py-4 z-40 md:hidden"
            >
                <div className="px-4 flex justify-between font-mono text-[10px] uppercase tracking-widest text-gray-500">
                    <span>{time} IST</span>
                    <span>HYD, IN</span>
                </div>
            </motion.div>

        </main>
    );
}
