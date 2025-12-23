'use client';
import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import InvertToggle from './InvertToggle';
import MagneticLink from './MagneticLink';
import Logo from './Logo';

export default function Header() {
    const [hidden, setHidden] = useState(false);
    const { scrollY } = useScroll();
    const pathname = usePathname();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    return (
        <motion.header
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-foreground/5 bg-background/80 backdrop-blur-md`}
        >
            <div className="flex items-center justify-between w-full max-w-[100rem] mx-auto px-6 md:px-12 py-4">
                {/* LOGO */}
                <Link href="/" className="group">
                    <Logo size={180} />
                </Link>

                {/* NAV */}
                <div className="flex items-center gap-12">
                    <nav className="flex items-center gap-8 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                        {['Home', 'Work', 'Info'].map((item) => {
                            let path = '/';
                            if (item === 'Info') path = '/info';
                            if (item === 'Work') path = '/#work';

                            const isActive = pathname === path || (item === 'Work' && pathname === '/' && typeof window !== 'undefined' && window.location.hash === '#work');

                            return (
                                <MagneticLink
                                    key={item}
                                    href={path}
                                    isActive={isActive}
                                >
                                    {item}
                                </MagneticLink>
                            )
                        })}
                    </nav>
                    <div className="hidden md:block">
                        <InvertToggle />
                    </div>
                </div>
            </div>
        </motion.header>
    );
}
