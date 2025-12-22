'use client';

import { client, urlFor } from '@/lib/sanity';
import Link from 'next/link';
import Image from 'next/image';
import ParallaxImage from '@/components/ParallaxImage';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

// Fetch all projects
async function getProjectsData() {
    const query = `*[_type == "project"] | order(year desc) {
    title,
    "slug": slug.current,
    client,
    year,
    coverImage
  }`;
    return client.fetch(query);
}

interface Project {
    title: string;
    slug: string;
    client?: string;
    year?: string;
    coverImage?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default function WorkIndexPage() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        getProjectsData().then(setProjects);
    }, []);

    const { scrollY } = useScroll();
    const [windowHeight, setWindowHeight] = useState(1000);

    useEffect(() => {
        getProjectsData().then(setProjects);
        setWindowHeight(window.innerHeight);
        const handleResize = () => setWindowHeight(window.innerHeight);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // --- LOGO/TITLE ANIMATION (Unifying Hero and Sticky) ---
    const progress = useTransform(scrollY, [0, 100, 500], [0, 0, 1]);

    // Position: Start near bottom of hero (approx 50vh), move to top (2.5rem)
    const titleTop = useTransform(progress, (v) => {
        const start = windowHeight * 0.45; // Centered-ish in hero
        const end = 40; // Sticky header center
        return start + v * (end - start);
    });

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const titleScale = useTransform(progress, (v) => {
        const endScale = isMobile ? 0.2 : 0.12;
        return 1 + v * (endScale - 1);
    });

    // Subtitle and Archive info fade out
    const infoOpacity = useTransform(scrollY, [0, 100], [1, 0]);
    const infoY = useTransform(scrollY, [0, 100], [0, -20]);

    // Header background shield
    const headerOpacity = useTransform(scrollY, [450, 550], [0, 1]);

    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
        }
    };

    return (
        <main className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white pb-32">

            {/* 1. HEADER SHIELD */}
            <motion.div
                style={{ opacity: headerOpacity }}
                className="fixed top-0 left-0 w-full h-20 bg-white/95 backdrop-blur-md z-40 border-b border-neutral-100 pointer-events-none"
            />

            {/* 2. THE SINGLE ANIMATED TITLE */}
            <motion.div
                style={{
                    top: titleTop,
                    scale: titleScale,
                    left: "2rem", // Aligned to the left as per Work page design
                    x: "0%",
                    y: "-50%",
                    transformOrigin: "left center"
                }}
                className="fixed z-50 pointer-events-none whitespace-nowrap"
            >
                <h1 className="text-7xl md:text-9xl font-bold tracking-tighter uppercase leading-[0.9]">
                    Selected Works
                </h1>
            </motion.div>

            {/* 3. HERO CONTENT WRAPPER */}
            <section className="h-[75vh] w-full flex flex-col justify-end px-4 pb-24 md:pb-32 max-w-7xl mx-auto relative">
                {/* 
                    The Title is fixed. We just need to fade out the supporting text.
                */}
                <motion.div
                    style={{ opacity: infoOpacity, y: infoY }}
                    className="w-full border-t border-black pt-4 flex justify-between items-start font-mono text-[10px] uppercase tracking-widest text-gray-500"
                >
                    <span>Archive 2020 — 2024</span>
                    <span className="hidden md:inline-block">Full Catalog</span>
                </motion.div>
            </section>

            {/* 3. THE MASONRY GRID (Content) */}
            <section className="px-4 max-w-7xl mx-auto">
                <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">

                    {projects.map((project, i) => (
                        <motion.div
                            key={project.slug}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.1 }} // Re-animates on scroll up/down
                            transition={{ duration: 0.6, delay: i * 0.05 }}
                            variants={fadeInUp}
                            className="break-inside-avoid mb-4"
                        >
                            <Link
                                href={`/work/${project.slug}`}
                                className="group relative block bg-neutral-100 overflow-hidden"
                            >
                                {/* Image */}
                                {project.coverImage && (
                                    <div className="relative w-full h-[400px] md:h-[500px]">
                                        <ParallaxImage
                                            src={urlFor(project.coverImage).width(800).url()}
                                            alt={project.title}
                                            className="w-full h-full"
                                        />
                                    </div>
                                )}

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 md:bg-transparent">
                                    <div className="flex justify-between items-start">
                                        <span className="bg-white text-black px-2 py-1 text-[10px] font-mono uppercase tracking-widest">
                                            {project.client || 'Personal'}
                                        </span>
                                        <span className="bg-white text-black px-2 py-1 text-[10px] font-mono uppercase tracking-widest">
                                            {project.year}
                                        </span>
                                    </div>
                                    <h2 className="bg-white text-black px-2 py-1 self-start text-sm font-bold uppercase tracking-tight">
                                        {project.title}
                                    </h2>
                                </div>
                            </Link>
                        </motion.div>
                    ))}

                </div>
            </section>

        </main>
    );
}
