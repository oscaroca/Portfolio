import { useCallback, useContext } from 'react';
import { TranslationsContext } from '../context/translationContext/TranslationContext';

export function useTranslation() {
  const ctx = useContext(TranslationsContext);
  if (!ctx)
    throw new Error(
      'useTranslation must be used within TranslationsContextProvider',
    );

  const setLanguage = useCallback(
    (lng: string) => {
      if (lng !== ctx.lang && ctx.setLang) ctx.setLang(lng as any);
    },
    [ctx],
  );
  return { t: ctx.t, language: ctx.lang, setLanguage };
}
