import type { Metadata } from 'next';
import './globals.css';
import CustomCursor from '@/components/CustomCursor';
import Preloader from '@/components/Preloader';
import Header from '@/components/Header';
import SmoothScroll from '@/components/SmoothScroll';
import PageTransition from '@/components/PageTransition';
import ProgressBar from '@/components/ProgressBar';
import GrainOverlay from '@/components/GrainOverlay';

export const metadata: Metadata = {
  title: {
    default: "IMG'FOLIO | Visual Archive",
    template: "%s | IMG'FOLIO"
  },
  description: 'Independent design practice focusing on high-end visual storytelling and creative technology. Portfolio of IMG&apos;folio Studio.',
  keywords: ['Design', 'Photography', 'Swiss Style', 'Minimalism', 'Creative Development', 'Visual Identity'],
  authors: [{ name: 'IMG&apos;folio Studio' }],
  creator: 'IMG&apos;folio',
  metadataBase: new URL('https://imgfolio-app.vercel.app'), // Use current deployment URL for better previews
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://imgfolio.studio',
    siteName: "IMG'FOLIO",
    title: "IMG'FOLIO | Visual Archive",
    description: 'Independent design practice focusing on high-end visual storytelling and creative technology.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: "IMG'FOLIO",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "IMG'FOLIO | Visual Archive",
    description: 'Independent design practice focusing on high-end visual storytelling and creative technology.',
    creator: '@imgfolio',
    images: ['/og-image.png'],
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/icon-master.png', type: 'image/png' },
    ],
    apple: [
      { url: '/icon-master.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
      <body className="antialiased bg-background text-foreground transition-colors duration-500" suppressHydrationWarning>
        <Preloader />
        <ProgressBar />
        <GrainOverlay />
        <CustomCursor />

        <SmoothScroll>
          <Header />
          <PageTransition>
            {children}
          </PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}