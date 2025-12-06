// src/components/NeutralUnits/NeutralUnits.tsx
import React, { useCallback, useEffect,useState } from 'react';
import { units } from '../../data/unitsData';
import type { UnitState, ModifierKey } from '../../types/units';
import { 
  getAbilityTooltip,
  getAbilityIdFromUnitData,
  getFactionTranslation,
  getRangePenaltyTooltip,
  applyUnitSpecificModifiers,
  getBaseStats
} from '../../utils/modifiers';
import ModifierButton from '../ModifierButton/ModifierButton';
import styles from './NeutralUnits.module.css';

interface NeutralUnitsProps {
  unitState: UnitState;
  onUnitChange: (updates: Partial<UnitState>) => void;
  language: 'ru' | 'en';
}

const neutralAvailableModifiers: ModifierKey[] = [
  'range-penalty',
  'home-road', 
  'big-shield',
  'forest-rage-ent',
  'blow-heaven',
  'curved-fire',
  'defensive-position'
];

const neutralPreservedModifiers: ModifierKey[] = ['home-road'];

// Функция пересчета всех характеристик с нуля
const recalculateStats = (
  unit: any,
  modifiers: string[],
  currentQuantity: number,
  currentHiddenModifiers: { [key: string]: number } = {}
): UnitState => {
  if (!unit) {
    return {
      faction: '',
      tier: '',
      unit: null,
      quantity: currentQuantity || 1,
      attack: 0,
      defense: 0,
      minDamage: 0,
      maxDamage: 0,
      health: 0,
      modifiers,
      hiddenModifiers: currentHiddenModifiers
    };
  }

  // Базовые характеристики
  const [minDmg, maxDmg] = unit.damage.split('-').map(Number);
  const baseStats = getBaseStats(unit);
  
  let attack = baseStats.attack;
  let defense = baseStats.defense;
  let minDamage = minDmg;
  let maxDamage = maxDmg;
  let health = baseStats.health;
  let hiddenModifiers = { ...currentHiddenModifiers };

  // Применяем модификаторы по очереди
  modifiers.forEach(modifier => {
    switch (modifier) {
      case 'home-road':
        attack += 1;
        defense += 1;
        break;
      case 'forest-rage-ent':
        const transferredDefense = Math.floor(defense / 2);
        attack += transferredDefense;
        defense -= transferredDefense;
        break;
      case 'defensive-position':
        defense += 7;
        break;
      // Остальные модификаторы не меняют базовые характеристики
      // Они влияют только на расчет урона в Calculator.tsx
    }
  });

  return {
    faction: '',
    tier: '',
    unit,
    quantity: currentQuantity || 1,
    attack,
    defense,
    minDamage,
    maxDamage,
    health,
    modifiers,
    hiddenModifiers
  };
};

