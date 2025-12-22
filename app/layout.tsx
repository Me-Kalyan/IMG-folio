import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import SmoothScroll from '@/components/SmoothScroll';
import GrainOverlay from '@/components/GrainOverlay';
import CustomCursor from '@/components/CustomCursor';
import Preloader from '@/components/Preloader';
import ProgressBar from '@/components/ProgressBar';
import Transition from '@/components/Transition';

export const metadata: Metadata = {
  title: "IMG'folio",
  description: 'Visual Archive 2024-2025',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-black cursor-none">
        <Preloader />
        <ProgressBar />
        <GrainOverlay />
        <CustomCursor />

        <SmoothScroll>
          <Transition>
            {children}
          </Transition>
        </SmoothScroll>
      </body>
    </html>
  );
}