'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'INDEX', path: '/' },
  { name: 'WORK', path: '/work' },
  { name: 'INFO', path: '/info' },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 w-full bg-white border-t-2 border-black md:sticky md:top-0 md:border-t-0 md:border-b-2">
      <div className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">

        {/* Left Side: Brand/Name (Visible on Mobile) */}
        <span className="text-xs font-mono tracking-widest uppercase hidden md:block">
          MY PORTFOLIO
        </span>

        {/* Center: Navigation Links */}
        <div className="flex w-full justify-between md:w-auto md:gap-12">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`
                  relative flex h-full items-center text-xs font-mono tracking-widest uppercase transition-colors
                  ${isActive ? 'text-black font-bold' : 'text-gray-400 hover:text-black'}
                `}
              >
                {/* Active Indicator: A square dot, not a rounded pill */}
                {isActive && (
                  <span className="absolute -top-[2px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 bg-black md:top-auto md:-bottom-[2px]" />
                )}
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Right Side: Contact/Status (Hidden on Mobile to save space) */}
        <div className="hidden md:flex items-center gap-2">
          <div className="h-2 w-2 bg-green-500" />
          <span className="text-xs font-mono tracking-widest uppercase text-gray-500">OPEN FOR WORK</span>
        </div>

      </div>
    </nav>
  );
}
