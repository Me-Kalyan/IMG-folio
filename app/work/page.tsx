'use client';

import { client, urlFor } from '@/lib/sanity';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Components
import StatusPopup from '@/components/StatusPopup';
import DraggableSticker from '@/components/DraggableSticker';
import FocusGrid from '@/components/FocusGrid';
import ArchiveListItem from '@/components/ArchiveListItem';

interface Project {
    title: string;
    slug: string;
    client?: string;
    year?: string;
    categories?: string[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    coverImage?: any;
}

async function getProjectsData() {
    const query = `*[_type == "project"] | order(year desc) {
    title, "slug": slug.current, client, year, coverImage, categories[]
  }`;
    return client.fetch(query);
}

export default function WorkPage() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        getProjectsData().then(setProjects);
    }, []);

    return (
        <main className="bg-white min-h-screen text-black selection:bg-black selection:text-white">

            <StatusPopup />

            {/* 1. HERO SECTION */}
            <section className="relative pt-40 pb-12 px-4 md:px-6 max-w-7xl mx-auto flex flex-col justify-end min-h-[40vh] border-b border-gray-100">
                <div className="flex justify-between items-end">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-9xl font-bold tracking-tighter leading-none"
                    >
                        INDEX
                    </motion.h1>
                    <div className="hidden md:block text-right">
                        <p className="font-mono text-xs uppercase tracking-widest text-gray-500">
                            Total Projects: {projects.length.toString().padStart(2, '0')}
                        </p>
                        <p className="font-mono text-xs uppercase tracking-widest text-gray-500">
                            Archive 2024—2025
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. MAIN WORK GRID */}
            <section className="py-20 px-4 md:px-6 max-w-7xl mx-auto">
                <FocusGrid className="columns-1 md:columns-2 gap-x-8 gap-y-12 space-y-12">
                    {projects.map((project) => (
                        <div key={project.slug} className="break-inside-avoid">
                            <Link href={`/work/${project.slug}`} className="group block">

                                {/* Image Container */}
                                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 rounded-sm mb-4">
                                    {project.coverImage && (
                                        <Image
                                            src={urlFor(project.coverImage).width(800).url()}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                                        />
                                    )}
                                    {/* Hover Overlay Badge */}
                                    <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="bg-white/90 backdrop-blur text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-black/10">
                                            View Case Study
                                        </span>
                                    </div>
                                </div>

                                {/* Typography */}
                                <div className="flex justify-between items-start border-t border-black/10 pt-4">
                                    <div>
                                        <h3 className="font-bold text-2xl tracking-tight mb-1 group-hover:underline decoration-2 underline-offset-4">
                                            {project.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 font-medium">
                                            {project.client || 'Personal Project'}
                                        </p>
                                    </div>
                                    <span className="font-mono text-xs text-gray-400 border border-gray-200 px-2 py-1 rounded-full">
                                        {project.year}
                                    </span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </FocusGrid>
            </section>

            {/* 3. LIST VIEW (Archive Style) */}
            <section className="py-20 px-4 md:px-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <h2 className="text-sm font-bold uppercase tracking-widest border border-black rounded-full px-3 py-1">
                        Full Archive
                    </h2>
                    <div className="h-px bg-gray-200 flex-1"></div>
                </div>
                <div className="w-full">
                    {projects.map((project, i) => (
                        <ArchiveListItem key={project.slug} index={i} {...project} />
                    ))}
                </div>
            </section>

            {/* 4. FOOTER (Consistent) */}
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
                        <a href="mailto:hello@img.folio" className="text-6xl md:text-[8vw] font-bold tracking-tighter leading-none hover:text-gray-400 transition-colors">
                            LET&apos;S TALK
                        </a>
                    </div>
                    <div className="flex flex-col gap-6 text-right">
                        <div className="flex gap-6 justify-end">
                            {['Instagram', 'Twitter', 'LinkedIn'].map((s) => (
                                <a key={s} href="#" className="font-mono text-xs uppercase tracking-widest hover:underline hover:text-gray-300">{s}</a>
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
