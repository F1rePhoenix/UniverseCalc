import React, { useState } from 'react';
import { useLanguageContext } from '../../contexts/LanguageContext';
import styles from './Header.module.css';
import logo from '../../assets/images/Logo.png';

interface NavItem {
  id: string;
  label: {
    ru: string;
    en: string;
  };
  href: string;
  external?: boolean;
}

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, changeLanguage } = useLanguageContext();

  const navItems: NavItem[] = [
    { 
      id: 'features', 
      label: { ru: 'Подробнее о лобби', en: 'About Lobby' },
      href: '#features'
    },
    { 
      id: 'skills', 
      label: { ru: 'Колесо умений', en: 'Skills Wheel' },
      href: '/skillwheel/',
      external: true
    },
    { 
      id: 'calculator', 
      label: { ru: 'Калькулятор', en: 'Calculator' },
      href: '/calc/',
      external: true
    },
    { 
      id: 'templates', 
      label: { ru: 'Генератор шаблонов', en: 'Template Generator' },
      href: '/generator/',
      external: true
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (item: NavItem) => {
    setIsMobileMenuOpen(false);
    
    if (!item.external) {
      const element = document.getElementById(item.href.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLanguageToggle = () => {
    const newLanguage = language === 'ru' ? 'en' : 'ru';
    changeLanguage(newLanguage);
  };

  return (
    <header className={styles.header}>
      {/* Логотип */}
      <div className={styles.logo}>
        <a href="#top" className={styles.logoLink}>
          <img 
            src={logo}
            alt="H5Lobby" 
            className={styles.logoImage}
          />
        </a>
      </div>
      
      {/* Навигация для десктопа */}
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {navItems.map((item) => (
            <li key={item.id} className={styles.navItem}>
              <a 
                href={item.href}
                className={styles.navLink}
                onClick={(e) => {
                  if (!item.external) {
                    e.preventDefault();
                    handleNavClick(item);
                  }
                }}
                {...(item.external ? { 
                  target: '_blank', 
                  rel: 'noopener noreferrer' 
                } : {})}
              >
                {item.label[language]}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Правая часть с контролами */}
      <div className={styles.controls}>
        {/* Тогл-переключатель языка */}
        <div 
          className={styles.languageSelector} 
          onClick={handleLanguageToggle}
          title={language === 'ru' ? 'Switch to English' : 'Переключить на русский'}
        >
          <span>{language === 'ru' ? 'RU' : 'EN'}</span>
        </div>

        {/* Бургер-меню для мобильных */}
        <button 
          className={styles.burgerMenu}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
        </button>
      </div>

      {/* Мобильное меню */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <nav className={styles.mobileNav}>
          <ul className={styles.mobileNavList}>
            {navItems.map((item) => (
              <li key={item.id} className={styles.mobileNavItem}>
                <a 
                  href={item.href}
                  className={styles.mobileNavLink}
                  onClick={(e) => {
                    if (!item.external) {
                      e.preventDefault();
                    }
                    handleNavClick(item);
                  }}
                  {...(item.external ? { 
                    target: '_blank', 
                    rel: 'noopener noreferrer' 
                  } : {})}
                >
                  {item.label[language]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;