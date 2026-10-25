import type { Metadata } from 'next';
import { Cormorant_Garamond, Noto_Sans_Gujarati, Inter } from 'next/font/google';
import './globals.css';
import { LangProvider } from '@/app/context/lang';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { Analytics } from '@vercel/analytics/next';

const cormorant = Cormorant_Garamond({
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
});

const gujarati = Noto_Sans_Gujarati({
  weight: ['400', '600', '700'],
  subsets: ['gujarati'],
  variable: '--font-gujarati',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Shree Nilkanth Mahadev Maha Mahotsav — Bapupura',
  description: 'Official website for Shree Nilkanth Mahadev Maha Mahotsav 2026, Bapupura, Ta-Mansa, Dis-Gandhinagar, Gujarat.',
  metadataBase: new URL('https://nilkanthmahadev.com'),
  // Preview card when the link is shared on WhatsApp etc. (keep image under ~300 KB)
  openGraph: {
    title: 'Shree Nilkanth Mahadev Maha Mahotsav 2026 — Bapupura',
    description: '22 – 25 October 2026 · Shiv Mahapuran Katha · Cultural Programme · Live Darshan',
    images: ['/images/hero.jpg'],
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="gu" className={`${cormorant.variable} ${gujarati.variable} ${inter.variable}`}>
      <body>
        <LangProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LangProvider>
        <Analytics />
      </body>
    </html>
  );
}
