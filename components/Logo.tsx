'use client';

import React from 'react';

interface LogoProps {
    color?: string;
    size?: number;
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ color = "currentColor", size = 150, className = "" }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 60"
            width={size}
            height={(size * 60) / 320}
            fill={color}
            className={className}
        >
            {/* Swiss Square with Dot */}
            <rect x="0" y="10" width="40" height="40" rx="2" />
            <circle cx="20" cy="30" r="4" fill={color === 'white' || color === '#FFFFFF' ? 'black' : 'white'} />

            {/* Bold Typography */}
            <text
                x="60"
                y="46"
                fontFamily="Inter, system-ui, -apple-system, sans-serif"
                fontWeight="900"
                fontSize="42"
                letterSpacing="-0.05em"
                className="uppercase"
            >
                IMG&apos;FOLIO
            </text>
        </svg>
    );
};

export default Logo;
