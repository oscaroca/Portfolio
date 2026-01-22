import { createContext, useCallback, useContext, useState } from 'react';
import en from './translations/en.json';
import es from './translations/es.json';

export const translations: Translations = {
  en,
  es,
};

export type Lang = 'en' | 'es';

type NestedTranslations = {
  [key: string]: string | NestedTranslations;
};

type Translations = Record<Lang, NestedTranslations>;

interface TranslationsContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

export const TranslationsContext = createContext<
  TranslationsContextValue | undefined
>(undefined);

interface TranslationsContextProviderProps {
  initialLang?: Lang;
  children: React.ReactNode;
}

export const TranslationsContextProvider = ({
  initialLang = 'en',
  children,
}: TranslationsContextProviderProps) => {
  const [lang, setLang] = useState<Lang>(initialLang);

  const t = useCallback(
    (key: string) => {
      const parts = key.split('.');
      let cur: any = translations[lang];
      for (const p of parts) {
        if (cur && typeof cur === 'object' && p in cur) {
          cur = cur[p];
        } else {
          return key; // fallback to key when missing
        }
      }
      return typeof cur === 'string' ? cur : key;
    },
    [lang],
  );

  return (
    <TranslationsContext.Provider value={{ lang, setLang, t }}>
      {children}
    </TranslationsContext.Provider>
  );
};

export function useTranslationContext() {
  const ctx = useContext(TranslationsContext);
  if (!ctx)
    throw new Error(
      'useTranslationContext must be used within TranslationsContextProvider',
    );
  return ctx;
}
