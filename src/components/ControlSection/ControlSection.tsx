// src/components/ControlSection/ControlSection.tsx
import React, { useState, useCallback } from 'react';
import styles from './ControlSection.module.css';
import swordButtonFlipped from '../../assets/images/sword_flipped.png';
import swordButton from '../../assets/images/sword.png';
import arrowButton from '../../assets/images/arrow_button.png';
import arrowButtonFlipped from '../../assets/images/arrow_button_flipped.png';
import switchSidesButton from '../../assets/images/change2.png';
import placeholderImage from '../../assets/images/Units/placeholder.png';

interface ControlSectionProps {
  isSwitchingSides: boolean;
  isRangedAttack: boolean;
  yourUnitImage: string;
  neutralUnitImage: string;
  calculationResult: { damage: string; killed: string };
  onSwitchSides: () => void;
  onSwitchWeapon: () => void;
  onCalculate: () => void;
  language: 'ru' | 'en';
  isWeaponSwitchDisabled: boolean;
}

const ControlSection: React.FC<ControlSectionProps> = ({
  isSwitchingSides,
  isRangedAttack,
  yourUnitImage,
  neutralUnitImage,
  calculationResult = { damage: '-', killed: '-' },
  onSwitchSides,
  onSwitchWeapon,
  onCalculate,
  language,
  isWeaponSwitchDisabled,
}) => {
  const [calculateSpin, setCalculateSpin] = useState(false);
  const [switchWeaponSpin, setSwitchWeaponSpin] = useState(false);
  const [switchSidesSpin, setSwitchSidesSpin] = useState(false);
  
  // Функция для получения изображения кнопки расчета
  const getCalculateImage = useCallback(() => {
    if (isSwitchingSides) {
      // Нейтральный юнит атакует
      return isRangedAttack 
        ? arrowButtonFlipped
        : swordButtonFlipped;
    } else {
      // Ваш юнит атакует
      return isRangedAttack 
        ? arrowButton
        : swordButton;
    }
  }, [isSwitchingSides, isRangedAttack]);

  // Функция для получения изображения кнопки смены оружия
  const getSwitchWeaponImage = useCallback(() => {
    if (isSwitchingSides) {
      // Нейтральный юнит атакует
      return isRangedAttack 
        ? swordButtonFlipped
        : arrowButtonFlipped;
    } else {
      // Ваш юнит атакует
      return isRangedAttack 
        ? swordButton
        : arrowButton;
    }
  }, [isSwitchingSides, isRangedAttack]);

  // Обработчик нажатия на кнопку расчета
  const handleCalculateClick = () => {
    onCalculate();;
  };

  // Обработчик нажатия на кнопку смены оружия
  const handleSwitchWeaponClick = () => {
    if (!isWeaponSwitchDisabled) {
      onSwitchWeapon();
    }
  };

  // Обработчик нажатия на кнопку смены стороны
  const handleSwitchSidesClick = () => {
    setSwitchWeaponSpin(true);
    setSwitchSidesSpin(true);
    setCalculateSpin(true);
    onSwitchSides();
    setTimeout(() => {
      setSwitchSidesSpin(false);
      setSwitchWeaponSpin(false);
      setCalculateSpin(false);
    }, 300);
  };

  return (
    <div className={styles.controlSection}>
      {/* Кнопка смены стороны */}
      <button
        className={`${styles.switchSides} ${switchSidesSpin ? styles.spinEffect : ''} ${
          isSwitchingSides ? styles.active : ''
        }`}
        onClick={handleSwitchSidesClick}
        data-tooltip={language === 'ru' ? 'Смена стороны' : 'Switch sides'}
        style={{
          backgroundImage: `url(${switchSidesButton})`
        }}
      />

      {/* Ряд с изображениями юнитов и кнопками */}
      <div className={styles.imageRow}>
        {/* Ваше существо */}
        <div className={`${styles.imagePlaceholder} ${
          !isSwitchingSides ? styles.glowingBorder : ''
        }`}>
          <img 
            src={yourUnitImage || placeholderImage} 
            alt={language === 'ru' ? 'Ваше существо' : 'Your unit'}
            className={styles.unitImage}
            onError={(e) => {
              (e.target as HTMLImageElement).src = placeholderImage;
            }}
          />
        </div>

        {/* Кнопка расчета урона */}
        <button
          className={`${styles.actionButton} ${calculateSpin ? styles.spinEffect : ''}`}
          onClick={handleCalculateClick}
          data-tooltip={language === 'ru' ? 'Рассчитать урон' : 'Calculate damage'}
          style={{
            backgroundImage: `url(${getCalculateImage()})`
          }}
        />

        {/* Нейтральный юнит */}
        <div className={`${styles.imagePlaceholder} ${
          isSwitchingSides ? styles.glowingBorder : ''
        }`}>
          <img 
            src={neutralUnitImage || placeholderImage} 
            alt={language === 'ru' ? 'Нейтральный юнит' : 'Neutral unit'}
            className={styles.unitImage}
            onError={(e) => {
              (e.target as HTMLImageElement).src = placeholderImage;
            }}
          />
        </div>
      </div>

      {/* Кнопка смены типа атаки */}
      <button
        className={`${styles.switchSides} ${switchWeaponSpin ? styles.spinEffect : ''} ${
          isWeaponSwitchDisabled ? styles.disabled : ''
        }`}
        onClick={handleSwitchWeaponClick}
        disabled={isWeaponSwitchDisabled}
        data-tooltip={
          isWeaponSwitchDisabled 
            ? (language === 'ru' ? 'Смена типа атаки недоступна' : 'Attack type switch unavailable')
            : (language === 'ru' ? 'Смена типа атаки' : 'Switch attack type')
        }
        style={{
          backgroundImage: `url(${getSwitchWeaponImage()})`,
          opacity: isWeaponSwitchDisabled ? 0.5 : 1,
          cursor: isWeaponSwitchDisabled ? 'not-allowed' : 'pointer'
        }}
      />

      {/* Блок результатов */}
      <div className={styles.resultContainer}>
        <div className={styles.resultColumn}>
          <p className={styles.resultLabel}>
            <strong>{language === 'ru' ? 'Нанесенный урон:' : 'Damage dealt:'}</strong>
          </p>
          <p className={styles.resultValue} id="damage-result">
            {calculationResult.damage}
          </p>
        </div>
        <div className={styles.resultColumn}>
          <p className={styles.resultLabel}>
            <strong>{language === 'ru' ? 'Убито существ:' : 'Units killed:'}</strong>
          </p>
          <p className={styles.resultValue} id="kill-result">
            {calculationResult.killed}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ControlSection;