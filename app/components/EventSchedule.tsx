'use client';

import { useLang } from '@/app/context/lang';
import { T } from '@/app/lib/translations';
import { C, F } from '@/app/lib/theme';
import { SectionHeader } from '@/app/components/SectionHeader';

export function EventSchedule() {
  const { lang } = useLang();
  const isGu = lang === 'gu';
  const s = T[lang].schedule;
  const body = isGu ? F.gujarati : F.inter;

  const kathaCells = [
    { l: s.morningL, v: s.morningV },
    { l: s.afternoonL, v: s.afternoonV },
    { l: s.vaktaL, v: s.vaktaV },
    { l: s.venueL, v: s.venueV },
  ];

  return (
    <section style={{ background: C.bg, padding: '44px 28px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <SectionHeader eye={s.eye} title={s.title} isGu={isGu} />

        {/* Poster tagline */}
        <div style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 36, flexWrap: 'wrap' }}>
          <span style={{ color: C.gold, opacity: 0.45, fontSize: 12 }}>✦</span>
          <p style={{
            fontFamily: isGu ? F.gujarati : F.cormorant,
            fontStyle: isGu ? 'normal' : 'italic',
            fontSize: isGu ? 'clamp(1rem,3vw,1.35rem)' : 'clamp(1.1rem,3vw,1.5rem)',
            fontWeight: isGu ? 600 : 500,
            color: C.maroon, lineHeight: 1.6, maxWidth: 640,
          }}>
            {s.tagline}
          </p>
          <span style={{ color: C.gold, opacity: 0.45, fontSize: 12 }}>✦</span>
        </div>

        {/* Two cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 20, alignItems: 'start' }}>

          {/* ── Shiv Mahapuran Katha ── */}
          <div className="card-lift" style={{ border: `1px solid ${C.bd}`, overflow: 'hidden', background: C.white }}>
            <div style={{ background: C.maroon, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
              <p style={{ fontFamily: isGu ? F.gujarati : F.cormorant, fontSize: isGu ? 17 : 20, color: '#fff', fontWeight: isGu ? 700 : 600 }}>
                {s.kathaTitle}
              </p>
              <span style={{ fontSize: 10, color: '#F5C87A', letterSpacing: isGu ? 0 : 1, fontFamily: body, fontWeight: 600 }}>
                {s.kathaDates}
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: C.bd }}>
              {kathaCells.map(({ l, v }) => (
                <div key={l} style={{ background: C.bg2, padding: '14px 16px' }}>
                  <div style={{ fontSize: 8, color: C.sf, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 5, fontWeight: 600, fontFamily: body }}>{l}</div>
                  <div style={{ fontFamily: isGu ? F.gujarati : F.cormorant, fontSize: isGu ? 14 : 15, color: C.maroon, fontWeight: 700, lineHeight: 1.4 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Night Program ── */}
          <div className="card-lift" style={{ border: `1px solid ${C.bd}`, overflow: 'hidden', background: C.white }}>
            <div style={{ background: C.maroon, padding: '16px 20px' }}>
              <p style={{ fontFamily: isGu ? F.gujarati : F.cormorant, fontSize: isGu ? 17 : 20, color: '#fff', fontWeight: isGu ? 700 : 600 }}>
                {s.nightTitle}
              </p>
              <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)', letterSpacing: 2, textTransform: 'uppercase', marginTop: 3, fontFamily: F.inter }}>
                {s.nightSub}
              </p>
            </div>
            <div>
              {s.nights.map((n, i) => (
                <div key={n.date} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
                  padding: '15px 20px',
                  borderTop: i === 0 ? 'none' : `1px solid ${C.bd2}`,
                  background: C.bg2,
                }}>
                  <span style={{ fontSize: 9, color: C.sf, letterSpacing: 1.5, textTransform: isGu ? 'none' : 'uppercase', fontWeight: 600, fontFamily: body }}>
                    {n.date}
                  </span>
                  <span style={{ textAlign: 'right' }}>
                    <span style={{ display: 'block', fontFamily: isGu ? F.gujarati : F.cormorant, fontSize: isGu ? 15 : 17, color: C.maroon, fontWeight: 700 }}>
                      {n.name}
                    </span>
                    <span style={{ display: 'block', fontSize: isGu ? 11 : 10, color: C.tx3, marginTop: 2, fontFamily: body }}>
                      {n.act}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Special Events ── */}
          <div className="card-lift" style={{ border: `1px solid ${C.bd}`, overflow: 'hidden', background: C.white }}>
            <div style={{ background: C.maroon, padding: '16px 20px' }}>
              <p style={{ fontFamily: isGu ? F.gujarati : F.cormorant, fontSize: isGu ? 17 : 20, color: '#fff', fontWeight: isGu ? 700 : 600 }}>
                {s.specialTitle}
              </p>
              <p style={{ fontSize: isGu ? 11 : 9, color: '#F5C87A', letterSpacing: isGu ? 0 : 1, marginTop: 3, fontFamily: body }}>
                {s.specialSub}
              </p>
            </div>
            <div>
              {s.specials.map((e, i) => (
                <div key={e.name} style={{ padding: '13px 20px', borderTop: i === 0 ? 'none' : `1px solid ${C.bd2}`, background: C.bg2 }}>
                  <div style={{ fontSize: isGu ? 11 : 9, color: C.sf, letterSpacing: isGu ? 0 : 1.5, textTransform: isGu ? 'none' : 'uppercase', fontWeight: 600, fontFamily: body }}>
                    {e.date}
                  </div>
                  <div style={{ fontFamily: isGu ? F.gujarati : F.cormorant, fontSize: isGu ? 14 : 16, color: C.maroon, fontWeight: 700, marginTop: 3, lineHeight: 1.35 }}>
                    {e.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
