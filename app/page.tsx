'use client';

import { motion } from 'framer-motion';

// Core Components
import Header from '@/components/Header';
import StatusPopup from '@/components/StatusPopup';
import MasonryGrid from '@/components/MasonryGrid';
import Link from 'next/link';
import VelocityScroll from '@/components/VelocityScroll';

export default function Home() {
    return (
        <main className="bg-background min-h-screen text-foreground selection:bg-foreground selection:text-background transition-colors duration-500 pb-20">

            <Header />
            <StatusPopup />

            {/* 1. SWISS HERO — MASSIVE TYPOGRAPHY */}
            <section className="relative pt-48 pb-20 px-6 md:px-12 max-w-[100rem] mx-auto min-h-[80vh] flex flex-col justify-end border-b border-foreground/10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
                    <div className="md:col-span-12">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                            className="flex flex-col"
                        >
                            <span className="text-mono mb-8 opacity-40">Portfolio 2025 ® Hyderabad, India</span>
                            <h1 className="text-[12vw] md:text-[14vw] font-black tracking-tighter leading-[0.75] uppercase">
                                Visual<br />
                                Archive.
                            </h1>
                        </motion.div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-16 pt-12 border-t border-foreground/5 items-start">
                    <div className="md:col-span-4 self-start">
                        <p className="text-xl md:text-2xl font-bold tracking-tight uppercase leading-tight max-w-sm">
                            Independent Design Practice focusing on high-end visual storytelling and creative technology.
                        </p>
                    </div>
                    <div className="md:col-span-4 md:col-start-9">
                        <div className="flex flex-col gap-4 text-sm opacity-50 font-medium">
                            <p>Curating experiences that resonate at the intersection of Swiss International minimalism and contemporary culture.</p>
                            <div className="flex items-center gap-4 mt-4">
                                <span className="w-12 h-px bg-foreground opacity-20" />
                                <span className="text-mono">Scroll to Explore</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. PHOTO MASONRY GRID — THE CORE EXPERIENCE */}
            <section id="work" className="py-32">
                <div className="px-6 md:px-12 max-w-[100rem] mx-auto mb-16 flex justify-between items-end">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Selected<br />Observations</h2>
                    <span className="text-mono opacity-30">Archive 01 — 12</span>
                </div>
                <MasonryGrid />
            </section>

            {/* 3. VISUAL STREAM SCROLL */}
            <section className="py-20 border-y border-foreground/5">
                <VelocityScroll />
            </section>

            {/* 4. STUDIO APPROACH — MODULAR GRID */}
            <section className="py-32 px-6 md:px-12 max-w-[100rem] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-4">
                        <span className="text-mono opacity-40 block mb-6">Expertise</span>
                        <h3 className="text-5xl font-black uppercase tracking-tighter mb-8">Capabilities.</h3>
                    </div>
                    <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-foreground/10">
                        {[
                            { title: 'Art Direction', desc: 'Crafting unique visual languages and brand systems that define the brand logic across all touchpoints.' },
                            { title: 'Creative Development', desc: 'Building high-performance digital artifacts with a focus on immersive interactions and motion.' },
                            { title: 'Editorial Design', desc: 'Applying strict Swiss typographic systems to digital and physical content for maximum clarity.' },
                            { title: 'Strategy', desc: 'Connecting the dots between business objectives and visual expression to ensure cultural relevance.' }
                        ].map((service, i) => (
                            <div key={i} className="flex flex-col gap-4">
                                <span className="text-mono opacity-20">0{i + 1}</span>
                                <h4 className="text-xl font-black uppercase tracking-tight">{service.title}</h4>
                                <p className="text-sm opacity-50 leading-relaxed max-w-xs">{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. FOOTER — THE LAST IMPRESSION */}
            <footer className="pt-32 pb-12 px-6 md:px-12 border-t border-foreground/10">
                <div className="max-w-[100rem] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end mb-24">
                        <div className="md:col-span-8">
                            <h2 className="text-[10vw] font-black tracking-tighter uppercase leading-[0.8]">
                                Let&apos;s build<br />
                                the future.
                            </h2>
                        </div>
                        <div className="md:col-span-4 flex flex-col items-end gap-6">
                            <a href="mailto:hello@img.folio" className="text-2xl md:text-3xl font-bold uppercase underline underline-offset-8 hover:opacity-50 transition-opacity">
                                hello@img.folio
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-12 pt-12 border-t border-foreground/5">
                        <div className="flex gap-12">
                            {['Instagram', 'X (Twitter)', 'LinkedIn'].map((link) => (
                                <Link key={link} href="#" className="text-mono opacity-40 hover:opacity-100 transition-opacity whitespace-nowrap">
                                    {link}
                                </Link>
                            ))}
                        </div>
                        <div className="flex flex-col md:items-end text-mono opacity-20 text-[10px]">
                            <span>© 2025 IMG&apos;folio Studio</span>
                            <span>India — Working Globally</span>
                        </div>
                    </div>
                </div>
            </footer>

        </main>
    );
}