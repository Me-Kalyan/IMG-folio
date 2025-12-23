'use client';

import { client, urlFor } from '@/lib/sanity';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

async function getAllProjects() {
    const query = `*[_type == "project"] | order(year desc) {
    title, "slug": slug.current, client, year, coverImage
  }`;
    return client.fetch(query);
}

interface SanityImage {
    _type: string;
    asset: {
        _ref: string;
        _type: string;
    };
}

interface Project {
    title: string;
    slug: string;
    client?: string;
    year?: string;
    coverImage?: SanityImage;
}

export default function HomeGallery() {
    const [projects, setProjects] = useState<Project[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        getAllProjects().then(setProjects);
    }, []);

    // Track scroll progress for the bar
    const { scrollXProgress } = useScroll({ container: containerRef });
    const scaleX = useTransform(scrollXProgress, [0, 1], [0, 1]);

    return (
        <section id="work" className="py-32 bg-white relative border-t border-black">

            {/* 1. Swiss Header */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 mb-16 flex items-end justify-between">
                <div className="flex flex-col gap-2">
                    <span className="font-mono text-xs uppercase tracking-widest text-gray-500">
                        Index 01 — {projects.length.toString().padStart(2, '0')}
                    </span>
                    <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none uppercase">
                        Selected<br />Works
                    </h2>
                </div>
                <div className="hidden md:flex gap-4 font-mono text-xs uppercase tracking-widest text-gray-400">
                    <span>← Swipe to Explore →</span>
                </div>
            </div>

            {/* 2. Horizontal Scroll Container */}
            <div
                ref={containerRef}
                className="flex overflow-x-auto snap-x snap-mandatory gap-6 md:gap-12 px-4 md:px-6 pb-12 scrollbar-hide"
                style={{ scrollBehavior: 'smooth' }}
            >
                {projects.map((project, i) => (
                    <motion.div
                        key={project.slug}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                        className="snap-center shrink-0 w-[85vw] md:w-[800px] group relative"
                    >
                        <Link href={`/work/${project.slug}`} className="block">

                            {/* Number Index */}
                            <div className="border-b border-black pb-2 mb-4 flex justify-between font-mono text-xs uppercase tracking-widest">
                                <span>( {String(i + 1).padStart(2, '0')} )</span>
                                <span>{project.year}</span>
                            </div>

                            {/* Image Card */}
                            <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100 mb-6 border border-black/5">
                                {project.coverImage && (
                                    <Image
                                        src={urlFor(project.coverImage).width(1200).url()}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                                    />
                                )}
                                {/* Minimal Overlay */}
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-overlay" />
                            </div>

                            {/* Typography */}
                            <div className="flex flex-col md:flex-row justify-between md:items-baseline gap-2">
                                <h3 className="text-3xl md:text-5xl font-bold tracking-tighter leading-none group-hover:text-gray-600 transition-colors">
                                    {project.title}
                                </h3>
                                <span className="font-mono text-xs uppercase tracking-widest text-gray-500">
                                    {project.client || 'Personal'}
                                </span>
                            </div>
                        </Link>
                    </motion.div>
                ))}

                {/* Spacer to allow scrolling past the last item */}
                <div className="shrink-0 w-4 md:w-[10vw]" />
            </div>

            {/* 3. Interactive Progress Bar */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 mt-8">
                <div className="w-full h-[2px] bg-gray-100 relative overflow-hidden">
                    <motion.div
                        style={{ scaleX }}
                        className="absolute top-0 left-0 h-full w-full bg-black origin-left"
                    />
                </div>
            </div>

        </section>
    );
}
