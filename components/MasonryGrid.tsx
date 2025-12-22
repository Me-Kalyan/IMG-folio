'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { SwissImage } from './SwissImage';
import { client, urlFor } from '@/lib/sanity';
import { useEffect, useState } from 'react';

interface Project {
    _id: string;
    title: string;
    slug: { current: string };
    coverImage?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

const aspectClasses = ['aspect-[4/5]', 'aspect-square', 'aspect-[16/9]'];

export default function MasonryGrid() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const data = await client.fetch<Project[]>(`*[_type == "project"] | order(_createdAt desc) {
                _id,
                title,
                slug,
                coverImage
            }`);
            setProjects(data);
        };
        fetchProjects();
    }, []);

    if (projects.length === 0) {
        return (
            <div className="px-4 py-12 max-w-7xl mx-auto text-center font-mono text-sm text-gray-500">
                Loading projects...
            </div>
        );
    }

    return (
        <div className="px-4 py-12 max-w-7xl mx-auto">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {projects.map((item, index) => (
                    <Link key={item._id} href={`/work/${item.slug.current}`} className="block outline-none">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className={`w-full relative overflow-hidden group cursor-crosshair border border-black ${aspectClasses[index % 3]}`}
                        >
                            <SwissImage
                                src={item.coverImage ? urlFor(item.coverImage).width(800).url() : '/placeholder.jpg'}
                                alt={item.title}
                                ratio={aspectClasses[index % 3]}
                            />
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

                            <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="bg-white text-black px-2 py-1 text-xs font-mono tracking-widest uppercase">
                                    {item.title}
                                </span>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

