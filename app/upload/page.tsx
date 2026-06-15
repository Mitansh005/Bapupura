'use client';

import { useState, useRef, type FormEvent } from 'react';
import { useLang } from '@/app/context/lang';
import { T } from '@/app/lib/translations';
import { ALBUMS } from '@/app/lib/albums';
import { supabase } from '@/app/lib/supabase';
import { C, F } from '@/app/lib/theme';
import { SectionHeader } from '@/app/components/SectionHeader';

const inp = {
  width: '100%', padding: '10px 14px', background: '#fff',
  border: `1px solid ${C.bd}`, color: C.tx, fontSize: '0.875rem',
  outline: 'none', boxSizing: 'border-box' as const,
  fontFamily: F.inter, transition: 'border-color 200ms',
};
const lbl = {
  display: 'block', fontSize: 9, letterSpacing: '0.2em',
  textTransform: 'uppercase' as const, color: C.tx3,
  fontFamily: F.inter, marginBottom: 6,
};
const onFocus = (e: React.FocusEvent<HTMLElement>) => { e.target.style.borderColor = C.maroon; };
const onBlur  = (e: React.FocusEvent<HTMLElement>) => { e.target.style.borderColor = C.bd; };

export default function UploadPage() {
  const { lang } = useLang();
  const isGu = lang === 'gu';
  const t = T[lang].upload;
  const guStyle = isGu ? { fontFamily: F.gujarati, fontSize: '0.9rem' } : {};

  const [name,       setName]       = useState('');
  const [phone,      setPhone]      = useState('');
  const [album,      setAlbum]      = useState('');
  const [caption,    setCaption]    = useState('');
  const [files,      setFiles]      = useState<File[]>([]);
  const [drag,       setDrag]       = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [error,      setError]      = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const valid = Array.from(incoming).filter(f => f.size <= 10 * 1024 * 1024);
    setFiles(prev => [...prev, ...valid]);
  };

  const reset = () => { setName(''); setPhone(''); setAlbum(''); setCaption(''); setFiles([]); setSubmitted(false); setError(null); };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || files.length === 0) return;
    setSubmitting(true);
    setError(null);

    try {
      const eventId = Number(album) || 1;
      for (const file of files) {
        const ext = file.name.split('.').pop() ?? 'jpg';
        const path = `${eventId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

        const { error: uploadErr } = await supabase.storage.from('photos').upload(path, file);
        if (uploadErr) throw uploadErr;

        const { data: { publicUrl } } = supabase.storage.from('photos').getPublicUrl(path);

        const { error: dbErr } = await supabase.from('photos').insert({
          event_id: eventId,
          image_url: publicUrl,
          uploaded_by: name.trim(),
          approved: false,
        });
        if (dbErr) throw dbErr;
      }
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError('Upload failed. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ paddingTop: 64, background: C.bg, minHeight: '100svh' }}>
      <section style={{ padding: '48px 28px' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <SectionHeader eye={t.eye} title={t.title} sub={t.sub} isGu={isGu} />

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '52px 32px', background: C.white, border: `1px solid ${C.bd}` }}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="22" stroke={C.maroon} strokeWidth="1.4" opacity="0.4" />
                <path d="M14 24l7 7 13-14" stroke={C.maroon} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3 style={{ fontFamily: F.cormorant, fontSize: 'clamp(1.3rem,4vw,1.8rem)', color: C.maroon, margin: '16px 0 10px' }}>
                {t.successTitle}
              </h3>
              <p style={{ fontSize: '0.875rem', color: C.tx2, lineHeight: 1.7, maxWidth: 380, margin: '0 auto 24px', fontFamily: isGu ? F.gujarati : F.inter }}>
                {t.successMsg}
              </p>
              <button onClick={reset} style={{ padding: '10px 24px', background: C.maroonL, border: `1px solid rgba(122,21,21,0.2)`, color: C.maroon, cursor: 'pointer', fontSize: 11, fontFamily: F.inter, letterSpacing: 2, textTransform: 'uppercase' }}>
                {t.again}
              </button>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Name */}
              <div>
                <label style={lbl}>{t.nameL}</label>
                <input required value={name} onChange={e => setName(e.target.value)} placeholder={t.nameP} style={{ ...inp, ...guStyle }} onFocus={onFocus} onBlur={onBlur} />
              </div>

              {/* Phone */}
              <div>
                <label style={lbl}>{t.phoneL}</label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder={t.phoneP} style={{ ...inp, ...guStyle }} onFocus={onFocus} onBlur={onBlur} />
              </div>

              {/* Album select */}
              <div>
                <label style={lbl}>{t.albumL}</label>
                <select value={album} onChange={e => setAlbum(e.target.value)} style={{ ...inp, ...guStyle, appearance: 'none', cursor: 'pointer' }} onFocus={onFocus} onBlur={onBlur}>
                  <option value="" disabled>{t.albumP}</option>
                  {ALBUMS.map(a => (
                    <option key={a.id} value={a.id}>{isGu ? a.gu : a.en}</option>
                  ))}
                </select>
              </div>

              {/* Caption */}
              <div>
                <label style={lbl}>{t.captionL}</label>
                <textarea value={caption} onChange={e => setCaption(e.target.value)} placeholder={t.captionP} rows={3} style={{ ...inp, ...guStyle, resize: 'vertical', minHeight: 76 }} onFocus={onFocus} onBlur={onBlur} />
              </div>

              {/* File drop zone */}
              <div>
                <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" multiple style={{ display: 'none' }} onChange={e => addFiles(e.target.files)} />
                <div
                  onClick={() => fileRef.current?.click()}
                  onDragOver={e => { e.preventDefault(); setDrag(true); }}
                  onDragLeave={() => setDrag(false)}
                  onDrop={e => { e.preventDefault(); setDrag(false); addFiles(e.dataTransfer.files); }}
                  style={{ padding: '32px 20px', border: `1px dashed ${drag || files.length > 0 ? C.maroon : C.bd}`, background: drag ? C.maroonL : C.white, cursor: 'pointer', textAlign: 'center', transition: 'all 200ms' }}
                >
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ display: 'block', margin: '0 auto 8px' }}>
                    <path d="M14 4v16M14 4l-5 5M14 4l5 5" stroke={C.maroon} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity=".65" />
                    <path d="M4 22v1.5A1.5 1.5 0 005.5 25h17a1.5 1.5 0 001.5-1.5V22" stroke={C.maroon} strokeWidth="1.2" strokeLinecap="round" opacity=".4" />
                  </svg>
                  {files.length > 0
                    ? <p style={{ fontSize: 13, color: C.maroon, fontFamily: F.inter }}>{t.files(files.length)}</p>
                    : <>
                        <p style={{ fontSize: 13, color: C.tx2, fontFamily: isGu ? F.gujarati : F.inter }}>{t.drop}</p>
                        <p style={{ fontSize: 9, color: C.tx3, marginTop: 4, fontFamily: F.inter }}>{t.dropSub}</p>
                      </>
                  }
                </div>
              </div>

              {error && (
                <p style={{ fontSize: 12, color: '#D42B2B', fontFamily: F.inter }}>{error}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting || !name.trim() || files.length === 0}
                style={{
                  padding: '13px 32px',
                  background: submitting || !name.trim() || files.length === 0 ? 'rgba(122,21,21,0.3)' : C.maroon,
                  border: 'none', color: '#fff', fontSize: 11, fontWeight: 600,
                  letterSpacing: 2, textTransform: 'uppercase', fontFamily: F.inter,
                  cursor: submitting || !name.trim() || files.length === 0 ? 'not-allowed' : 'pointer',
                  transition: 'background 200ms',
                }}
              >
                {submitting ? t.submitting : t.submit}
              </button>

              <p style={{ textAlign: 'center', fontSize: 10, color: 'rgba(181,120,10,0.45)', fontFamily: F.cormorant, fontStyle: 'italic' }}>
                {t.notice}
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
