'use client';

import { useState, type CSSProperties } from 'react';
import { useLang } from '@/app/context/lang';
import { T } from '@/app/lib/translations';

export function ShareButton({ className, style }: { className?: string; style?: CSSProperties }) {
  const { lang } = useLang();
  const t = T[lang].share;
  const [copied, setCopied] = useState(false);

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ text: t.message });
        return;
      } catch (e) {
        if ((e as Error).name === 'AbortError') return; // user closed the share sheet
      }
    }
    const wa = window.open(`https://wa.me/?text=${encodeURIComponent(t.message)}`, '_blank');
    if (wa) { wa.opener = null; return; }
    // Popup blocked — last resort
    try {
      await navigator.clipboard.writeText(t.message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* nothing left to try */ }
  };

  return (
    <button type="button" onClick={share} className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, ...style }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
        <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
      </svg>
      <span aria-live="polite">{copied ? t.copied : t.label}</span>
    </button>
  );
}
