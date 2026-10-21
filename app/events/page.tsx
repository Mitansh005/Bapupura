'use client';

import { useState } from 'react';
import { useLang } from '@/app/context/lang';
import { T } from '@/app/lib/translations';
import { STREAMS, fmtIST } from '@/app/lib/streams';
import { C, F } from '@/app/lib/theme';
import { SectionHeader } from '@/app/components/SectionHeader';

export default function EventsPage() {
  const { lang } = useLang();
  const isGu = lang === 'gu';
  const t = T[lang].events;
  const [newest, setNewest] = useState(true);

  // ISO strings in the same offset sort chronologically as plain strings
  const past = STREAMS.filter(s => !s.live)
    .sort((a, b) => newest ? b.start.localeCompare(a.start) : a.start.localeCompare(b.start));
  const days: { day: string; items: typeof past }[] = [];
  for (const s of past) {
    const day = s.start.slice(0, 10);
    if (days.at(-1)?.day === day) days.at(-1)!.items.push(s);
    else days.push({ day, items: [s] });
  }

  const sortBtn = (active: boolean) => ({
    padding: '7px 16px', cursor: 'pointer', fontSize: isGu ? 12 : 10,
    letterSpacing: isGu ? 0 : 2, textTransform: isGu ? 'none' as const : 'uppercase' as const,
    fontFamily: isGu ? F.gujarati : F.inter,
    background: active ? C.maroon : C.white, color: active ? '#fff' : C.maroon,
    border: `1px solid ${C.maroon}`,
  });

  return (
    <div style={{ paddingTop: 64, background: C.bg, minHeight: '100svh' }}>
      <section style={{ padding: '48px 28px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <SectionHeader eye={t.eye} title={t.title} sub={t.sub} isGu={isGu} />

          {past.length === 0 ? (
            <p style={{ textAlign: 'center', fontSize: 13, color: C.tx3, padding: '40px 0', fontFamily: isGu ? F.gujarati : F.inter }}>
              {t.empty}
            </p>
          ) : (
            <>
              <div role="group" aria-label={t.sortLabel} style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
                <button type="button" aria-pressed={newest} onClick={() => setNewest(true)} style={sortBtn(newest)}>{t.newest}</button>
                <button type="button" aria-pressed={!newest} onClick={() => setNewest(false)} style={{ ...sortBtn(!newest), borderLeft: 'none' }}>{t.oldest}</button>
              </div>

              {days.map(({ day, items }) => (
                <div key={day} style={{ marginBottom: 36 }}>
                  <h2 style={{ fontFamily: isGu ? F.gujarati : F.cormorant, fontSize: isGu ? 18 : 22, color: C.maroon, fontWeight: isGu ? 700 : 600, marginBottom: 14, paddingBottom: 8, borderBottom: `1px solid ${C.bd}` }}>
                    {fmtIST(items[0].start, lang, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 420px), 1fr))', gap: 20 }}>
                    {items.map(s => (
                      <div key={s.id} style={{ border: `1px solid ${C.bd}`, overflow: 'hidden', background: C.white }}>
                        <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
                          <iframe
                            src={`https://www.youtube.com/embed/${s.id}?rel=0`}
                            title={isGu ? s.gu : s.en}
                            loading="lazy"
                            allowFullScreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', display: 'block' }}
                          />
                        </div>
                        <div style={{ padding: '12px 16px' }}>
                          <div style={{ fontSize: isGu ? 11 : 9, color: C.sf, letterSpacing: isGu ? 0 : 1.5, textTransform: isGu ? 'none' : 'uppercase', fontWeight: 600, fontFamily: isGu ? F.gujarati : F.inter }}>
                            {fmtIST(s.start, lang, { hour: 'numeric', minute: '2-digit' })}
                          </div>
                          <div style={{ fontFamily: isGu ? F.gujarati : F.cormorant, fontSize: isGu ? 15 : 18, color: C.maroon, fontWeight: 700, marginTop: 3 }}>
                            {isGu ? s.gu : s.en}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
