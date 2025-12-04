// src/components/NeutralUnits/NeutralUnits.tsx
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { units } from '../../data/unitsData';
import styles from './NeutralUnits.module.css';

interface Unit {
  name: string;
  nameEn: string;
  attack: number;
  defense: number;
  damage: string;
  health: number;
  image: string;
  unitData: number;
}

interface UnitState {
  faction: string;
  tier: string;
  unit: Unit | null;
  quantity: number;
  attack: number;
  defense: number;
  minDamage: number;
  maxDamage: number;
  health: number;
  modifiers: string[];
  hiddenModifiers: { [key: string]: number };
}

interface NeutralUnitsProps {
  unitState: UnitState;
  onUnitChange: (updates: Partial<UnitState>) => void;
  language: 'ru' | 'en';
}

const factionTranslations = {
  ru: {
    "Орден порядка": "Орден порядка",
    "Инферно": "Инферно", 
    "Некрополис": "Некрополис",
    "Лесной союз": "Лесной союз",
    "Лига теней": "Лига теней",
    "Академия волшебства": "Академия волшебства",
    "Подгорный народ": "Подгорный народ",
    "Великая орда": "Великая орда",
    "Нейтральные существа": "Нейтральные существа"
  },
  en: {
    "Орден порядка": "Order of Order",
    "Инферно": "Inferno",
    "Некрополис": "Necropolis",
    "Лесной союз": "Forest Alliance", 
    "Лига теней": "Shadow League",
    "Академия волшебства": "Magic Academy",
    "Подгорный народ": "Underground People",
    "Великая орда": "Great Horde",
    "Нейтральные существа": "Neutral Creatures"
  }
};

// Define type for modifier function return values
type StatChanges = Partial<Pick<UnitState, 'attack' | 'defense' | 'minDamage' | 'maxDamage' | 'health'>>;

// Define valid modifier keys for neutral units
type NeutralModifierKey = 
  | 'home-road'
  | 'forest-rage-ent'
  | 'defensive-position';

// Функция для получения текста подсказки способности
const getAbilityTooltip = (unitData: number | undefined, language: 'ru' | 'en'): string => {
  if (!unitData) return '';
  
  const abilities = {
    10: { ru: 'Ярость леса', en: 'Forest Rage' },
    11: { ru: 'Удар с небес', en: 'Heaven Strike' },
    12: { ru: 'Стрельба навесом', en: 'Curved Fire' },
    13: { ru: 'Оборонительная позиция', en: 'Defensive Position' }
  };

  const ability = abilities[unitData as keyof typeof abilities];
  return ability ? ability[language] : '';
};

