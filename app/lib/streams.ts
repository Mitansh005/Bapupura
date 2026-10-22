import type { Lang } from '@/app/lib/translations';

// Mahotsav YouTube streams. New stream: add it with live: true (shows on Live Darshan).
// When it ends: set live: false — it moves to Previous Events. `start` is always IST.
// Live Darshan shows live streams in this list's order (Past Events sorts by date itself).
export const STREAMS = [
  {
    id: 'uceZdpF0Kcs',
    start: '2026-10-21T00:00:00+05:30', // time unknown — sorts first in the day, time hidden
    en: 'Deh Shuddhikaran',
    gu: 'દેહ શુદ્ધિકરણ',
    live: false,
    noTime: true,
  },
  {
    id: '9R00WHI00H4',
    start: '2026-10-21T21:20:00+05:30',
    en: 'Bhavya Dayro — Ramesh Prajapati',
    gu: 'ભવ્ય ડાયરો — રમેશ પ્રજાપતિ',
    live: false,
  },
  {
    id: 'g7tk25nhFbk',
    start: '2026-10-22T08:48:00+05:30',
    en: 'Pothi Yatra — Trusha Rami',
    gu: 'પોથીયાત્રા — તૃષા રામી',
    live: false,
  },
  {
    id: 'kODOq978N-E',
    start: '2026-10-22T10:00:00+05:30',
    en: 'Shiv Mahapuran Katha — Session 1',
    gu: 'શિવ મહાપુરાણ કથા — સત્ર ૧',
    live: false,
  },
  {
    id: 't7lR7J9CaVU',
    start: '2026-10-22T14:48:00+05:30',
    en: 'Shiv Mahapuran Katha — Session 2',
    gu: 'શિવ મહાપુરાણ કથા — સત્ર ૨',
    live: true,
  },
  {
    id: 'bdEB9WZd_ew',
    start: '2026-10-22T09:00:00+05:30',
    en: 'Maha Rudra Yagna',
    gu: 'મહારુદ્ર યજ્ઞ',
    live: true,
  },
];

export type Stream = (typeof STREAMS)[number];

// Gujarati digits/months for gu; always shown in India time wherever the viewer is
export const fmtIST = (iso: string, lang: Lang, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(lang === 'gu' ? 'gu-IN-u-nu-gujr' : 'en-IN', { timeZone: 'Asia/Kolkata', ...opts }).format(new Date(iso));
