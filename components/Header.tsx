'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/components/ThemeProvider';

export default function Header() {
    const { isDark, toggleTheme } = useTheme();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${isScrolled
                    ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md border-black/5 dark:border-white/10 py-3'
                    : 'bg-transparent border-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between text-black dark:text-white">

                {/* LOGO */}
                <Link href="/" className="relative z-10 group">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tighter leading-none">
                        IMG&apos;folio
                        <span className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">.</span>
                    </h1>
                </Link>

                {/* NAV & TOOLS */}
                <div className="flex items-center gap-6">
                    <nav className="hidden md:flex items-center gap-6 font-medium text-sm">
                        {['Home', 'Work', 'Info'].map((item) => {
                            const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
                            const isActive = pathname === path;
                            return (
                                <Link
                                    key={item}
                                    href={path}
                                    className={`relative hover:text-gray-500 transition-colors ${isActive ? 'text-black dark:text-white' : 'text-gray-400'}`}
                                >
                                    {item}
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-underline"
                                            className="absolute -bottom-1 left-0 w-full h-[1px] bg-black dark:bg-white"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="hidden md:block w-[1px] h-4 bg-gray-200 dark:bg-white/20" />

                    {/* Search */}
                    <div className="relative flex items-center">
                        <AnimatePresence mode="wait">
                            {isSearchOpen && (
                                <motion.input
                                    key="search-input"
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: 200, opacity: 1 }}
                                    exit={{ width: 0, opacity: 0 }}
                                    placeholder="Search projects..."
                                    className="bg-gray-100 dark:bg-white/10 border-none rounded-full px-4 py-1 text-sm mr-2 focus:ring-1 focus:ring-black dark:focus:ring-white outline-none text-black dark:text-white placeholder:text-gray-500"
                                />
                            )}
                        </AnimatePresence>
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors"
                            aria-label="Toggle Search"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </button>
                    </div>

                    {/* Theme Toggle (REAL) */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors"
                        aria-label="Toggle Theme"
                    >
                        <div className={`w-5 h-5 rounded-full border border-black dark:border-white transition-all ${isDark ? 'bg-white' : 'bg-gradient-to-tr from-black to-transparent'}`} />
                    </button>

                    {/* Mobile Menu */}
                    <button className="md:hidden p-2" aria-label="Open Menu">
                        <div className="w-6 h-0.5 bg-black dark:bg-white mb-1.5" />
                        <div className="w-6 h-0.5 bg-black dark:bg-white" />
                    </button>
                </div>
            </div>
        </motion.header>
    );
}
