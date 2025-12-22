import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import SmoothScroll from '@/components/SmoothScroll';
import GrainOverlay from '@/components/GrainOverlay';
import CustomCursor from '@/components/CustomCursor';
import Preloader from '@/components/Preloader';
import ProgressBar from '@/components/ProgressBar';
import Transition from '@/components/Transition';
import ThemeProvider from '@/components/ThemeProvider';

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
      <body className="antialiased bg-white dark:bg-black text-black dark:text-white cursor-none transition-colors duration-300">
        <ThemeProvider>
          <Preloader />
          <ProgressBar />
          <GrainOverlay />
          <CustomCursor />

          <SmoothScroll>
            <Header />
            <Transition>
              {children}
            </Transition>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}