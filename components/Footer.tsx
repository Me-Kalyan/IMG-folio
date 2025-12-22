'use client';

import { useState } from 'react';

const contactData = [
    {
        category: 'MAIL',
        value: 'hello@kalyan.work',
        link: '#',
        isEmail: true,
    },
    {
        category: 'INSTAGRAM',
        value: '@kalyan_aim',
        link: 'https://instagram.com/kalyan_aim',
    },
    {
        category: 'STUDIO',
        value: 'Hyderabad, IN',
        link: '#',
    },
    {
        category: 'VERSION',
        value: '2025.1.0 (Beta)',
        link: '#',
    }
];

export default function Footer() {
    const [copied, setCopied] = useState(false);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <footer className="w-full border-t border-black bg-white pt-12 pb-8 mb-20 md:mb-0">
            <div className="max-w-7xl mx-auto px-4">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {contactData.map((item) => (
                        <div key={item.category} className="flex flex-col gap-1 group">
                            <span className="font-mono text-[10px] tracking-widest text-gray-500 uppercase">
                                {item.category}
                            </span>

                            {item.isEmail ? (
                                <button
                                    onClick={() => handleCopy(item.value)}
                                    className="font-sans text-xl font-semibold text-black md:text-gray-800 md:group-hover:text-black transition-colors text-left w-fit"
                                >
                                    {copied ? 'COPIED TO CLIPBOARD' : item.value}
                                </button>
                            ) : (
                                <a
                                    href={item.link}
                                    className="font-sans text-xl font-semibold text-black md:text-gray-800 md:group-hover:text-black transition-colors"
                                >
                                    {item.value}
                                </a>
                            )}
                        </div>
                    ))}

                </div>

                <div className="mt-16 pt-8 border-t border-neutral-100 flex justify-between items-end">
                    <h1 className="font-sans text-6xl md:text-9xl font-bold tracking-tighter text-black/5 select-none">
                        INDEX
                    </h1>
                    <p className="font-mono text-[10px] text-gray-400 uppercase">
                        All Rights Reserved © 2025
                    </p>
                </div>

            </div>
        </footer>
    );
}
