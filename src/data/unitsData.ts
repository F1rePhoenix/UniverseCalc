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

export interface UnitsData {
  [faction: string]: {
    [tier: string]: Unit[];
  };
}

export const units: UnitsData = {
  "Орден порядка": {
    "1": [
      { name: "Крестьяне", nameEn: "Peasants", attack: 1, defense: 1, damage: "1-1", health: 3, image: "../assets/img/Units/Humans/X1T1G0.png", unitData: 0 },
      { name: "Ополченцы", nameEn: "Militia", attack: 1, defense: 2, damage: "1-2", health: 6, image: "/images/Units/Humans/X1T1G1.png", unitData: 0 },
      { name: "Лендлорды", nameEn: "Landlords", attack: 2, defense: 1, damage: "1-2", health: 6, image: "/images/Units/Humans/X1T1G2.png", unitData: 0 }
    ],
    "2": [
      { name: "Лучники", nameEn: "Archers", attack: 4, defense: 3, damage: "2-4", health: 7, image: "/images/Units/Humans/X1T2G0.png", unitData: 12 },
      { name: "Арбалетчики", nameEn: "Crossbowmen", attack: 4, defense: 4, damage: "2-8", health: 10, image: "/images/Units/Humans/X1T2G1.png", unitData: 1 },
      { name: "Стрелки", nameEn: "Marksmen", attack: 5, defense: 4, damage: "2-8", health: 10, image: "/images/Units/Humans/X1T2G2.png", unitData: 2 }
    ],
    "3": [
      { name: "Мечники", nameEn: "Swordsmen", attack: 4, defense: 8, damage: "2-4", health: 16, image: "/images/Units/Humans/X1T3G0.png", unitData: 14 },
      { name: "Латники", nameEn: "Men-at-Arms", attack: 5, defense: 9, damage: "2-5", health: 26, image: "/images/Units/Humans/X1T3G1.png", unitData: 14 },
      { name: "Ревнитель веры", nameEn: "Zealot", attack: 8, defense: 8, damage: "2-5", health: 26, image: "/images/Units/Humans/X1T3G2.png", unitData: 14 }
    ],
    "4": [
      { name: "Грифоны", nameEn: "Griffins", attack: 7, defense: 5, damage: "5-10", health: 30, image: "/images/Units/Humans/X1T4G0.png", unitData: 11 },
      { name: "Королевские грифоны", nameEn: "Royal Griffins", attack: 9, defense: 8, damage: "5-15", health: 35, image: "/images/Units/Humans/X1T4G1.png", unitData: 11 },
      { name: "Боевые грифоны", nameEn: "Battle Griffins", attack: 7, defense: 12, damage: "6-12", health: 52, image: "/images/Units/Humans/X1T4G2.png", unitData: 0 }
    ],
    "5": [
      { name: "Монахи", nameEn: "Monks", attack: 12, defense: 12, damage: "9-12", health: 54, image: "/images/Units/Humans/X1T5G0.png", unitData: 3 },
      { name: "Инквизиторы", nameEn: "Inquisitors", attack: 16, defense: 16, damage: "9-12", health: 80, image: "/images/Units/Humans/X1T5G1.png", unitData: 3 },
      { name: "Адепты", nameEn: "Adepts", attack: 20, defense: 14, damage: "9-12", health: 80, image: "/images/Units/Humans/X1T5G2.png", unitData: 3 }
    ],
    "6": [
      { name: "Рыцари", nameEn: "Knights", attack: 23, defense: 21, damage: "20-30", health: 90, image: "/images/Units/Humans/X1T6G0.png", unitData: 0 },
      { name: "Паладины", nameEn: "Paladins", attack: 24, defense: 24, damage: "20-30", health: 100, image: "/images/Units/Humans/X1T6G1.png", unitData: 0 },
      { name: "Рыцари Изабель", nameEn: "Isabel's Knights", attack: 24, defense: 20, damage: "20-35", health: 100, image: "/images/Units/Humans/X1T6G2.png", unitData: 0 }
    ],
    "7": [
      { name: "Ангелы", nameEn: "Angels", attack: 27, defense: 27, damage: "45-45", health: 180, image: "/images/Units/Humans/X1T7G0.png", unitData: 0 },
      { name: "Архангелы", nameEn: "Archangels", attack: 31, defense: 31, damage: "50-50", health: 220, image: "/images/Units/Humans/X1T7G1.png", unitData: 0 },
      { name: "Серафим", nameEn: "Seraphim", attack: 35, defense: 25, damage: "25-75", health: 220, image: "/images/Units/Humans/X1T7G2.png", unitData: 0 }
    ]
  },
  "Инферно": {
    "1": [
      { name: "Бесы", nameEn: "Imps", attack: 2, defense: 1, damage: "1-2", health: 4, image: "/images/Units/Inferno/X2T1G0.png", unitData: 0 },
      { name: "Черти", nameEn: "Devils", attack: 3, defense: 2, damage: "2-3", health: 6, image: "/images/Units/Inferno/X2T1G1.png", unitData: 0 },
      { name: "Дьяволята", nameEn: "Devilkins", attack: 3, defense: 3, damage: "1-4", health: 6, image: "/images/Units/Inferno/X2T1G2.png", unitData: 0 }
    ],
    "2": [
      { name: "Демоны", nameEn: "Demons", attack: 1, defense: 3, damage: "1-2", health: 13, image: "/images/Units/Inferno/X2T2G0.png", unitData: 0 },
      { name: "Огненные демоны", nameEn: "Fire Demons", attack: 3, defense: 4, damage: "1-4", health: 15, image: "/images/Units/Inferno/X2T2G1.png", unitData: 0 },
      { name: "Старшие демоны", nameEn: "Greater Demons", attack: 3, defense: 2, damage: "1-4", health: 13, image: "/images/Units/Inferno/X2T2G2.png", unitData: 0 }
    ],
    "3": [
      { name: "Адские гончие", nameEn: "Hell Hounds", attack: 4, defense: 3, damage: "3-5", health: 15, image: "/images/Units/Inferno/X2T3G0.png", unitData: 0 },
      { name: "Церберы", nameEn: "Cerberi", attack: 4, defense: 3, damage: "4-6", health: 16, image: "/images/Units/Inferno/X2T3G1.png", unitData: 0 },
      { name: "Огненные гончие", nameEn: "Fire Hounds", attack: 4, defense: 3, damage: "3-5", health: 15, image: "/images/Units/Inferno/X2T3G2.png", unitData: 0 }
    ],
    "4": [
      { name: "Суккубы", nameEn: "Succubi", attack: 6, defense: 6, damage: "8-13", health: 20, image: "/images/Units/Inferno/X2T4G0.png", unitData: 1 },
      { name: "Демонессы", nameEn: "Demonesses", attack: 7, defense: 5, damage: "7-14", health: 29, image: "/images/Units/Inferno/X2T4G1.png", unitData: 1 },
      { name: "Искусительницы", nameEn: "Temptresses", attack: 6, defense: 6, damage: "6-13", health: 30, image: "/images/Units/Inferno/X2T4G2.png", unitData: 1 }
    ],
    "5": [
      { name: "Адские жеребцы", nameEn: "Hell Steeds", attack: 13, defense: 13, damage: "8-16", health: 50, image: "/images/Units/Inferno/X2T5G0.png", unitData: 0 },
      { name: "Кошмары", nameEn: "Nightmares", attack: 18, defense: 19, damage: "11-16", health: 66, image: "/images/Units/Inferno/X2T5G1.png", unitData: 0 },
      { name: "Кони преисподней", nameEn: "Abyssal Steeds", attack: 18, defense: 17, damage: "10-17", health: 66, image: "/images/Units/Inferno/X2T5G2.png", unitData: 0 }
    ],
    "6": [
      { name: "Пещерные демоны", nameEn: "Pit Fiends", attack: 21, defense: 21, damage: "13-26", health: 110, image: "/images/Units/Inferno/X2T6G0.png", unitData: 0 },
      { name: "Пещерные владыки", nameEn: "Pit Lords", attack: 22, defense: 21, damage: "13-31", health: 120, image: "/images/Units/Inferno/X2T6G1.png", unitData: 6 },
      { name: "Пещерные отродья", nameEn: "Pit Spawn", attack: 27, defense: 23, damage: "13-31", health: 140, image: "/images/Units/Inferno/X2T6G2.png", unitData: 7 }
    ],
    "7": [
      { name: "Дьяволы", nameEn: "Devils", attack: 27, defense: 25, damage: "36-66", health: 166, image: "/images/Units/Inferno/X2T7G0.png", unitData: 0 },
      { name: "Архидьяволы", nameEn: "Archdevils", attack: 32, defense: 29, damage: "36-66", health: 199, image: "/images/Units/Inferno/X2T7G1.png", unitData: 0 },
      { name: "Архидемоны", nameEn: "Archdemons", attack: 32, defense: 31, damage: "36-66", health: 211, image: "/images/Units/Inferno/X2T7G2.png", unitData: 0 }
    ]
  },
  "Некрополис": {
    "1": [
      { name: "Костяные воины", nameEn: "Bone Warriors", attack: 1, defense: 2, damage: "1-1", health: 4, image: "/images/Units/Necropolis/X3T1G0.png", unitData: 0 },
      { name: "Костяные лучники", nameEn: "Bone Archers", attack: 2, defense: 2, damage: "1-2", health: 5, image: "/images/Units/Necropolis/X3T1G1.png", unitData: 1 },
      { name: "Костяные воители", nameEn: "Bone Fighters", attack: 1, defense: 3, damage: "1-2", health: 5, image: "/images/Units/Necropolis/X3T1G2.png", unitData: 14 }
    ],
    "2": [
      { name: "Зомби", nameEn: "Zombies", attack: 1, defense: 2, damage: "1-2", health: 17, image: "/images/Units/Necropolis/X3T2G0.png", unitData: 0 },
      { name: "Чумные зомби", nameEn: "Plague Zombies", attack: 2, defense: 2, damage: "2-3", health: 17, image: "/images/Units/Necropolis/X3T2G1.png", unitData: 0 },
      { name: "Гниющие зомби", nameEn: "Rotting Zombies", attack: 2, defense: 3, damage: "1-3", health: 19, image: "/images/Units/Necropolis/X3T2G2.png", unitData: 0 }
    ],
    "3": [
      { name: "Привидения", nameEn: "Ghosts", attack: 5, defense: 4, damage: "2-4", health: 16, image: "/images/Units/Necropolis/X3T3G0.png", unitData: 0 },
      { name: "Призраки", nameEn: "Specters", attack: 5, defense: 4, damage: "4-6", health: 19, image: "/images/Units/Necropolis/X3T3G1.png", unitData: 0 },
      { name: "Духи", nameEn: "Spirits", attack: 6, defense: 5, damage: "4-6", health: 20, image: "/images/Units/Necropolis/X3T3G2.png", unitData: 0 }
    ],
    "4": [
      { name: "Вампиры", nameEn: "Vampires", attack: 6, defense: 6, damage: "6-8", health: 30, image: "/images/Units/Necropolis/X3T4G0.png", unitData: 0 },
      { name: "Высшие вампиры", nameEn: "Greater Vampires", attack: 9, defense: 9, damage: "7-11", health: 35, image: "/images/Units/Necropolis/X3T4G1.png", unitData: 0 },
      { name: "Князья вампиров", nameEn: "Vampire Princes", attack: 9, defense: 9, damage: "5-13", health: 40, image: "/images/Units/Necropolis/X3T4G2.png", unitData: 0 }
    ],
    "5": [
      { name: "Личи", nameEn: "Liches", attack: 15, defense: 15, damage: "12-17", health: 50, image: "/images/Units/Necropolis/X3T5G0.png", unitData: 1 },
      { name: "Архиличи", nameEn: "Archliches", attack: 19, defense: 19, damage: "17-20", health: 55, image: "/images/Units/Necropolis/X3T5G1.png", unitData: 1 },
      { name: "Высшие личи", nameEn: "Greater Liches", attack: 21, defense: 19, damage: "17-21", health: 55, image: "/images/Units/Necropolis/X3T5G2.png", unitData: 1 }
    ],
    "6": [
      { name: "Умертвия", nameEn: "Wights", attack: 24, defense: 22, damage: "21-25", health: 95, image: "/images/Units/Necropolis/X3T6G0.png", unitData: 0 },
      { name: "Вестники смерти", nameEn: "Harbingers of Death", attack: 26, defense: 24, damage: "25-30", health: 100, image: "/images/Units/Necropolis/X3T6G1.png", unitData: 0 },
      { name: "Баньши", nameEn: "Banshees", attack: 23, defense: 23, damage: "22-27", health: 110, image: "/images/Units/Necropolis/X3T6G2.png", unitData: 0 }
    ],
    "7": [
      { name: "Костяные драконы", nameEn: "Bone Dragons", attack: 27, defense: 28, damage: "15-30", health: 150, image: "/images/Units/Necropolis/X3T7G0.png", unitData: 0 },
      { name: "Призрачные драконы", nameEn: "Ghost Dragons", attack: 30, defense: 28, damage: "25-35", health: 160, image: "/images/Units/Necropolis/X3T7G1.png", unitData: 0 },
      { name: "Астральные драконы", nameEn: "Astral Dragons", attack: 31, defense: 27, damage: "27-36", health: 150, image: "/images/Units/Necropolis/X3T7G2.png", unitData: 0 }
    ]
  },
  "Лесной союз": {
    "1": [
      { name: "Феи", nameEn: "Fairies", attack: 1, defense: 1, damage: "1-2", health: 5, image: "/images/Units/Elves/X4T1G0.png", unitData: 0 },
      { name: "Дриады", nameEn: "Dryads", attack: 2, defense: 1, damage: "2-2", health: 6, image: "/images/Units/Elves/X4T1G1.png", unitData: 0 },
      { name: "Нимфы", nameEn: "Nymphs", attack: 2, defense: 1, damage: "2-3", health: 6, image: "/images/Units/Elves/X4T1G2.png", unitData: 0 }
    ],
    "2": [
      { name: "Танцующие с клинками", nameEn: "Blade Dancers", attack: 3, defense: 2, damage: "2-5", health: 12, image: "/images/Units/Elves/X4T2G0.png", unitData: 0 },
      { name: "Танцующие со смертью", nameEn: "Death Dancers", attack: 5, defense: 3, damage: "3-5", health: 12, image: "/images/Units/Elves/X4T2G1.png", unitData: 0 },
      { name: "Танцующие с ветром", nameEn: "Wind Dancers", attack: 6, defense: 6, damage: "4-6", health: 12, image: "/images/Units/Elves/X4T2G2.png", unitData: 0 }
    ],
    "3": [
      { name: "Эльфийские лучники", nameEn: "Elven Archers", attack: 4, defense: 1, damage: "4-7", health: 10, image: "/images/Units/Elves/X4T3G0.png", unitData: 5 },
      { name: "Мастера лука", nameEn: "Master Archers", attack: 5, defense: 4, damage: "5-8", health: 14, image: "/images/Units/Elves/X4T3G1.png", unitData: 5 },
      { name: "Лесные стрелки", nameEn: "Forest Archers", attack: 6, defense: 5, damage: "8-10", health: 14, image: "/images/Units/Elves/X4T3G2.png", unitData: 8 }
    ],
    "4": [
      { name: "Друиды", nameEn: "Druids", attack: 7, defense: 7, damage: "7-9", health: 34, image: "/images/Units/Elves/X4T4G0.png", unitData: 1 },
      { name: "Верховные друиды", nameEn: "High Druids", attack: 12, defense: 9, damage: "10-14", health: 34, image: "/images/Units/Elves/X4T4G1.png", unitData: 1 },
      { name: "Старшие друиды", nameEn: "Elder Druids", attack: 9, defense: 10, damage: "9-14", health: 34, image: "/images/Units/Elves/X4T4G2.png", unitData: 1 }
    ],
    "5": [
      { name: "Единороги", nameEn: "Unicorns", attack: 12, defense: 12, damage: "10-20", health: 57, image: "/images/Units/Elves/X4T5G0.png", unitData: 0 },
      { name: "Боевые единороги", nameEn: "Battle Unicorns", attack: 17, defense: 17, damage: "10-20", health: 77, image: "/images/Units/Elves/X4T5G1.png", unitData: 0 },
      { name: "Светлые единороги", nameEn: "Light Unicorns", attack: 15, defense: 15, damage: "9-24", health: 80, image: "/images/Units/Elves/X4T5G2.png", unitData: 0 }
    ],
    "6": [
      { name: "Энты", nameEn: "Ents", attack: 19, defense: 27, damage: "7-17", health: 175, image: "/images/Units/Elves/X4T6G0.png", unitData: 0 },
      { name: "Древние энты", nameEn: "Ancient Ents", attack: 19, defense: 29, damage: "10-20", health: 181, image: "/images/Units/Elves/X4T6G1.png", unitData: 0 },
      { name: "Дикие энты", nameEn: "Wild Ents", attack: 21, defense: 27, damage: "12-20", health: 175, image: "/images/Units/Elves/X4T6G2.png", unitData: 10 }
    ],
    "7": [
      { name: "Зеленые драконы", nameEn: "Green Dragons", attack: 27, defense: 25, damage: "30-50", health: 200, image: "/images/Units/Elves/X4T7G0.png", unitData: 0 },
      { name: "Изумрудные драконы", nameEn: "Emerald Dragons", attack: 31, defense: 27, damage: "33-57", health: 200, image: "/images/Units/Elves/X4T7G1.png", unitData: 0 },
      { name: "Кристаллические драконы", nameEn: "Crystal Dragons", attack: 30, defense: 26, damage: "30-60", health: 200, image: "/images/Units/Elves/X4T7G2.png", unitData: 0 }
    ]
  },
  "Лига теней": {
    "1": [
      { name: "Лазутчики", nameEn: "Scouts", attack: 3, defense: 3, damage: "2-4", health: 10, image: "/images/Units/Liga/X5T1G0.png", unitData: 4 },
      { name: "Ассасины", nameEn: "Assassins", attack: 4, defense: 3, damage: "2-4", health: 14, image: "/images/Units/Liga/X5T1G1.png", unitData: 4 },
      { name: "Ловчие", nameEn: "Hunters", attack: 5, defense: 4, damage: "3-5", health: 15, image: "/images/Units/Liga/X5T1G2.png", unitData: 0 }
    ],
    "2": [
      { name: "Бестии", nameEn: "Beasts", attack: 4, defense: 2, damage: "5-7", health: 16, image: "/images/Units/Liga/X5T2G0.png", unitData: 0 },
      { name: "Фурии", nameEn: "Furies", attack: 5, defense: 3, damage: "5-7", health: 16, image: "/images/Units/Liga/X5T2G1.png", unitData: 0 },
      { name: "Мегеры", nameEn: "Hags", attack: 5, defense: 4, damage: "3-8", health: 21, image: "/images/Units/Liga/X5T2G2.png", unitData: 0 }
    ],
    "3": [
      { name: "Минотавры", nameEn: "Minotaurs", attack: 5, defense: 4, damage: "4-7", health: 34, image: "/images/Units/Liga/X5T3G0.png", unitData: 0 },
      { name: "Минотавры-стражи", nameEn: "Minotaur Guards", attack: 6, defense: 5, damage: "4-7", health: 38, image: "/images/Units/Liga/X5T3G1.png", unitData: 0 },
      { name: "Минотавры-надсмотрщики", nameEn: "Minotaur Overseers", attack: 8, defense: 8, damage: "5-8", health: 44, image: "/images/Units/Liga/X5T3G2.png", unitData: 0 }
    ],
    "4": [
      { name: "Наездники на ящерах", nameEn: "Lizard Riders", attack: 9, defense: 7, damage: "7-12", health: 40, image: "/images/Units/Liga/X5T4G0.png", unitData: 0 },
      { name: "Темные всадники", nameEn: "Dark Riders", attack: 10, defense: 9, damage: "7-14", health: 60, image: "/images/Units/Liga/X5T4G1.png", unitData: 0 },
      { name: "Проворные наездники", nameEn: "Swift Riders", attack: 9, defense: 12, damage: "7-12", health: 65, image: "/images/Units/Liga/X5T4G2.png", unitData: 0 }
    ],
    "5": [
      { name: "Гидры", nameEn: "Hydras", attack: 15, defense: 12, damage: "7-14", health: 80, image: "/images/Units/Liga/X5T5G0.png", unitData: 0 },
      { name: "Пещерные гидры", nameEn: "Cave Hydras", attack: 15, defense: 15, damage: "9-14", health: 125, image: "/images/Units/Liga/X5T5G1.png", unitData: 0 },
      { name: "Темные гидры", nameEn: "Dark Hydras", attack: 15, defense: 14, damage: "9-12", health: 125, image: "/images/Units/Liga/X5T5G2.png", unitData: 0 }
    ],
    "6": [
      { name: "Сумеречные ведьмы", nameEn: "Twilight Witches", attack: 18, defense: 18, damage: "17-24", health: 80, image: "/images/Units/Liga/X5T6G0.png", unitData: 1 },
      { name: "Владычицы тени", nameEn: "Shadow Mistresses", attack: 20, defense: 20, damage: "17-27", health: 90, image: "/images/Units/Liga/X5T6G1.png", unitData: 1 },
      { name: "Хозяйки ночи", nameEn: "Mistresses of Night", attack: 20, defense: 20, damage: "20-30", health: 120, image: "/images/Units/Liga/X5T6G2.png", unitData: 0 }
    ],
    "7": [
      { name: "Сумеречные драконы", nameEn: "Twilight Dragons", attack: 25, defense: 24, damage: "45-70", health: 200, image: "/images/Units/Liga/X5T7G0.png", unitData: 0 },
      { name: "Черные драконы", nameEn: "Black Dragons", attack: 30, defense: 30, damage: "45-70", health: 240, image: "/images/Units/Liga/X5T7G1.png", unitData: 0 },
      { name: "Красные драконы", nameEn: "Red Dragons", attack: 30, defense: 30, damage: "45-60", health: 235, image: "/images/Units/Liga/X5T7G2.png", unitData: 0 }
    ]
  },
  "Академия волшебства": {
    "1": [
      { name: "Гремлины", nameEn: "Gremlins", attack: 2, defense: 2, damage: "1-2", health: 5, image: "/images/Units/Mages/X6T1G0.png", unitData: 1 },
      { name: "Старшие гремлины", nameEn: "Greater Gremlins", attack: 2, defense: 2, damage: "1-2", health: 6, image: "/images/Units/Mages/X6T1G1.png", unitData: 1 },
      { name: "Гремлины-вредители", nameEn: "Gremlin Saboteurs", attack: 5, defense: 3, damage: "1-2", health: 6, image: "/images/Units/Mages/X6T1G2.png", unitData: 1 }
    ],
    "2": [
      { name: "Каменные горгульи", nameEn: "Stone Gargoyles", attack: 3, defense: 4, damage: "1-1", health: 15, image: "/images/Units/Mages/X6T2G0.png", unitData: 0 },
      { name: "Обсидиановые горгульи", nameEn: "Obsidian Gargoyles", attack: 3, defense: 5, damage: "1-2", health: 20, image: "/images/Units/Mages/X6T2G1.png", unitData: 0 },
      { name: "Стихийные горгульи", nameEn: "Elemental Gargoyles", attack: 2, defense: 6, damage: "1-2", health: 20, image: "/images/Units/Mages/X6T2G2.png", unitData: 0 }
    ],
    "3": [
      { name: "Железные големы", nameEn: "Iron Golems", attack: 5, defense: 5, damage: "3-5", health: 18, image: "/images/Units/Mages/X6T3G0.png", unitData: 0 },
      { name: "Стальные големы", nameEn: "Steel Golems", attack: 6, defense: 6, damage: "5-7", health: 24, image: "/images/Units/Mages/X6T3G1.png", unitData: 0 },
      { name: "Обсидиановые големы", nameEn: "Obsidian Golems", attack: 6, defense: 4, damage: "5-7", health: 20, image: "/images/Units/Mages/X6T3G2.png", unitData: 0 }
    ],
    "4": [
      { name: "Маги", nameEn: "Mages", attack: 10, defense: 10, damage: "7-7", health: 18, image: "/images/Units/Mages/X6T4G0.png", unitData: 2 },
      { name: "Архимаги", nameEn: "Archmages", attack: 10, defense: 10, damage: "7-7", health: 30, image: "/images/Units/Mages/X6T4G1.png", unitData: 2 },
      { name: "Боевые маги", nameEn: "Battle Mages", attack: 12, defense: 9, damage: "7-7", health: 29, image: "/images/Units/Mages/X6T4G2.png", unitData: 2 }
    ],
    "5": [
      { name: "Джинны", nameEn: "Genies", attack: 11, defense: 10, damage: "12-14", health: 40, image: "/images/Units/Mages/X6T5G0.png", unitData: 0 },
      { name: "Султаны джиннов", nameEn: "Sultan Genies", attack: 14, defense: 14, damage: "14-19", health: 45, image: "/images/Units/Mages/X6T5G1.png", unitData: 0 },
      { name: "Визири джиннов", nameEn: "Vizier Genies", attack: 13, defense: 13, damage: "14-19", health: 50, image: "/images/Units/Mages/X6T5G2.png", unitData: 0 }
    ],
    "6": [
      { name: "Принцессы ракшас", nameEn: "Rakshasa Princesses", attack: 25, defense: 20, damage: "15-23", health: 120, image: "/images/Units/Mages/X6T6G0.png", unitData: 0 },
      { name: "Раджи ракшас", nameEn: "Rakshasa Rajahs", attack: 25, defense: 25, damage: "23-30", health: 145, image: "/images/Units/Mages/X6T6G1.png", unitData: 0 },
      { name: "Кшатрии ракшас", nameEn: "Rakshasa Kshatriyas", attack: 27, defense: 20, damage: "25-35", health: 135, image: "/images/Units/Mages/X6T6G2.png", unitData: 0 }
    ],
    "7": [
      { name: "Колоссы", nameEn: "Colossi", attack: 27, defense: 27, damage: "40-70", health: 175, image: "/images/Units/Mages/X6T7G0.png", unitData: 0 },
      { name: "Титаны", nameEn: "Titans", attack: 30, defense: 30, damage: "40-70", health: 190, image: "/images/Units/Mages/X6T7G1.png", unitData: 3 },
      { name: "Громовержцы", nameEn: "Thunderers", attack: 30, defense: 30, damage: "40-70", health: 190, image: "/images/Units/Mages/X6T7G2.png", unitData: 3 }
    ]
  },
  "Подгорный народ": {
    "1": [
      { name: "Защитники гор", nameEn: "Mountain Defenders", attack: 1, defense: 4, damage: "1-1", health: 7, image: "/images/Units/Dwarfs/X7T1G0.png", unitData: 14 },
      { name: "Воители", nameEn: "Warriors", attack: 1, defense: 5, damage: "1-2", health: 12, image: "/images/Units/Dwarfs/X7T1G1.png", unitData: 14 },
      { name: "Горные стражи", nameEn: "Mountain Guardians", attack: 2, defense: 6, damage: "1-2", health: 14, image: "/images/Units/Dwarfs/X7T1G2.png", unitData: 13 }
    ],
    "2": [
      { name: "Метатели копья", nameEn: "Spear Throwers", attack: 4, defense: 4, damage: "1-2", health: 9, image: "/images/Units/Dwarfs/X7T2G0.png", unitData: 1 },
      { name: "Мастера копья", nameEn: "Spear Masters", attack: 4, defense: 4, damage: "2-3", health: 12, image: "/images/Units/Dwarfs/X7T2G1.png", unitData: 3 },
      { name: "Гарпунеры", nameEn: "Harpooners", attack: 5, defense: 3, damage: "2-5", health: 10, image: "/images/Units/Dwarfs/X7T2G2.png", unitData: 1 }
    ],
    "3": [
      { name: "Наездники на медведях", nameEn: "Bear Riders", attack: 5, defense: 10, damage: "4-5", health: 25, image: "/images/Units/Dwarfs/X7T3G0.png", unitData: 0 },
      { name: "Хозяева медведей", nameEn: "Bear Masters", attack: 6, defense: 14, damage: "5-6", health: 30, image: "/images/Units/Dwarfs/X7T3G1.png", unitData: 0 },
      { name: "Северные наездники", nameEn: "Northern Riders", attack: 8, defense: 12, damage: "5-6", health: 30, image: "/images/Units/Dwarfs/X7T3G2.png", unitData: 0 }
    ],
    "4": [
      { name: "Костоломы", nameEn: "Bone Crushers", attack: 6, defense: 6, damage: "2-6", health: 20, image: "/images/Units/Dwarfs/X7T4G0.png", unitData: 0 },
      { name: "Берсерки", nameEn: "Berserkers", attack: 7, defense: 7, damage: "4-8", health: 25, image: "/images/Units/Dwarfs/X7T4G1.png", unitData: 0 },
      { name: "Воины Арката", nameEn: "Arkat Warriors", attack: 7, defense: 7, damage: "3-7", health: 30, image: "/images/Units/Dwarfs/X7T4G2.png", unitData: 0 }
    ],
    "5": [
      { name: "Жрецы Рун", nameEn: "Rune Priests", attack: 10, defense: 6, damage: "12-15", health: 60, image: "/images/Units/Dwarfs/X7T5G0.png", unitData: 1 },
      { name: "Жрецы Арката", nameEn: "Arkat Priests", attack: 9, defense: 9, damage: "14-17", health: 60, image: "/images/Units/Dwarfs/X7T5G1.png", unitData: 1 },
      { name: "Жрецы Пламени", nameEn: "Flame Priests", attack: 10, defense: 9, damage: "17-20", health: 65, image: "/images/Units/Dwarfs/X7T5G2.png", unitData: 1 }
    ],
    "6": [
      { name: "Таны", nameEn: "Thanes", attack: 15, defense: 24, damage: "4-12", health: 100, image: "/images/Units/Dwarfs/X7T6G0.png", unitData: 9 },
      { name: "Ярлы", nameEn: "Jarls", attack: 15, defense: 24, damage: "21-26", health: 120, image: "/images/Units/Dwarfs/X7T6G1.png", unitData: 0 },
      { name: "Эрлы", nameEn: "Earls", attack: 16, defense: 23, damage: "5-13", health: 145, image: "/images/Units/Dwarfs/X7T6G2.png", unitData: 9 }
    ],
    "7": [
      { name: "Огненные драконы", nameEn: "Fire Dragons", attack: 25, defense: 32, damage: "40-50", health: 230, image: "/images/Units/Dwarfs/X7T7G0.png", unitData: 0 },
      { name: "Лавовые драконы", nameEn: "Lava Dragons", attack: 30, defense: 40, damage: "40-50", health: 280, image: "/images/Units/Dwarfs/X7T7G1.png", unitData: 0 },
      { name: "Драконы Арката", nameEn: "Arkat Dragons", attack: 30, defense: 35, damage: "44-55", health: 275, image: "/images/Units/Dwarfs/X7T7G2.png", unitData: 0 }
    ]
  },
  "Великая орда": {
    "1": [
      { name: "Гоблины", nameEn: "Goblins", attack: 1, defense: 1, damage: "1-1", health: 3, image: "/images/Units/Horde/X8T1G0.png", unitData: 0 },
      { name: "Трапперы", nameEn: "Trappers", attack: 1, defense: 3, damage: "1-1", health: 7, image: "/images/Units/Horde/X8T1G1.png", unitData: 0 },
      { name: "Колдуны гоблинов", nameEn: "Goblin Shamans", attack: 2, defense: 1, damage: "1-2", health: 5, image: "/images/Units/Horde/X8T1G2.png", unitData: 0 }
    ],
    "2": [
      { name: "Кентавры", nameEn: "Centaurs", attack: 3, defense: 1, damage: "2-4", health: 6, image: "/images/Units/Horde/X8T2G0.png", unitData: 1 },
      { name: "Кочевые кентавры", nameEn: "Nomad Centaurs", attack: 4, defense: 2, damage: "3-6", health: 10, image: "/images/Units/Horde/X8T2G1.png", unitData: 1 },
      { name: "Боевые кентавры", nameEn: "Battle Centaurs", attack: 4, defense: 4, damage: "3-5", health: 10, image: "/images/Units/Horde/X8T2G2.png", unitData: 1 }
    ],
    "3": [
      { name: "Орочьи воины", nameEn: "Orc Warriors", attack: 5, defense: 2, damage: "2-5", health: 12, image: "/images/Units/Horde/X8T3G0.png", unitData: 0 },
      { name: "Орочьи бойцы", nameEn: "Orc Fighters", attack: 6, defense: 4, damage: "4-6", health: 15, image: "/images/Units/Horde/X8T3G1.png", unitData: 0 },
      { name: "Вармонгеры", nameEn: "Warmongers", attack: 4, defense: 6, damage: "3-5", health: 20, image: "/images/Units/Horde/X8T3G2.png", unitData: 0 }
    ],
    "4": [
      { name: "Шаманки", nameEn: "Shamanesses", attack: 5, defense: 5, damage: "6-9", health: 30, image: "/images/Units/Horde/X8T4G0.png", unitData: 0 },
      { name: "Дочери неба", nameEn: "Daughters of Sky", attack: 7, defense: 9, damage: "6-9", health: 35, image: "/images/Units/Horde/X8T4G1.png", unitData: 0 },
      { name: "Дочери земли", nameEn: "Daughters of Earth", attack: 10, defense: 7, damage: "7-11", health: 35, image: "/images/Units/Horde/X8T4G2.png", unitData: 0 }
    ],
    "5": [
      { name: "Убийцы", nameEn: "Killers", attack: 11, defense: 8, damage: "7-10", health: 34, image: "/images/Units/Horde/X8T5G0.png", unitData: 0 },
      { name: "Палачи", nameEn: "Executioners", attack: 14, defense: 10, damage: "8-12", health: 40, image: "/images/Units/Horde/X8T5G1.png", unitData: 0 },
      { name: "Вожаки", nameEn: "Pack Leaders", attack: 13, defense: 15, damage: "10-12", health: 48, image: "/images/Units/Horde/X8T5G2.png", unitData: 0 }
    ],
    "6": [
      { name: "Виверны", nameEn: "Wyverns", attack: 17, defense: 17, damage: "15-25", health: 90, image: "/images/Units/Horde/X8T6G0.png", unitData: 0 },
      { name: "Темные виверны", nameEn: "Dark Wyverns", attack: 21, defense: 18, damage: "20-27", health: 105, image: "/images/Units/Horde/X8T6G1.png", unitData: 0 },
      { name: "Паокаи", nameEn: "Paokai", attack: 19, defense: 21, damage: "20-25", health: 120, image: "/images/Units/Horde/X8T6G2.png", unitData: 0 }
    ],
    "7": [
      { name: "Циклопы", nameEn: "Cyclopes", attack: 29, defense: 27, damage: "40-52", health: 220, image: "/images/Units/Horde/X8T7G0.png", unitData: 0 },
      { name: "Свободные циклопы", nameEn: "Free Cyclopes", attack: 30, defense: 27, damage: "45-57", health: 225, image: "/images/Units/Horde/X8T7G1.png", unitData: 15 },
      { name: "Кровоглазые циклопы", nameEn: "Blood-eyed Cyclopes", attack: 28, defense: 28, damage: "35-50", health: 235, image: "/images/Units/Horde/X8T7G2.png", unitData: 15 }
    ]
  },
  "Нейтральные существа": {
    "-": [
      { name: "Рыцари смерти", nameEn: "Death Knights", attack: 23, defense: 23, damage: "25-35", health: 90, image: "/images/Units/Neutrals/DeathKnight.png", unitData: 0 },
      { name: "Фениксы", nameEn: "Phoenixes", attack: 33, defense: 33, damage: "30-50", health: 150, image: "/images/Units/Neutrals/Phoenix.png", unitData: 0 },
      { name: "Воздушные элементали", nameEn: "Air Elementals", attack: 10, defense: 4, damage: "6-8", health: 38, image: "/images/Units/Neutrals/AirElemental.png", unitData: 0 },
      { name: "Земные элементали", nameEn: "Earth Elementals", attack: 8, defense: 14, damage: "10-14", health: 72, image: "/images/Units/Neutrals/EarthElemental.png", unitData: 0 },
      { name: "Огненные элементали", nameEn: "Fire Elementals", attack: 12, defense: 4, damage: "11-20", health: 33, image: "/images/Units/Neutrals/FireElemental.png", unitData: 1 },
      { name: "Водные элементали", nameEn: "Water Elementals", attack: 10, defense: 10, damage: "8-12", health: 48, image: "/images/Units/Neutrals/WaterElemental.png", unitData: 0 },
      { name: "Мумии", nameEn: "Mummies", attack: 8, defense: 9, damage: "20-30", health: 50, image: "/images/Units/Neutrals/Mummy.png", unitData: 0 },
      { name: "Мантикоры", nameEn: "Manticores", attack: 15, defense: 15, damage: "30-50", health: 120, image: "/images/Units/Neutrals/Mantikora.png", unitData: 0 },
      { name: "Волки", nameEn: "Wolves", attack: 5, defense: 3, damage: "3-5", health: 25, image: "/images/Units/Neutrals/Wolf.png", unitData: 0 }
    ]
  }
};

export const factions = Object.keys(units) as string[];