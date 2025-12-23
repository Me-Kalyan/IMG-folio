'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { client, urlFor } from '@/lib/sanity';
import { useEffect, useState } from 'react';

interface SanityImage {
    _type: string;
    asset: {
        _ref: string;
        _type: string;
    };
}

interface Project {
    _id: string;
    title: string;
    slug: { current: string };
    client?: string;
    year?: string;
    coverImage?: SanityImage;
}

export default function MasonryGrid() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const data = await client.fetch<Project[]>(`*[_type == "project"] | order(_createdAt desc) {
                _id,
                title,
                slug,
                client,
                year,
                coverImage
            }`);
            setProjects(data);
        };
        fetchProjects();
    }, []);

    if (projects.length === 0) {
        return (
            <div className="px-6 py-32 max-w-[100rem] mx-auto text-center text-mono opacity-20">
                Synchronizing Archive...
            </div>
        );
    }

    return (
        <div className="px-6 md:px-12 max-w-[100rem] mx-auto">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                {projects.map((item, index) => (
                    <motion.article
                        key={item._id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
                        className="break-inside-avoid group"
                    >
                        <Link href={`/work/${item.slug.current}`} className="block relative">
                            {/* Number Overlay */}
                            <div className="flex justify-between items-baseline mb-3 text-mono opacity-30 group-hover:opacity-100 transition-opacity">
                                <span>{String(index + 1).padStart(2, '0')}</span>
                                <span>{item.year || '25'}</span>
                            </div>

                            {/* Image Container */}
                            <div className="relative overflow-hidden bg-accent border border-foreground/5 group-hover:border-foreground/20 transition-colors">
                                {item.coverImage && (
                                    <Image
                                        src={urlFor(item.coverImage).width(1200).url()}
                                        alt={item.title}
                                        width={1200}
                                        height={1600}
                                        className="w-full h-auto object-cover grayscale brightness-95 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-out"
                                    />
                                )}
                                {/* Reveal Mask Overlay */}
                                <div className="absolute inset-0 bg-background/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            {/* Project Info */}
                            <div className="mt-4 flex flex-col gap-1">
                                <h3 className="text-xl font-black uppercase tracking-tighter leading-none">{item.title}</h3>
                                <div className="flex justify-between items-center text-mono opacity-40 text-[9px] mt-1">
                                    <span>{item.client || 'Experimental'}</span>
                                    <span>View Story</span>
                                </div>
                            </div>
                        </Link>
                    </motion.article>
                ))}
            </div>
        </div>
    );
}
