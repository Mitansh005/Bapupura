'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLang } from '@/app/context/lang';
import { T } from '@/app/lib/translations';
import { D, F } from '@/app/lib/theme';

// ── Countdown hook ───────────────────────────────────────────────────────────
function useCountdown() {
  const calc = () => {
    const diff = new Date('2026-10-22T00:00:00+05:30').getTime() - Date.now();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

// ── Grain texture (inline SVG fractal noise, ~4% opacity) ─────────────────────
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// Deterministic ember positions (avoid hydration mismatch from Math.random)
const EMBERS = [
  { left: '18%', delay: '0s',   dur: '9s',  size: 2 },
  { left: '32%', delay: '3.5s', dur: '11s', size: 1.5 },
  { left: '47%', delay: '1.5s', dur: '8s',  size: 2.5 },
  { left: '63%', delay: '5s',   dur: '12s', size: 1.5 },
  { left: '78%', delay: '2.5s', dur: '10s', size: 2 },
  { left: '88%', delay: '6.5s', dur: '9.5s', size: 1.5 },
];

export function Hero() {
  const { lang } = useLang();
  const isGu = lang === 'gu';
  const h = T[lang].hero;
  const cd = useCountdown();
  const pad = (n: number) => String(n).padStart(2, '0');

  const units = [
    { v: cd.d, l: h.D, boxed: false },
    { v: pad(cd.h), l: h.H, boxed: true },
    { v: pad(cd.m), l: h.M, boxed: true },
    { v: pad(cd.s), l: h.S, boxed: true },
  ];

  return (
    <section style={{
      position: 'relative',
      minHeight: '100svh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      overflow: 'hidden',
      background: `linear-gradient(180deg, ${D.duskTop} 0%, #241310 38%, ${D.duskMid} 58%, #15100C 78%, ${D.duskDeep} 100%)`,
    }}>
      {/* ── Layer 0: warm horizon glow (last light behind the temple) ── */}
      <div style={{
        position: 'absolute', left: '50%', bottom: '8%', transform: 'translateX(-50%)',
        width: '120%', height: '52%', zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(200,146,42,0.16) 0%, rgba(122,21,21,0.08) 40%, transparent 72%)',
      }} />

      {/* ── Layer 1: central aura behind the OM ── */}
      <div style={{
        position: 'absolute', left: '50%', top: '34%', transform: 'translate(-50%,-50%)',
        width: 'min(680px, 90vw)', height: 'min(680px, 90vw)', zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle at center, rgba(200,146,42,0.13) 0%, transparent 60%)',
      }} />

      {/* ── Layer 2: mist (two drifting soft bands) ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 40% at 20% 78%, rgba(154,138,118,0.06) 0%, transparent 60%)',
        animation: 'mistDrift 26s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 36% at 82% 84%, rgba(154,138,118,0.05) 0%, transparent 60%)',
        animation: 'mistDrift 34s ease-in-out infinite reverse',
      }} />

      {/* ── Layer 3: faint star/ember field ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage:
          'radial-gradient(1px 1px at 12% 16%, rgba(242,232,213,0.4) 0%, transparent 100%),' +
          'radial-gradient(1.4px 1.4px at 34% 9%, rgba(200,146,42,0.5) 0%, transparent 100%),' +
          'radial-gradient(1px 1px at 59% 13%, rgba(242,232,213,0.32) 0%, transparent 100%),' +
          'radial-gradient(1px 1px at 81% 20%, rgba(200,146,42,0.4) 0%, transparent 100%),' +
          'radial-gradient(1px 1px at 91% 8%, rgba(242,232,213,0.28) 0%, transparent 100%),' +
          'radial-gradient(1px 1px at 6% 34%, rgba(200,146,42,0.26) 0%, transparent 100%)',
      }} />

      {/* ── Layer 4: drifting embers ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        {EMBERS.map((e, i) => (
          <span key={i} style={{
            position: 'absolute', bottom: '18%', left: e.left,
            width: e.size, height: e.size, borderRadius: '50%',
            background: D.ember, boxShadow: `0 0 6px ${D.emberSoft}`,
            animation: `emberFloat ${e.dur} ease-in-out ${e.delay} infinite`,
          }} />
        ))}
      </div>

      {/* ── Layer 5: temple silhouette at the horizon ── */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '42%', zIndex: 1, pointerEvents: 'none' }}>
        <svg viewBox="0 0 1440 400" preserveAspectRatio="xMidYMax slice" width="100%" height="100%" style={{ display: 'block' }}>
          {/* low temple wall / plinth */}
          <rect x="0" y="360" width="1440" height="40" fill={D.templeFill} />
          <rect x="430" y="334" width="580" height="66" fill={D.templeFill} />
          {/* left flanking shikhara */}
          <path d="M548,400 C548,300 575,250 608,250 C641,250 668,300 668,400 Z" fill={D.templeFill} />
          {/* right flanking shikhara */}
          <path d="M772,400 C772,300 799,250 832,250 C865,250 892,300 892,400 Z" fill={D.templeFill} />
          {/* central spire */}
          <path d="M655,400 C655,232 686,120 720,62 C754,120 785,232 785,400 Z" fill={D.templeFill} />
          {/* kalash + finial */}
          <circle cx="720" cy="54" r="9" fill={D.templeFill} />
          <rect x="718.5" y="28" width="3" height="26" fill={D.templeFill} />
          {/* subtle gold rim-light along the spire's leading edge */}
          <path d="M720,62 C686,120 655,232 655,400" fill="none" stroke="rgba(200,146,42,0.22)" strokeWidth="1.2" />
          <path d="M608,250 C575,250 548,300 548,400" fill="none" stroke="rgba(200,146,42,0.12)" strokeWidth="1" />
        </svg>
      </div>

      {/* ── Layer 6: grain ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        backgroundImage: GRAIN, backgroundSize: '160px 160px',
        opacity: 0.045, mixBlendMode: 'overlay',
      }} />

      {/* ── Content ── */}
      <div style={{
        position: 'relative', zIndex: 3,
        padding: 'clamp(96px,13vw,150px) clamp(20px,5vw,72px) clamp(64px,9vw,110px)',
        maxWidth: 920, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        {/* Breathing OM */}
        <div style={{
          fontFamily: 'serif', fontSize: 'clamp(3.6rem,9vw,6rem)', color: D.ember,
          lineHeight: 1, marginBottom: 'clamp(14px,2.5vw,22px)',
          animation: 'omBreath 5.5s ease-in-out infinite',
        }}>
          ॐ
        </div>

        {/* Organizer kicker */}
        <p style={{
          fontSize: 'clamp(0.55rem,1.4vw,0.66rem)', letterSpacing: '0.32em', textTransform: 'uppercase',
          color: D.ember, fontFamily: isGu ? F.gujarati : F.inter, fontWeight: 500,
          marginBottom: 'clamp(20px,3vw,30px)', maxWidth: 560, lineHeight: 1.9,
        }}>
          {h.organizer}
        </p>

        {/* Monumental event name */}
        <h1 style={{
          fontFamily: isGu ? F.gujarati : F.cormorant,
          fontSize: isGu ? 'clamp(2.4rem,9vw,5rem)' : 'clamp(2.9rem,11vw,7rem)',
          fontWeight: isGu ? 700 : 500,
          color: D.cream,
          lineHeight: isGu ? 1.18 : 1.04,
          letterSpacing: isGu ? '-0.01em' : '-0.015em',
          marginBottom: 'clamp(18px,3vw,28px)',
          whiteSpace: 'pre-line',
          textShadow: '0 2px 40px rgba(0,0,0,0.5)',
        }}>
          {h.eventName}
        </h1>

        {/* Dates — refined, not a heavy badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 14,
          marginBottom: 'clamp(14px,2vw,18px)',
        }}>
          <span style={{ width: 'clamp(24px,5vw,46px)', height: 1, background: `linear-gradient(to right, transparent, ${D.emberSoft})` }} />
          <span style={{
            fontFamily: isGu ? F.gujarati : F.inter, fontSize: 'clamp(0.78rem,2vw,0.95rem)',
            letterSpacing: isGu ? '0.04em' : '0.16em', color: D.cream, fontWeight: 500,
            textTransform: isGu ? 'none' : 'uppercase',
          }}>
            {h.dates}
          </span>
          <span style={{ width: 'clamp(24px,5vw,46px)', height: 1, background: `linear-gradient(to left, transparent, ${D.emberSoft})` }} />
        </div>

        {/* Location */}
        <p style={{
          fontFamily: isGu ? F.gujarati : F.cormorant, fontSize: isGu ? 14 : 17,
          fontStyle: isGu ? 'normal' : 'italic', color: D.ember, marginBottom: 5,
        }}>
          {h.location}
        </p>
        <p style={{ fontSize: 9, color: D.ashDim, letterSpacing: '0.22em', textTransform: 'uppercase', fontFamily: F.inter, marginBottom: 'clamp(34px,5vw,48px)' }}>
          {h.address}
        </p>

        {/* ── Countdown — serif numerals, hairline dividers, no boxes ── */}
        <p style={{ fontSize: 9, color: D.creamFaint, letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: F.inter, marginBottom: 'clamp(16px,2.5vw,22px)' }}>
          {h.countdownLabel}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(10px,3vw,30px)' }}>
          {units.map(({ v, l }, i) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(10px,3vw,30px)' }}>
              {i > 0 && <span style={{ width: 1, height: 'clamp(30px,7vw,52px)', background: `linear-gradient(to bottom, transparent, ${D.emberFaint}, transparent)` }} />}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 'clamp(42px,11vw,70px)' }}>
                <span style={{
                  fontFamily: F.cormorant, fontWeight: 500,
                  fontSize: 'clamp(2.2rem,8vw,4rem)', color: D.cream, lineHeight: 1,
                  fontVariantNumeric: 'tabular-nums', fontFeatureSettings: '"tnum"',
                }}>
                  {v}
                </span>
                <span style={{ fontSize: 'clamp(7px,1.6vw,9px)', color: D.ember, letterSpacing: '0.22em', textTransform: 'uppercase', marginTop: 'clamp(6px,1.2vw,10px)', fontFamily: F.inter }}>
                  {l}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTAs — gold fill / border-fill grow on hover ── */}
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginTop: 'clamp(38px,5vw,52px)' }}>
          <Link href="/albums" className="hero-cta hero-cta--solid">{h.cta1}</Link>
          <Link href="/darshan" className="hero-cta hero-cta--ghost">{h.cta2}</Link>
        </div>

        {/* Mantra */}
        <p style={{
          marginTop: 'clamp(38px,5vw,52px)', fontFamily: F.cormorant,
          fontSize: 'clamp(1.05rem,2.6vw,1.4rem)', color: D.emberSoft,
          fontStyle: 'italic', letterSpacing: '0.12em',
        }}>
          {h.mantra}
        </p>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: 22, left: '50%', transform: 'translateX(-50%)', zIndex: 3 }}>
        <div style={{ width: 1, height: 38, background: `linear-gradient(to bottom, ${D.emberSoft}, transparent)`, animation: 'scrollPulse 2.4s ease-in-out infinite' }} />
      </div>

      {/* CTA styles — gold underline/fill grow, no library needed */}
      <style>{`
        .hero-cta {
          position: relative;
          display: inline-block;
          padding: 13px 34px;
          font-size: ${isGu ? '0.9rem' : '0.72rem'};
          font-weight: 600;
          letter-spacing: ${isGu ? '0' : '0.16em'};
          text-transform: ${isGu ? 'none' : 'uppercase'};
          font-family: ${isGu ? F.gujarati : F.inter};
          text-decoration: none;
          cursor: pointer;
          overflow: hidden;
          transition: color 320ms ease, border-color 320ms ease, transform 320ms ease;
        }
        .hero-cta--solid { background: ${D.ember}; color: ${D.duskDeep}; border: 1px solid ${D.ember}; }
        .hero-cta--solid::after {
          content: ''; position: absolute; inset: 0; background: ${D.cream};
          transform: scaleX(0); transform-origin: left; transition: transform 360ms cubic-bezier(0.22,0.61,0.36,1); z-index: -1;
        }
        .hero-cta--solid:hover { color: ${D.duskDeep}; transform: translateY(-1px); }
        .hero-cta--solid:hover::after { transform: scaleX(1); }

        .hero-cta--ghost { background: transparent; color: ${D.ember}; border: 1px solid ${D.emberSoft}; }
        .hero-cta--ghost::after {
          content: ''; position: absolute; left: 0; bottom: 0; height: 100%; width: 100%;
          background: ${D.emberFaint}; transform: scaleX(0); transform-origin: left;
          transition: transform 360ms cubic-bezier(0.22,0.61,0.36,1); z-index: -1;
        }
        .hero-cta--ghost:hover { color: ${D.cream}; border-color: ${D.ember}; transform: translateY(-1px); }
        .hero-cta--ghost:hover::after { transform: scaleX(1); }
      `}</style>
    </section>
  );
}
