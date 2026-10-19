'use client';

import Image from 'next/image';
import { useLang } from '@/app/context/lang';
import { T } from '@/app/lib/translations';
import { C, F } from '@/app/lib/theme';
import { SectionHeader } from '@/app/components/SectionHeader';
import { Divider } from '@/app/components/Divider';
import { EventSchedule } from '@/app/components/EventSchedule';

export default function AboutPage() {
  const { lang } = useLang();
  const isGu = lang === 'gu';
  const t = T[lang].about;

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
          <p style={{ fontSize: 13, color: C.tx2, lineHeight: 1.9, marginBottom: 24, fontFamily: isGu ? F.gujarati : F.inter }}>{t.d2}</p>

          {/* Temple entrance photograph */}
          <div className="card-lift" style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10', border: `1px solid ${C.bd}`, overflow: 'hidden', marginBottom: 32 }}>
            <Image
              src="/images/temple-entrance.jpg"
              alt="Entrance of Shree Nilkanth Mahadev Mandir, Bapupura"
              fill
              sizes="(max-width: 832px) 100vw, 800px"
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Second temple photograph */}
          <div className="card-lift" style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10', border: `1px solid ${C.bd}`, overflow: 'hidden', marginTop: 32 }}>
            <Image
              src="/images/temple-entrance-2.jpg"
              alt="Shree Nilkanth Mahadev Mandir temple grounds, Bapupura"
              fill
              sizes="(max-width: 832px) 100vw, 800px"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Event Schedule (Katha + Night Program) ── */}
      <EventSchedule />
    </div>
  );
}