const NeutralUnits: React.FC<NeutralUnitsProps> = ({ 
  unitState, 
  onUnitChange, 
  language 
}) => {
  const [availableTiers, setAvailableTiers] = useState<string[]>([]);
  const [availableUnits, setAvailableUnits] = useState<Unit[]>([]);
  const [hasUnitAbility, setHasUnitAbility] = useState(false);
  const [unitAbilityId, setUnitAbilityId] = useState<string>('');

  // Modifier functions for neutral units
  const applyHomeRoadModifier = useCallback((isActive: boolean, currentState: UnitState): StatChanges => {
    return {
      attack: isActive ? currentState.attack + 1 : currentState.attack - 1,
      defense: isActive ? currentState.defense + 1 : currentState.defense - 1
    };
  }, []);

  // Функции для уникальных способностей нейтральных юнитов
  const applyForestRageEntModifier = useCallback((isActive: boolean, currentState: UnitState): StatChanges => {
    const baseAttack = currentState.attack;
    const baseDefense = currentState.defense;
    const transferredDefense = Math.floor(baseDefense / 2);
    
    if (isActive) {
      return {
        attack: baseAttack + transferredDefense,
        defense: baseDefense - transferredDefense
      };
    } else {
      return {
        attack: baseAttack,
        defense: baseDefense
      };
    }
  }, []);

  const applyDefensivePositionModifier = useCallback((isActive: boolean, currentState: UnitState): StatChanges => {
    return {
      defense: isActive ? currentState.defense + 7 : currentState.defense - 7
    };
  }, []);

  const modifierFunctions = useMemo((): Record<NeutralModifierKey, (isActive: boolean, state: UnitState) => StatChanges> => ({
    'home-road': applyHomeRoadModifier,
    'forest-rage-ent': applyForestRageEntModifier,
    'defensive-position': applyDefensivePositionModifier
  }), [
    applyHomeRoadModifier,
    applyForestRageEntModifier,
    applyDefensivePositionModifier
  ]);

  // Функция применения нескольких модификаторов
  const applyMultipleModifiers = useCallback((modifiers: string[], state: UnitState): UnitState => {
    let newState = { ...state };
    
    modifiers.forEach(modifier => {
      if (modifier in modifierFunctions) {
        const modifierFunction = modifierFunctions[modifier as NeutralModifierKey];
        const isActive = newState.modifiers.includes(modifier);
        const changes = modifierFunction(isActive, newState);
        newState = { ...newState, ...changes };
      }
    });
    
    return newState;
  }, [modifierFunctions]);

  const handleModifierToggle = useCallback((modifierId: string) => {
    const isActive = unitState.modifiers.includes(modifierId);
    let newModifiers: string[];
    
    newModifiers = isActive 
      ? unitState.modifiers.filter(m => m !== modifierId)
      : [...unitState.modifiers, modifierId];

    // Получаем текущее состояние с базовыми характеристиками
    let newState: UnitState = { ...unitState, modifiers: newModifiers };
    
    // Если выключили модификатор, который влиял на характеристики, нужно восстановить базовые значения
    if (isActive && modifierId in modifierFunctions) {
      const modifierFunction = modifierFunctions[modifierId as NeutralModifierKey];
      const changes = modifierFunction(false, newState);
      newState = { ...newState, ...changes };
    } 
    // Если включили модификатор, который влияет на характеристики
    else if (!isActive && modifierId in modifierFunctions) {
      const modifierFunction = modifierFunctions[modifierId as NeutralModifierKey];
      const changes = modifierFunction(true, newState);
      newState = { ...newState, ...changes };
    }

    onUnitChange({
      modifiers: newModifiers,
      attack: newState.attack,
      defense: newState.defense,
      minDamage: newState.minDamage,
      maxDamage: newState.maxDamage,
      health: newState.health
    });
  }, [unitState, onUnitChange, modifierFunctions]);

  const handleFactionChange = useCallback((faction: string) => {
    const newTiers = faction === "Нейтральные существа" ? ["-"] : Object.keys(units[faction] || {});
    
    // Сохраняем текущие модификаторы при смене фракции
    const preservedModifiers = unitState.modifiers.filter(mod => 
      ['home-road'].includes(mod)
    );
    
    onUnitChange({
      faction,
      tier: faction === "Нейтральные существа" ? "-" : "",
      unit: null,
      attack: 0,
      defense: 0,
      minDamage: 0,
      maxDamage: 0,
      health: 0,
      quantity: 1,
      modifiers: preservedModifiers,
      hiddenModifiers: {}
    });

    setAvailableTiers(newTiers);
    setAvailableUnits([]);
    setHasUnitAbility(false);
    setUnitAbilityId('');
  }, [onUnitChange, unitState.modifiers]);

  const handleTierChange = useCallback((tier: string) => {
    const factionUnits = units[unitState.faction]?.[tier] || [];
    
    // Сохраняем текущие модификаторы при смене тира
    const preservedModifiers = unitState.modifiers.filter(mod => 
      ['home-road'].includes(mod)
    );
    
    onUnitChange({
      tier,
      unit: null,
      attack: 0,
      defense: 0,
      minDamage: 0,
      maxDamage: 0,
      health: 0,
      quantity: 1,
      modifiers: preservedModifiers,
      hiddenModifiers: {}
    });

    setAvailableUnits(factionUnits);
    setHasUnitAbility(false);
    setUnitAbilityId('');
  }, [unitState.faction, unitState.modifiers, onUnitChange]);

  const applyUnitDataModifiers = useCallback((unitData: number, state: Partial<UnitState>) => {
    const modifiers = [...(state.modifiers || [])];
    const hiddenModifiers = { ...(state.hiddenModifiers || {}) };

    // Сбрасываем скрытые модификаторы
    Object.keys(hiddenModifiers).forEach(key => {
      if (key === 'pitLord' || key === 'pitSpawn') {
        hiddenModifiers[key] = 0;
      } else {
        hiddenModifiers[key] = 1;
      }
    });

    // Сохраняем текущие модификаторы, кроме уникальных способностей и специфичных для юнита
    const preservedModifiers = modifiers.filter(mod => 
      !['forest-rage-ent', 'blow-heaven', 'curved-fire', 'defensive-position', 
        'range-penalty', 'big-shield'].includes(mod)
    );

    
    const newModifiers = [...preservedModifiers];

    // Устанавливаем скрытые модификаторы и модификаторы в зависимости от unitData
    switch (unitData) {
      case 1: // Стрелок
        newModifiers.push('range-penalty');
        hiddenModifiers.meleePenalty = 0.5;
        break;
      case 2: // Стрелок без штрафа к стрельбе
        hiddenModifiers.meleePenalty = 0.5;
        break;
      case 3: // Стрелок без штрафа в ближнем бою
        newModifiers.push('range-penalty');
        break;
      case 4: // Стрелок с дополнительным штрафом
        newModifiers.push('range-penalty');
        hiddenModifiers.rangePenalty2 = 0.5;
        break;
      case 5: // Эльфийские лучники
        newModifiers.push('range-penalty');
        hiddenModifiers.doubleShoot = 2;
        hiddenModifiers.meleePenalty = 0.5;
        break;
      case 6: // Пещерные владыки
        hiddenModifiers.pitLord = 1;
        break;
      case 7: // Пещерные отродья
        hiddenModifiers.pitSpawn = 2;
        break;
      case 8: // Лесные стрелки
        hiddenModifiers.meleePenalty = 0.5;
        hiddenModifiers.powerArrow = 0.667;
        break;
      case 9: // Таны и эрлы
        hiddenModifiers.blowStorm = 2;
        break;
      case 10: // Дикие энты - Ярость леса
        // Не добавляем автоматически, только показываем кнопку
        break;
      case 11: // Грифоны - Удар с небес
        // Не добавляем автоматически, только показываем кнопку
        break;
      case 12: // Лучники - Стрельба навесом
        newModifiers.push('range-penalty');
        hiddenModifiers.meleePenalty = 0.5;
        // Не добавляем curved-fire автоматически
        break;
      case 13: // Горные стражи - Оборонительная позиция
        newModifiers.push('big-shield');
        // Не добавляем defensive-position автоматически
        break;
      case 14: // Большой щит
        newModifiers.push('big-shield');
        break;
      case 15: // Циклопы
        newModifiers.push('range-penalty');
        hiddenModifiers.rangePenalty2 = 0.5;
        break;
    }

    state.modifiers = newModifiers;
    state.hiddenModifiers = hiddenModifiers;
    
    // Определяем, есть ли уникальная способность
    const abilityId = getAbilityIdFromUnitData(unitData);
    setHasUnitAbility(!!abilityId);
    setUnitAbilityId(abilityId || '');
  }, []);

  // Вспомогательная функция для определения ID способности по unitData
  const getAbilityIdFromUnitData = useCallback((unitData: number): string => {
    switch (unitData) {
      case 10: return 'forest-rage-ent';
      case 11: return 'blow-heaven';
      case 12: return 'curved-fire';
      case 13: return 'defensive-position';
      default: return '';
    }
  }, []);

  const handleUnitChange = useCallback((unitIndex: number) => {
    const selectedUnit = availableUnits[unitIndex];
    if (!selectedUnit) return;

    const [minDmg, maxDmg] = selectedUnit.damage.split('-').map(Number);
    const baseAttack = selectedUnit.attack;
    const baseDefense = selectedUnit.defense;
    const baseHealth = selectedUnit.health;

    // Начинаем с базовых характеристик
    const newUnitState: Partial<UnitState> = {
      unit: selectedUnit,
      attack: baseAttack,
      defense: baseDefense,
      minDamage: minDmg,
      maxDamage: maxDmg,
      health: baseHealth,
      quantity: unitState.quantity || 1,
      modifiers: [],
      hiddenModifiers: {}
    };

    // Применяем специфичные для юнита модификаторы
    applyUnitDataModifiers(selectedUnit.unitData, newUnitState);

    // Сохраняем текущие модификаторы (кроме уникальных способностей и специфичных для юнита)
    const preservedModifiers = unitState.modifiers.filter(mod => 
      !['forest-rage-ent', 'blow-heaven', 'curved-fire', 'defensive-position', 
        'range-penalty', 'big-shield'].includes(mod)
    );

    // Добавляем сохраненные модификаторы
    preservedModifiers.forEach(mod => {
      if (!newUnitState.modifiers?.includes(mod)) {
        newUnitState.modifiers?.push(mod);
      }
    });

    // Применяем все активные модификаторы к характеристикам
    if (newUnitState.modifiers && newUnitState.modifiers.length > 0) {
      const finalState = applyMultipleModifiers(newUnitState.modifiers, newUnitState as UnitState);
      
      onUnitChange({
        ...newUnitState,
        attack: finalState.attack,
        defense: finalState.defense,
        minDamage: finalState.minDamage,
        maxDamage: finalState.maxDamage,
        health: finalState.health
      });
    } else {
      onUnitChange(newUnitState);
    }
  }, [availableUnits, unitState.quantity, unitState.modifiers, onUnitChange, applyUnitDataModifiers, applyMultipleModifiers]);

  useEffect(() => {
    if (unitState.faction) {
      const tiers = unitState.faction === "Нейтральные существа" 
        ? ["-"] 
        : Object.keys(units[unitState.faction] || {});
      setAvailableTiers(tiers);
    }
  }, [unitState.faction]);

  useEffect(() => {
    if (unitState.faction && unitState.tier) {
      const factionUnits = units[unitState.faction]?.[unitState.tier] || [];
      setAvailableUnits(factionUnits);
    }
  }, [unitState.faction, unitState.tier]);

  // Обновляем состояние уникальной способности при изменении юнита
  useEffect(() => {
    if (unitState.unit) {
      applyUnitDataModifiers(unitState.unit.unitData, unitState);
    }
  }, [unitState.unit, applyUnitDataModifiers]);

  const handleInputChange = useCallback((field: keyof UnitState, value: string) => {
    const numValue = value === '' ? (field === 'health' ? 1 : 0) : Math.max(0, parseInt(value) || 0);
    onUnitChange({ [field]: numValue });
  }, [onUnitChange]);

  const getTranslatedFaction = (faction: string) => {
    const translation = factionTranslations[language];
    return translation[faction as keyof typeof translation] || faction;
  };

  // Получаем подсказку для уникальной способности
  const getUnitAbilityTooltip = () => {
    if (!unitState.unit) return '';
    return getAbilityTooltip(unitState.unit.unitData, language);
  };

  // Обработчик для уникальной способности
  const handleUnitAbilityToggle = useCallback(() => {
    if (unitAbilityId) {
      handleModifierToggle(unitAbilityId);
    }
  }, [unitAbilityId, handleModifierToggle]);

  return (
    <div className={styles.neutralUnitsSection}>
      <h2>{language === 'ru' ? 'Нейтральный юнит' : 'Neutral Unit'}</h2>
      
      <div className={styles.selectRow}>
        <select 
          value={unitState.faction} 
          onChange={(e) => handleFactionChange(e.target.value)}
          className={styles.factionSelect}
        >
          <option value="" disabled>
            {language === 'ru' ? 'Фракция' : 'Faction'}
          </option>
          {Object.keys(units).map(faction => (
            <option key={faction} value={faction}>
              {getTranslatedFaction(faction)}
            </option>
          ))}
        </select>

        <select 
          value={unitState.tier} 
          onChange={(e) => handleTierChange(e.target.value)}
          disabled={!unitState.faction}
          className={styles.tierSelect}
        >
          <option value="" disabled>
            {language === 'ru' ? 'Тир' : 'Tier'}
          </option>
          {availableTiers.map(tier => (
            <option key={tier} value={tier}>{tier}</option>
          ))}
        </select>

        <select 
          value={unitState.unit ? availableUnits.findIndex(u => u.name === unitState.unit?.name) : -1}
          onChange={(e) => handleUnitChange(parseInt(e.target.value))}
          disabled={!unitState.tier}
          className={styles.unitSelect}
        >
          <option value={-1} disabled>
            {language === 'ru' ? 'Существо' : 'Unit'}
          </option>
          {availableUnits.map((unit, index) => (
            <option key={index} value={index}>
              {language === 'ru' ? unit.name : unit.nameEn}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.inputContainer}>
        <div className={styles.inputRow}>
          <div className={styles.labelColumn}>
            {language === 'ru' ? 'Нападение' : 'Attack'}
          </div>
          <div className={styles.inputColumn}>
            <input
              type="number"
              value={unitState.attack || ''}
              onChange={(e) => handleInputChange('attack', e.target.value)}
              placeholder={language === 'ru' ? 'Нападение' : 'Attack'}
              min="0"
            />
          </div>
          <div className={styles.modifiersColumn}>
            <button
              className={`${styles.modifier} ${styles['range-penalty']} ${
                unitState.modifiers.includes('range-penalty') ? styles.active : ''
              }`}
              onClick={() => handleModifierToggle('range-penalty')}
              data-tooltip={unitState.modifiers.includes('range-penalty') 
                ? (language === 'ru' ? 'Стрельба со штрафом' : 'Ranged with penalty')
                : (language === 'ru' ? 'Стрельба без штрафа' : 'Ranged without penalty')
              }
            />
            <button
              className={`${styles.modifier} ${styles['home-road']} ${
                unitState.modifiers.includes('home-road') ? styles.active : ''
              }`}
              onClick={() => handleModifierToggle('home-road')}
              data-tooltip={language === 'ru' ? 'Родные земли' : 'Home Road'}
            />
            <button
              className={`${styles.modifier} ${styles['big-shield']} ${
                unitState.modifiers.includes('big-shield') ? styles.active : ''
              }`}
              onClick={() => handleModifierToggle('big-shield')}
              data-tooltip={language === 'ru' ? 'Большой щит' : 'Big Shield'}
            />
          </div>
        </div>

        <div className={styles.inputRow}>
          <div className={styles.labelColumn}>
            {language === 'ru' ? 'Защита' : 'Defense'}
          </div>
          <div className={styles.inputColumn}>
            <input
              type="number"
              value={unitState.defense || ''}
              onChange={(e) => handleInputChange('defense', e.target.value)}
              placeholder={language === 'ru' ? 'Защита' : 'Defense'}
              min="0"
            />
          </div>
          <div className={styles.modifiersColumn}>
            {hasUnitAbility ? (
              <button
                className={`${styles.modifier} ${styles['unit-ability']} ${
                  unitState.modifiers.includes(unitAbilityId) ? styles.active : ''
                }`}
                onClick={handleUnitAbilityToggle}
                data-tooltip={getUnitAbilityTooltip()}
                style={{ visibility: 'visible' }}
              />
            ) : (
              <div className={`${styles.modifier} ${styles['unit-ability']}`} style={{ visibility: 'hidden' }} />
            )}
            <div className={styles.modifier} style={{ visibility: 'hidden' }} />
            <div className={styles.modifier} style={{ visibility: 'hidden' }} />
          </div>
        </div>

        <div className={styles.inputRow}>
          <div className={styles.labelColumn}>
            {language === 'ru' ? 'Урон' : 'Damage'}
          </div>
          <div className={styles.inputColumn}>
            <input
              type="number"
              value={unitState.minDamage || ''}
              onChange={(e) => handleInputChange('minDamage', e.target.value)}
              placeholder={language === 'ru' ? 'Мин' : 'Min'}
              min="0"
            />
            <input
              type="number"
              value={unitState.maxDamage || ''}
              onChange={(e) => handleInputChange('maxDamage', e.target.value)}
              placeholder={language === 'ru' ? 'Макс' : 'Max'}
              min="0"
            />
          </div>
          <div className={styles.modifiersColumn}>
            <div className={styles.modifier} style={{ visibility: 'hidden' }} />
            <div className={styles.modifier} style={{ visibility: 'hidden' }} />
            <div className={styles.modifier} style={{ visibility: 'hidden' }} />
          </div>
        </div>

        <div className={styles.inputRow}>
          <div className={styles.labelColumn}>
            {language === 'ru' ? 'Здоровье' : 'Health'}
          </div>
          <div className={styles.inputColumn}>
            <input
              type="number"
              value={unitState.health || ''}
              onChange={(e) => handleInputChange('health', e.target.value)}
              placeholder={language === 'ru' ? 'Здоровье' : 'Health'}
              min="1"
            />
          </div>
          <div className={styles.modifiersColumn}>
            <div className={styles.modifier} style={{ visibility: 'hidden' }} />
            <div className={styles.modifier} style={{ visibility: 'hidden' }} />
            <div className={styles.modifier} style={{ visibility: 'hidden' }} />
          </div>
        </div>

        <div className={styles.inputRow}>
          <div className={styles.labelColumn}>
            {language === 'ru' ? 'Кол-во' : 'Quantity'}
          </div>
          <div className={styles.inputColumn}>
            <input
              type="number"
              value={unitState.quantity || ''}
              onChange={(e) => handleInputChange('quantity', e.target.value)}
              placeholder={language === 'ru' ? 'Кол-во' : 'Quantity'}
              min="1"
            />
          </div>
          <div className={styles.modifiersColumn}>
            <div className={styles.modifier} style={{ visibility: 'hidden' }} />
            <div className={styles.modifier} style={{ visibility: 'hidden' }} />
            <div className={styles.modifier} style={{ visibility: 'hidden' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeutralUnits;