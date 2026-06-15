'use client';

import { useLang } from '@/app/context/lang';
import { T } from '@/app/lib/translations';
import { ALBUMS } from '@/app/lib/albums';
import { C, F } from '@/app/lib/theme';
import { SectionHeader } from '@/app/components/SectionHeader';

export default function AlbumsPage() {
  const { lang } = useLang();
  const isGu = lang === 'gu';
  const t = T[lang].albums;

  return (
    <div style={{ paddingTop: 64, background: C.bg, minHeight: '100svh' }}>
      <section style={{ padding: '48px 28px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <SectionHeader eye={t.eye} title={t.title} sub={t.sub} isGu={isGu} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 20 }}>
            {ALBUMS.map(a => {
              const sc = a.status === 'upcoming'
                ? { bg: 'rgba(181,120,10,0.08)', tx: C.gold, bd: C.bd }
                : { bg: 'rgba(14,122,48,0.06)', tx: '#0E7A30', bd: 'rgba(14,122,48,0.2)' };
              const clickable = a.status !== 'upcoming';
              return (
                <div
                  key={a.id}
                  style={{ background: C.white, border: `1px solid ${C.bd}`, transition: 'transform 0.2s, box-shadow 0.2s', cursor: clickable ? 'pointer' : 'default' }}
                  onMouseEnter={e => { if (clickable) { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(181,120,10,0.12)'; } }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                >
                  {/* Placeholder thumbnail */}
                  <div style={{ height: 120, background: a.status === 'upcoming' ? `linear-gradient(135deg, ${C.maroon}22, ${C.maroon}11)` : C.bg2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '2.5rem', opacity: 0.2, fontFamily: 'serif', color: C.maroon }}>ॐ</span>
                  </div>

                  <div style={{ padding: '16px 18px 20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontSize: 7, letterSpacing: 2, textTransform: 'uppercase', padding: '2px 8px', background: sc.bg, border: `1px solid ${sc.bd}`, color: sc.tx, fontFamily: F.inter }}>
                        {t[a.status]}
                      </span>
                      <span style={{ fontSize: 9, color: C.tx3, fontFamily: F.inter }}>{t.photos(a.count)}</span>
                    </div>
                    <p style={{ fontFamily: isGu ? F.gujarati : F.cormorant, fontSize: isGu ? 14 : 16, fontWeight: isGu ? 700 : 600, color: C.tx, marginBottom: 4, lineHeight: 1.3 }}>
                      {isGu ? a.gu : a.en}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 9, color: C.tx3, fontFamily: isGu ? F.gujarati : F.inter }}>{isGu ? a.dateGu : a.dateEn}</span>
                      {clickable && (
                        <span style={{ fontSize: 9, color: C.gold, letterSpacing: 1, textTransform: 'uppercase', fontFamily: F.inter }}>{t.view} →</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p style={{ textAlign: 'center', marginTop: 28, fontSize: 9, color: 'rgba(154,130,104,0.5)', letterSpacing: 2, fontFamily: F.inter }}>
            {t.adminNote}
          </p>
        </div>
      </section>
    </div>
  );
}
