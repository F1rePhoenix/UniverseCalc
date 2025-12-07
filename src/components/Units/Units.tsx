// src/components/Units/Units.tsx
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { units } from '../../data/unitsData';
import type { UnitState, UnitsProps, ModifierKey } from '../../types/units';
import { 
  exclusiveGroups, 
  preservedModifiers, 
  unitSpecificModifiers,
  applyFrenzyModifier,
  applyVitalityModifier,
  applyHomeRoadModifier,
  applyForestRageModifier,
  applyDefenseModifier,
  applyForestRageEntModifier,
  applyBlowHeavenModifier,
  applyCurvedFireModifier,
  applyDefensivePositionModifier,
  applyUnitSpecificModifiers,
  getAbilityTooltip,
  getAbilityIdFromUnitData,
  getFactionTranslation,
  getBaseStats
} from '../../utils/modifiers';
import ModifierButton from '../ModifierButton/ModifierButton';
import styles from './Units.module.css';

const Units: React.FC<UnitsProps> = ({ 
  unitState, 
  onUnitChange, 
  language, 
  heroStats 
}) => {
  const [availableTiers, setAvailableTiers] = useState<string[]>([]);
  const [availableUnits, setAvailableUnits] = useState<any[]>([]);
  const [hasUnitAbility, setHasUnitAbility] = useState(false);
  const [unitAbilityId, setUnitAbilityId] = useState<ModifierKey | ''>('');

  // Карта функций модификаторов
  const modifierFunctions = useMemo(() => {
    const functions: Record<ModifierKey, any> = {
      // Функции, которые не меняют характеристики
      'basic-offense': () => ({}),
      'advanced-offense': () => ({}),
      'expert-offense': () => ({}),
      'basic-defense': () => ({}),
      'advanced-defense': () => ({}),
      'expert-defense': () => ({}),
      'shooting': () => ({}),
      'retribution': () => ({}),
      'evasion': () => ({}),
      'fog-veil': () => ({}),
      'hold-ground': () => ({}),
      'range-penalty': () => ({}),
      'big-shield': () => ({}),
      'cold-steel': () => ({}),
      'fiery-wrath': () => ({}),
      
      // Функции, которые меняют характеристики
      'frenzy': applyFrenzyModifier,
      'vitality': applyVitalityModifier,
      'home-road': applyHomeRoadModifier,
      'forest-rage': (isActive: boolean, state: UnitState) => 
        applyForestRageModifier(isActive, state, unitState.faction),
      'defense': (isActive: boolean, state: UnitState) => {
      const isHoldGroundActive = state.modifiers.includes('hold-ground');
      const isAncientEnt = state.unit?.name === 'Древние энты';
      return applyDefenseModifier(isActive, state, isHoldGroundActive, isAncientEnt);
    },
      'bloody-claw': applyFrenzyModifier,
      'ring-of-life1': applyVitalityModifier,
      'ring-of-life2': applyVitalityModifier,
      'forest-rage-ent': applyForestRageEntModifier,
      'blow-heaven': applyBlowHeavenModifier,
      'curved-fire': applyCurvedFireModifier,
      'defensive-position': applyDefensivePositionModifier,
    };
    
    return functions;
  }, [unitState.faction]);

  // Функция применения нескольких модификаторов
  const applyMultipleModifiers = useCallback((modifiers: string[], state: UnitState): UnitState => {
    let newState = { ...state };
    
    modifiers.forEach(modifier => {
      const modifierKey = modifier as ModifierKey;
      const func = modifierFunctions[modifierKey];
      if (func) {
        const isActive = newState.modifiers.includes(modifier);
        const changes = func(isActive, newState);
        newState = { ...newState, ...changes };
      }
    });
    
    return newState;
  }, [modifierFunctions]);

  // Обработчик переключения модификатора
  const handleModifierToggle = useCallback((modifierId: string) => {
    const isActive = unitState.modifiers.includes(modifierId);
    let newModifiers: string[];
    
    // Обработка исключительных групп
    if (exclusiveGroups.offense.includes(modifierId)) {
      newModifiers = unitState.modifiers.filter(m => !exclusiveGroups.offense.includes(m));
      if (!isActive) newModifiers.push(modifierId);
    } else if (exclusiveGroups.defense.includes(modifierId)) {
      newModifiers = unitState.modifiers.filter(m => !exclusiveGroups.defense.includes(m));
      if (!isActive) newModifiers.push(modifierId);
    } else {
      newModifiers = isActive 
        ? unitState.modifiers.filter(m => m !== modifierId)
        : [...unitState.modifiers, modifierId];
    }

    // Применяем изменения к характеристикам
    let newState: UnitState = { ...unitState, modifiers: newModifiers };
    
    // Если включен или выключен модификатор, который влияет на характеристики
    const modifierKey = modifierId as ModifierKey;
    if (modifierKey in modifierFunctions) {
      const func = modifierFunctions[modifierKey];
      const changes = func(!isActive, newState);
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

  // Обработчик смены фракции
  const handleFactionChange = useCallback((faction: string) => {
    const newTiers = faction === "Нейтральные существа" ? ["-"] : Object.keys(units[faction] || {});
    
    // Сохраняем только те модификаторы, которые не являются специфичными для юнита
    const preserved = unitState.modifiers.filter(mod => 
      preservedModifiers.includes(mod as ModifierKey)
    );
    
    onUnitChange({
      faction,
      tier: "",
      unit: null,
      attack: 0,
      defense: 0,
      minDamage: 0,
      maxDamage: 0,
      health: 0,
      quantity: 1,
      modifiers: preserved,
      hiddenModifiers: {}
    });

    setAvailableTiers(newTiers);
    setAvailableUnits([]);
    setHasUnitAbility(false);
    setUnitAbilityId('');
  }, [unitState.modifiers, onUnitChange]);

  // Обработчик смены тира
  const handleTierChange = useCallback((tier: string) => {
    const factionUnits = units[unitState.faction]?.[tier] || [];
    
    // Сохраняем только те модификаторы, которые не являются специфичными для юнита
    const preserved = unitState.modifiers.filter(mod => 
      preservedModifiers.includes(mod as ModifierKey)
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
      modifiers: preserved,
      hiddenModifiers: {}
    });

    setAvailableUnits(factionUnits);
    setHasUnitAbility(false);
    setUnitAbilityId('');
  }, [unitState.faction, unitState.modifiers, onUnitChange]);

  // Обработчик смены юнита
  const handleUnitChange = useCallback((unitIndex: number) => {
    const selectedUnit = availableUnits[unitIndex];
    if (!selectedUnit) return;

    const [minDmg, maxDmg] = selectedUnit.damage.split('-').map(Number);
    const baseStats = getBaseStats(selectedUnit, heroStats);

    // Начинаем с базовых характеристик
    const newUnitState: Partial<UnitState> = {
      unit: selectedUnit,
      attack: baseStats.attack,
      defense: baseStats.defense,
      minDamage: minDmg,
      maxDamage: maxDmg,
      health: baseStats.health,
      quantity: unitState.quantity || 1,
      modifiers: [],
      hiddenModifiers: {}
    };

    // Применяем специфичные для юнита модификаторы
    const unitModifiers = applyUnitSpecificModifiers(
      selectedUnit.unitData,
      newUnitState.modifiers || [],
      newUnitState.hiddenModifiers || {}
    );
    
    newUnitState.modifiers = unitModifiers.modifiers;
    newUnitState.hiddenModifiers = unitModifiers.hiddenModifiers;

    // Сохраняем текущие модификаторы (кроме уникальных способностей и специфичных для юнита)
    const preserved = unitState.modifiers.filter(mod => 
      !unitSpecificModifiers.includes(mod as ModifierKey)
    );

    // Добавляем сохраненные модификаторы
    preserved.forEach(mod => {
      if (!newUnitState.modifiers?.includes(mod)) {
        newUnitState.modifiers?.push(mod);
      }
    });

    // Определяем уникальную способность
    const abilityId = getAbilityIdFromUnitData(selectedUnit.unitData);
    if (abilityId) {
      setHasUnitAbility(true);
      setUnitAbilityId(abilityId);
    } else {
      setHasUnitAbility(false);
      setUnitAbilityId('');
    }

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
  }, [availableUnits, unitState.quantity, unitState.modifiers, heroStats, onUnitChange, applyMultipleModifiers]);

  // Обновление характеристик при изменении героя
  useEffect(() => {
    if (unitState.unit) {
      const baseStats = getBaseStats(unitState.unit, heroStats);
      const [minDmg, maxDmg] = unitState.unit.damage.split('-').map(Number);
      
      // Начинаем с базовых характеристик
      const tempState: UnitState = {
        ...unitState,
        attack: baseStats.attack,
        defense: baseStats.defense,
        minDamage: minDmg,
        maxDamage: maxDmg,
        health: baseStats.health
      };
      
      // Применяем все активные модификаторы
      const finalState = applyMultipleModifiers(unitState.modifiers, tempState);
      
      onUnitChange({
        attack: finalState.attack,
        defense: finalState.defense,
        minDamage: finalState.minDamage,
        maxDamage: finalState.maxDamage,
        health: finalState.health
      });
    }
  }, [heroStats?.attack, heroStats?.defense, unitState.unit, unitState.modifiers, onUnitChange, applyMultipleModifiers]);

  // Загрузка доступных тиров при изменении фракции
  useEffect(() => {
    if (unitState.faction) {
      const tiers = unitState.faction === "Нейтральные существа" 
        ? ["-"] 
        : Object.keys(units[unitState.faction] || {});
      setAvailableTiers(tiers);
    }
  }, [unitState.faction]);

  // Загрузка доступных юнитов при изменении фракции и тира
  useEffect(() => {
    if (unitState.faction && unitState.tier) {
      const factionUnits = units[unitState.faction]?.[unitState.tier] || [];
      setAvailableUnits(factionUnits);
    }
  }, [unitState.faction, unitState.tier]);

  // Обработчик ввода числовых значений
  const handleInputChange = useCallback((field: keyof UnitState, value: string) => {
    const numValue = value === '' ? (field === 'health' || field === 'quantity' ? 1 : 0) : Math.max(0, parseInt(value) || 0);
    onUnitChange({ [field]: numValue });
  }, [onUnitChange]);

  // Обработчик для уникальной способности
  const handleUnitAbilityToggle = useCallback(() => {
    if (unitAbilityId) {
      handleModifierToggle(unitAbilityId);
    }
  }, [unitAbilityId, handleModifierToggle]);

  // Рендер группы модификаторов
  const renderModifierGroup = (modifierIds: ModifierKey[]) => (
    <div className={styles.modifiersColumn}>
      {modifierIds.map(modifierId => (
        <ModifierButton
          key={modifierId}
          modifierId={modifierId}
          isActive={unitState.modifiers.includes(modifierId)}
          onClick={() => handleModifierToggle(modifierId)}
          language={language}
        />
      ))}
    </div>
  );

  // Рендер модификатора уникальной способности
  const renderUnitAbilityButton = () => {
    if (!hasUnitAbility || !unitAbilityId) {
      return (
        <>
          <div className={styles.modifier} style={{ visibility: 'hidden' }} />
        </>
      );
    }

    // Для уникальной способности создаем кастомный ModifierButton с правильным tooltip
    const customTooltip = getAbilityTooltip(unitState.unit?.unitData || 0, language);
    
    return (
      <>
        <button
          className={`
            ${styles.modifier}
            ${styles['unit-ability']}
            ${unitState.modifiers.includes(unitAbilityId) ? styles.active : ''}
          `}
          onClick={handleUnitAbilityToggle}
          data-tooltip={customTooltip}
          aria-label={customTooltip}
          type="button"
        />
      </>
    );
  };

  return (
    <div className={styles.unitsSection}>
      <h2>{language === 'ru' ? 'Ваше существо' : 'Your Unit'}</h2>
      
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
              {getFactionTranslation(faction, language)}
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
        {/* Нападение */}
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
          {renderModifierGroup(['basic-offense', 'advanced-offense', 'expert-offense'])}
        </div>

        {/* Защита */}
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
          {renderModifierGroup(['basic-defense', 'advanced-defense', 'expert-defense'])}
        </div>

        {/* Урон */}
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
          {renderModifierGroup(['frenzy', 'shooting', 'retribution'])}
        </div>

        {/* Здоровье */}
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
          {renderModifierGroup(['vitality', 'evasion', 'hold-ground'])}
        </div>

        {/* Количество */}
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
          {renderModifierGroup(['forest-rage', 'fog-veil', 'home-road'])}
        </div>

        {/* Специальные модификаторы */}
        <div className={styles.inputRow}>
          <div className={styles.modifiersColumn}>
            {renderUnitAbilityButton()}
            <ModifierButton
              key="cold-steel"
              modifierId="cold-steel"
              isActive={unitState.modifiers.includes('cold-steel')}
              onClick={() => handleModifierToggle('cold-steel')}
              language={language}
            />
            
            {/* Третья кнопка: fiery-wrath */}
            <ModifierButton
              key="fiery-wrath"
              modifierId="fiery-wrath"
              isActive={unitState.modifiers.includes('fiery-wrath')}
              onClick={() => handleModifierToggle('fiery-wrath')}
              language={language}
            />
          </div>
          
          {renderModifierGroup(['defense', 'range-penalty', 'big-shield'])}
          {renderModifierGroup(['bloody-claw', 'ring-of-life1', 'ring-of-life2'])}
        </div>
      </div>
    </div>
  );
};

export default Units;