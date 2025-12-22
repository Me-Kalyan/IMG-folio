'use client';

import { motion } from 'framer-motion';

// Components
import StatusPopup from '@/components/StatusPopup';
import ServiceAccordion from '@/components/ServiceAccordion';
import ProcessSteps from '@/components/ProcessSteps';
import ClientLogos from '@/components/ClientLogos';
import DraggableSticker from '@/components/DraggableSticker';

export default function InfoPage() {
    return (
        <main className="bg-white dark:bg-black min-h-screen text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-500">

            <StatusPopup />

            {/* 1. HERO */}
            <section className="relative pt-40 pb-20 px-4 md:px-6 max-w-7xl mx-auto min-h-[60vh] flex flex-col justify-end">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-6xl md:text-[9rem] font-bold tracking-tighter leading-[0.85] mb-12">
                        STUDIO<br />
                        PROFILE.
                    </h1>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 border-t border-black dark:border-white pt-12">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest mb-4">About</h3>
                            <p className="text-2xl md:text-3xl font-medium leading-tight">
                                We are a digital design practice crafting brands, websites, and visual systems for culture and commerce.
                            </p>
                        </div>
                        <div className="text-gray-500 leading-relaxed text-lg">
                            <p className="mb-6">
                                Founded in 2025 in Hyderabad, IMG&apos;folio operates at the intersection of art direction and creative technology. We believe that good design is honest, functional, and culturally relevant.
                            </p>
                            <p>
                                Our approach is rooted in the Swiss tradition of grid systems and typography, updated for the modern web. We work with clients who value craftsmanship and attention to detail.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* 2. SERVICES (Expertise) */}
            <section className="py-24 px-4 md:px-6 bg-gray-50 dark:bg-neutral-900">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <h2 className="text-sm font-bold uppercase tracking-widest border border-black dark:border-white bg-white dark:bg-black inline-block px-3 py-1 rounded-full">
                            Capabilities
                        </h2>
                    </div>
                    <ServiceAccordion />
                </div>
            </section>

            {/* 3. METHODOLOGY */}
            <ProcessSteps />

            {/* 4. CLIENTS */}
            <ClientLogos />

            {/* 5. AWARDS / RECOGNITION (Simple Text List) */}
            <section className="py-24 px-4 md:px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-4xl font-bold tracking-tight mb-8">Recognition</h2>
                    </div>
                    <div className="space-y-6">
                        {[
                            { year: '2024', award: 'Site of the Day', org: 'Awwwards' },
                            { year: '2024', award: 'Honorable Mention', org: 'Clio Awards' },
                            { year: '2023', award: 'Best UI/UX', org: 'Behance' },
                            { year: '2023', award: 'Mobile Excellence', org: 'Google Design' },
                        ].map((item, i) => (
                            <div key={i} className="flex justify-between items-baseline border-b border-gray-100 pb-4 hover:pl-4 transition-all duration-300 cursor-default">
                                <span className="text-xl font-medium">{item.award}</span>
                                <div className="flex gap-4 text-sm text-gray-500 font-mono uppercase">
                                    <span>{item.org}</span>
                                    <span>{item.year}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. FOOTER */}
            <footer className="relative bg-black text-white pt-32 pb-12 px-4 md:px-6 rounded-t-[3rem] -mt-10 z-10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end min-h-[40vh]">
                    <div className="mb-12 md:mb-0">
                        <DraggableSticker className="-top-20 left-0">
                            <div className="bg-white text-black font-mono text-xs px-3 py-1 -rotate-3 uppercase tracking-widest border border-black shadow-lg">
                                Say Hello
                            </div>
                        </DraggableSticker>
                        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">
                            Have an idea?
                        </h2>
                        <a href="mailto:hello@img.folio" className="text-6xl md:text-[8vw] font-bold tracking-tighter leading-none hover:text-gray-400 transition-colors">
                            LET&apos;S TALK
                        </a>
                    </div>
                    <div className="flex flex-col gap-6 text-right">
                        <div className="flex gap-6 justify-end">
                            {['Instagram', 'Twitter', 'LinkedIn'].map((s) => (
                                <a key={s} href="#" className="font-mono text-xs uppercase tracking-widest hover:underline hover:text-gray-300">{s}</a>
                            ))}
                        </div>
                        <div className="flex flex-col text-gray-500 font-mono text-[10px] uppercase tracking-widest">
                            <span>© 2025 IMG&apos;folio</span>
                            <span>Hyderabad, India</span>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}
