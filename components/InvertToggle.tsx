'use client';

export default function InvertToggle() {
    const toggleInvert = () => {
        document.documentElement.classList.toggle('invert-mode');
    };

    return (
        <button
            onClick={toggleInvert}
            className="fixed bottom-6 right-6 z-50 h-8 w-8 rounded-full border border-black bg-black text-white mix-blend-difference flex items-center justify-center font-mono text-xs hover:scale-110 transition-transform shadow-lg"
            aria-label="Toggle Invert Mode"
        >
            ●
        </button>
    );
}