const NeutralUnits: React.FC<NeutralUnitsProps> = ({ 
  unitState, 
  onUnitChange, 
  language 
}) => {
  const [availableTiers, setAvailableTiers] = useState<string[]>([]);
  const [availableUnits, setAvailableUnits] = useState<any[]>([]);
  const [hasUnitAbility, setHasUnitAbility] = useState(false);
  const [unitAbilityId, setUnitAbilityId] = useState<ModifierKey | ''>('');

  // Обработчик переключения модификатора с пересчетом
  const handleModifierToggle = useCallback((modifierId: string) => {
    if (!neutralAvailableModifiers.includes(modifierId as ModifierKey)) return;
    
    const isActive = unitState.modifiers.includes(modifierId);
    const newModifiers = isActive 
      ? unitState.modifiers.filter(m => m !== modifierId)
      : [...unitState.modifiers, modifierId];
    
    // Пересчитываем все характеристики с нуля
    const recalculatedState = recalculateStats(
      unitState.unit,
      newModifiers,
      unitState.quantity,
      unitState.hiddenModifiers
    );
    
    onUnitChange({
      modifiers: newModifiers,
      attack: recalculatedState.attack,
      defense: recalculatedState.defense,
      minDamage: recalculatedState.minDamage,
      maxDamage: recalculatedState.maxDamage,
      health: recalculatedState.health,
      hiddenModifiers: recalculatedState.hiddenModifiers
    });
  }, [unitState, onUnitChange]);

  // Обработчик смены фракции
  const handleFactionChange = useCallback((faction: string) => {
    const newTiers = faction === "Нейтральные существа" ? ["-"] : Object.keys(units[faction] || {});
    
    // Сохраняем только разрешенные модификаторы
    const preservedModifiers = unitState.modifiers.filter(mod => 
      neutralPreservedModifiers.includes(mod as ModifierKey)
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

  // Обработчик смены тира
  const handleTierChange = useCallback((tier: string) => {
    const factionUnits = units[unitState.faction]?.[tier] || [];
    
    // Сохраняем только разрешенные модификаторы
    const preservedModifiers = unitState.modifiers.filter(mod => 
      neutralPreservedModifiers.includes(mod as ModifierKey)
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

  // Обработчик смены юнита
  const handleUnitChange = useCallback((unitIndex: number) => {
    const selectedUnit = availableUnits[unitIndex];
    if (!selectedUnit) return;


    // Применяем специфичные для юнита модификаторы
    const unitModifiers = applyUnitSpecificModifiers(
      selectedUnit.unitData,
      [],
      {}
    );
    
    // Сохраняем текущие модификаторы (кроме уникальных способностей и специфичных для юнита)
    const preservedModifiers = unitState.modifiers.filter(mod => 
      !['forest-rage-ent', 'blow-heaven', 'curved-fire', 'defensive-position', 
        'range-penalty', 'big-shield'].includes(mod)
    );

    const allModifiers = [...preservedModifiers, ...unitModifiers.modifiers];
    
    // Определяем уникальную способность
    const abilityId = getAbilityIdFromUnitData(selectedUnit.unitData);
    if (abilityId) {
      setHasUnitAbility(true);
      setUnitAbilityId(abilityId);
    } else {
      setHasUnitAbility(false);
      setUnitAbilityId('');
    }

    // Пересчитываем все характеристики
    const recalculatedState = recalculateStats(
      selectedUnit,
      allModifiers,
      unitState.quantity || 1,
      unitModifiers.hiddenModifiers
    );

    onUnitChange({
      unit: selectedUnit,
      attack: recalculatedState.attack,
      defense: recalculatedState.defense,
      minDamage: recalculatedState.minDamage,
      maxDamage: recalculatedState.maxDamage,
      health: recalculatedState.health,
      quantity: unitState.quantity || 1,
      modifiers: recalculatedState.modifiers,
      hiddenModifiers: recalculatedState.hiddenModifiers
    });
  }, [availableUnits, unitState.quantity, unitState.modifiers, onUnitChange]);

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

  // Обновляем состояние уникальной способности при изменении юнита
  useEffect(() => {
    if (unitState.unit) {
      const abilityId = getAbilityIdFromUnitData(unitState.unit.unitData);
      setHasUnitAbility(!!abilityId);
      setUnitAbilityId(abilityId || '');
    }
  }, [unitState.unit]);

  // Обработчик ввода числовых значений
  const handleInputChange = useCallback((field: keyof UnitState, value: string) => {
    const numValue = value === '' ? (field === 'health' ? 1 : 0) : Math.max(0, parseInt(value) || 0);
    
    // Если меняем quantity, просто обновляем его
    if (field === 'quantity') {
      onUnitChange({ [field]: numValue });
      return;
    }
    
    // Для других полей пересчитываем с учетом нового значения
    // Но сначала обновляем текущее состояние
    const newState = { ...unitState, [field]: numValue };
    
    // Пересчитываем все с нуля
    const recalculatedState = recalculateStats(
      newState.unit,
      newState.modifiers,
      newState.quantity,
      newState.hiddenModifiers
    );
    
    // Обновляем только нужное поле и пересчитанные характеристики
    onUnitChange({
      [field]: numValue,
      attack: recalculatedState.attack,
      defense: recalculatedState.defense,
      minDamage: recalculatedState.minDamage,
      maxDamage: recalculatedState.maxDamage,
      health: recalculatedState.health
    });
  }, [unitState, onUnitChange]);

  // Обработчик для уникальной способности
  const handleUnitAbilityToggle = useCallback(() => {
    if (unitAbilityId && neutralAvailableModifiers.includes(unitAbilityId)) {
      handleModifierToggle(unitAbilityId);
    }
  }, [unitAbilityId, handleModifierToggle]);

  // Получаем подсказку для уникальной способности
  const getUnitAbilityTooltip = () => {
    if (!unitState.unit) return '';
    return getAbilityTooltip(unitState.unit.unitData, language);
  };

  // Рендер группы модификаторов для нейтральных юнитов
  const renderNeutralModifiers = (modifierIds: ModifierKey[]) => (
    <div className={styles.modifiersColumn}>
      {modifierIds.map(modifierId => {
        const tooltip = modifierId === 'range-penalty' 
          ? getRangePenaltyTooltip(unitState.modifiers.includes('range-penalty'), language)
          : undefined;
        
        return (
          <ModifierButton
            key={modifierId}
            modifierId={modifierId}
            isActive={unitState.modifiers.includes(modifierId)}
            onClick={() => handleModifierToggle(modifierId)}
            language={language}
            data-tooltip={tooltip}
          />
        );
      })}
    </div>
  );

  // Рендер кнопки уникальной способности
  const renderUnitAbilityButton = () => {
    if (!hasUnitAbility || !unitAbilityId) {
      return (
        <>
          <div className={`${styles.modifier} ${styles['unit-ability']}`} style={{ visibility: 'hidden' }} />
          <div className={styles.modifier} style={{ visibility: 'hidden' }} />
          <div className={styles.modifier} style={{ visibility: 'hidden' }} />
        </>
      );
    }

    const customTooltip = getUnitAbilityTooltip();
    
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
        <div className={styles.modifier} style={{ visibility: 'hidden' }} />
        <div className={styles.modifier} style={{ visibility: 'hidden' }} />
      </>
    );
  };

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
          {renderNeutralModifiers(['range-penalty', 'home-road', 'big-shield'])}
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
          <div className={styles.modifiersColumn}>
            {renderUnitAbilityButton()}
          </div>
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
          <div className={styles.modifiersColumn}>
            <div className={styles.modifier} style={{ visibility: 'hidden' }} />
            <div className={styles.modifier} style={{ visibility: 'hidden' }} />
            <div className={styles.modifier} style={{ visibility: 'hidden' }} />
          </div>
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
          <div className={styles.modifiersColumn}>
            <div className={styles.modifier} style={{ visibility: 'hidden' }} />
            <div className={styles.modifier} style={{ visibility: 'hidden' }} />
            <div className={styles.modifier} style={{ visibility: 'hidden' }} />
          </div>
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