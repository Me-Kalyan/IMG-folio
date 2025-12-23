'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
    { id: '01', title: 'Art Direction', desc: 'Defining the visual language for brands, campaigns, and digital products through photography and typography.' },
    { id: '02', title: 'Web Development', desc: 'Building high-performance, interactive websites using Next.js, React, and WebGL technologies.' },
    { id: '03', title: 'Content Creation', desc: 'Producing high-fidelity visual assets, 3D renders, and motion graphics for social and web.' },
];

export default function ServiceAccordion() {
    const [active, setActive] = useState<string | null>(null);

    return (
        <div className="w-full border-t border-foreground/20">
            {services.map((s) => (
                <div key={s.id} className="border-b border-foreground/20">
                    <button
                        onClick={() => setActive(active === s.id ? null : s.id)}
                        className="w-full py-8 flex items-baseline justify-between hover:bg-foreground/5 transition-colors px-2 group"
                    >
                        <div className="flex items-baseline gap-8 md:gap-16">
                            <span className="font-mono text-xs text-foreground/40 group-hover:text-foreground transition-colors">{s.id}</span>
                            <span className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-foreground">{s.title}</span>
                        </div>
                        <span className="text-3xl font-light text-foreground">{active === s.id ? '−' : '+'}</span>
                    </button>
                    <AnimatePresence>
                        {active === s.id && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="pb-10 pl-14 md:pl-24 max-w-2xl text-foreground/60 text-lg leading-relaxed uppercase font-medium">
                                    {s.desc}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}
