'use client';

export default function Testimonial() {
    return (
        <section className="py-32 px-4 md:px-6 bg-neutral-50 border-y border-neutral-100">
            <div className="max-w-4xl mx-auto text-center relative">
                <span className="absolute -top-12 left-1/2 -translate-x-1/2 text-9xl font-serif text-black/5 select-none">
                    &ldquo;
                </span>
                <blockquote className="relative z-10">
                    <p className="text-2xl md:text-4xl font-medium leading-tight text-neutral-800 mb-8">
                        &ldquo;The attention to detail and the ability to translate abstract concepts into a coherent digital experience is unmatched. A true partner in design.&rdquo;
                    </p>
                    <footer className="flex flex-col items-center gap-1">
                        <cite className="not-italic font-bold text-sm uppercase tracking-widest">Sarah Jenkins</cite>
                        <span className="font-mono text-[10px] text-gray-400 uppercase">CMO, Apex Ventures</span>
                    </footer>
                </blockquote>
            </div>
        </section>
    );
}
