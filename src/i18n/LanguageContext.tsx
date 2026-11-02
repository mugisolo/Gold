import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage } from '../types';
import { translations, TranslationDictionary } from './translations';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationDictionary;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem('uge_language') as SupportedLanguage;
    return saved && translations[saved] ? saved : 'en';
  });

  const isRtl = language === 'ar';

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    localStorage.setItem('uge_language', lang);
  };

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRtl]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
        isRtl,
      }}
    >
      <div dir={isRtl ? 'rtl' : 'ltr'} className={isRtl ? 'font-sans text-right' : 'font-sans'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
