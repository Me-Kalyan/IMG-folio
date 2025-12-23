'use client';

const clients = [
    "Acme Corp", "Starlight", "Ventures", "Mono", "Chronos", "Apex"
];

export default function ClientLogos() {
    return (
        <section className="py-24 border-y border-foreground/5 bg-background">
            <div className="max-w-[100rem] mx-auto px-6 md:px-12">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/30 mb-12 text-center">
                    Strategic Partners & Collaborations
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 items-center gap-12 opacity-40 grayscale group hover:grayscale-0 transition-all duration-700">
                    {clients.map((client, i) => (
                        <div key={i} className="flex justify-center border-x border-foreground/5 py-4 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-crosshair">
                            <span className="text-lg md:text-xl font-black font-sans text-foreground/40 hover:text-foreground transition-colors uppercase tracking-tight">
                                {client}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
