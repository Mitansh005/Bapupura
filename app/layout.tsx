import type { Metadata } from 'next';
import { Cormorant_Garamond, Noto_Sans_Gujarati, Inter } from 'next/font/google';
import './globals.css';
import { LangProvider } from '@/app/context/lang';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';

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
  title: 'Shri Nilkanth Mahadev Maha Mahotsav — Bapupura',
  description: 'Official website for Shri Nilkanth Mahadev Maha Mahotsav 2026, Bapupura, Ta-Mansa, Dis-Gandhinagar, Gujarat.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${gujarati.variable} ${inter.variable}`}>
      <body>
        <LangProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
