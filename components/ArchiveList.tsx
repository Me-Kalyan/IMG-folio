'use client';

import { client } from '@/lib/sanity';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Project {
    _id: string;
    title: string;
    slug: { current: string };
    client?: string;
    year?: string;
}

export default function ArchiveList() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const data = await client.fetch<Project[]>(`*[_type == "project"] | order(year desc) {
                _id,
                title,
                slug,
                client,
                year
            }`);
            setProjects(data);
        };
        fetchProjects();
    }, []);

    return (
        <section className="w-full max-w-7xl mx-auto px-4 py-20 border-t border-black">
            <h2 className="text-6xl font-bold tracking-tighter mb-12 uppercase opacity-10">Index_01</h2>

            <div className="w-full">
                {/* Header Row */}
                <div className="grid grid-cols-12 pb-4 border-b border-black font-mono text-[10px] tracking-widest text-gray-500 uppercase">
                    <div className="col-span-2">Year</div>
                    <div className="col-span-4">Client</div>
                    <div className="col-span-6">Project</div>
                </div>

                {/* Data Rows */}
                {projects.map((item) => (
                    <Link
                        key={item._id}
                        href={`/work/${item.slug.current}`}
                        className="group grid grid-cols-12 py-4 border-b border-neutral-200 hover:bg-black hover:text-white transition-colors cursor-pointer items-baseline"
                    >
                        <div className="col-span-2 font-mono text-xs">{item.year || '—'}</div>
                        <div className="col-span-4 font-sans font-medium">{item.client || '—'}</div>
                        <div className="col-span-6 font-sans font-bold uppercase">{item.title}</div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

