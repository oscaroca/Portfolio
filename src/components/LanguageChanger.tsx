import React, { useEffect, useMemo, useState } from 'react';
import { FaGlobe } from 'react-icons/fa';
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

  return (
    <div
      className="language-select-container"
      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
    >
      {/* <FaGlobe size={20} /> */}
      <select
        className={`language-select`}
        value={lang}
        onChange={(e) => setLang(e.target.value as Lang)}
      >
        {(Object.keys(languages) as Lang[]).map((code) => (
          <option key={code} value={code}>
            {languages[code]}
          </option>
        ))}
      </select>
    </div>
  );
};
