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
    live: false,
  },
  {
    id: 'bdEB9WZd_ew',
    start: '2026-10-22T09:00:00+05:30',
    en: 'Maha Rudra Yagna',
    gu: 'મહારુદ્ર યજ્ઞ',
    live: false,
  },
  {
    id: 'YPhV1oj-ngA',
    start: '2026-10-22T21:30:00+05:30',
    en: 'Hasya Darbar — Hiteshbhai Antala',
    gu: 'હાસ્ય દરબાર — હિતેશભાઈ અંટાળા',
    live: false,
  },
  {
    id: '5e-vaff1JT8',
    start: '2026-10-23T08:52:00+05:30',
    en: 'Shiv Mahapuran Katha — Session 1',
    gu: 'શિવ મહાપુરાણ કથા — સત્ર ૧',
    live: false,
  },
  {
    id: 'tJOVZugsZ4s',
    start: '2026-10-23T15:30:00+05:30',
    en: 'Shiv Mahapuran Katha — Session 2',
    gu: 'શિવ મહાપુરાણ કથા — સત્ર ૨',
    live: false,
  },
  {
    id: 'K-O5cMo05dE',
    start: '2026-10-23T08:48:00+05:30',
    en: 'Maha Rudra Yagna',
    gu: 'મહારુદ્ર યજ્ઞ',
    live: false,
  },
  {
    id: 'X5bedIKhLLM',
    start: '2026-10-23T10:00:00+05:30',
    en: 'Bhojanshala',
    gu: 'ભોજનશાળા',
    live: false,
  },
  {
    id: 'LlnfP46k6I0',
    start: '2026-10-23T21:15:00+05:30',
    en: 'Bhavya Lok Dayro — Mayabhai Ahir',
    gu: 'ભવ્ય લોકડાયરો — માયાભાઈ આહિર',
    live: false,
  },
  {
    id: 'Fg2xh31Q-ew',
    start: '2026-10-24T08:30:00+05:30',
    en: 'Shiv Mahapuran Katha — Session 1',
    gu: 'શિવ મહાપુરાણ કથા — સત્ર ૧',
    live: true,
  },
  {
    id: 'wKZs21HPI44',
    start: '2026-10-24T08:00:00+05:30',
    en: 'Maha Rudra Yagna',
    gu: 'મહારુદ્ર યજ્ઞ',
    live: true,
  },
  {
    id: '0_yJNgTOBWM',
    start: '2026-10-24T10:30:00+05:30',
    en: 'Bhojanshala',
    gu: 'ભોજનશાળા',
    live: true,
  },
];

export type Stream = (typeof STREAMS)[number];

// Gujarati digits/months for gu; always shown in India time wherever the viewer is
export const fmtIST = (iso: string, lang: Lang, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(lang === 'gu' ? 'gu-IN-u-nu-gujr' : 'en-IN', { timeZone: 'Asia/Kolkata', ...opts }).format(new Date(iso));
