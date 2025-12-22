'use client';

import { client, urlFor } from '@/lib/sanity';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Components
import Header from '@/components/Header'; // The New Header
import StatusPopup from '@/components/StatusPopup'; // The New "Open for Work"
import ServiceAccordion from '@/components/ServiceAccordion'; // The New Component
import DraggableSticker from '@/components/DraggableSticker';
import ArchiveListItem from '@/components/ArchiveListItem';
import VelocityScroll from '@/components/VelocityScroll';
import FocusGrid from '@/components/FocusGrid';

async function getProjectsData() {
    const query = `*[_type == "project"] | order(year desc) {
    title, "slug": slug.current, client, year, coverImage
  }`;
    return client.fetch(query);
}

interface Project {
    title: string;
    slug: string;
    client?: string;
    year?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    coverImage?: any;
}

export default function Home() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        getProjectsData().then(setProjects);
    }, []);

    return (
        <main className="bg-white min-h-screen text-black selection:bg-black selection:text-white">

            {/* 1. NEW HEADER (Sticky, Glassmorphic) */}
            <Header />

            {/* 2. FLOATING STATUS WIDGET */}
            <StatusPopup />

            {/* 3. HERO SECTION (Minimalist Professional) */}
            <section className="relative pt-40 pb-20 px-4 md:px-6 max-w-7xl mx-auto min-h-[70vh] flex flex-col justify-end">

                {/* Draggable Sticker 1: Placed near Title */}
                <DraggableSticker className="top-[20%] right-[10%] md:right-[20%] rotate-12">
                    <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded-full shadow-lg uppercase tracking-widest">
                        Available Now
                    </div>
                </DraggableSticker>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h1 className="text-6xl md:text-[8rem] font-bold tracking-tighter leading-[0.9] mb-8 uppercase">
                        DIGITAL<br />
                        CRAFTSMAN.
                    </h1>
                    <div className="flex flex-col md:flex-row gap-8 md:gap-20 md:items-end">
                        <p className="max-w-md text-lg md:text-xl text-gray-500 leading-relaxed">
                            An independent design practice focusing on digital experiences, brand identity, and art direction for forward-thinking companies.
                        </p>
                        <div className="h-px bg-gray-200 flex-1 w-full mb-2"></div>
                        <span className="font-mono text-xs text-gray-400 uppercase tracking-widest whitespace-nowrap">
                            Scroll to Explore ↓
                        </span>
                    </div>
                </motion.div>
            </section>

            {/* 4. SELECTED WORKS (Grid) */}
            <section className="py-20 px-4 md:px-6 border-t border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-12">
                        <h2 className="text-sm font-bold uppercase tracking-widest border border-black rounded-full px-3 py-1">
                            Selected Works
                        </h2>
                        <Link href="/work" className="text-sm hover:underline underline-offset-4 text-gray-500 hover:text-black transition-colors">
                            View All Projects
                        </Link>
                    </div>

                    <FocusGrid className="columns-1 md:columns-2 lg:columns-2 gap-4 space-y-4">
                        {projects.map((project) => (
                            <div key={project.slug}>
                                <Link href={`/work/${project.slug}`} className="group relative block overflow-hidden rounded-sm">
                                    {project.coverImage && (
                                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                                            <Image
                                                src={urlFor(project.coverImage).width(800).url()}
                                                alt={project.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                                            />
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center mt-3">
                                        <h3 className="font-bold text-lg tracking-tight">{project.title}</h3>
                                        <span className="text-xs font-mono text-gray-400">{project.year}</span>
                                    </div>
                                    <p className="text-sm text-gray-500">{project.client || 'Personal Project'}</p>
                                </Link>
                            </div>
                        ))}
                    </FocusGrid>
                </div>
            </section>

            {/* 5. SERVICES (New Component) */}
            <section className="py-20 px-4 md:px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <h2 className="text-sm font-bold uppercase tracking-widest border border-black bg-white inline-block px-3 py-1 rounded-full">
                            Expertise
                        </h2>
                    </div>
                    <ServiceAccordion />
                </div>
            </section>

            {/* 6. VISUAL STREAM (Velocity) */}
            <VelocityScroll />

            {/* 7. ARCHIVE (List View) */}
            <section className="py-20 px-4 md:px-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">ARCHIVE</h2>
                    <div className="h-px bg-black flex-1 mt-2"></div>
                </div>
                <div className="w-full">
                    {projects.map((project, i) => (
                        <ArchiveListItem
                            key={project.slug}
                            index={i}
                            {...project}
                        />
                    ))}
                </div>
            </section>

            {/* 8. FOOTER (High Contrast Reveal) */}
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
                        <a
                            href="mailto:hello@img.folio"
                            className="text-6xl md:text-8xl font-bold tracking-tighter leading-none hover:text-gray-400 transition-colors"
                        >
                            LET&apos;S TALK
                        </a>
                    </div>

                    <div className="flex flex-col gap-6 text-right">
                        <div className="flex gap-6 justify-end">
                            {['Instagram', 'Twitter', 'LinkedIn'].map((social) => (
                                <a key={social} href="#" className="font-mono text-xs uppercase tracking-widest hover:underline hover:text-gray-300">
                                    {social}
                                </a>
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