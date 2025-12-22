import { client, urlFor } from '@/lib/sanity';
import Image from 'next/image';
import { notFound } from 'next/navigation';

async function getProject(slug: string) {
    const query = `*[_type == "project" && slug.current == $slug][0] {
    title,
    year,
    client,
    "slug": slug.current,
    description,
    gallery
  }`;
    const project = await client.fetch(query, { slug });
    return project;
}

export async function generateStaticParams() {
    const query = `*[_type == "project"]{ "slug": slug.current }`;
    const projects = await client.fetch(query);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return projects.map((project: any) => ({
        slug: project.slug,
    }));
}

export const revalidate = 10;

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = await getProject(slug);

    if (!project) notFound();

    return (
        <main className="min-h-screen bg-white text-black pb-32">

            {/* 1. HEADER INFO (Original Design) */}
            <div className="pt-32 px-4 max-w-7xl mx-auto">
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase mb-8 leading-none">
                    {project.title}
                </h1>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-black pt-6 mb-20">
                    <div>
                        <span className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-1">Year</span>
                        <span className="font-medium">{project.year}</span>
                    </div>
                    <div>
                        <span className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-1">Client</span>
                        <span className="font-medium">{project.client}</span>
                    </div>
                    <div className="col-span-2 md:col-span-2">
                        <span className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-1">Context</span>
                        <p className="font-sans text-sm leading-relaxed max-w-prose">
                            {project.description || "No description provided."}
                        </p>
                    </div>
                </div>
            </div>

            {/* 2. THE GALLERY (FIXED: Masonry Columns) */}
            <section className="px-4 max-w-7xl mx-auto">

                {/* CSS Columns: The images will stack like puzzle pieces */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                    {project.gallery?.map((image: any, i: number) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
                        <div key={i} className="relative w-full bg-neutral-100 break-inside-avoid mb-4">
                            <Image
                                src={urlFor(image).width(1200).url()}
                                alt={`Gallery image ${i + 1}`}
                                width={1200}
                                height={800} // Aspect ratio is handled by CSS columns
                                className="w-full h-auto object-cover"
                                quality={90}
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>
                    ))}

                </div>

                {/* Empty State */}
                {!project.gallery && (
                    <div className="p-12 border border-dashed border-gray-300 text-center font-mono text-xs text-gray-400 uppercase tracking-widest">
                        [ No images available ]
                    </div>
                )}

            </section>

        </main>
    );
}
