import React, { useEffect, useMemo, useState } from 'react';
import { Lang } from '../context/translationContext/TranslationContext';
import { useTranslation } from '../hooks/useTranslation';

type LanguageChangerProps = {
  className?: string;
};

const languages: Record<Lang, string> = {
  es: 'ES',
  en: 'EN',
};

export const LanguageChanger: React.FC<LanguageChangerProps> = ({
  className,
}) => {
  const { language, setLanguage } = useTranslation();

  const initialLang: Lang = useMemo(() => {
    const saved = (typeof window !== 'undefined' &&
      localStorage.getItem('lang')) as Lang | null;
    if (saved === 'en' || saved === 'es') return saved;
    return language?.startsWith('es') ? 'es' : 'en';
  }, [language]);

  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    if (language !== lang) setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', lang);
    }
  }, [lang, language]);

  const handleToggle = () => {
    setLang(lang === 'en' ? 'es' : 'en');
  };

  return (
    <div className="language-pill">
      <span
        className={`pill-option ${lang === 'es' ? 'active' : ''}`}
        onClick={() => setLang('es')}
      >
        ES
      </span>
      <span
        className={`pill-option ${lang === 'en' ? 'active' : ''}`}
        onClick={() => setLang('en')}
      >
        EN
      </span>
      <div
        className="pill-slider"
        style={{ transform: `translateX(${lang === 'en' ? '100%' : '0%'})` }}
      ></div>
    </div>
  );
};
