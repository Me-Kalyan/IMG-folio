import type { Metadata } from 'next';
import './globals.css';
import CustomCursor from '@/components/CustomCursor';
import Preloader from '@/components/Preloader';
import Header from '@/components/Header';
import SmoothScroll from '@/components/SmoothScroll';
import Transition from '@/components/Transition';
import ProgressBar from '@/components/ProgressBar';
import GrainOverlay from '@/components/GrainOverlay';

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
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
          (function() {
            try {
              const theme = localStorage.getItem('theme') || 'light';
              document.documentElement.setAttribute('data-theme', theme);
            } catch (e) {}
          })();
        ` }} />
      </head>
      <body className="antialiased bg-background text-foreground transition-colors duration-500">
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
      </body>
    </html>
  );
}