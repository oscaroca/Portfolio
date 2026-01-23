import React, { useEffect, useMemo, useState } from 'react';
import { Lang } from '../context/translationContext/TranslationContext';
import { useTranslation } from '../hooks/useTranslation';

export const LanguageChanger: React.FC = ({}) => {
  const { language, setLanguage } = useTranslation();

  const initialLang: Lang = useMemo(() => {
    const saved = (typeof window !== 'undefined' &&
      localStorage.getItem('lang')) as Lang | null;
    if (saved === 'en' || saved === 'es') return saved;
    return language?.startsWith('es') ? 'es' : 'en';
  }, [language]);

  useEffect(() => {
    setLanguage(initialLang);
  }, []);

  return (
    <div className="language-pill">
      <span
        className={`pill-option ${language === 'es' ? 'active' : ''}`}
        onClick={() => setLanguage('es')}
      >
        ES
      </span>
      <span
        className={`pill-option ${language === 'en' ? 'active' : ''}`}
        onClick={() => setLanguage('en')}
      >
        EN
      </span>
      <div
        className="pill-slider"
        style={{
          transform: `translateX(${language === 'en' ? '100%' : '0%'})`,
        }}
      ></div>
    </div>
  );
};
