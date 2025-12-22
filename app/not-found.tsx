import Link from 'next/link';

export default function NotFound() {
    return (
        // CHANGED: 'bg-black text-white' -> 'bg-white text-black'
        // This ensures it syncs with the Global Invert Toggle correctly.
        <div className="h-screen w-full flex flex-col items-center justify-center bg-white text-black p-4">

            {/* Massive 404 Number */}
            <h1 className="font-sans text-[12rem] font-medium tracking-tighter leading-none">
                404
            </h1>

            <div className="h-px w-24 bg-black my-6" />

            {/* Technical Error Message */}
            <p className="font-mono text-[10px] uppercase tracking-widest mb-8 text-gray-500">
                Error: Coordinates not found in archive.
            </p>

            {/* Boxed Button Style */}
            <Link
                href="/"
                className="border border-black px-6 py-3 font-mono text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
            >
                Return to Index
            </Link>
        </div>
    );
}
