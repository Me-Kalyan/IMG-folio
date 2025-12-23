'use client';

const steps = [
    { id: '01', title: 'Discovery', desc: 'Defining the objective, audience analysis, and strategic positioning for the archival project.' },
    { id: '02', title: 'Art Direction', desc: 'Establishing a rigorous visual language rooted in Swiss typographic systems and grid logic.' },
    { id: '03', title: 'Development', desc: 'Translating concepts into high-performance digital artifacts using Next.js and creative tech.' },
    { id: '04', title: 'Refinement', desc: 'Rigorous testing and iterative polishing to achieve the absolute benchmark of quality.' },
];

export default function ProcessSteps() {
    return (
        <section className="py-24 max-w-[100rem] mx-auto">
            <div className="mb-16">
                <span className="text-mono opacity-40 uppercase tracking-widest text-[10px]">Methodology</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {steps.map((step) => (
                    <div key={step.id} className="flex flex-col gap-6 group">
                        <div className="w-full h-px bg-foreground/10 group-hover:bg-foreground transition-colors duration-700" />
                        <div className="flex flex-col gap-4">
                            <span className="font-mono text-[10px] text-foreground/30 group-hover:text-foreground transition-colors tracking-tighter uppercase">{step.id} — ARCHIVE</span>
                            <h3 className="text-2xl font-black uppercase tracking-tighter">{step.title}</h3>
                            <p className="text-xs md:text-sm text-foreground/70 leading-relaxed max-w-[280px] font-medium uppercase">{step.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
