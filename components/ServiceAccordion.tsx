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
        <div className="w-full border-t border-black/10">
            {services.map((s) => (
                <div key={s.id} className="border-b border-black/10">
                    <button
                        onClick={() => setActive(active === s.id ? null : s.id)}
                        className="w-full py-8 flex items-baseline justify-between hover:bg-gray-50 transition-colors px-2 text-left"
                    >
                        <div className="flex items-baseline gap-8 md:gap-16">
                            <span className="font-mono text-xs text-gray-400">{s.id}</span>
                            <span className="text-2xl md:text-4xl font-medium tracking-tight">{s.title}</span>
                        </div>
                        <span className="text-2xl font-light">{active === s.id ? '−' : '+'}</span>
                    </button>
                    <AnimatePresence initial={false}>
                        {active === s.id && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                className="overflow-hidden"
                            >
                                <div className="pb-8 pl-14 md:pl-24 max-w-2xl text-gray-600 text-lg leading-relaxed">
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
