'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLang } from '@/app/context/lang';
import { T } from '@/app/lib/translations';
import { ALBUMS } from '@/app/lib/albums';
import { supabase } from '@/app/lib/supabase';
import { C, F } from '@/app/lib/theme';
import { SectionHeader } from '@/app/components/SectionHeader';

type Photo = { id: string; event_id: string; image_url: string; caption: string | null; uploaded_by: string | null };

export default function AlbumsPage() {
  const { lang } = useLang();
  const isGu = lang === 'gu';
  const t = T[lang].albums;

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [open, setOpen] = useState<Photo | null>(null);

  useEffect(() => {
    // RLS only returns approved rows to visitors; the filter keeps intent explicit
    supabase.from('photos')
      .select('id, event_id, image_url, caption, uploaded_by')
      .eq('approved', true)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) console.error(error);
        setPhotos(data ?? []);
      });
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const photosOf = (id: string) => photos.filter(p => p.event_id === id);

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
              const count = photosOf(a.id).length;
              const clickable = count > 0;
              return (
                <div
                  key={a.id}
                  className={clickable ? 'card-lift' : undefined}
                  onClick={() => clickable && document.getElementById(`album-${a.id}`)?.scrollIntoView({ behavior: 'smooth' })}
                  style={{ background: C.white, border: `1px solid ${C.bd}`, cursor: clickable ? 'pointer' : 'default' }}
                >
                  {/* Cover: latest photo, else placeholder */}
                  <div style={{ position: 'relative', height: 120, background: `linear-gradient(135deg, ${C.maroon}22, ${C.maroon}11)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {clickable
                      ? <Image src={photosOf(a.id)[0].image_url} alt="" fill sizes="(max-width: 700px) 100vw, 330px" style={{ objectFit: 'cover' }} />
                      : <span style={{ fontSize: '2.5rem', opacity: 0.2, fontFamily: 'serif', color: C.maroon }}>ॐ</span>}
                  </div>

                  <div style={{ padding: '16px 18px 20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontSize: 7, letterSpacing: 2, textTransform: 'uppercase', padding: '2px 8px', background: sc.bg, border: `1px solid ${sc.bd}`, color: sc.tx, fontFamily: F.inter }}>
                        {t[a.status]}
                      </span>
                      <span style={{ fontSize: 9, color: C.tx3, fontFamily: F.inter }}>{t.photos(count)}</span>
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

          {/* Photo grids, one per album that has approved photos */}
          {ALBUMS.map(a => {
            const list = photosOf(a.id);
            if (list.length === 0) return null;
            return (
              <div key={a.id} id={`album-${a.id}`} style={{ marginTop: 40, scrollMarginTop: 80 }}>
                <h3 style={{ fontFamily: isGu ? F.gujarati : F.cormorant, fontSize: 20, color: C.maroon, marginBottom: 14 }}>
                  {isGu ? a.gu : a.en}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(45%, 200px), 1fr))', gap: 8 }}>
                  {list.map(p => (
                    <button
                      key={p.id}
                      onClick={() => setOpen(p)}
                      aria-label={p.caption ?? (isGu ? 'ફોટો જુઓ' : 'View photo')}
                      className="card-lift"
                      style={{ position: 'relative', aspectRatio: '1', border: `1px solid ${C.bd}`, padding: 0, background: C.bg2, cursor: 'zoom-in', overflow: 'hidden' }}
                    >
                      <Image src={p.image_url} alt={p.caption ?? ''} fill sizes="(max-width: 600px) 50vw, 250px" style={{ objectFit: 'cover' }} />
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

          <p style={{ textAlign: 'center', marginTop: 28, fontSize: 9, color: 'rgba(154,130,104,0.5)', letterSpacing: 2, fontFamily: F.inter }}>
            {t.adminNote}
          </p>
        </div>
      </section>

      {/* Full-screen viewer — tap anywhere or Esc to close */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(11,8,7,0.94)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 16, cursor: 'zoom-out' }}
        >
          <div style={{ position: 'relative', width: '100%', height: '80svh' }}>
            <Image src={open.image_url} alt={open.caption ?? ''} fill sizes="100vw" style={{ objectFit: 'contain' }} />
          </div>
          {(open.caption || open.uploaded_by) && (
            <p style={{ marginTop: 12, color: '#F2E8D5', fontSize: 13, textAlign: 'center', fontFamily: F.inter, maxWidth: 600 }}>
              {open.caption}{open.caption && open.uploaded_by ? ' — ' : ''}{open.uploaded_by}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
