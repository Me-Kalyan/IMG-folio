'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function StatusPopup() {
    const [isVisible, setIsVisible] = useState(true);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ delay: 2.5, type: "spring", stiffness: 100, damping: 20 }}
                    className="fixed bottom-12 right-12 z-[60] bg-background border border-foreground/10 shadow-2xl w-72 overflow-hidden hidden md:block cursor-grab active:cursor-grabbing"
                >
                    {/* Window Header */}
                    <div className="bg-secondary border-b border-foreground/5 px-4 py-3 flex justify-between items-center select-none">
                        <div className="flex gap-2">
                            <button
                                onClick={() => setIsVisible(false)}
                                className="w-2.5 h-2.5 rounded-full bg-foreground/20 hover:bg-red-500 transition-colors"
                            />
                            <div className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
                            <div className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
                        </div>
                        <span className="text-[9px] uppercase font-mono tracking-[0.2em] opacity-40">System Status</span>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col gap-4 select-none">
                        <div className="flex items-center gap-4">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-20"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground"></span>
                            </span>
                            <p className="text-xs font-bold uppercase tracking-tight">Available for Work</p>
                        </div>
                        <p className="text-[10px] opacity-60 leading-relaxed font-medium">
                            Accepting high-end creative commissions for Q1 2026. Hyderabad — Global.
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
