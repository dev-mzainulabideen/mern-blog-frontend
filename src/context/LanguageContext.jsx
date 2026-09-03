import { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
    
    const dir = language === 'ur' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language, i18n]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'ur' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, toggleLanguage }}>
      {children}
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