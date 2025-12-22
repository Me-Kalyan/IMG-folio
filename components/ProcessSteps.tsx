'use client';

const steps = [
    { id: '01', title: 'Discovery', desc: 'We start by defining the problem, understanding the audience, and setting clear KPIs for the project.' },
    { id: '02', title: 'Art Direction', desc: 'Exploring visual routes and establishing a distinct design language that aligns with the brand strategy.' },
    { id: '03', title: 'Development', desc: 'Translating designs into pixel-perfect code using Next.js, ensuring performance and accessibility.' },
    { id: '04', title: 'Launch', desc: 'Rigorous testing, deployment, and post-launch support to ensure a seamless transition to the real world.' },
];

export default function ProcessSteps() {
    return (
        <section className="py-24 px-4 md:px-6 max-w-7xl mx-auto">
            <div className="mb-12">
                <h2 className="text-sm font-bold uppercase tracking-widest border border-black inline-block px-3 py-1 rounded-full">
                    Methodology
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {steps.map((step) => (
                    <div key={step.id} className="flex flex-col gap-4 group">
                        <div className="w-full h-px bg-gray-200 group-hover:bg-black transition-colors duration-500" />
                        <span className="font-mono text-xs text-gray-400 group-hover:text-black transition-colors">{step.id}</span>
                        <h3 className="text-xl font-bold tracking-tight">{step.title}</h3>
                        <p className="text-sm text-gray-500 leading-relaxed max-w-[250px]">{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
