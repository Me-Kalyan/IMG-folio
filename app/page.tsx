'use client';

import { client, urlFor } from '@/lib/sanity';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

// Components
// import Marquee from '@/components/Marquee'; // REMOVED
import ArchiveListItem from '@/components/ArchiveListItem';
import DraggableSticker from '@/components/DraggableSticker';
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

    const { scrollY } = useScroll();

    // --- LOGO ANIMATION (Center to Header) ---
    const logoTop = useTransform(scrollY, [0, 300], ["50vh", "3.5rem"]);
    const logoScale = useTransform(scrollY, [0, 300], [1, 0.15]);
    const headerOpacity = useTransform(scrollY, [200, 300], [0, 1]);

    // Fade Up Animation
    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } }
    };

    return (
        <main className="bg-black">

            {/* 1. HEADER SHIELD */}
            <motion.div
                style={{ opacity: headerOpacity }}
                className="fixed top-0 left-0 w-full h-24 bg-white/95 backdrop-blur-sm z-40 pointer-events-none"
            />

            {/* 2. THE LOGO */}
            <motion.div
                style={{
                    top: logoTop, scale: logoScale,
                    left: "50%", x: "-50%", y: "-50%"
                }}
                className="fixed z-50 pointer-events-none whitespace-nowrap origin-center"
            >
                <h1 className="text-[15vw] md:text-[16vw] font-bold tracking-tighter leading-none text-black">
                    IMG&apos;folio
                </h1>
            </motion.div>

            {/* --- 3. THE WHITE CONTENT CARD --- */}
            {/* Added pb-20 for better spacing at the bottom of the card */}
            <div className="relative z-10 bg-white rounded-b-[40px] shadow-[0_50px_100px_rgba(0,0,0,0.5)] mb-[80vh] overflow-hidden pb-20">

                {/* Scroll Spacer */}
                <div className="h-[100vh] w-full bg-transparent relative z-0" />

                {/* Visual Statement - REFINED TYPOGRAPHY & SPACING */}
                <section className="min-h-[50vh] w-full flex items-center justify-center px-4 py-20">
                    <motion.h2
                        initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} variants={fadeInUp}
                        // Size reduced from flexible vw to fixed, controllable sizes
                        className="text-6xl md:text-8xl font-bold tracking-tighter leading-none text-center uppercase"
                    >
                        VISUAL
                    </motion.h2>
                </section>

                {/* Marquee - REMOVED */}

                {/* Gallery (FocusGrid) - REFINED GRID & SPACING */}
                {/* Reduced top padding (pt-10) */}
                <section className="min-h-screen px-4 pb-32 pt-10">
                    <div className="max-w-7xl mx-auto">
                        {/* Increased to 4 columns on large screens for smaller images */}
                        <FocusGrid className="columns-1 md:columns-2 lg:columns-4 gap-4 space-y-4">
                            {projects.map((project) => (
                                <div key={project.slug}>
                                    <Link href={`/work/${project.slug}`} className="group relative block bg-neutral-100">
                                        {project.coverImage && (
                                            <Image
                                                src={urlFor(project.coverImage).width(800).url()}
                                                alt={project.title}
                                                width={800} height={600}
                                                className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                            />
                                        )}
                                        <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 md:bg-transparent">
                                            <span className="bg-white text-black px-2 py-1 text-[10px] font-mono uppercase tracking-widest w-fit">{project.year}</span>
                                            <h2 className="bg-white text-black px-2 py-1 self-start text-sm font-bold uppercase tracking-tight">{project.title}</h2>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </FocusGrid>
                    </div>
                </section>

                {/* Velocity Scroll */}
                <VelocityScroll />

                {/* Archive (White) - REFINED TYPOGRAPHY */}
                <section className="min-h-[50vh] pb-32 pt-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4">
                        {/* Size reduced from text-8xl to text-6xl */}
                        <h2 className="text-5xl md:text-6xl font-bold tracking-tighter uppercase mb-12 text-black">
                            Archive
                        </h2>
                        <div className="w-full border-t border-black/20">
                            {projects.map((project, i) => (
                                <ArchiveListItem
                                    key={project.slug}
                                    index={i}
                                    {...project}
                                />
                            ))}
                        </div>
                    </div>
                </section>

            </div>
            {/* END OF WHITE CARD */}

            {/* --- 4. THE BLACK FOOTER --- */}
            <div className="fixed bottom-0 left-0 w-full h-[80vh] z-0 bg-black text-white flex flex-col items-center justify-center">
                <DraggableSticker className="absolute top-10 right-10">
                    <div className="bg-white text-black font-mono text-xs px-3 py-1 -rotate-6 uppercase tracking-widest border border-black">
                        Say Hello
                    </div>
                </DraggableSticker>

                <div className="text-center px-4">
                    {/* NEW: Minimalist "Open for Commissions" Badge */}
                    <div className="mb-8 flex justify-center">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 font-mono text-[10px] uppercase tracking-widest">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Open for Commissions
                        </span>
                    </div>

                    <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">
                        Got a project in mind?
                    </h2>
                    <a
                        href="mailto:hello@img.folio"
                        // Slightly reduced size for better proportion
                        className="block text-[8vw] md:text-[10vw] font-bold tracking-tighter leading-none hover:text-gray-400 transition-colors"
                    >
                        LET&apos;S TALK
                    </a>
                    <div className="flex justify-center gap-8 mt-12">
                        {['Instagram', 'Twitter', 'LinkedIn'].map((social) => (
                            <a key={social} href="#" className="font-mono text-sm uppercase tracking-widest border-b border-transparent hover:border-white transition-all">
                                {social}
                            </a>
                        ))}
                    </div>
                </div>
                <div className="absolute bottom-6 w-full px-6 flex justify-between font-mono text-[10px] uppercase text-gray-600">
                    <span>© 2025 IMG&apos;folio</span>
                    <span>Local Time: Hyderabad</span>
                </div>
            </div>

        </main>
    );
}