'use client';

import Link from 'next/link';
import { useLang } from '@/app/context/lang';
import { T } from '@/app/lib/translations';
import { C, F } from '@/app/lib/theme';

const pages = [
  { href: '/', key: 'Home' },
  { href: '/darshan', key: 'Darshan' },
  { href: '/albums', key: 'Albums' },
  { href: '/upload', key: 'Upload' },
  { href: '/about', key: 'About' },
];

export function Footer() {
  const { lang } = useLang();
  const isGu = lang === 'gu';
  const t = T[lang].footer;
  const nav = T[lang].nav;

  const labels = [nav.home, nav.darshan, nav.albums, nav.upload, nav.about];

  return (
    <footer style={{ background: C.maroon, padding: '28px 24px', textAlign: 'center' }}>
      <p style={{ fontFamily: F.cormorant, fontSize: 18, color: '#F5C87A', marginBottom: 8, fontStyle: 'italic' }}>
        {t.mantra}
      </p>
      <p style={{ fontFamily: isGu ? F.gujarati : F.cormorant, fontSize: 13, color: 'rgba(255,255,255,0.8)', marginBottom: 4 }}>
        {t.event}
      </p>
      <p style={{ fontFamily: isGu ? F.gujarati : F.inter, fontSize: 10, color: 'rgba(255,255,255,0.5)', marginBottom: 12 }}>
        {t.address}
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 12, flexWrap: 'wrap' }}>
        {pages.map(({ href }, i) => (
          <Link key={href} href={href} style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: isGu ? 11 : 9,
            letterSpacing: isGu ? 0 : 2,
            textTransform: isGu ? 'none' : 'uppercase',
            fontFamily: isGu ? F.gujarati : F.inter,
            textDecoration: 'none',
          }}>
            {labels[i]}
          </Link>
        ))}
      </div>
      <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)', letterSpacing: 2, textTransform: 'uppercase', fontFamily: F.inter }}>
        {t.organizer} · {new Date().getFullYear()}
      </p>
    </footer>
  );
}
