'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function InvertToggle() {
    const [theme, setTheme] = useState('light');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const initTheme = () => {
            setMounted(true);
            const savedTheme = localStorage.getItem('theme') || 'light';
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        };

        // Defer to next tick to avoid synchronous setState warning in effect
        const timeout = setTimeout(initTheme, 0);
        return () => clearTimeout(timeout);
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
