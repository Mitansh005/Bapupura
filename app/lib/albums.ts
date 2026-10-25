export const ALBUMS = [
  {
    id: '812878f4-960d-4b91-81e3-e2035af78908', // must match events.id in Supabase (see supabase/migrations/20261015_mahotsav_event.sql)
    en: 'Shree Nilkanth Mahadev Maha Mahotsav 2026',
    gu: 'શ્રી નિલકંઠ મહાદેવ મહા મહોત્સવ ૨૦૨૬',
    dateEn: '22–25 October 2026',
    dateGu: '૨૨–૨૫ ઓક્ટોબર ૨૦૨૬',
    status: 'recent' as 'upcoming' | 'recent' | 'past',
  },
];

export type Album = (typeof ALBUMS)[number];
