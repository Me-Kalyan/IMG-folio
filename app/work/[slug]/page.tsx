'use client';

import { client, urlFor } from '@/lib/sanity';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

import StatusPopup from '@/components/StatusPopup';
import DraggableSticker from '@/components/DraggableSticker';

interface ProjectData {
    title: string;
    client?: string;
    year?: string;
    description?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    coverImage?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    images?: any[];
}

async function getProject(slug: string) {
    const query = `*[_type == "project" && slug.current == $slug][0] {
    title, client, year, description, coverImage, "images": images
  }`;
    return client.fetch(query, { slug });
}

export default function ProjectPage() {
    const { slug } = useParams();
    const [project, setProject] = useState<ProjectData | null>(null);

    useEffect(() => {
        if (slug) getProject(slug as string).then(setProject);
    }, [slug]);

    if (!project) return <div className="min-h-screen bg-white" />;

    return (
        <main className="bg-white min-h-screen text-black selection:bg-black selection:text-white">
            <StatusPopup />

            {/* 1. HERO HEADER */}
            <section className="pt-40 px-4 md:px-6 max-w-7xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-black pb-8">
                        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase max-w-4xl leading-[0.9]">
                            {project.title}
                        </h1>
                        <div className="mt-8 md:mt-0 flex flex-col items-end gap-2 font-mono text-xs uppercase tracking-widest text-gray-500">
                            <span>{project.client || 'Personal'}</span>
                            <span>{project.year}</span>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* 2. COVER IMAGE */}
            <section className="px-4 md:px-6 max-w-[95rem] mx-auto mb-20">
                {project.coverImage && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative aspect-video w-full overflow-hidden rounded-sm"
                    >
                        <Image
                            src={urlFor(project.coverImage).width(1600).url()}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>
                )}
            </section>

            {/* 3. PROJECT DETAILS */}
            <section className="px-4 md:px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
                <div className="md:col-span-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest mb-4">The Brief</h3>
                    <div className="h-px bg-black w-12 mb-6" />
                    <div className="space-y-4 font-mono text-xs text-gray-500 uppercase tracking-widest">
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span>Role</span>
                            <span className="text-black">Art Direction, Dev</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span>Timeline</span>
                            <span className="text-black">4 Weeks</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span>Platform</span>
                            <span className="text-black">Web / Mobile</span>
                        </div>
                    </div>
                </div>
                <div className="md:col-span-8">
                    <p className="text-2xl md:text-3xl font-medium leading-relaxed text-gray-900">
                        {project.description || "A comprehensive digital experience designed to elevate the brand identity and engage users through immersive storytelling and precise interaction design."}
                    </p>
                </div>
            </section>

            {/* 4. FOOTER */}
            <footer className="relative bg-black text-white pt-32 pb-12 px-4 md:px-6 rounded-t-[3rem] -mt-10 z-10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end min-h-[40vh]">
                    <div className="mb-12 md:mb-0">
                        <DraggableSticker className="-top-20 left-0">
                            <div className="bg-white text-black font-mono text-xs px-3 py-1 -rotate-3 uppercase tracking-widest border border-black shadow-lg">
                                Next Project
                            </div>
                        </DraggableSticker>
                        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">
                            Ready for more?
                        </h2>
                        <a href="/work" className="text-6xl md:text-[8vw] font-bold tracking-tighter leading-none hover:text-gray-400 transition-colors">
                            BACK TO INDEX
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
