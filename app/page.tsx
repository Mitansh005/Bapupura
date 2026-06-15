'use client';

import Link from 'next/link';
import { useLang } from '@/app/context/lang';
import { T } from '@/app/lib/translations';
import { ALBUMS } from '@/app/lib/albums';
import { C, F } from '@/app/lib/theme';
import { Divider } from '@/app/components/Divider';
import { SectionHeader } from '@/app/components/SectionHeader';
import { Hero } from '@/app/components/Hero';

export default function HomePage() {
  const { lang } = useLang();
  const isGu = lang === 'gu';
  const tr = T[lang];

  const infoItems = [
    { l: lang === 'en' ? 'Dates' : 'તારીખ', v: lang === 'en' ? '22–25 October 2026' : '૨૨–૨૫ ઓક્ટોબર ૨૦૨૬', n: lang === 'en' ? '4 Days' : '૪ દિવસ' },
    { l: lang === 'en' ? 'Evening Dhun' : 'સાંજની ધૂન', v: lang === 'en' ? 'Every Monday' : 'દર સોમવારે', n: '।। ॐ નમઃ શિવાય ।।' },
    { l: lang === 'en' ? 'Location' : 'સ્થળ', v: lang === 'en' ? 'Nilkanth Mandir' : 'નીલકંઠ મંદિર', n: lang === 'en' ? 'Bapupura, Ta-Mansa' : 'બાપુપૂરા, તા-માણસા' },
    { l: lang === 'en' ? 'Organizer' : 'આયોજક', v: lang === 'en' ? 'Yuva Ekta Manch' : 'યુવા એકતા મંચ', n: 'Bapupura' },
  ];

  return (
    <div style={{ background: C.bg }}>
      <Hero />

      <Divider />

      {/* ── Event info strip ── */}
      <section style={{ background: C.white, padding: '36px 28px' }}>
        <SectionHeader
          eye={lang === 'en' ? 'Festival Information' : 'ઉત્સવ માહિતી'}
          title={lang === 'en' ? 'About The Event' : 'ઉત્સવ વિશે'}
          isGu={isGu}
        />
        <div style={{ maxWidth: 800, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 1, background: C.bd }}>
          {infoItems.map(({ l, v, n }) => (
            <div key={l} style={{ background: C.bg2, padding: '16px 18px' }}>
              <div style={{ fontSize: 8, color: C.sf, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4, fontWeight: 600, fontFamily: F.inter }}>{l}</div>
              <div style={{ fontFamily: F.cormorant, fontSize: 16, color: C.maroon, fontWeight: 700 }}>{v}</div>
              <div style={{ fontSize: 9, color: C.tx3, marginTop: 2, fontFamily: isGu ? F.gujarati : F.inter }}>{n}</div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── Albums preview ── */}
      <section style={{ background: C.bg, padding: '36px 28px' }}>
        <SectionHeader eye={tr.albums.eye} title={tr.albums.title} sub={tr.albums.sub} isGu={isGu} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: 16, maxWidth: 900, margin: '0 auto' }}>
          {ALBUMS.slice(0, 2).map(a => {
            const sc = a.status === 'upcoming'
              ? { bg: 'rgba(181,120,10,0.08)', tx: C.gold, bd: C.bd }
              : { bg: 'rgba(14,122,48,0.06)', tx: '#0E7A30', bd: 'rgba(14,122,48,0.2)' };
            return (
              <div
                key={a.id}
                style={{ background: C.white, border: `1px solid ${C.bd}`, padding: 18, cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(181,120,10,0.12)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
              >
                <span style={{ fontSize: 7, letterSpacing: 2, textTransform: 'uppercase', padding: '2px 8px', background: sc.bg, border: `1px solid ${sc.bd}`, color: sc.tx, fontFamily: F.inter }}>
                  {tr.albums[a.status]}
                </span>
                <p style={{ fontFamily: isGu ? F.gujarati : F.cormorant, fontSize: isGu ? 14 : 16, fontWeight: isGu ? 700 : 600, color: C.tx, margin: '10px 0 4px' }}>
                  {isGu ? a.gu : a.en}
                </p>
                <p style={{ fontSize: 9, color: C.tx3 }}>{isGu ? a.dateGu : a.dateEn}</p>
              </div>
            );
          })}
        </div>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Link href="/albums" style={{
            padding: '10px 24px', background: 'transparent', border: `1px solid ${C.bd}`,
            color: C.gold, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase',
            fontFamily: F.inter, textDecoration: 'none', display: 'inline-block',
          }}>
            {lang === 'en' ? 'View All Albums' : 'બધા આલ્બમ'}
          </Link>
        </div>
      </section>
    </div>
  );
}
