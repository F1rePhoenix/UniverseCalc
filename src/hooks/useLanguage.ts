import { useState, useEffect } from 'react';
import { getLanguage, setLanguage } from '../utils/language';

export type Language = 'ru' | 'en';

export const useLanguage = () => {
  const [language, setLanguageState] = useState<Language>(getLanguage);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'h5lobby_language' && e.newValue) {
        setLanguageState(e.newValue as Language);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setLanguageState(newLanguage);
  };

  return { language, changeLanguage };
};