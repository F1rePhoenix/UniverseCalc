import type { 
  UnitState, 
  StatChanges, 
  ModifierKey, 
  ExclusiveGroups,
  FactionTranslations,
  ModifierConfig,
  Unit
} from '../types/units';

// Переводы фракций
export const factionTranslations: FactionTranslations = {
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
    "Орден порядка": "Humans",
    "Инферно": "Inferno",
    "Некрополис": "Necropolis",
    "Лесной союз": "Sylvan", 
    "Лига теней": "Dangeon",
    "Академия волшебства": "Academy",
    "Подгорный народ": "Stronghold",
    "Великая орда": "Fortress",
    "Нейтральные существа": "Neutral"
  }
};

// Исключительные группы модификаторов
export const exclusiveGroups: ExclusiveGroups = {
  offense: ['basic-offense', 'advanced-offense', 'expert-offense'],
  defense: ['basic-defense', 'advanced-defense', 'expert-defense']
};

// Модификаторы, которые сохраняются при смене фракции/тира
export const preservedModifiers: ModifierKey[] = [
  'basic-offense', 'advanced-offense', 'expert-offense',
  'basic-defense', 'advanced-defense', 'expert-defense',
  'shooting', 'retribution', 'evasion', 'fog-veil', 'hold-ground',
  'bloody-claw', 'ring-of-life1', 'ring-of-life2', 
  'frenzy', 'home-road', 'vitality', 'forest-rage'
];

// Модификаторы, связанные с уникальными способностями и специфичные для юнита
export const unitSpecificModifiers: ModifierKey[] = [
  'forest-rage-ent', 'blow-heaven', 'curved-fire', 'defensive-position',
  'range-penalty', 'big-shield', 'defense'
];

// Конфигурации модификаторов для удобства
export const modifierConfigs: Record<ModifierKey, ModifierConfig> = {
  // Нападение
  'basic-offense': { id: 'basic-offense', exclusiveGroup: 'offense', isPreserved: true },
  'advanced-offense': { id: 'advanced-offense', exclusiveGroup: 'offense', isPreserved: true },
  'expert-offense': { id: 'expert-offense', exclusiveGroup: 'offense', isPreserved: true },
  
  // Защита
  'basic-defense': { id: 'basic-defense', exclusiveGroup: 'defense', isPreserved: true },
  'advanced-defense': { id: 'advanced-defense', exclusiveGroup: 'defense', isPreserved: true },
  'expert-defense': { id: 'expert-defense', exclusiveGroup: 'defense', isPreserved: true },
  
  // Боевые навыки
  'frenzy': { id: 'frenzy', isPreserved: true },
  'shooting': { id: 'shooting', isPreserved: true },
  'retribution': { id: 'retribution', isPreserved: true },
  'vitality': { id: 'vitality', isPreserved: true },
  'evasion': { id: 'evasion', isPreserved: true },
  'defense': { id: 'defense', isUnitSpecific: true },
  'hold-ground': { id: 'hold-ground', isPreserved: true },
  'forest-rage': { id: 'forest-rage', isPreserved: true },
  'fog-veil': { id: 'fog-veil', isPreserved: true },
  'range-penalty': { id: 'range-penalty', isUnitSpecific: true },
  'home-road': { id: 'home-road', isPreserved: true },
  
  // Артефакты
  'bloody-claw': { id: 'bloody-claw', isPreserved: true },
  'ring-of-life1': { id: 'ring-of-life1', isPreserved: true },
  'ring-of-life2': { id: 'ring-of-life2', isPreserved: true },
  'big-shield': { id: 'big-shield', isUnitSpecific: true },
  
  // Уникальные способности
  'forest-rage-ent': { id: 'forest-rage-ent', isUnitSpecific: true },
  'blow-heaven': { id: 'blow-heaven', isUnitSpecific: true },
  'curved-fire': { id: 'curved-fire', isUnitSpecific: true },
  'defensive-position': { id: 'defensive-position', isUnitSpecific: true }
};

// Функции модификаторов (чистые функции)

export const applyFrenzyModifier = (isActive: boolean, state: UnitState): StatChanges => {
  const { minDamage, maxDamage } = state;
  return {
    minDamage: isActive ? minDamage + 1 : minDamage - 1,
    maxDamage: isActive ? maxDamage + 1 : maxDamage - 1
  };
};

export const applyVitalityModifier = (isActive: boolean, state: UnitState): StatChanges => {
  return {
    health: isActive ? state.health + 2 : state.health - 2
  };
};

export const applyHomeRoadModifier = (isActive: boolean, state: UnitState): StatChanges => {
  return {
    attack: isActive ? state.attack + 1 : state.attack - 1,
    defense: isActive ? state.defense + 1 : state.defense - 1
  };
};

export const applyForestRageModifier = (isActive: boolean, state: UnitState, faction: string): StatChanges => {
  if (faction === 'Лесной союз' && state.maxDamage > 0) {
    return {
      maxDamage: isActive ? state.maxDamage + 1 : state.maxDamage - 1
    };
  }
  return {};
};

export const applyDefenseModifier = (
  isActive: boolean, 
  state: UnitState, 
  isHoldGroundActive: boolean, 
  isAncientEnt: boolean
): StatChanges => {
  const baseDefense = state.defense;
  
  if (isActive) {
    let defenseBonus = 0;
    
    if (isAncientEnt && isHoldGroundActive) {
      defenseBonus = Math.floor(baseDefense);
    } else if (isAncientEnt) {
      defenseBonus = Math.floor(baseDefense * 0.5);
    } else if (isHoldGroundActive) {
      defenseBonus = Math.floor(baseDefense * 0.6);
    } else {
      defenseBonus = Math.floor(baseDefense * 0.3);
    }
    
    return { defense: baseDefense + defenseBonus };
  } else {
    return { defense: baseDefense };
  }
};

