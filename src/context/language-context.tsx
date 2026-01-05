"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import es from '@/lib/translations/es.json';
import en from '@/lib/translations/en.json';

type Language = 'es' | 'en';

type Translations = typeof es;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translationsMap = {
  es,
  en,
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');

  const value = useMemo(() => ({
    language,
    setLanguage,
    translations: translationsMap[language],
  }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
