// HeroSection.tsx
import React from 'react';
import { type HeroState } from '../../types/units';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  heroState: HeroState;
  onHeroChange: (updates: Partial<HeroState>) => void;
  language: 'ru' | 'en';
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  heroState, 
  onHeroChange, 
  language 
}) => {
  const handleInputChange = (field: keyof HeroState, value: string) => {
    const numValue = value === '' ? 0 : Math.max(0, parseInt(value) || 0);
    onHeroChange({ [field]: numValue });
  };

  return (
    <div className={styles.heroSection}>
      <h2>{language === 'ru' ? 'Герой' : 'Hero'}</h2>
      
      <div className={styles.heroInputRow}>
        <div className={styles.heroLabel}>{language === 'ru' ? 'Нап' : 'Att'}</div>
        <div className={styles.heroLabel}>{language === 'ru' ? 'Защ' : 'Def'}</div>
        <div className={styles.heroLabel}>БД</div>
      </div>
      
      <div className={styles.heroInputContainer}>
        <input
          type="number"
          value={heroState.attack || ''}
          onChange={(e) => handleInputChange('attack', e.target.value)}
          placeholder={language === 'ru' ? 'Нап' : 'Att'}
          min="0"
          className={styles.heroInput}
        />
        <input
          type="number"
          value={heroState.defense || ''}
          onChange={(e) => handleInputChange('defense', e.target.value)}
          placeholder={language === 'ru' ? 'Защ' : 'Def'}
          min="0"
          className={styles.heroInput}
        />
        <input
          type="number"
          value={heroState.FS || ''}
          onChange={(e) => handleInputChange('FS', e.target.value)}
          placeholder="БД"
          min="0"
          className={styles.heroInput}
        />
      </div>
    </div>
  );
};

export default HeroSection;