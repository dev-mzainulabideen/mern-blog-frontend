import { useLanguage } from '../../context/LanguageContext';
import './LanguageToggle.css';

function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button 
      className="language-toggle-btn" 
      onClick={toggleLanguage}
      aria-label={`Switch to ${language === 'en' ? 'Urdu' : 'English'}`}
      title={`Switch to ${language === 'en' ? 'Urdu' : 'English'}`}
    >
      {language === 'en' ? 'UR' : 'EN'}
    </button>
  );
}

export default LanguageToggle;