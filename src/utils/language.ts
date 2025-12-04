export type Language = 'ru' | 'en';

const STORAGE_KEY = 'h5lobby_language';

export const getLanguage = (): Language => {
  const savedLanguage = localStorage.getItem(STORAGE_KEY) as Language;
  if (savedLanguage === 'ru' || savedLanguage === 'en') {
    return savedLanguage;
  }

  const browserLanguage = navigator.language.toLowerCase();
  const baseLanguage = browserLanguage.split('-')[0];
  
  const russianBaseLanguages = ['ru', 'uk', 'be', 'kk'];
  
  const detectedLanguage = russianBaseLanguages.includes(baseLanguage) ? 'ru' : 'en';

  localStorage.setItem(STORAGE_KEY, detectedLanguage);

  return detectedLanguage;
};

export const setLanguage = (lang: Language): void => {
  localStorage.setItem(STORAGE_KEY, lang);
  window.dispatchEvent(new StorageEvent('storage', {
    key: STORAGE_KEY,
    newValue: lang
  }));
};