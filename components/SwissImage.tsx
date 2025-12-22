'use client';

import Image from 'next/image';
import { useState } from 'react';

interface SwissImageProps {
    src: string;
    alt: string;
    ratio?: string;
}

export function SwissImage({ src, alt, ratio = 'aspect-square' }: SwissImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={`relative w-full ${ratio} bg-[#f0f0f0] overflow-hidden`}>
            <Image
                src={src}
                alt={alt}
                fill
                className={`
          object-cover transition-opacity duration-500 ease-in-out
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
        `}
                onLoad={() => setIsLoaded(true)}
            />
        </div>
    );
}
