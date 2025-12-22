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
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} // Constraints to keep it somewhat grounded
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ delay: 1, type: "spring" }}
                    className="fixed bottom-6 right-6 z-[60] bg-white border border-gray-200 shadow-xl rounded-xl w-64 overflow-hidden hidden md:block cursor-grab active:cursor-grabbing"
                >
                    {/* Window Header */}
                    <div className="bg-gray-50 border-b border-gray-100 px-3 py-2 flex justify-between items-center select-none">
                        <div className="flex gap-1.5">
                            <button
                                onClick={() => setIsVisible(false)}
                                className="w-2.5 h-2.5 rounded-full bg-red-400 hover:bg-red-500 transition-colors"
                            />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                        </div>
                        <span className="text-[9px] uppercase font-bold tracking-widest text-gray-400">Status</span>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex items-center gap-3 select-none">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <div>
                            <p className="text-xs font-bold text-black">Open for Work</p>
                            <p className="text-[10px] text-gray-500 leading-tight">Accepting commissions for Q1 2026.</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
