'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useLang } from '@/app/context/lang';
import { T } from '@/app/lib/translations';
import { C, F } from '@/app/lib/theme';

export function Navbar() {
  const { lang, toggleLang } = useLang();
  const pathname = usePathname();
  const [mob, setMob] = useState(false);
  const isGu = lang === 'gu';
  const t = T[lang].nav;

  const items = [
    { href: '/',        label: t.home },
    { href: '/darshan', label: t.darshan },
    { href: '/albums',  label: t.albums },
    { href: '/upload',  label: t.upload },
    { href: '/about',   label: t.about },
  ];

  const active = (href: string) => pathname === href;

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: 'rgba(255,255,255,0.97)',
      backdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${C.bd2}`,
      boxShadow: '0 1px 12px rgba(181,120,10,0.07)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: 'serif', fontSize: '1.6rem', color: C.maroon, lineHeight: 1 }}>ॐ</span>
          <div>
            <div style={{ fontFamily: isGu ? F.gujarati : F.cormorant, fontSize: '1.05rem', fontWeight: 700, color: C.maroon, lineHeight: 1.1 }}>
              {isGu ? 'બાપુપૂરા' : 'Bapupura'}
            </div>
            <div style={{ fontSize: '0.58rem', color: C.tx3, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: F.inter }}>
              Ta-Mansa · Gandhinagar
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex" style={{ alignItems: 'center', gap: 4 }}>
          {items.map(({ href, label }) => (
            <Link key={href} href={href} style={{
              color: active(href) ? C.maroon : C.tx3,
              borderBottom: active(href) ? `1.5px solid ${C.maroon}` : '1.5px solid transparent',
              fontWeight: active(href) ? 600 : 400,
              padding: '6px 12px',
              fontFamily: isGu ? F.gujarati : F.inter,
              fontSize: isGu ? '0.85rem' : '0.72rem',
              letterSpacing: isGu ? 0 : '0.1em',
              textTransform: isGu ? 'none' : 'uppercase',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'color 200ms',
            }}>
              {label}
            </Link>
          ))}
          <button onClick={toggleLang} style={{
            marginLeft: 8, padding: '5px 13px',
            background: C.maroonL, border: `1px solid rgba(122,21,21,0.2)`,
            color: C.maroon, fontSize: '0.72rem', cursor: 'pointer',
            fontFamily: isGu ? F.inter : F.gujarati,
          }}>
            {t.lang}
          </button>
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="flex md:hidden"
          onClick={() => setMob(!mob)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}
          aria-label="Toggle menu"
        >
          <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
            <rect width="22" height="2" rx="1" fill={C.maroon} />
            <rect y="8" width="22" height="2" rx="1" fill={C.maroon} />
            <rect y="16" width="22" height="2" rx="1" fill={C.maroon} />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mob && (
        <div style={{ background: 'rgba(255,255,255,0.98)', borderTop: `1px solid ${C.bd2}`, padding: '16px 24px 24px' }}>
          {items.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setMob(false)} style={{
              display: 'block',
              borderBottom: `1px solid ${C.bd2}`,
              padding: '12px 0',
              fontSize: '1rem',
              color: active(href) ? C.maroon : C.tx,
              fontFamily: isGu ? F.gujarati : F.inter,
              textDecoration: 'none',
            }}>
              {label}
            </Link>
          ))}
          <button onClick={() => { toggleLang(); setMob(false); }} style={{
            marginTop: 16, padding: '8px 20px',
            background: C.maroonL, border: `1px solid rgba(122,21,21,0.2)`,
            color: C.maroon, fontSize: '0.85rem', cursor: 'pointer',
          }}>
            {t.lang}
          </button>
        </div>
      )}
    </nav>
  );
}
