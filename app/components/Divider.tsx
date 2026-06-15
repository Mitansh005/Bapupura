import { C } from '@/app/lib/theme';

export function Divider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '2px 28px', background: C.bg }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${C.bd}, transparent)` }} />
      <span style={{ color: C.gold, opacity: 0.5, fontSize: 13 }}>✦</span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${C.bd}, transparent)` }} />
    </div>
  );
}
