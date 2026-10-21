import type { Lang } from '@/app/lib/translations';

// Mahotsav YouTube streams. New stream: add it with live: true (shows on Live Darshan).
// When it ends: set live: false — it moves to Previous Events. `start` is always IST.
export const STREAMS = [
  {
    id: '9R00WHI00H4',
    start: '2026-10-21T21:20:00+05:30',
    en: 'Bhavya Dayro — Ramesh Prajapati',
    gu: 'ભવ્ય ડાયરો — રમેશ પ્રજાપતિ',
    live: true,
  },
];

export type Stream = (typeof STREAMS)[number];

// Gujarati digits/months for gu; always shown in India time wherever the viewer is
export const fmtIST = (iso: string, lang: Lang, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(lang === 'gu' ? 'gu-IN-u-nu-gujr' : 'en-IN', { timeZone: 'Asia/Kolkata', ...opts }).format(new Date(iso));
