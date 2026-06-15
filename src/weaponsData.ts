import { WeaponConfig } from './types';

export const VIVO_T2X_WEAPON_CONFIGS: WeaponConfig[] = [
  {
    id: 'm1887',
    name: 'M1887 (Double Barrel)',
    category: 'Shotgun',
    recommendedDpi: 512,
    sensitivities: {
      general: 100,
      redDot: 98,
      scope2x: 95,
      scope4x: 92,
      pointerSpeed: 'Maximum (+3 levels)'
    },
    dragDirection: 'j-drag',
    recoilControlTip: 'Perform a fast, curved "J" shaped drag up from the opponent\'s feet to stick the red dot on their forehead instantly.',
    oneTapSuccessRate: 94
  },
  {
    id: 'desert_eagle',
    name: 'Desert Eagle (Deagle)',
    category: 'Pistol',
    recommendedDpi: 490,
    sensitivities: {
      general: 99,
      redDot: 96,
      scope2x: 90,
      scope4x: 88,
      pointerSpeed: 'Maximum'
    },
    dragDirection: 'c-drag',
    recoilControlTip: 'Slightly pull down then drag instantly up in a "C-shape" when executing mid-range standing one-taps.',
    oneTapSuccessRate: 91
  },
  {
    id: 'mp40',
    name: 'MP40 (SMG)',
    category: 'SMG',
    recommendedDpi: 540,
    sensitivities: {
      general: 100,
      redDot: 100,
      scope2x: 98,
      scope4x: 95,
      pointerSpeed: 'Maximum (+4 levels)'
    },
    dragDirection: 'linear',
    recoilControlTip: 'Hold the firing button and drag directly vertical ("Linear drag"). Start slow, then increase drag speed to offset continuous recoil spray.',
    oneTapSuccessRate: 88
  },
  {
    id: 'woodpecker',
    name: 'Woodpecker (Sniper/AR)',
    category: 'AR',
    recommendedDpi: 480,
    sensitivities: {
      general: 98,
      redDot: 95,
      scope2x: 92,
      scope4x: 90,
      pointerSpeed: 'Medium-Fast'
    },
    dragDirection: 'linear',
    recoilControlTip: 'Aim white scope just above chest level, then trigger a quick, high-speed single tap drag straight up with standard momentum control.',
    oneTapSuccessRate: 96
  },
  {
    id: 'ak47',
    name: 'AK-47 (Assault)',
    category: 'AR',
    recommendedDpi: 480,
    sensitivities: {
      general: 96,
      redDot: 94,
      scope2x: 88,
      scope4x: 85,
      pointerSpeed: 'Medium'
    },
    dragDirection: 'linear',
    recoilControlTip: 'Due to severe vertical recoil, squeeze drag up gently for the first 3 bullets, then swipe down to reset gun dispersion.',
    oneTapSuccessRate: 85
  }
];
