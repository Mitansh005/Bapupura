'use client';

import { useLang } from '@/app/context/lang';
import { T } from '@/app/lib/translations';
import { C, F } from '@/app/lib/theme';
import { SectionHeader } from '@/app/components/SectionHeader';

export default function AboutPage() {
  const { lang } = useLang();
  const isGu = lang === 'gu';
  const t = T[lang].about;

  const roles = [
    { r: t.pramukh,  n: t.pramukhName },
    { r: t.mantri,   n: t.mantriName },
    { r: t.pravakta, n: t.pravaktaName },
    { r: t.sanyojak, n: t.sanyojakName },
  ];

  return (
    <div style={{ paddingTop: 64, background: C.bg, minHeight: '100svh' }}>
      <section style={{ padding: '48px 28px', background: C.white }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <SectionHeader eye={t.eye} title={t.title} sub={t.sub} isGu={isGu} center={false} />

          {/* Description block 1 */}
          <div style={{ borderLeft: `2px solid ${C.gold}`, paddingLeft: 16, background: C.goldLL, padding: '12px 12px 12px 16px', marginBottom: 16 }}>
            <p style={{ fontSize: 13, color: C.tx2, lineHeight: 1.9, fontFamily: isGu ? F.gujarati : F.inter }}>{t.d1}</p>
          </div>

          {/* Description block 2 */}
          <p style={{ fontSize: 13, color: C.tx2, lineHeight: 1.9, marginBottom: 32, fontFamily: isGu ? F.gujarati : F.inter }}>{t.d2}</p>

          {/* Committee card */}
          <div style={{ border: `1px solid ${C.bd}`, overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ background: C.maroon, padding: '16px 20px' }}>
              <p style={{ fontFamily: F.cormorant, fontSize: 20, color: '#fff', fontWeight: 600 }}>{t.committeeTitle}</p>
              <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)', letterSpacing: 2, textTransform: 'uppercase', marginTop: 3, fontFamily: F.inter }}>{t.committeeSub}</p>
            </div>

            {/* Role grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 1, background: C.bd, margin: '1px 0' }}>
              {roles.map(({ r, n }) => (
                <div key={r} style={{ background: C.bg2, padding: '14px 16px' }}>
                  <div style={{ fontSize: 8, color: C.sf, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4, fontWeight: 600, fontFamily: F.inter }}>{r}</div>
                  <div style={{ fontFamily: F.cormorant, fontSize: 15, color: C.maroon, fontWeight: 700 }}>{n}</div>
                </div>
              ))}
            </div>

            {/* Stage service members */}
            <div style={{ padding: '16px 20px', background: C.white }}>
              <p style={{ fontSize: 8, color: C.sf, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12, fontWeight: 600, fontFamily: F.inter }}>{t.members}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {t.membersList.map((m: string) => (
                  <span key={m} style={{ fontSize: 11, color: C.tx2, background: C.bg2, border: `1px solid ${C.bd}`, padding: '4px 10px', fontFamily: F.inter }}>
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
