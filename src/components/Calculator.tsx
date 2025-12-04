// src/components/Calculator.tsx
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useLanguageContext } from '../contexts/LanguageContext';
import Units from './Units/Units';
import NeutralUnits from './NeutralUnits/NeutralUnits';
import HeroSection from './HeroSection/HeroSection';
import ControlSection from './ControlSection/ControlSection';
import styles from './Calculator.module.css';
import type { UnitState, HeroState } from '../types/units';
import placeholderImage from '../assets/images/Units/placeholder.png';

// Интерфейс для модификаторов урона (коэффициентов)
interface DamageModifiers {
  basicOffense: number;
  advancedOffense: number;
  expertOffense: number;
  basicDefense: number;
  advancedDefense: number;
  expertDefense: number;
  shooting: number;
  retribution: number;
  evasion: number;
  fogVeil: number;
  rangePenalty: number;
  neutralRangePenalty: number;
  blowHeaven: number;
  curvedFire: number;
  neutralBlowHeaven: number;
  neutralCurvedFire: number;
  bigShield: number;
  neutralBigShield: number;
}

const Calculator: React.FC = () => {
  const { language } = useLanguageContext();
  
  // Состояния для юнитов и героя
  const [yourUnit, setYourUnit] = useState<UnitState>({
    faction: '',
    tier: '',
    unit: null,
    quantity: 1,
    attack: 0,
    defense: 0,
    minDamage: 0,
    maxDamage: 0,
    health: 0,
    modifiers: [],
    hiddenModifiers: {}
  });

  const [neutralUnit, setNeutralUnit] = useState<UnitState>({
    faction: '',
    tier: '',
    unit: null,
    quantity: 1,
    attack: 0,
    defense: 0,
    minDamage: 0,
    maxDamage: 0,
    health: 0,
    modifiers: [],
    hiddenModifiers: {}
  });

  const [hero, setHero] = useState<HeroState>({
    attack: 0,
    defense: 0,
    FS: 0
  });

  const [isSwitchingSides, setIsSwitchingSides] = useState<boolean>(false);
  const [isRangedAttack, setIsRangedAttack] = useState<boolean>(false);
  const [calculationResult, setCalculationResult] = useState<{
    damage: string;
    killed: string;
  }>({
    damage: '-',
    killed: '-'
  });

  // Изображения юнитов
  const [yourUnitImage, setYourUnitImage] = useState<string>(placeholderImage);
  const [neutralUnitImage, setNeutralUnitImage] = useState<string>(placeholderImage);

  // Обработчики обновления состояний
  const updateYourUnit = useCallback((updates: Partial<UnitState>) => {
    setYourUnit(prev => {
      const newState = { ...prev, ...updates };
      // Сохраняем изображение только если явно передали новый unit
      if (updates.unit) {
        setYourUnitImage(updates.unit.image || placeholderImage);
      }
      return newState;
    });
  }, []);

  const updateNeutralUnit = useCallback((updates: Partial<UnitState>) => {
    setNeutralUnit(prev => {
      const newState = { ...prev, ...updates };
      if (updates.unit) {
        setNeutralUnitImage(updates.unit.image || placeholderImage);
      }
      return newState;
    });
  }, []);

  const updateHero = useCallback((updates: Partial<HeroState>) => {
    setHero(prev => ({ ...prev, ...updates }));
  }, []);

  // Обработчики управления битвой
  const switchSides = useCallback(() => {
    setIsSwitchingSides(prev => !prev);
    
    // После смены стороны нужно обновить тип атаки в соответствии с новым атакующим юнитом
    const attackingUnit = !isSwitchingSides ? neutralUnit.unit : yourUnit.unit;
    if (attackingUnit) {
      const restrictedUnitDataValues = [0, 6, 7, 9, 10, 11, 13, 14];
      if (restrictedUnitDataValues.includes(attackingUnit.unitData)) {
        setIsRangedAttack(false);
      } else if (attackingUnit.unitData === 15) {
        setIsRangedAttack(false);
      } else if ([1, 2, 3, 4, 5, 8, 12].includes(attackingUnit.unitData)) {
        setIsRangedAttack(true);
      }
    }
  }, [isSwitchingSides, yourUnit.unit, neutralUnit.unit]);

  const switchWeaponType = useCallback(() => {
    setIsRangedAttack(prev => !prev);
  }, []);

  // Автоматическое переключение типа атаки при выборе юнита
  useEffect(() => {
    // Определяем какой юнит сейчас атакует
    const attackingUnit = isSwitchingSides ? neutralUnit.unit : yourUnit.unit;
    
    if (attackingUnit) {
      const restrictedUnitDataValues = [0, 6, 7, 9, 10, 11, 13, 14];
      
      if (restrictedUnitDataValues.includes(attackingUnit.unitData)) {
        setIsRangedAttack(false);
      } else if (attackingUnit.unitData === 15) {
        setIsRangedAttack(false);
      } else if ([1, 2, 3, 4, 5, 8, 12].includes(attackingUnit.unitData)) {
        setIsRangedAttack(true);
      }
    }
  }, [yourUnit.unit, neutralUnit.unit, isSwitchingSides]);

  // Функция расчета урона
  const calculateDamage = useCallback(() => {
    // Собираем все модификаторы урона в один объект
    const damageModifiers: DamageModifiers = {
      basicOffense: 1,
      advancedOffense: 1,
      expertOffense: 1,
      basicDefense: 1,
      advancedDefense: 1,
      expertDefense: 1,
      shooting: 1,
      retribution: 1,
      evasion: 1,
      fogVeil: 1,
      rangePenalty: 1,
      neutralRangePenalty: 1,
      blowHeaven: 1,
      curvedFire: 1,
      neutralBlowHeaven: 1,
      neutralCurvedFire: 1,
      bigShield: 1,
      neutralBigShield: 1
    };

    // Применяем модификаторы из вашего юнита
    yourUnit.modifiers.forEach((mod) => {
      switch (mod) {
        case 'basic-offense':
          damageModifiers.basicOffense = 1.05;
          break;
        case 'advanced-offense':
          damageModifiers.advancedOffense = 1.1;
          break;
        case 'expert-offense':
          damageModifiers.expertOffense = 1.15;
          break;
        case 'basic-defense':
          damageModifiers.basicDefense = 0.9;
          break;
        case 'advanced-defense':
          damageModifiers.advancedDefense = 0.8;
          break;
        case 'expert-defense':
          damageModifiers.expertDefense = 0.7;
          break;
        case 'shooting':
          damageModifiers.shooting = 1.2;
          break;
        case 'retribution':
          if (yourUnit.faction !== 'Некрополис') {
            damageModifiers.retribution = 1 + 0.05 * (hero.FS || 0);
          }
          break;
        case 'evasion':
          damageModifiers.evasion = 0.8;
          break;
        case 'fog-veil':
          damageModifiers.fogVeil = 0.8;
          break;
        case 'range-penalty':
          damageModifiers.rangePenalty = 0.5;
          break;
        case 'blow-heaven':
          damageModifiers.blowHeaven = 2;
          break;
        case 'curved-fire':
          damageModifiers.curvedFire = 0.5;
          break;
        case 'big-shield':
          damageModifiers.bigShield = 0.5;
          break;
      }
    });

    // Применяем модификаторы из нейтрального юнита
    neutralUnit.modifiers.forEach((mod) => {
      switch (mod) {
        case 'range-penalty':
          damageModifiers.neutralRangePenalty = 0.5;
          break;
        case 'blow-heaven':
          damageModifiers.neutralBlowHeaven = 2;
          break;
        case 'curved-fire':
          damageModifiers.neutralCurvedFire = 0.5;
          break;
        case 'big-shield':
          damageModifiers.neutralBigShield = 0.5;
          break;
      }
    });

    // Собираем все данные для расчета
    const yourData = {
      minDamage: yourUnit.minDamage || 0,
      maxDamage: yourUnit.maxDamage || 0,
      attack: yourUnit.attack || 0,
      defense: yourUnit.defense || 0,
      quantity: yourUnit.quantity || 1,
      health: yourUnit.health || 1,
      hiddenModifiers: yourUnit.hiddenModifiers || {}
    };

    const neutralData = {
      minDamage: neutralUnit.minDamage || 0,
      maxDamage: neutralUnit.maxDamage || 0,
      attack: neutralUnit.attack || 0,
      defense: neutralUnit.defense || 0,
      quantity: neutralUnit.quantity || 1,
      health: neutralUnit.health || 1,
      hiddenModifiers: neutralUnit.hiddenModifiers || {}
    };

    // Коэффициенты модификаторов (соответствуют оригинальному script.js)
    const yourRangedModifiers = 
      damageModifiers.rangePenalty * 
      damageModifiers.shooting * 
      damageModifiers.retribution * 
      (yourData.hiddenModifiers.doubleShoot || 1) * 
      (yourData.hiddenModifiers.rangePenalty2 || 1) * 
      damageModifiers.curvedFire * 
      damageModifiers.neutralBigShield;
    
    const yourMeleeModifiers = 
      damageModifiers.basicOffense * 
      damageModifiers.advancedOffense * 
      damageModifiers.expertOffense * 
      damageModifiers.retribution * 
      (yourData.hiddenModifiers.meleePenalty || 1) * 
      (yourData.hiddenModifiers.blowStorm || 1) * 
      damageModifiers.blowHeaven;
    
    const neutralRangedModifiers = 
      damageModifiers.neutralRangePenalty * 
      damageModifiers.fogVeil * 
      damageModifiers.evasion * 
      (neutralData.hiddenModifiers.doubleShoot || 1) * 
      (neutralData.hiddenModifiers.rangePenalty2 || 1) * 
      damageModifiers.neutralCurvedFire * 
      damageModifiers.bigShield;
    
    const neutralMeleeModifiers = 
      damageModifiers.basicDefense * 
      damageModifiers.advancedDefense * 
      damageModifiers.expertDefense * 
      (neutralData.hiddenModifiers.meleePenalty || 1) * 
      (neutralData.hiddenModifiers.blowStorm || 1) * 
      damageModifiers.neutralBlowHeaven;

    let minDamage: number, maxDamage: number, killedUnits: string;

    if (isSwitchingSides) {
      // Нейтральная сторона атакует
      const finalModifiers = isRangedAttack ? neutralRangedModifiers : neutralMeleeModifiers;
      const powerArrow = neutralData.hiddenModifiers.powerArrow || 1;
      const pitLord = neutralData.hiddenModifiers.pitLord || 0;
      const pitSpawn = neutralData.hiddenModifiers.pitSpawn || 0;
      
      if (neutralData.attack >= yourData.defense) {
        minDamage = neutralData.minDamage * neutralData.quantity * (1 + (neutralData.attack - Math.floor(yourData.defense * powerArrow)) * 0.05) * finalModifiers + pitLord * yourData.health + pitSpawn * yourData.quantity;
        maxDamage = neutralData.maxDamage * neutralData.quantity * (1 + (neutralData.attack - Math.floor(yourData.defense * powerArrow)) * 0.05) * finalModifiers + pitLord * yourData.health + pitSpawn * yourData.quantity;
      } else {
        minDamage = neutralData.minDamage * neutralData.quantity / (1 + (Math.floor(yourData.defense * powerArrow) - neutralData.attack) * 0.05) * finalModifiers + pitLord * yourData.health + pitSpawn * yourData.quantity;
        maxDamage = neutralData.maxDamage * neutralData.quantity / (1 + (Math.floor(yourData.defense * powerArrow) - neutralData.attack) * 0.05) * finalModifiers + pitLord * yourData.health + pitSpawn * yourData.quantity;
      }
      killedUnits = `${Math.floor(minDamage / yourData.health)}-${Math.floor(maxDamage / yourData.health)}`;
    } else {
      // Ваша сторона атакует
      const finalModifiers = isRangedAttack ? yourRangedModifiers : yourMeleeModifiers;
      const powerArrow = yourData.hiddenModifiers.powerArrow || 1;
      const pitLord = yourData.hiddenModifiers.pitLord || 0;
      const pitSpawn = yourData.hiddenModifiers.pitSpawn || 0;
      
      if (yourData.attack >= neutralData.defense) {
        minDamage = (yourData.minDamage * yourData.quantity * (1 + (yourData.attack - Math.floor(neutralData.defense * powerArrow)) * 0.05) * finalModifiers + pitLord * neutralData.health + pitSpawn * neutralData.quantity);
        maxDamage = (yourData.maxDamage * yourData.quantity * (1 + (yourData.attack - Math.floor(neutralData.defense * powerArrow)) * 0.05) * finalModifiers + pitLord * neutralData.health + pitSpawn * neutralData.quantity);
      } else {
        minDamage = (yourData.minDamage * yourData.quantity / (1 + (Math.floor(neutralData.defense * powerArrow) - yourData.attack) * 0.05) * finalModifiers + pitLord * neutralData.health + pitSpawn * neutralData.quantity);
        maxDamage = (yourData.maxDamage * yourData.quantity / (1 + (Math.floor(neutralData.defense * powerArrow) - yourData.attack) * 0.05) * finalModifiers + pitLord * neutralData.health + pitSpawn * neutralData.quantity);
      }
      killedUnits = `${Math.floor(minDamage / neutralData.health)}-${Math.floor(maxDamage / neutralData.health)}`;
    }

    // Обновляем результаты
    setCalculationResult({
      damage: `${Math.floor(minDamage)}-${Math.floor(maxDamage)}`,
      killed: killedUnits
    });
  }, [yourUnit, neutralUnit, hero, isSwitchingSides, isRangedAttack]);

  // Проверка доступности кнопки смены оружия
  const isWeaponSwitchDisabled = useMemo(() => {
    const attackingUnit = isSwitchingSides ? neutralUnit.unit : yourUnit.unit;
    if (!attackingUnit) return true;
    
    const restrictedUnitDataValues = [0, 6, 7, 9, 10, 11, 13, 14];
    return restrictedUnitDataValues.includes(attackingUnit.unitData);
  }, [yourUnit.unit, neutralUnit.unit, isSwitchingSides]);

  return (
    <div className={styles.calculator}>
      <div className={styles.calculatorContainer}>  
        <div className={styles.calculatorColumns}>
          {/* Левый столбец - Ваш юнит */}
          <div className={styles.calculatorColumn}>
            <Units 
              side="your"
              unitState={yourUnit}
              onUnitChange={updateYourUnit}
              language={language}
              heroStats={{ attack: hero.attack, defense: hero.defense }}
            />
          </div>

          {/* Центральный столбец - Герой и управление */}
          <div className={styles.calculatorColumn}>
            <HeroSection 
              heroState={hero}
              onHeroChange={updateHero}
              language={language}
            />
            
            <ControlSection 
              isSwitchingSides={isSwitchingSides}
              isRangedAttack={isRangedAttack}
              yourUnitImage={yourUnitImage}
              neutralUnitImage={neutralUnitImage}
              calculationResult={calculationResult}
              onSwitchSides={switchSides}
              onSwitchWeapon={switchWeaponType}
              onCalculate={calculateDamage}
              language={language}
              isWeaponSwitchDisabled={isWeaponSwitchDisabled}
            />
          </div>

          {/* Правый столбец - Нейтральный юнит */}
          <div className={styles.calculatorColumn}>
            <NeutralUnits 
              unitState={neutralUnit}
              onUnitChange={updateNeutralUnit}
              language={language}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;