export const applyForestRageEntModifier = (isActive: boolean, state: UnitState): StatChanges => {
  const baseAttack = state.attack;
  const baseDefense = state.defense;
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
};

export const applyDefensivePositionModifier = (isActive: boolean, state: UnitState): StatChanges => {
  return {
    defense: isActive ? state.defense + 7 : state.defense - 7
  };
};

// Функции, не изменяющие характеристики напрямую
export const applyBlowHeavenModifier = (): StatChanges => ({});
export const applyCurvedFireModifier = (): StatChanges => ({});

// Вспомогательные функции
export const getAbilityTooltip = (unitData: number, language: 'ru' | 'en'): string => {
  const abilities: Record<number, { ru: string; en: string }> = {
    10: { ru: 'Ярость леса', en: 'Forest Rage' },
    11: { ru: 'Удар с небес', en: 'Heaven Strike' },
    12: { ru: 'Стрельба навесом', en: 'Curved Fire' },
    13: { ru: 'Оборонительная позиция', en: 'Defensive Position' }
  };

  return abilities[unitData]?.[language] || '';
};

export const getAbilityIdFromUnitData = (unitData: number): ModifierKey | '' => {
  switch (unitData) {
    case 10: return 'forest-rage-ent';
    case 11: return 'blow-heaven';
    case 12: return 'curved-fire';
    case 13: return 'defensive-position';
    default: return '';
  }
};

export const getFactionTranslation = (faction: string, language: 'ru' | 'en'): string => {
  return factionTranslations[language][faction] || faction;
};

// Функция для применения модификаторов, специфичных для юнита
export const applyUnitSpecificModifiers = (
  unitData: number,
  currentModifiers: string[],
  currentHiddenModifiers: { [key: string]: number }
): { modifiers: string[]; hiddenModifiers: { [key: string]: number } } => {
  const newModifiers = [...currentModifiers.filter(mod => 
    !unitSpecificModifiers.includes(mod as ModifierKey)
  )];
  const newHiddenModifiers = { ...currentHiddenModifiers };
  
  // Сброс скрытых модификаторов
  Object.keys(newHiddenModifiers).forEach(key => {
    if (key === 'pitLord' || key === 'pitSpawn') {
      newHiddenModifiers[key] = 0;
    } else {
      newHiddenModifiers[key] = 1;
    }
  });

  // Применение специфичных модификаторов в зависимости от unitData
  switch (unitData) {
    case 1: // Стрелок
      newModifiers.push('range-penalty');
      newHiddenModifiers.meleePenalty = 0.5;
      break;
    case 2: // Стрелок без штрафа к стрельбе
      newHiddenModifiers.meleePenalty = 0.5;
      break;
    case 3: // Стрелок без штрафа в ближнем бою
      newModifiers.push('range-penalty');
      break;
    case 4: // Стрелок с дополнительным штрафом
      newModifiers.push('range-penalty');
      newHiddenModifiers.rangePenalty2 = 0.5;
      break;
    case 5: // Эльфийские лучники
      newModifiers.push('range-penalty');
      newHiddenModifiers.doubleShoot = 2;
      newHiddenModifiers.meleePenalty = 0.5;
      break;
    case 6: // Пещерные владыки
      newHiddenModifiers.pitLord = 1;
      break;
    case 7: // Пещерные отродья
      newHiddenModifiers.pitSpawn = 2;
      break;
    case 8: // Лесные стрелки
      newHiddenModifiers.meleePenalty = 0.5;
      newHiddenModifiers.powerArrow = 0.667;
      break;
    case 9: // Таны и эрлы
      newHiddenModifiers.blowStorm = 2;
      break;
    case 10: // Дикие энты - Ярость леса (только показываем кнопку)
      // Не добавляем автоматически
      break;
    case 11: // Грифоны - Удар с небес (только показываем кнопку)
      // Не добавляем автоматически
      break;
    case 12: // Лучники - Стрельба навесом
      newModifiers.push('range-penalty');
      newHiddenModifiers.meleePenalty = 0.5;
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
      newHiddenModifiers.rangePenalty2 = 0.5;
      break;
  }

  return { modifiers: newModifiers, hiddenModifiers: newHiddenModifiers };
};

// Функция для получения базовых характеристик с учетом героя
export const getBaseStats = (unit: Unit | null, heroStats?: { attack: number; defense: number }) => {
  if (!unit) {
    return { attack: 0, defense: 0, health: 0 };
  }
  
  return {
    attack: unit.attack + (heroStats?.attack || 0),
    defense: unit.defense + (heroStats?.defense || 0),
    health: unit.health
  };
};

// Функция для проверки, является ли модификатор активным
export const isModifierActive = (modifierId: string, modifiers: string[]): boolean => {
  return modifiers.includes(modifierId);
};

// Функция для получения tooltip текста для range-penalty
export const getRangePenaltyTooltip = (isActive: boolean, language: 'ru' | 'en'): string => {
  return isActive 
    ? (language === 'ru' ? 'Стрельба со штрафом' : 'Ranged with penalty')
    : (language === 'ru' ? 'Стрельба без штрафа' : 'Ranged without penalty');
};