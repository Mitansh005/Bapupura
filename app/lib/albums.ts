export const ALBUMS = [
  {
    id: 1,
    en: 'Shri Nilkanth Mahadev Maha Mahotsav',
    gu: 'શ્રી નીલકંઠ મહાદેવ મહા મહોત્સવ',
    dateEn: 'October 22–25, 2026',
    dateGu: '૨૨–૨૫ ઓક્ટોબર ૨૦૨૬',
    status: 'upcoming' as const,
    count: 0,
  },
  {
    id: 2,
    en: 'Uchhaamani Celebration',
    gu: 'ભવ્ય ઉછામણી',
    dateEn: 'May 30, 2026',
    dateGu: '૩૦ મે, ૨૦૨૬',
    status: 'recent' as const,
    count: 24,
  },
  {
    id: 3,
    en: 'Committee Meeting & Planning',
    gu: 'કમિટી મિટિંગ',
    dateEn: 'June 2026',
    dateGu: 'જૂન ૨૦૨૬',
    status: 'recent' as const,
    count: 12,
  },
];

export type Album = (typeof ALBUMS)[number];
