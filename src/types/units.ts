// Базовые интерфейсы
export interface Unit {
  name: string;
  nameEn: string;
  attack: number;
  defense: number;
  damage: string;
  health: number;
  image: string;
  unitData: number;
}

export interface UnitState {
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

export interface HeroState {
  attack: number;
  defense: number;
  FS: number;
}

export interface UnitsProps {
  side: 'your' | 'neutral';
  unitState: UnitState;
  onUnitChange: (updates: Partial<UnitState>) => void;
  language: 'ru' | 'en';
  heroStats?: { attack: number; defense: number };
}

export interface NeutralUnitsProps {
  unitState: UnitState;
  onUnitChange: (updates: Partial<UnitState>) => void;
  language: 'ru' | 'en';
}

export interface HeroSectionProps {
  heroState: HeroState;
  onHeroChange: (updates: Partial<HeroState>) => void;
  language: 'ru' | 'en';
}

export interface ControlSectionProps {
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

// Типы для модификаторов
export type StatChanges = Partial<Pick<UnitState, 'attack' | 'defense' | 'minDamage' | 'maxDamage' | 'health'>>;

// Все возможные модификаторы (по данным из CSS файла)
export type ModifierKey = 
  | 'basic-offense' | 'advanced-offense' | 'expert-offense'
  | 'basic-defense' | 'advanced-defense' | 'expert-defense'
  | 'frenzy' | 'shooting' | 'retribution'
  | 'vitality' | 'evasion' | 'defense'
  | 'hold-ground' | 'forest-rage' | 'fog-veil'
  | 'range-penalty' | 'home-road' | 'bloody-claw'
  | 'ring-of-life1' | 'ring-of-life2' | 'big-shield'
  | 'forest-rage-ent' | 'blow-heaven' | 'curved-fire'
  | 'defensive-position';

// Типы для функций модификаторов
export type ModifierFunction = (isActive: boolean, state: UnitState, context?: any) => StatChanges;
export type ModifierFunctions = Record<ModifierKey, ModifierFunction>;

// Типы для групп модификаторов
export interface ExclusiveGroups {
  offense: string[];
  defense: string[];
}

// Типы для перевода
export interface FactionTranslations {
  ru: Record<string, string>;
  en: Record<string, string>;
}

// Тип для данных ability
export interface AbilityData {
  unitData: number;
  nameRu: string;
  nameEn: string;
}

// Тип для конфигурации модификатора
export interface ModifierConfig {
  id: ModifierKey;
  exclusiveGroup?: 'offense' | 'defense';
  isPreserved?: boolean;
  isUnitSpecific?: boolean;
}