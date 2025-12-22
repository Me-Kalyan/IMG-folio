'use client';

const clients = [
    "Acme Corp", "Starlight", "Ventures", "Mono", "Chronos", "Apex"
];

export default function ClientLogos() {
    return (
        <section className="py-12 border-b border-gray-100 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <p className="text-center font-mono text-[10px] uppercase tracking-widest text-gray-400 mb-8">
                    Trusted by market leaders
                </p>
                <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {clients.map((client, i) => (
                        <span key={i} className="text-xl md:text-2xl font-bold font-sans text-gray-300 hover:text-black transition-colors cursor-default">
                            {client}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
