'use client';

import { client, urlFor } from '@/lib/sanity';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

import Header from '@/components/Header';
import StatusPopup from '@/components/StatusPopup';
import Lightbox from '@/components/Lightbox';

interface SanityImage {
    _type: string;
    asset: {
        _ref: string;
        _type: string;
    };
}

interface ProjectData {
    title: string;
    client?: string;
    year?: string;
    description?: string;
    coverImage?: SanityImage;
    images?: SanityImage[];
}

async function getProject(slug: string) {
    const query = `*[_type == "project" && slug.current == $slug][0] {
    title, client, year, description, coverImage, "images": galleryImages
  }`;
    return client.fetch(query, { slug });
}

export default function ProjectPage() {
    const { slug } = useParams();
    const [project, setProject] = useState<ProjectData | null>(null);
    const [lightboxImage, setLightboxImage] = useState<SanityImage | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (slug) getProject(slug as string).then(setProject);
    }, [slug]);

    if (!project) return <div className="min-h-screen bg-background" />;

    return (
        <main className="bg-background min-h-screen text-foreground selection:bg-foreground selection:text-background transition-colors duration-500 pb-20">
            <Header />
            <StatusPopup />
            <Lightbox
                isOpen={!!lightboxImage}
                onClose={() => setLightboxImage(null)}
                image={lightboxImage}
                alt={project.title}
            />

            {/* 1. EDITORIAL HEADER */}
            <section className="pt-48 pb-20 px-6 md:px-12 max-w-[100rem] mx-auto border-b border-foreground/10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
                    <div className="md:col-span-9">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                            className="text-[10vw] font-black tracking-tighter uppercase leading-[0.8]"
                        >
                            {project.title}
                        </motion.h1>
                    </div>
                    <div className="md:col-span-3 text-mono opacity-40 flex flex-col md:items-end gap-2 text-right">
                        <span>{project.client || 'Commission'}</span>
                        <span>{project.year || '25'}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-20 pt-12 border-t border-foreground/5">
                    <div className="md:col-span-6">
                        <p className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight">
                            {project.description || "Experimental visual study exploring the intersection of light, form, and emotion."}
                        </p>
                    </div>
                    <div className="md:col-span-3 md:col-start-10 flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <span className="text-mono opacity-20 text-[10px]">Specifications</span>
                            <ul className="text-xs font-bold uppercase tracking-wide space-y-1">
                                <li>Art Direction</li>
                                <li>Visual ID</li>
                                <li>Development</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. PHOTOGRAPHIC GRID */}
            <section className="py-20 px-6 md:px-12 max-w-[100rem] mx-auto">
                {/* Hero Cover */}
                <div
                    className="cursor-zoom-in relative aspect-[21/9] bg-accent mb-20 overflow-hidden"
                    onClick={() => setLightboxImage(project.coverImage || null)}
                >
                    {project.coverImage && (
                        <Image
                            src={urlFor(project.coverImage).width(2000).url()}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    )}
                </div>

                {/* Grid observations */}
                <div className="columns-1 md:columns-2 gap-8 space-y-8">
                    {project.images?.map((img, i) => (
                        <figure
                            key={i}
                            className="break-inside-avoid cursor-zoom-in relative bg-accent border border-foreground/5 hover:border-foreground/20 transition-colors"
                            onClick={() => setLightboxImage(img)}
                        >
                            <Image
                                src={urlFor(img).width(1200).url()}
                                alt={`${project.title} study ${i + 1}`}
                                width={1200}
                                height={1600}
                                className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                        </figure>
                    ))}
                </div>
            </section>

            {/* 3. NAVIGATION FOOTER */}
            <footer className="mt-48 pt-32 pb-12 px-6 md:px-12 max-w-[100rem] mx-auto border-t border-foreground/10">
                <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
                    <Link href="/work" className="text-[8vw] font-black tracking-tighter uppercase leading-none hover:opacity-50 transition-opacity">
                        Back To<br />The Archive.
                    </Link>
                </div>

                <div className="flex justify-between items-center text-mono opacity-20 text-[10px] uppercase tracking-widest pt-12 border-t border-foreground/5">
                    <span>Synchronized Viewport</span>
                    <span>© 2025 IMG&apos;folio</span>
                </div>
            </footer>
        </main>
    );
}
