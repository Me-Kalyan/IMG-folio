'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function InvertToggle() {
    const [theme, setTheme] = useState('light');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem('theme') || 'light';
        // Only set theme if it's different to avoid redundant updates?
        // Actually, we need to sync state with localStorage on mount.
        // The warning is about calling setState synchronously if it triggers updates. 
        // Here it runs once on mount. 
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!mounted) return null;

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <button
            onClick={toggleTheme}
            className="group relative flex items-center gap-3 px-4 py-2 hover:opacity-100 transition-opacity"
            aria-label="Toggle Theme"
        >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 transition-opacity">
                {theme === 'light' ? 'Obsidian' : 'Alabaster'}
            </span>
            <div className="relative w-8 h-4 border border-foreground/20 rounded-full overflow-hidden">
                <motion.div
                    animate={{ x: theme === 'light' ? 0 : 16 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute top-0.5 left-0.5 w-2.5 h-2.5 bg-foreground rounded-full"
                />
            </div>
        </button>
    );
}
