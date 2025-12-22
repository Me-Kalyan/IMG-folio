'use client';
import { useState } from 'react';

export default function CopyEmail({ email }: { email: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2s
    };

    return (
        <button
            onClick={handleCopy}
            className="text-xl md:text-3xl font-bold hover:underline decoration-2 underline-offset-4 text-left uppercase"
        >
            {copied ? "Address Copied!" : email}
        </button>
    );
}
