export interface WeaponConfig {
  id: string;
  name: string;
  category: 'Shotgun' | 'SMG' | 'AR' | 'Pistol';
  recommendedDpi: number;
  sensitivities: {
    general: number;
    redDot: number;
    scope2x: number;
    scope4x: number;
    pointerSpeed: string;
  };
  dragDirection: 'linear' | 'curved' | 'j-drag' | 'c-drag';
  recoilControlTip: string;
  oneTapSuccessRate: number;
}

export interface PanelOption {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  intensity: number; // 0 to 100%
  category: 'aim' | 'recoil' | 'speed' | 'safety';
}

export interface CalibrationLog {
  id: string;
  timestamp: string;
  action: string;
  status: 'SUCCESS' | 'WARNING' | 'PROCESSING';
}
