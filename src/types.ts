export interface NavadurgaInfo {
  name: string;
  title: string;
  virtues: string;
  color: string;
  colorHex: string;
  significance: string;
}

export interface LunarPhaseInfo {
  phaseName: string;
  illumination: number; // 0 to 1
  type: 'new' | 'waxing-crescent' | 'first-quarter' | 'waxing-gibbous' | 'full' | 'waning-gibbous' | 'last-quarter' | 'waning-crescent' | 'eclipse';
}

export interface FestivalEvent {
  day: number;
  title: string;
  subTitle?: string;
  date: string;
  isoDate: string;
  dayOfWeek: string;
  time: string;
  location: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  navadurga: NavadurgaInfo;
  lunarPhase: LunarPhaseInfo;
  highlights: string[];
  dressCode: string;
  entryType: string;
}

export interface FestivalConfig {
  name: string;
  year: number;
  startDate: string; // '2026-10-12'
  endDate: string; // '2026-10-20'
  autoPlayInterval: number; // in ms
  loopAtEnd: boolean; // false stops at Day 9 with "THE FINAL NIGHT"
}
