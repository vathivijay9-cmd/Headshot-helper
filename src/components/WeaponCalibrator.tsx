import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'motion/react';
import { VIVO_T2X_WEAPON_CONFIGS } from '../weaponsData';
import { WeaponConfig } from '../types';
import { 
  Crosshair, 
  Flame, 
  Smartphone, 
  Activity, 
  SlidersHorizontal, 
  CircleDot, 
  RefreshCw,
  Cpu,
  TrendingUp,
  RotateCcw
} from 'lucide-react';

interface WeaponCalibratorProps {
  onNotify: (message: string, status: 'SUCCESS' | 'WARNING' | 'PROCESSING') => void;
}

export default function WeaponCalibrator({ onNotify }: WeaponCalibratorProps) {
  const [selectedWeapon, setSelectedWeapon] = useState<WeaponConfig>(VIVO_T2X_WEAPON_CONFIGS[0]);
  const [latencyOptimizeState, setLatencyOptimizeState] = useState<'IDLE' | 'OPTIMIZING' | 'OPTIMIZED'>('IDLE');
  const [simulatedScore, setSimulatedScore] = useState<number>(0);
  const swipeControls = useAnimation();

  // Handle drag-up path animation demonstration
  useEffect(() => {
    let sequence: any[] = [];
    if (selectedWeapon.dragDirection === 'linear') {
      sequence = [
        { y: 60, x: 0, opacity: 1, scale: 1, transition: { duration: 0.1 } },
        { y: -60, x: 0, opacity: 1, scale: 1.1, textShadow: '0 0 8px rgba(239, 68, 68, 0.8)', transition: { duration: 0.4, ease: 'easeOut' } },
        { opacity: 0, scale: 0.8, transition: { duration: 0.2, delay: 0.2 } }
      ];
    } else if (selectedWeapon.dragDirection === 'j-drag') {
      sequence = [
        { y: 60, x: 10, opacity: 1, scale: 1, transition: { duration: 0.1 } },
        { y: 70, x: -15, opacity: 1, scale: 1, transition: { duration: 0.15, ease: 'easeIn' } },
        { y: -60, x: 15, opacity: 1, scale: 1.2, transition: { duration: 0.35, ease: 'easeOut' } },
        { opacity: 0, scale: 0.8, transition: { duration: 0.2, delay: 0.2 } }
      ];
    } else if (selectedWeapon.dragDirection === 'c-drag') {
      sequence = [
        { y: 60, x: -20, opacity: 1, scale: 1, transition: { duration: 0.1 } },
        { y: 40, x: -5, opacity: 1, transition: { duration: 0.1 } },
        { y: 0, x: 20, opacity: 1, transition: { duration: 0.12 } },
        { y: -60, x: -20, opacity: 1, scale: 1.15, transition: { duration: 0.3, ease: 'easeOut' } },
        { opacity: 0, scale: 0.8, transition: { duration: 0.2, delay: 0.2 } }
      ];
    }

    const runAnimationCycle = async () => {
      try {
        await swipeControls.start(sequence[0]);
        if (sequence[1]) await swipeControls.start(sequence[1]);
        if (sequence[2]) await swipeControls.start(sequence[2]);
        if (sequence[3]) await swipeControls.start(sequence[3]);
      } catch (e) {
        // Safe rejection handler if component unmounts mid-animation
      }
    };

    const interval = setInterval(() => {
      runAnimationCycle();
    }, 1800);

    runAnimationCycle();

    return () => clearInterval(interval);
  }, [selectedWeapon, swipeControls]);

  // Handle Touch Latency Calibration
  const triggerLatencyOptimizer = () => {
    setLatencyOptimizeState('OPTIMIZING');
    onNotify('Analyzing Vivo T2X touch response latency coordinates...', 'PROCESSING');
    
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      setSimulatedScore(Math.floor(Math.random() * 40) + 60);
      if (step === 3) {
        clearInterval(interval);
        setLatencyOptimizeState('OPTIMIZED');
        onNotify('Vivo T2X 5G hardware touch response boosted (8ms ➔ 4.2ms)', 'SUCCESS');
      }
    }, 1000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-3 gap-3">
        <div className="flex items-center space-x-3">
          <SlidersHorizontal className="w-6 h-6 text-red-500" />
          <div>
            <h3 className="font-sans font-bold text-lg text-slate-100">Zero Recoil Gun Sensitivity Database</h3>
            <p className="text-xs text-slate-400">Specially crafted drag physics coefficients for the Vivo T2X 5G SoC chipset</p>
          </div>
        </div>

        {/* Latency optimizer tool */}
        <button
          onClick={triggerLatencyOptimizer}
          disabled={latencyOptimizeState === 'OPTIMIZING'}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-semibold font-mono transition-all ${
            latencyOptimizeState === 'OPTIMIZING' 
              ? 'bg-slate-950 border-amber-500/30 text-amber-400 ring-2 ring-amber-500/20' 
              : latencyOptimizeState === 'OPTIMIZED'
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400'
              : 'bg-slate-950 hover:bg-slate-850 border-slate-800 text-slate-300'
          }`}
        >
          <Cpu className={`w-3.5 h-3.5 ${latencyOptimizeState === 'OPTIMIZING' ? 'animate-spin' : ''}`} />
          <span>
            {latencyOptimizeState === 'OPTIMIZING' && 'Booster Touch (Calibrating...)'}
            {latencyOptimizeState === 'OPTIMIZED' && 'Touch Latency: Optimized (4.2ms)'}
            {latencyOptimizeState === 'IDLE' && 'Optimize Touch Latency'}
          </span>
        </button>
      </div>

      {/* Weapons Tabs */}
      <div className="flex flex-wrap gap-2">
        {VIVO_T2X_WEAPON_CONFIGS.map((weapon) => (
          <button
            key={weapon.id}
            onClick={() => {
              setSelectedWeapon(weapon);
              onNotify(`Applied custom profile for ${weapon.name}`, 'SUCCESS');
            }}
            className={`px-3 py-2 text-xs font-bold rounded-lg border uppercase transition-all flex items-center space-x-1.5 ${
              selectedWeapon.id === weapon.id
                ? 'bg-red-500 border-red-500 text-white shadow-[0_4px_12px_rgba(239,68,68,0.3)]'
                : 'bg-slate-950 border-slate-900 text-slate-400 hover:text-slate-200 hover:border-slate-850'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>{weapon.name.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Selection Specification Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recommended Game Configs */}
        <div className="lg:col-span-2 bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2.5">
            <h4 className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider">Vivo T2X Recommended Coefficients</h4>
            <span className="text-[10px] bg-red-950 text-red-400 px-2.5 py-0.5 rounded-full font-mono font-bold border border-red-900/40">
              One-Tap Success rate: {selectedWeapon.oneTapSuccessRate}%
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-850 text-center">
              <span className="text-[10px] text-slate-400 font-medium block">GENERAL SENSITIVITY</span>
              <strong className="text-xl font-mono text-slate-200">{selectedWeapon.sensitivities.general}</strong>
              <span className="text-[8px] font-mono text-red-400 block mt-1">100% Recommended</span>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-850 text-center">
              <span className="text-[10px] text-slate-400 font-medium block">REGISTRY RED DOT</span>
              <strong className="text-xl font-mono text-slate-200">{selectedWeapon.sensitivities.redDot}</strong>
              <span className="text-[8px] font-mono text-cyan-400 block mt-1">No Overshoots</span>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-850 text-center">
              <span className="text-[10px] text-slate-400 font-medium block">DEVELOPER DPI</span>
              <strong className="text-xl font-mono text-red-500">{selectedWeapon.recommendedDpi} DPI</strong>
              <span className="text-[8px] font-mono text-slate-400 block mt-1">Natively Configurable</span>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-850 text-center">
              <span className="text-[10px] text-slate-400 font-medium block">2X SCOPE SENSITIVITY</span>
              <strong className="text-xl font-mono text-slate-200">{selectedWeapon.sensitivities.scope2x}</strong>
              <span className="text-[8px] font-mono text-slate-400 block mt-1">Stable Recoil</span>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-850 text-center">
              <span className="text-[10px] text-slate-400 font-medium block">4X SCOPE SENSITIVITY</span>
              <strong className="text-xl font-mono text-slate-200">{selectedWeapon.sensitivities.scope4x}</strong>
              <span className="text-[8px] font-mono text-slate-400 block mt-1">Headshot Anchor</span>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-850 text-center col-span-2 sm:col-span-1">
              <span className="text-[10px] text-slate-400 font-medium block">POINTER SPEED</span>
              <strong className="text-sm font-mono text-cyan-400 block truncate mt-1">{selectedWeapon.sensitivities.pointerSpeed}</strong>
              <span className="text-[8px] font-mono text-slate-400 block mt-1">System Setting</span>
            </div>
          </div>

          <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-850/60 text-xs text-slate-300 leading-relaxed">
            <span className="font-bold text-red-400 uppercase tracking-widest block text-[10px] mb-1">PRO GUIDE: RECOIL ZERO CALIBRATION</span>
            {selectedWeapon.recoilControlTip}
          </div>
        </div>

        {/* Drag-up vector simulation visualizer */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex flex-col justify-between align-stretch text-center min-h-[220px]">
          <div>
            <h4 className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider mb-1">Drag-Up Vector Track</h4>
            <p className="text-[10px] text-slate-400">Animated finger stroke execution for {selectedWeapon.name}</p>
          </div>

          {/* Interactive canvas / swipe illustration frame */}
          <div className="relative flex-1 w-full max-w-[150px] mx-auto h-[140px] bg-slate-900 rounded-lg border border-slate-850/80 overflow-hidden my-3 flex items-center justify-center">
            {/* Background elements */}
            <div className="absolute inset-0 flex flex-col justify-between p-2 opacity-10 font-mono text-[9px]">
              <div>TOP [HEAD]</div>
              <div className="border-t border-slate-400 w-full" />
              <div>START [CHEST]</div>
            </div>

            {/* Target Ring */}
            <div className="absolute top-[20px] left-1/2 -translate-x-1/2 flex flex-col items-center">
              <CircleDot className="w-5 h-5 text-red-500 animate-pulse" />
              <span className="text-[7px] font-mono text-red-400">STICK RED</span>
            </div>

            {/* Vector Trail Animation */}
            <motion.div
              animate={swipeControls}
              style={{ position: 'absolute' }}
              className="w-4 h-4 bg-red-600 rounded-full border border-white flex items-center justify-center shadow-[0_0_12px_rgba(239,68,68,1)] text-[8px] text-white font-bold"
            >
              🎯
            </motion.div>
          </div>

          <div className="text-[10px] text-slate-300">
            Swipe Gesture Mode: <span className="font-mono text-red-400 font-bold uppercase">{selectedWeapon.dragDirection}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
