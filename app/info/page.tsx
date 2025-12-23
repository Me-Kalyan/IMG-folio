'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';

// Components
import Header from '@/components/Header';
import StatusPopup from '@/components/StatusPopup';
import ServiceAccordion from '@/components/ServiceAccordion';
import ProcessSteps from '@/components/ProcessSteps';

export default function InfoPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="bg-background min-h-screen text-foreground selection:bg-foreground selection:text-background transition-colors duration-500">
            <Header />
            <StatusPopup />

            {/* 1. STUDIO PROFILE HEADER */}
            <section className="relative pt-48 pb-20 px-6 md:px-12 max-w-[100rem] mx-auto border-b border-foreground/10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
                    <div className="md:col-span-12">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                            className="text-[12vw] font-black tracking-tighter uppercase leading-[0.75]"
                        >
                            Studio<br />
                            Profile.
                        </motion.h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-20 pt-12 border-t border-foreground/5">
                    <div className="md:col-span-1 hidden md:block">
                        <span className="text-mono opacity-20 vertical-text transform -rotate-180 origin-center">Established 25</span>
                    </div>
                    <div className="md:col-span-5">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight">
                            A creative practice operating at the intersection of branding, digital experiences, and culture.
                        </h2>
                    </div>
                    <div className="md:col-span-6 space-y-12 text-sm md:text-lg leading-relaxed opacity-60 max-w-xl">
                        <p>
                            Based in Hyderabad, India, IMG&apos;folio works with visionary brands through a rigorous Swiss design lens. We believe that clarity is the ultimate luxury in a saturated digital landscape.
                        </p>
                        <p>
                            Our method is rooted in mathematical grids and typographic systems, ensuring that every visual artifact we produce is as functional as it is aesthetic.
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. CAPABILITIES — MODULAR GRID */}
            <section className="py-32 px-6 md:px-12 max-w-[100rem] mx-auto bg-accent/30 border-b border-foreground/10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-4">
                        <span className="text-mono opacity-40 block mb-6">Expertise</span>
                        <h3 className="text-5xl font-black uppercase tracking-tighter">Capabilities</h3>
                    </div>
                    <div className="md:col-span-8">
                        <ServiceAccordion />
                    </div>
                </div>
            </section>

            {/* 3. CINEMATIC PROCESS — THE SYSTEM */}
            <section className="bg-accent/20 py-40 border-b border-foreground/10">
                <div className="px-6 md:px-12 max-w-[100rem] mx-auto">
                    <span className="text-mono opacity-40 block mb-12">Execution</span>
                    <ProcessSteps />
                </div>
            </section>

            {/* 4. RECOGNITION — LIST INDEX */}
            <section className="py-40 px-6 md:px-12 max-w-[100rem] mx-auto border-b border-foreground/10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-4">
                        <h2 className="text-6xl font-black uppercase tracking-tighter leading-[0.8] mb-12">Validation.</h2>
                    </div>
                    <div className="md:col-span-8 flex flex-col">
                        {[
                            { year: '2024', award: 'Site of the Day', org: 'Awwwards' },
                            { year: '2024', award: 'Honorable Mention', org: 'Clio Awards' },
                            { year: '2023', award: 'Best UI/UX', org: 'Behance' },
                            { year: '2023', award: 'Mobile Excellence', org: 'Google Design' },
                        ].map((item, i) => (
                            <div key={i} className="group flex justify-between items-center border-b border-foreground/10 py-10 hover:bg-foreground hover:text-background px-4 transition-all duration-500 cursor-default">
                                <span className="text-2xl md:text-3xl font-black uppercase tracking-tighter group-hover:italic transition-all">{item.award}</span>
                                <div className="flex gap-8 text-[10px] text-mono group-hover:opacity-100 transition-opacity">
                                    <span className="opacity-40">{item.org}</span>
                                    <span>{item.year}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. FOOTER — THE LAST IMPRESSION */}
            <footer className="pt-32 pb-12 px-6 md:px-12 max-w-[100rem] mx-auto">
                <div className="mb-32">
                    <h2 className="text-[12vw] font-black tracking-tighter leading-none uppercase mb-12">
                        Get In Touch.
                    </h2>
                    <a href="mailto:hello@img.folio" className="text-4xl md:text-6xl font-bold underline underline-offset-[1.5rem] hover:opacity-50 transition-opacity">
                        hello@img.folio ↗
                    </a>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 pt-12 border-t border-foreground/5">
                    <div className="flex gap-12">
                        {['Instagram', 'Twitter', 'LinkedIn'].map((s) => (
                            <a key={s} href="#" className="text-mono opacity-40 hover:opacity-100 transition-opacity">{s}</a>
                        ))}
                    </div>
                    <div className="flex flex-col items-end text-mono opacity-20 text-[10px]">
                        <span>© 2025 IMG&apos;folio Studio</span>
                        <span>Visual Archive 24/25</span>
                    </div>
                </div>
            </footer>
        </main>
    );
}
