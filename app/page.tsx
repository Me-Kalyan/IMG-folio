'use client';

import { client, urlFor } from '@/lib/sanity';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Core Components
import StatusPopup from '@/components/StatusPopup';
import DraggableSticker from '@/components/DraggableSticker';
import VelocityScroll from '@/components/VelocityScroll';
import FocusGrid from '@/components/FocusGrid';

// Content Components
import ProcessSteps from '@/components/ProcessSteps';
import ClientLogos from '@/components/ClientLogos';
import Testimonial from '@/components/Testimonial';
import ServiceAccordion from '@/components/ServiceAccordion';
import ArchiveListItem from '@/components/ArchiveListItem';

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

            <StatusPopup />

            {/* 1. HERO */}
            <section className="relative pt-40 pb-20 px-4 md:px-6 max-w-7xl mx-auto min-h-[85vh] flex flex-col justify-between">
                <DraggableSticker className="top-[20%] right-[10%] md:right-[20%] rotate-12">
                    <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded-full shadow-lg uppercase tracking-widest">
                        Available Now
                    </div>
                </DraggableSticker>

                <div className="w-full flex justify-end">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500">
                        Portfolio 2025 ®
                    </span>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h1 className="text-6xl md:text-[9rem] font-bold tracking-tighter leading-[0.85] mb-8 -ml-1">
                        DIGITAL<br />
                        CRAFTSMAN.
                    </h1>
                    <div className="flex flex-col md:flex-row gap-8 md:gap-20 md:items-end mt-12">
                        <p className="max-w-md text-lg text-gray-500 leading-relaxed font-medium">
                            An independent design practice focusing on digital experiences, brand identity, and art direction for forward-thinking companies.
                        </p>
                        <div className="h-px bg-gray-200 flex-1 w-full mb-2"></div>
                        <span className="font-mono text-xs text-gray-400 uppercase tracking-widest whitespace-nowrap">
                            Scroll to Explore ↓
                        </span>
                    </div>
                </motion.div>
            </section>

            {/* 2. CLIENT LOGOS (Fills gap between Hero and Work) */}
            <ClientLogos />

            {/* 3. SELECTED WORKS */}
            <section className="py-24 px-4 md:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-12">
                        <h2 className="text-sm font-bold uppercase tracking-widest border border-black rounded-full px-3 py-1">
                            Selected Works
                        </h2>
                        <Link href="/work" className="text-sm hover:underline underline-offset-4 text-gray-500 hover:text-black transition-colors">
                            View All Projects
                        </Link>
                    </div>

                    <FocusGrid className="columns-1 md:columns-2 gap-8 space-y-8">
                        {projects.slice(0, 4).map((project) => (
                            <div key={project.slug}>
                                <Link href={`/work/${project.slug}`} className="group relative block">
                                    {project.coverImage && (
                                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 rounded-sm">
                                            <Image
                                                src={urlFor(project.coverImage).width(800).url()}
                                                alt={project.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                                            />
                                        </div>
                                    )}
                                    <div className="flex justify-between items-start mt-4">
                                        <div>
                                            <h3 className="font-bold text-xl tracking-tight">{project.title}</h3>
                                            <p className="text-sm text-gray-500 mt-1">{project.client || 'Personal Project'}</p>
                                        </div>
                                        <span className="text-xs font-mono border border-gray-200 px-2 py-1 rounded-full text-gray-500">{project.year}</span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </FocusGrid>
                </div>
            </section>

            {/* 4. PROCESS (Fills vertical space with info) */}
            <ProcessSteps />

            {/* 5. VISUAL STREAM */}
            <VelocityScroll />

            {/* 6. SERVICES */}
            <section className="py-24 px-4 md:px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div>
                        <h2 className="text-sm font-bold uppercase tracking-widest border border-black bg-white inline-block px-3 py-1 rounded-full mb-4">
                            Expertise
                        </h2>
                        <p className="text-gray-500 max-w-xs leading-relaxed">
                            Comprehensive design solutions from initial concept to final deployment.
                        </p>
                    </div>
                    <div className="lg:col-span-2">
                        <ServiceAccordion />
                    </div>
                </div>
            </section>

            {/* 7. TESTIMONIAL (Fills white space before archive) */}
            <Testimonial />

            {/* 8. ARCHIVE */}
            <section className="py-24 px-4 md:px-6 max-w-7xl mx-auto">
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

            {/* 9. FOOTER */}
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
                            className="text-6xl md:text-[8vw] font-bold tracking-tighter leading-none hover:text-gray-400 transition-colors"
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