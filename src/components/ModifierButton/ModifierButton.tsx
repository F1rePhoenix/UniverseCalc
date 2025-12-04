// src/components/ModifierButton/ModifierButton.tsx
import React from 'react';
import type { ModifierKey } from '../../types/units';
import { getRangePenaltyTooltip } from '../../utils/modifiers';
import styles from './ModifierButton.module.css';

interface ModifierButtonProps {
  modifierId: ModifierKey;
  isActive: boolean;
  onClick: () => void;
  language: 'ru' | 'en';
  className?: string;
  disabled?: boolean;
}

const ModifierButton: React.FC<ModifierButtonProps> = ({
  modifierId,
  isActive,
  onClick,
  language,
  className = '',
  disabled = false
}) => {
  // Получение tooltip текста для модификатора
  const getTooltipText = (): string => {
    if (modifierId === 'range-penalty') {
      return getRangePenaltyTooltip(isActive, language);
    }

    const tooltips: Record<ModifierKey, { ru: string; en: string }> = {
      // Нападение
      'basic-offense': { ru: 'Основы нападения', en: 'Basic Offense' },
      'advanced-offense': { ru: 'Развитое нападение', en: 'Advanced Offense' },
      'expert-offense': { ru: 'Искусное нападение', en: 'Expert Offense' },
      
      // Защита
      'basic-defense': { ru: 'Основы защиты', en: 'Basic Defense' },
      'advanced-defense': { ru: 'Развитая защита', en: 'Advanced Defense' },
      'expert-defense': { ru: 'Искусная защита', en: 'Expert Defense' },
      
      // Боевые навыки
      'frenzy': { ru: 'Боевое безумие', en: 'Frenzy' },
      'shooting': { ru: 'Стрельба', en: 'Shooting' },
      'retribution': { ru: 'Воздаяние', en: 'Retribution' },
      'vitality': { ru: 'Стойкость', en: 'Vitality' },
      'evasion': { ru: 'Уклонение', en: 'Evasion' },
      'defense': { ru: 'Оборона', en: 'Defense' },
      'hold-ground': { ru: 'Глухая оборона', en: 'Hold Ground' },
      'forest-rage': { ru: 'Лесная ярость', en: 'Forest Rage' },
      'fog-veil': { ru: 'Туманная завеса', en: 'Fog Veil' },
      'range-penalty': { ru: 'Стрельба без штрафа', en: 'Ranged without penalty' },
      'home-road': { ru: 'Родные земли', en: 'Home Road' },
      
      // Артефакты
      'bloody-claw': { ru: 'Ожерелье кровавого когтя', en: 'Bloody Claw Necklace' },
      'ring-of-life1': { ru: 'Кольцо жизни', en: 'Ring of Life' },
      'ring-of-life2': { ru: 'Кольцо жизни', en: 'Ring of Life' },
      'big-shield': { ru: 'Большой щит', en: 'Big Shield' },
      
      // Уникальные способности (тексты будут браться из getAbilityTooltip)
      'forest-rage-ent': { ru: 'Ярость леса', en: 'Forest Rage' },
      'blow-heaven': { ru: 'Удар с небес', en: 'Heaven Strike' },
      'curved-fire': { ru: 'Стрельба навесом', en: 'Curved Fire' },
      'defensive-position': { ru: 'Оборонительная позиция', en: 'Defensive Position' }
    };

    return tooltips[modifierId]?.[language] || modifierId;
  };

  const tooltipText = getTooltipText();

  return (
    <button
      className={`
        ${styles.modifier}
        ${styles[modifierId]}
        ${isActive ? styles.active : ''}
        ${disabled ? styles.disabled : ''}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
      data-tooltip={tooltipText}
      aria-label={tooltipText}
      type="button"
    />
  );
};

export default ModifierButton;