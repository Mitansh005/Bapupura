'use client';

import Image from 'next/image';
import { useLang } from '@/app/context/lang';
import { T } from '@/app/lib/translations';
import { C, F } from '@/app/lib/theme';
import { STREAMS, fmtIST } from '@/app/lib/streams';

export default function DarshanPage() {
  const { lang } = useLang();
  const isGu = lang === 'gu';
  const t = T[lang].darshan;

  const timings = [
    { l: t.t2l, v: t.t2v, n: t.t2n },
    { l: t.t3l, v: t.t3v, n: t.t3n },
    { l: t.t4l, v: t.t4v, n: t.t4n },
  ];

  return (
    <div style={{ paddingTop: 64, background: C.bg, minHeight: '100svh' }}>
      <section style={{ padding: '48px 28px', background: C.white }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>

          {/* Live badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(212,43,43,0.07)', border: '1px solid rgba(212,43,43,0.2)', padding: '3px 12px', marginBottom: 14 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#D42B2B', display: 'inline-block', animation: 'liveP 1.5s infinite' }} />
            <span style={{ fontSize: 9, color: '#D42B2B', letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, fontFamily: F.inter }}>
              {t.eye}
            </span>
          </div>

          <h1 style={{
            fontFamily: isGu ? F.gujarati : F.cormorant,
            fontSize: isGu ? 'clamp(1.4rem,4vw,2rem)' : 'clamp(1.6rem,4vw,2.4rem)',
            fontWeight: isGu ? 700 : 600,
            color: C.maroon,
            marginBottom: 6,
          }}>
            {t.title}
          </h1>
          <p style={{ fontSize: 12, color: C.tx2, marginBottom: 24, fontFamily: isGu ? F.gujarati : F.inter }}>
            {t.sub}
          </p>

          {/* YouTube embeds — today's event stream first, then the mandir camera */}
          {[
            ...STREAMS.filter(s => s.live).map(s => ({
              id: s.id,
              label: `🔴 ${t.eventLive} — ${isGu ? s.gu : s.en}`,
              sub: fmtIST(s.start, lang, { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: '2-digit' }),
            })),
            { id: 'I98t5BgGt2k', label: t.camLabel, sub: t.camSub },
          ].map(s => (
            <div key={s.id} style={{ border: `1px solid ${C.bd}`, overflow: 'hidden', marginBottom: 16 }}>
              <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${s.id}?rel=0`}
                  title={s.label}
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', display: 'block' }}
                />
              </div>
              <div style={{ background: C.maroon, padding: '10px 16px' }}>
                <div style={{ fontSize: 11, color: '#fff', fontFamily: isGu ? F.gujarati : F.inter }}>{s.label}</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', marginTop: 2, fontFamily: isGu ? F.gujarati : F.inter }}>{s.sub}</div>
              </div>
            </div>
          ))}

          {/* Shivling darshan photograph */}
          <div className="card-lift" style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10', border: `1px solid ${C.bd}`, overflow: 'hidden', marginTop: 16 }}>
            <Image
              src="/images/shivling-flowers.jpg"
              alt="Shivling at Shree Nilkanth Mahadev adorned with flowers"
              fill
              sizes="(max-width: 932px) 100vw, 900px"
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Timings */}
          <h3 style={{ fontFamily: F.cormorant, fontSize: 20, color: C.maroon, margin: '28px 0 14px' }}>
            {t.infoTitle}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 1, background: C.bd }}>
            {timings.map(({ l, v, n }) => (
              <div key={l} style={{ background: C.bg2, padding: '14px 16px' }}>
                <div style={{ fontSize: 8, color: C.sf, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4, fontWeight: 600, fontFamily: F.inter }}>{l}</div>
                <div style={{ fontFamily: F.cormorant, fontSize: 16, color: C.maroon, fontWeight: 700 }}>{v}</div>
                <div style={{ fontSize: 9, color: C.tx3, marginTop: 2, fontFamily: isGu ? F.gujarati : F.inter }}>{n}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
