import { C, F } from '@/app/lib/theme';

interface Props {
  eye: string;
  title: string;
  sub?: string;
  isGu: boolean;
  center?: boolean;
}

export function SectionHeader({ eye, title, sub, isGu, center = true }: Props) {
  return (
    <div style={{ textAlign: center ? 'center' : 'left', marginBottom: 28 }}>
      <p style={{ fontSize: 9, letterSpacing: 4, textTransform: 'uppercase', color: C.sf, fontFamily: F.inter, marginBottom: 8, fontWeight: 600 }}>
        {eye}
      </p>
      <h2 style={{
        fontFamily: isGu ? F.gujarati : F.cormorant,
        fontSize: isGu ? 'clamp(1.5rem,4vw,2.2rem)' : 'clamp(1.8rem,4vw,2.6rem)',
        fontWeight: isGu ? 700 : 600,
        color: C.maroon,
        marginBottom: sub ? 6 : 0,
        lineHeight: 1.15,
      }}>
        {title}
      </h2>
      {sub && <p style={{ fontSize: 12, color: C.tx2, lineHeight: 1.7 }}>{sub}</p>}
    </div>
  );
}
