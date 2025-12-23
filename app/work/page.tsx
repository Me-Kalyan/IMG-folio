'use client';

import { useState, useEffect } from 'react';
import { client } from '@/lib/sanity';
import Link from 'next/link';
import Header from '@/components/Header';
import StatusPopup from '@/components/StatusPopup';

interface ProjectIndexItem {
    title: string;
    slug: string;
    client?: string;
    year?: string;
    category?: string;
}

async function getAllProjects() {
    const query = `*[_type == "project"] | order(year desc) {
    title, "slug": slug.current, client, year, category
  }`;
    return client.fetch(query);
}

export default function WorkIndex() {
    const [projects, setProjects] = useState<ProjectIndexItem[]>([]);

    useEffect(() => {
        getAllProjects().then(setProjects);
    }, []);

    return (
        <main className="bg-background min-h-screen text-foreground selection:bg-foreground selection:text-background transition-colors duration-500 pb-20">
            <Header />
            <StatusPopup />

            {/* 1. INDEX HEADER */}
            <section className="pt-48 pb-20 px-6 md:px-12 max-w-[100rem] mx-auto border-b border-foreground/10">
                <div className="flex flex-col md:flex-row justify-between items-end gap-12">
                    <h1 className="text-[12vw] font-black tracking-tighter uppercase leading-[0.75]">
                        Project<br />Index.
                    </h1>
                    <div className="text-mono opacity-40 flex flex-col items-end gap-2">
                        <span>Visual Archive</span>
                        <span>2020 — 2025</span>
                    </div>
                </div>
            </section>

            {/* 2. RIGOROUS LIST INDEX */}
            <section className="px-6 md:px-12 max-w-[100rem] mx-auto">
                <div className="grid grid-cols-12 py-6 border-b border-foreground/5 text-mono opacity-30 text-[10px] uppercase tracking-widest hidden md:grid">
                    <div className="col-span-1">ID</div>
                    <div className="col-span-5">Project Title</div>
                    <div className="col-span-3">Client / Discipline</div>
                    <div className="col-span-2">Year</div>
                    <div className="col-span-1 text-right">Link</div>
                </div>

                <div className="flex flex-col">
                    {projects.map((project, i) => (
                        <Link
                            key={project.slug}
                            href={`/work/${project.slug}`}
                            className="group grid grid-cols-1 md:grid-cols-12 py-8 md:py-12 border-b border-foreground/10 items-center hover:bg-foreground hover:text-background transition-all duration-500 ease-in-out px-4 -mx-4 md:px-0 md:mx-0"
                        >
                            <div className="text-mono opacity-40 group-hover:opacity-100 col-span-1 hidden md:block">
                                ( {String(i + 1).padStart(2, '0')} )
                            </div>
                            <div className="col-span-1 md:col-span-5">
                                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none group-hover:italic transition-all">
                                    {project.title}
                                </h2>
                            </div>
                            <div className="col-span-1 md:col-span-3 mt-4 md:mt-0">
                                <span className="text-mono opacity-40 group-hover:opacity-100 md:text-xs">
                                    {project.client || 'Experimental'} / {project.category || 'Visual Study'}
                                </span>
                            </div>
                            <div className="col-span-1 md:col-span-2 mt-2 md:mt-0 text-mono opacity-40 group-hover:opacity-100">
                                {project.year || '2025'}
                            </div>
                            <div className="col-span-1 hidden md:flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-sm font-black">↗</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* 3. FOOTER CALL TO ACTION */}
            <section className="py-48 px-6 md:px-12 max-w-[100rem] mx-auto text-center">
                <span className="text-mono opacity-20 block mb-8">Ready to collaborate?</span>
                <a href="mailto:hello@img.folio" className="text-[8vw] font-black tracking-tighter uppercase leading-none hover:opacity-50 transition-opacity">
                    Say Hello ↗
                </a>
            </section>

        </main>
    );
}
