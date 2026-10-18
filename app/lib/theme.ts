export const C = {
  bg: '#FDF6EC',
  bg2: '#FFF9F3',
  white: '#FFFFFF',
  gold: '#B5780A',
  goldL: 'rgba(181,120,10,0.15)',
  goldLL: 'rgba(181,120,10,0.07)',
  sf: '#C85A0A',
  maroon: '#7A1515',
  maroonL: 'rgba(122,21,21,0.07)',
  tx: '#1A0F05',
  tx2: '#5C4A32',
  tx3: '#9A8268',
  bd: 'rgba(181,120,10,0.18)',
  bd2: 'rgba(181,120,10,0.1)',
} as const;

// ── Dusk palette — atmospheric, used on dark/cinematic surfaces (hero, etc.) ──
// Extends C; does NOT replace it. Light editorial body keeps using C.
export const D = {
  duskTop: '#16100C',          // near-black warm charcoal (sky apex)
  duskMid: '#3A1A16',          // deep maroon-brown (horizon glow)
  duskDeep: '#0B0807',         // deepest charcoal (ground)
  templeFill: '#080604',       // temple silhouette
  ash: '#9A8A76',              // warm ash-grey text
  ashDim: 'rgba(154,138,118,0.55)',
  ember: '#C8922A',            // brighter gold that reads on dark
  emberSoft: 'rgba(200,146,42,0.55)',
  emberFaint: 'rgba(200,146,42,0.14)',
  cream: '#F2E8D5',            // primary light text on dark
  creamDim: 'rgba(242,232,213,0.62)',
  creamFaint: 'rgba(242,232,213,0.32)',
} as const;

export const F = {
  cormorant: 'var(--font-cormorant), var(--font-gujarati), serif',
  gujarati: 'var(--font-gujarati), sans-serif',
  inter: 'var(--font-inter), var(--font-gujarati), sans-serif',
} as const;
