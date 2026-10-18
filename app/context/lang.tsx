'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Lang } from '@/app/lib/translations';

type LangContextType = {
  lang: Lang;
  toggleLang: () => void;
};

const LangContext = createContext<LangContextType>({ lang: 'en', toggleLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  return (
    <LangContext.Provider value={{ lang, toggleLang: () => setLang(l => l === 'en' ? 'gu' : 'en') }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
